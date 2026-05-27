/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Sparkles, User, Settings, Info, Compass, LogOut, LogIn } from "lucide-react";
import { UserProfile } from "../types";
import { useState } from "react";

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navigation({ 
  currentTab, 
  setCurrentTab, 
  cartCount, 
  openCart,
  currentUser,
  onLogout,
  onLoginClick
}: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const links = [
    { id: "landing", label: "Home", icon: Compass },
    { id: "products", label: "Collections", icon: ShoppingBag },
    ...(currentUser?.role !== "admin" ? [
      { id: "measurements", label: "Atelier Mode", icon: Sparkles }
    ] : []),
    ...(currentUser && currentUser.role !== "admin" ? [
      { id: "dashboard", label: "My Wardrobe", icon: User }
    ] : []),
    ...(currentUser?.role === "admin" ? [
      { id: "admin", label: "Workshop Ctrl", icon: Settings },
      { id: "blueprint", label: "Tech Blueprint", icon: Info }
    ] : [])
  ];


  return (
    <header className="sticky top-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#eae6df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab("landing")}
            className="flex items-center cursor-pointer group"
            id="nav-logo-btn"
          >
            <img
              src="/darzi-name-logo.png"
              alt="Darzi"
              className="h-14 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1" id="desktop-nav-links">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => setCurrentTab(link.id)}
                  className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-full flex items-center space-x-1.5 ${
                    isActive 
                      ? "text-neutral-900 font-medium " 
                      : "text-stone-500 hover:text-neutral-900 hover:bg-stone-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#c5a880]" : "text-stone-400"}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span 
                      className="absolute bottom-1 left-4 right-4 h-[1px] bg-[#c5a880]" 
                      id={`nav-active-bar-${link.id}`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center space-x-3" id="nav-actions-menu">
            {/* Tiny Sizing Badge Indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[10px] bg-[#faf9f6] px-2.5 py-1 rounded-full text-stone-600 border border-[#eae6df] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI TRUEFIT {currentUser?.role === "admin" ? "ADMIN" : "ACTIVE"}</span>
            </div>
 
            {/* Shopping Bag Icon with Active Counter */}
            <button
              onClick={openCart}
              id="shopping-bag-trigger"
              className="relative p-2.5 text-stone-700 hover:text-neutral-900 transition-colors rounded-full hover:bg-white group border border-[#eae6df]"
              aria-label="Cart Workspace"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login status */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-stone-50 border border-[#eae6df] transition-colors"
                  id="navbar-profile-trigger"
                >
                  <div className="w-8.5 h-8.5 rounded-full overflow-hidden border border-stone-200 bg-stone-100">
                    <img 
                      src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2.5 w-60 bg-white border border-[#eae6df] rounded-2xl shadow-xl py-3.5 z-50 text-xs font-sans animate-fade-in" id="navbar-profile-dropdown">
                    <div className="px-4 pb-3 mb-2 border-b border-stone-100">
                      <p className="font-semibold text-neutral-900 leading-none">{currentUser.name}</p>
                      <p className="text-[10px] text-stone-400 font-mono mt-1.5 truncate">{currentUser.email}</p>
                      <span className="inline-block bg-[#c5a880]/15 text-[#c5a880] text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full mt-2 font-bold">
                        {currentUser.role === "admin" ? "Tailor Master" : "Bespoke Advocate"}
                      </span>
                    </div>

                    {currentUser?.role !== "admin" && (
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setCurrentTab("dashboard");
                        }}
                        className="w-full text-left px-4 py-2.5 text-stone-700 hover:bg-stone-50 hover:text-neutral-950 transition-colors font-mono uppercase text-[10px] tracking-wider"
                      >
                        My Clothes Cabinet
                      </button>
                    )}

                    {currentUser.role === "admin" && (
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setCurrentTab("admin");
                        }}
                        className="w-full text-left px-4 py-2.5 text-stone-700 hover:bg-stone-50 hover:text-neutral-950 transition-colors font-mono uppercase text-[10px] tracking-wider"
                      >
                        Atelier Operator Ctrl
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors font-mono uppercase text-[10px] tracking-wider flex items-center space-x-1 border-t border-stone-100 mt-2 pt-2.5"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1" />
                      <span>Sign Out Atelier</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-neutral-950 text-white hover:bg-stone-900 border border-neutral-950 px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold transition-all inline-flex items-center space-x-1 cursor-pointer"
                id="navbar-login-btn"
              >
                <LogIn className="w-3 h-3 text-[#c5a880] mr-1" />
                <span>Log In</span>
              </button>
            )}
          </div>

        </div>
      </div>
      
      {/* Mobile Sub-Navigation Panel */}
      <div className="md:hidden flex justify-around items-center py-2 bg-stone-50/90 backdrop-blur-md border-t border-stone-100 overflow-x-auto hide-scrollbar scroll-smooth" id="mobile-nav-panel">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`flex flex-col items-center py-1 px-3 text-[10px] font-mono tracking-wider transition-colors min-w-[65px] ${
                isActive ? "text-neutral-900 font-semibold" : "text-stone-500"
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? "text-[#c5a880]" : "text-stone-400"}`} />
              <span className="scale-90">{link.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
