/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile } from "../types";
import { Lock, Mail, Sparkles, User, ShieldCheck } from "lucide-react";

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
  onCancel?: () => void;
}

export default function LoginScreen({ onLogin, onCancel }: LoginScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setError("Please fill in both name and corporate email.");
      return;
    }
    setError("");
    onLogin({
      name: name.trim(),
      email: email.trim(),
      role: email.toLowerCase().includes("admin") ? "admin" : "user",
      company: "Atelier Premium Member",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    });
  };

  const PRESET_USERS: { name: string; email: string; role: "user" | "admin"; avatar: string; company: string; label: string }[] = [
    {
      name: "Sanjana Sen",
      email: "sanjana.sen@corp.in",
      role: "user",
      company: "ConsultPro",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      label: "Customer Profile (Active)"
    },
    {
      name: "Master Ramesh",
      email: "ramesh.operator@darzi.in",
      role: "admin",
      company: "Atelier Mumbai Master Tailor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      label: "Workshop Operator (Admin)"
    }
  ];

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

        {/* Demo profiles toggle */}
        <div className="space-y-3" id="quick-login-profiles">
          <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest text-center">
            Quick-switch demo credentials
          </span>
          <div className="grid grid-cols-2 gap-3.5">
            {PRESET_USERS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => onLogin({
                  name: u.name,
                  email: u.email,
                  role: u.role,
                  company: u.company,
                  avatarUrl: u.avatar
                })}
                className="flex flex-col items-center p-3.5 rounded-2xl bg-stone-50 hover:bg-[#c5a880]/10 border border-stone-150 transition-all text-center group cursor-pointer text-xs"
              >
                <div className="w-10 h-10 rounded-full border border-stone-200 overflow-hidden mb-2">
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                </div>
                <strong className="text-neutral-950 block">{u.name}</strong>
                <span className="text-[9px] font-mono text-[#c5a880] uppercase tracking-wider block mt-0.5">{u.role === "admin" ? "Admins View" : "Buyer Profile"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-stone-100"></div>
          <span className="flex-shrink mx-4 text-[9px] font-mono text-stone-300 uppercase">OR CUSTOM SIGN UP</span>
          <div className="flex-grow border-t border-stone-100"></div>
        </div>

        {/* Custom manual login form */}
        <form onSubmit={handleCustomLogin} className="space-y-4" id="custom-login-form">
          <div className="space-y-1.5">
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
          </div>

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
            <label className="block text-[10px] font-mono uppercase text-stone-500">Cabinet Passcode (Optional)</label>
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
            className="w-full bg-neutral-950 text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-stone-900 transition-colors cursor-pointer font-bold flex items-center justify-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Calibrate Custom Account</span>
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
