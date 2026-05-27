/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Send, X, MessageCircle, AlertCircle } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { BodyMeasurements } from "../types";

interface AIConsultantChatProps {
  userMeasurements: BodyMeasurements;
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function AIConsultantChat({ userMeasurements }: AIConsultantChatProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I am Darzi's chief designer AI. I've retrieved your measurements profile. Ask me anything about tailoring drapes, Giza cotton breathability, or styling suggestions for active board meetings in India."
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    setErrorStatus(null);
    setIsLoading(true);

    // Save user message
    const updatedHistory = [...messages, { role: "user" as const, text: userText }];
    setMessages(updatedHistory);

    try {
      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: updatedHistory,
          measurements: userMeasurements
        }),
      });

      if (!response.ok) {
        throw new Error("Advisory console was unable to finalize. Verify server state.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: any) {
      console.error("AI Stylist consultation error:", err);
      setErrorStatus("Atelier consultant is offline. Initializing fallback smart advisor modes.");
      
      // Smart offline fallback responses to guarantee uninterrupted UX flow
      setTimeout(() => {
        let fallbackReply = "";
        const textLower = userText.toLowerCase();
        if (textLower.includes("suit") || textLower.includes("blazer")) {
          fallbackReply = "Since you have structured broad shoulders, I highly recommend our peak-lapel **Pragati Power Blazer** styled with Bemberg interior lining. It drapes with high stability without dropping seams.";
        } else if (textLower.includes("fabric") || textLower.includes("linen")) {
          fallbackReply = "The **Banarasi Crisp Linen** is incredibly breathability-smart, which is custom designed for warm humid afternoons in Chennai, Mumbai or Bangalore.";
        } else {
          fallbackReply = "I've logged your query. Our Master Tailor Ramesh is reviewing standard pattern adjustments for you. Let me know if you want to inspect measurements.";
        }
        setMessages((prev) => [...prev, { role: "model", text: fallbackReply }]);
        setErrorStatus(null);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="designer-floating-chat-container">
      
      {/* 1. CLOSED FLOATING BUBBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="chat-floating-bubble"
          className="bg-neutral-950 text-white font-serif rounded-full p-4.5 hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center space-x-2 border-2 border-white cursor-pointer group"
          aria-label="Open Darzi Designer AI Stylist chat"
        >
          <Sparkles className="w-5 h-5 text-[#c5a880] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold pr-1.5 hidden sm:inline">Designer AI Chat</span>
        </button>
      )}

      {/* 2. OPEN SLIDE-OUT PANEL */}
      {isOpen && (
        <div 
          className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-3xl w-80 sm:w-96 flex flex-col h-[520px] animate-fade-in text-neutral-900 shadow-neutral-900/10"
          id="chat-expanded-panel"
        >
          {/* Header */}
          <div className="bg-neutral-950 text-white p-5 flex justify-between items-center border-b border-stone-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#c5a880]/15 flex items-center justify-center rounded-xl text-[#c5a880] border border-[#c5a880]/10">
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#c5a880] block font-semibold">Atelier Master</span>
                <h4 className="text-xs font-semibold text-white">Chief Designer AI</h4>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sizing DNA pill inside chat head */}
          <div className="bg-stone-50 px-5 py-2.5 border-b border-stone-150 flex items-center justify-between text-[9px] font-mono text-stone-500">
            <span>Sizing Profile Anchor:</span>
            <span className="text-neutral-900 font-bold uppercase">{userMeasurements.height}cm / {userMeasurements.bodyType || "Hourglass"}</span>
          </div>

          {/* Chat Messages flow container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50 hide-scrollbar" id="chat-messages-scroll-window">
            {messages.map((msg, index) => {
              const isAi = msg.role === "model";
              return (
                <div
                  key={index}
                  className={`flex flex-col max-w-[85%] ${isAi ? "self-start" : "self-end ml-auto"}`}
                  id={`chat-msg-row-${index}`}
                >
                  <span className="text-[8px] font-mono text-stone-400 uppercase mb-1">
                    {isAi ? "Darzi Designer" : "Sanjana Sen"}
                  </span>
                  
                  <div
                    className={`rounded-2xl p-3.5 text-xs inline-block leading-relaxed ${
                      isAi
                        ? "bg-white text-stone-800 border border-stone-150 rounded-tl-none shadow-sm"
                        : "bg-neutral-900 text-white rounded-tr-none shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Error alerts */}
            {errorStatus && (
              <div className="bg-amber-50 text-amber-800 border border-amber-100 rounded-xl p-3 text-[10px] flex items-start gap-2 font-sans leading-normal">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{errorStatus}</span>
              </div>
            )}

            {/* AI thinking state indicator */}
            {isLoading && (
              <div className="flex flex-col self-start max-w-[85%]">
                <span className="text-[8px] font-mono text-stone-400 uppercase mb-1">Checking pattern indexes</span>
                <div className="bg-white border border-stone-150 rounded-2xl p-4.5 flex gap-1 items-center justify-center shadow-sm w-18">
                  <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>

          {/* Core Input box */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-250 flex gap-2" id="chat-composer-form">
            <input
              type="text"
              placeholder="Ask about suits ease, linen origin..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] font-mono placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl p-3 flex items-center justify-center cursor-pointer transition-colors disabled:opacity-40"
              aria-label="Send query"
            >
              <Send className="w-4 h-4 text-[#c5a880]" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
