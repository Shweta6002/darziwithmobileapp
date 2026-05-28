/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile } from "../types";
import { Lock, Mail, Sparkles, User, ShieldCheck } from "lucide-react";
import { authApi } from "../services/api";

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
  onCancel?: () => void;
}

export default function LoginScreen({ onLogin, onCancel }: LoginScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      setError("Please enter the required account details.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const user = mode === "register"
        ? await authApi.register(name, email, password)
        : await authApi.login(email, password);
      onLogin(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to access the sizing cabin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen flex items-center justify-center py-16 px-4 font-sans text-neutral-900" id="login-screen-root">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-[#eae6df] rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8 relative z-10" id="login-container">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <img
            src="/darzi-name-logo.png"
            alt="Darzi"
            className="h-20 w-auto object-contain mx-auto"
          />
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#c5a880] uppercase">
            Sizing Cabin
          </p>
          <div className="w-8 h-0.5 bg-[#c5a880] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-1 text-center">
          <h2 className="font-serif text-xl text-neutral-950 font-medium">Atelier Cabin Login</h2>
          <p className="text-xs text-stone-400">Unlock your digital measurement wardrobe and draft custom orders.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-mono border border-red-100 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 bg-stone-50 p-1 rounded-2xl border border-stone-150">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest ${mode === "login" ? "bg-neutral-950 text-white" : "text-stone-500"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest ${mode === "register" ? "bg-neutral-950 text-white" : "text-stone-500"}`}
          >
            Register
          </button>
        </div>

        {/* Custom manual login form */}
        <form onSubmit={handleCustomLogin} className="space-y-4" id="custom-login-form">
          {mode === "register" && <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500">Your Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-300 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sanjana Sen"
                className="w-full bg-stone-50/50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs font-sans text-neutral-950 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>}

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500">Bespoke Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-300 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sanjana.sen@corp.in"
                className="w-full bg-stone-50/50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs font-sans text-neutral-950 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500">Cabinet Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-300 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50/50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs font-sans text-neutral-950 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-950 text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-stone-900 transition-colors cursor-pointer font-bold flex items-center justify-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{isSubmitting ? "Connecting..." : mode === "register" ? "Create Account" : "Login"}</span>
          </button>
        </form>

        {onCancel && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-[10px] font-mono text-stone-400 hover:text-neutral-900 uppercase tracking-widest underline"
            >
              Continue shopping as guest
            </button>
          </div>
        )}

        <div className="flex justify-center items-center gap-1.5 text-[10px] font-mono text-stone-400 border-t border-stone-100 pt-5 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Double Stitch secure Sizing Cabin encryption active</span>
        </div>

      </div>
    </div>
  );
}
