/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BodyMeasurements, Order, MOCK_FABRICS, Fabric, UserProfile, RelativeSizeCard } from "../types";
import { User, Ruler, RefreshCw, Star, Heart, FileText, ClipboardList, PenTool, Sparkles, Users } from "lucide-react";
import React, { useState } from "react";

interface UserDashboardProps {
  currentUser: UserProfile | null;
  onLogout: () => void;
  userMeasurements: BodyMeasurements;
  onEditMeasurements: () => void;
  previousOrders: Order[];
  onReorder: (order: Order) => void;
  savedFabrics: string[]; // fabric IDs
  onTriggerAlteration: (orderId: string, notes: string) => void;
  relativeSizeCards: RelativeSizeCard[];
  onSaveRelativeCards: (updated: RelativeSizeCard[]) => void;
}

export default function UserDashboard({
  currentUser,
  onLogout,
  userMeasurements,
  onEditMeasurements,
  previousOrders,
  onReorder,
  savedFabrics,
  onTriggerAlteration,
  relativeSizeCards,
  onSaveRelativeCards
}: UserDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"profile" | "orders" | "fabrics" | "alterations">("profile");
  const [altNotes, setAltNotes] = useState<string>("");
  const [selectedAltOrder, setSelectedAltOrder] = useState<string>("");
  const [alterationSuccess, setAlterationSuccess] = useState<boolean>(false);

  // Modal forms states for adding relatives size cards
  const [isEditingRelative, setIsEditingRelative] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<RelativeSizeCard | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newRelation, setNewRelation] = useState<string>("Sister");
  const [newHeight, setNewHeight] = useState<number>(160);
  const [newWeight, setNewWeight] = useState<number>(55);
  const [newShoulder, setNewShoulder] = useState<number>(14.5);
  const [newBust, setNewBust] = useState<number>(34.0);
  const [newWaist, setNewWaist] = useState<number>(28.0);
  const [newHip, setNewHip] = useState<number>(36.0);
  const [newInseam, setNewInseam] = useState<number>(28.0);
  const [newBodyType, setNewBodyType] = useState<string>("Hourglass");

  // Favorite Fabrics mapping
  const favoriteWeavesList = MOCK_FABRICS.filter((f) => 
    savedFabrics.includes(f.id) || f.id === "f-crepe" || f.id === "f-silk"
  );

  const handleCreateAlterationTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAltOrder || !altNotes.trim()) {
      alert("Please select an active order ID and explain where it pulls or pinches.");
      return;
    }
    onTriggerAlteration(selectedAltOrder, altNotes);
    setAlterationSuccess(true);
    setAltNotes("");
    setTimeout(() => {
      setAlterationSuccess(false);
    }, 6000);
  };

  const handleSaveRelativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Please specify a name.");
      return;
    }

    const calculatePredictedSize = (b: number): string => {
      if (b <= 32) return "DRZ 32-T (S / Small)";
      if (b <= 35) return "DRZ 34-T (M / Medium)";
      if (b <= 38) return "DRZ 36-T (M / Medium Standard)";
      if (b <= 41) return "DRZ 38-T (L / Large)";
      return "DRZ 40-T (XL / Extra Large)";
    };

    const calculateConfidence = (): number => {
      let score = 98;
      if (newHeight < 145 || newHeight > 185) score -= 4;
      if (newWeight < 45 || newWeight > 95) score -= 4;
      return Math.max(90, score);
    };

    const newSizeCard: RelativeSizeCard = {
      id: editingCard?.id || `rel-${Date.now()}`,
      name: newName.trim(),
      relationship: newRelation,
      measurements: {
        height: newHeight,
        weight: newWeight,
        bodyType: newBodyType as any,
        shoulder: newShoulder,
        bust: newBust,
        waist: newWaist,
        hip: newHip,
        inseam: newInseam
      },
      aiRecommendation: {
        predictedSize: calculatePredictedSize(newBust),
        fitConfidence: calculateConfidence(),
        bodyShapeAnalysis: `${newBodyType} Proportion model calibrated. Tailoring margins adjusted to ensure exquisite seam line flow suited for corporate presentation sessions.`,
        recommendedFitType: "Tailored Comfort",
        suggestedAdjustments: {
          bust: "Comfortable lapel alignment",
          waist: "Fitted waist silhouette",
          hip: "Regular movement ease width",
          shoulder: "Zero shoulder droop, targeted alignment"
        }
      }
    };

    let updatedList;
    if (editingCard) {
      updatedList = relativeSizeCards.map((c) => c.id === editingCard.id ? newSizeCard : c);
    } else {
      updatedList = [...relativeSizeCards, newSizeCard];
    }

    onSaveRelativeCards(updatedList);
    setIsEditingRelative(false);
    setEditingCard(null);
  };

  // Dynamic AI TrueFit calculation for primary user profile
  const getPrimaryAIRecommendation = () => {
    const b = userMeasurements.bust;
    let size = "DRZ 34-T (M / Medium)";
    if (b <= 32) size = "DRZ 32-T (S / Small)";
    else if (b <= 35) size = "DRZ 34-T (M / Medium)";
    else if (b <= 38) size = "DRZ 36-T (M / Medium Standard)";
    else if (b <= 41) size = "DRZ 38-T (L / Large)";
    else size = "DRZ 40-T (XL / Extra Large)";

    const h = userMeasurements.height;
    const w = userMeasurements.weight;
    let score = 98;
    if (h < 145 || h > 185) score -= 4;
    if (w < 45 || w > 95) score -= 4;
    const confidence = Math.max(90, score);

    return {
      predictedSize: size,
      fitConfidence: confidence,
      bodyShapeAnalysis: "Your physical proportions showcase high hourglass symmetry. Pattern drafts incorporate standard contoured arm-hole ease and precision waist adjustments to guarantee zero pulling forces, ensuring optimal posture support during professional screen hours."
    };
  };

  const primaryAIRecommendation = getPrimaryAIRecommendation();

  // Profile data defaults fallback
  const userDispName = currentUser ? currentUser.name : "Sanjana Sen";
  const userDispEmail = currentUser ? currentUser.email : "sanjana.sen@corp.in";
  const userDispCompany = currentUser ? currentUser.company || "ConsultPro" : "ConsultPro";
  const userDispAvatar = currentUser ? currentUser.avatarUrl : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";

  return (
    <div className="bg-white min-h-screen py-12 text-neutral-900 font-sans" id="dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Intro header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-100 pb-8 mb-8" id="profile-greet-banner">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-200 overflow-hidden flex items-center justify-center">
              <img
                src={userDispAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"}
                alt="Profile Pic"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880]">Executive Wardrobe Profile</span>
              <h1 className="font-serif text-3xl font-semibold">{userDispName}</h1>
              <p className="text-stone-400 text-xs mt-0.5">{userDispEmail} • {userDispCompany} • Member since May 2026</p>
            </div>
          </div>


          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={onEditMeasurements}
              className="border border-stone-250 hover:bg-stone-50 text-neutral-950 font-mono text-xs uppercase tracking-widest py-3.5 px-6 rounded-full transition-colors cursor-pointer"
              id="dashboard-header-edit-btn"
            >
              Recalibrate Profile Dimensions
            </button>
          </div>
        </div>

        {/* Dashboard inner navigation */}
        <div className="flex border-b border-stone-150 gap-4 mb-8 pb-1 scroll-smooth overflow-x-auto hide-scrollbar" id="dashboard-subtabs-row">
          <button
            onClick={() => setActiveSubTab("profile")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer min-w-max ${
              activeSubTab === "profile" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
            id="subtab-fit-profiles-trigger"
          >
            Fit Profiles ({1 + relativeSizeCards.length})
            {activeSubTab === "profile" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>
          
          <button
            onClick={() => setActiveSubTab("orders")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer min-w-max ${
              activeSubTab === "orders" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Draft Orders ({previousOrders.length})
            {activeSubTab === "orders" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>

          <button
            onClick={() => setActiveSubTab("fabrics")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer min-w-max ${
              activeSubTab === "fabrics" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Favorite Weaves ({favoriteWeavesList.length})
            {activeSubTab === "fabrics" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>

          <button
            onClick={() => setActiveSubTab("alterations")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer min-w-max ${
              activeSubTab === "alterations" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Alterations Console
            {activeSubTab === "alterations" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>
        </div>


        {/* TAB CONTENTS */}
        
        {/* SUBTAB 1: FIT PROFILES */}
        {activeSubTab === "profile" && (
          <div className="space-y-8 animate-fade-in" id="dashboard-tab-fit-profiles">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-100 pb-5 gap-4">
              <div>
                <h3 className="font-serif text-lg text-neutral-950 italic">Atelier Fit Profiles</h3>
                <p className="text-xs text-stone-400 mt-0.5">Manage fit blueprints for yourself and your relatives to easily switch sizing during bespoke commissions.</p>
              </div>
              <button
                onClick={() => {
                  setEditingCard(null);
                  setNewName("");
                  setNewRelation("Sister");
                  setNewHeight(160);
                  setNewWeight(55);
                  setNewShoulder(14.5);
                  setNewBust(34.0);
                  setNewWaist(28.0);
                  setNewHip(36.0);
                  setNewInseam(28.0);
                  setNewBodyType("Hourglass");
                  setIsEditingRelative(true);
                }}
                className="bg-neutral-950 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-5 rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center space-x-1.5 cursor-pointer font-bold"
              >
                <span>+ Add Relative Fit Card</span>
              </button>
            </div>

            {/* Grid of All Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="fit-profiles-cards-grid">
              
              {/* Card 1: Primary Profile (You) */}
              <div className="bg-white rounded-3xl border-2 border-[#c5a880] p-6 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between animate-fade-in" id="relative-card-user">
                <div className="space-y-5">
                  
                  {/* Card Title Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono uppercase bg-[#c5a880]/20 text-[#c5a880] font-bold px-2.5 py-0.5 rounded-full block w-max">
                        Primary Profile
                      </span>
                      <h4 className="font-serif text-lg font-bold text-neutral-900 mt-2">{userDispName}</h4>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">Connected User Account</p>
                    </div>

                    <button
                      onClick={onEditMeasurements}
                      className="bg-neutral-950 text-white hover:bg-neutral-800 font-mono text-[10px] uppercase px-4 py-2 rounded-xl transition-colors font-bold cursor-pointer"
                    >
                      Recalibrate
                    </button>
                  </div>

                  {/* Dimensions Details */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Height</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.height}cm</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Weight</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.weight}kg</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Shoulder</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.shoulder}"</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Bust</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.bust}"</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Waist</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.waist}"</span>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                      <span className="text-[8px] text-stone-400 block uppercase">Hips</span>
                      <span className="text-neutral-950 font-bold text-xs">{userMeasurements.hip}"</span>
                    </div>
                  </div>

                  {/* AI Recommendation specs card */}
                  <div className="bg-neutral-950 text-white p-5 rounded-2xl border border-neutral-800 space-y-3 relative overflow-hidden" id="user-fit-recommender-inline">
                    <div className="flex items-center space-x-2 text-[#c5a880] border-b border-neutral-800 pb-2">
                      <Sparkles className="w-4 h-4 text-[#c5a880]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">AI TrueFit Specifications</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-stone-400 font-mono text-[9px] uppercase">Recommended Blueprint</span>
                        <strong className="text-white font-mono">{primaryAIRecommendation.predictedSize}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1.5">
                        <span className="text-stone-400 font-mono text-[9px] uppercase">Fit Confidence</span>
                        <strong className="text-emerald-400 font-mono">{primaryAIRecommendation.fitConfidence}% Match</strong>
                      </div>
                      <p className="text-[11px] text-stone-300 italic pt-2 leading-relaxed">
                        "{primaryAIRecommendation.bodyShapeAnalysis}"
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Relative cards */}
              {relativeSizeCards.map((card) => (
                <div key={card.id} className="bg-white rounded-3xl border border-[#eae6df] p-6 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between animate-fade-in" id={`relative-card-${card.id}`}>
                  <div className="space-y-5">
                    
                    {/* Header line */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono uppercase bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full block w-max">
                          {card.relationship}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-neutral-900 mt-2">{card.name}</h4>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">Secondary Sizing card</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCard(card);
                            setNewName(card.name);
                            setNewRelation(card.relationship);
                            setNewHeight(card.measurements.height);
                            setNewWeight(card.measurements.weight);
                            setNewShoulder(card.measurements.shoulder);
                            setNewBust(card.measurements.bust);
                            setNewWaist(card.measurements.waist);
                            setNewHip(card.measurements.hip);
                            setNewInseam(card.measurements.inseam);
                            setNewBodyType(card.measurements.bodyType || "Hourglass");
                            setIsEditingRelative(true);
                          }}
                          className="bg-stone-50 hover:bg-[#c5a880]/10 text-stone-600 px-3 py-1.5 rounded-lg border border-stone-200 text-[10px] font-mono uppercase transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove ${card.name}'s sizing profile?`)) {
                              onSaveRelativeCards(relativeSizeCards.filter(c => c.id !== card.id));
                            }
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg border border-red-150 text-[10px] font-mono uppercase transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Dimensions details */}
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Height</span>
                        <span className="text-neutral-900 font-bold text-xs">{card.measurements.height}cm</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Weight</span>
                        <span className="text-neutral-950 font-bold text-xs">{card.measurements.weight}kg</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Shoulder</span>
                        <span className="text-neutral-950 font-bold text-xs">{card.measurements.shoulder}"</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Bust</span>
                        <span className="text-neutral-950 font-bold text-xs">{card.measurements.bust}"</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Waist</span>
                        <span className="text-neutral-950 font-bold text-xs">{card.measurements.waist}"</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 p-2 rounded-xl">
                        <span className="text-[8px] text-stone-400 block uppercase">Hips</span>
                        <span className="text-neutral-950 font-bold text-xs">{card.measurements.hip}"</span>
                      </div>
                    </div>

                    {/* AI Recommendation description box */}
                    <div className="bg-stone-50 border border-stone-150 p-5 rounded-2xl flex gap-2 items-start text-xs font-sans">
                      <Sparkles className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-neutral-900 font-medium">Darzi TrueFit recommendation</strong>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold">
                            {card.aiRecommendation.predictedSize} • {card.aiRecommendation.fitConfidence}% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 italic mt-1.5 leading-relaxed">
                          "{card.aiRecommendation.bodyShapeAnalysis || 'No analysis calibrated'}"
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* SUBTAB 2: ORDER HISTORIES */}
        {activeSubTab === "orders" && (
          <div className="space-y-6 animate-fade-in" id="dashboard-tab-orders">
            <h3 className="font-serif text-lg text-neutral-950 italic border-b border-stone-100 pb-3">Drafting & Order Archive</h3>
            
            {previousOrders.length === 0 ? (
              <div className="text-center py-16 bg-stone-50 border border-dashed border-stone-200 rounded-3xl" id="orders-empty-card">
                <ClipboardList className="w-8 h-8 text-stone-300 mx-auto" />
                <h4 className="text-sm font-semibold mt-4 text-stone-900">Your wardrobe is empty</h4>
                <p className="text-xs text-stone-400 mt-2">Select a silhouette, select gorgeous locally-milled weaves and order your bespoke draft.</p>
              </div>
            ) : (
              <div className="space-y-6" id="dashboard-orders-track">
                {previousOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl border border-stone-150 overflow-hidden" id={`order-track-card-${order.id}`}>
                    
                    {/* Order top line banner */}
                    <div className="bg-stone-50 px-6 py-4 border-b border-stone-150 flex flex-col sm:flex-row justify-between sm:items-center text-xs font-mono text-stone-600 gap-2">
                      <div className="flex flex-wrap gap-4 sm:gap-6">
                        <div>
                          <span className="text-stone-400">ORDER GAUGE:</span>
                          <span className="text-[#c5a880] ml-1 font-bold">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-stone-400">DATE PLACED:</span>
                          <span className="text-stone-900 ml-1 font-bold">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-stone-400">TOTAL COST:</span>
                          <span className="text-stone-900 ml-1 font-bold">₹{(order.items[0]?.price || 8500).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-800 font-bold uppercase tracking-wider">{order.status}</span>
                      </div>
                    </div>

                    {/* Order content body */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 flex gap-4">
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                          <img
                            src={order.items[0]?.product.imageUrl}
                            alt="Order Apparel Item"
                            className="w-full h-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">BESPOKE BLUEPRINT</span>
                          <h4 className="text-sm font-semibold text-neutral-950 mt-1">{order.items[0]?.product.name}</h4>
                          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                            Bespoke cut using <strong>{order.items[0] ? order.items[0].selectedFabric.name : "Tri-Acetate Stretch Crepe"}</strong> weave fabric in {order.items[0] ? order.items[0].selectedColor.name : "Executive Charcoal"}. Includes monogram specifications and lapel collar details.
                          </p>
                        </div>
                      </div>

                      {/* Order status tracking sliders info */}
                      <div className="md:col-span-4 flex flex-col gap-3 justify-end sm:items-end">
                        <button
                          onClick={() => onReorder(order)}
                          className="bg-neutral-950 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-5 rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 w-full md:w-auto cursor-pointer font-bold"
                          id={`btn-reorder-${order.id}`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>REORDER Bespoke FIT</span>
                        </button>
                        
                        <span className="text-[10px] font-mono text-stone-400">Assigned Tailor: <strong>{order.tailorAssigned || "Master Ramesh"}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: FAVOURITE WEAVES */}
        {activeSubTab === "fabrics" && (
          <div className="space-y-6 animate-fade-in" id="dashboard-tab-fabrics">
            <h3 className="font-serif text-lg text-neutral-950 italic border-b border-stone-100 pb-3">Saved Specialty India Textiles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="favorite-fabrics-grid">
              {favoriteWeavesList.map((fab) => (
                <div key={fab.id} className="bg-stone-50 p-6 rounded-3xl border border-stone-150 flex flex-col justify-between" id={`saved-weave-${fab.id}`}>
                  <div>
                    <div className="flex justify-between items-center">
                      <span 
                        className="w-5 h-5 rounded-full border border-stone-300" 
                        style={{ backgroundColor: fab.colorHex }} 
                      />
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-neutral-950 mt-4">{fab.name}</h4>
                    <p className="text-[11px] font-mono text-stone-500 mt-0.5">{fab.type}</p>
                    <p className="text-stone-600 text-[11px] leading-relaxed mt-3 font-sans">{fab.desc}</p>
                  </div>

                  <div className="border-t border-stone-200 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono" id={`saved-weave-footer-${fab.id}`}>
                    <span className="text-stone-400">ORIG: {fab.origin}</span>
                    <span className="text-neutral-900 font-bold">₹{fab.pricePerMeter}/m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 4: ALTERATIONS CENTER */}
        {activeSubTab === "alterations" && (
          <div className="space-y-6 animate-fade-in" id="dashboard-tab-alterations">
            <h3 className="font-serif text-lg text-neutral-950 italic border-b border-stone-100 pb-3">Bespoke Alteration Concierge</h3>
            
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
              Our triple-secured drapes guarantee zero structural failure. However, should your physical contours adapt over time, we collect and re-stitch your garments free of charge. Simply draft an alteration note below to launch your concierge ticket.
            </p>

            {/* Success feedback */}
            {alterationSuccess && (
              <div className="bg-emerald-50 text-emerald-800 border-2 border-emerald-100 p-5 rounded-2xl text-xs font-mono" id="alt-success-alert">
                ✓ Alteration Concierge Ticket successfully launched! BlueDart has been scheduled to collect your garment from Embassy Koramangala tomorrow for reassessment.
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2" id="alteration-form-row">
              
              {/* Alteration Form */}
              <div className="lg:col-span-7 bg-stone-50 p-6 rounded-3xl border border-stone-150" id="alt-form-card">
                <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400">Launch alter query</span>
                
                <form onSubmit={handleCreateAlterationTicket} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-2">Select apparel to adjust</label>
                    <select
                      value={selectedAltOrder}
                      onChange={(e) => setSelectedAltOrder(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#c5a880]"
                      required
                    >
                      <option value="">-- Choose active custom order --</option>
                      {previousOrders.map((o) => (
                        <option key={o.id} value={o.id}>
                          Order {o.id} - {o.items[0]?.product.name} ({o.date})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-500 mb-2">What requires recalibration?</label>
                    <textarea
                      placeholder="e.g. The waistline drapes perfectly but the blazer bust pulls slightly when typing over long hours. Request adding 0.5 inches margin on back seam."
                      value={altNotes}
                      onChange={(e) => setAltNotes(e.target.value)}
                      rows={4}
                      className="w-full bg-white border border-stone-200 rounded-xl p-4 text-xs font-sans text-stone-700 focus:outline-none focus:border-[#c5a880] leading-relaxed"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-neutral-950 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl hover:bg-neutral-850 transition-colors cursor-pointer w-full font-bold"
                  >
                    Submit Alteration concierge request
                  </button>
                </form>
              </div>

              {/* Alteration History tickets */}
              <div className="lg:col-span-5 bg-stone-50 p-6 rounded-3xl border border-stone-150 space-y-4" id="alt-history-tickets">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#c5a880]">Active Concierge Tickets ({previousOrders.filter(o => o.alterationHistory && o.alterationHistory.length > 0).length})</span>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#c5a880] font-bold">TICKET #AL-4592</span>
                      <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[8px] uppercase">Rework complete</span>
                    </div>
                    <p className="text-stone-600 font-sans leading-relaxed text-[10px]">
                      "Waist stretch ease recalibrated to +0.5” for Shiva Trousers. Dispatched via BlueDart today."
                    </p>
                    <span className="text-[8px] text-stone-400 block pt-1">Resolved on May 21st, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL OVERLAY: ADD/EDIT RELATIVE SIZING BLUEPRINT */}
      {isEditingRelative && (
        <div className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" id="relative-modal-overlay">
          <div className="bg-white rounded-[2rem] border border-[#eae6df] shadow-25 w-full max-w-2xl overflow-hidden my-8 animate-fade-in" id="relative-modal-container">
            
            {/* Modal Header */}
            <div className="bg-stone-50 px-6 py-5 border-b border-[#eae6df] flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880]">Atelier Measurement Form</span>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  {editingCard ? `Edit ${newName}'s Size Card` : "Create Sizing Card Blueprint"}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsEditingRelative(false);
                  setEditingCard(null);
                }}
                className="text-stone-400 hover:text-neutral-900 text-xs font-mono"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Modal Form body with sliders */}
            <form onSubmit={handleSaveRelativeSubmit} className="p-6 md:p-8 space-y-6">
              
              {/* Top Details row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1.5">Relative's Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Maya Sen"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl px-3 py-2 text-xs font-sans text-neutral-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1.5">Relationship</label>
                  <select
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Mother">Mother</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                    <option value="Other">Other Profile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1.5">Body Silhouette</label>
                  <select
                    value={newBodyType}
                    onChange={(e) => setNewBodyType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#c5a880] focus:bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Hourglass">Hourglass Silhouette</option>
                    <option value="Pear">Pear Silhouette</option>
                    <option value="Rectangle">Rectangle / Athletic</option>
                    <option value="Inverted Triangle">Inverted Triangle</option>
                    <option value="Apple">Apple Silhouette</option>
                  </select>
                </div>
              </div>

              {/* Sliders Grid Section */}
              <div className="border-t border-stone-100 pt-6">
                <span className="block text-[10px] font-mono text-[#c5a880] uppercase tracking-widest mb-4">Precision calibration controls</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {/* Height */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Height (cm)</span>
                      <strong className="text-neutral-950 font-bold">{newHeight} cm</strong>
                    </div>
                    <input
                      type="range"
                      min="140"
                      max="195"
                      value={newHeight}
                      onChange={(e) => setNewHeight(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Weight (kg)</span>
                      <strong className="text-neutral-950 font-bold">{newWeight} kg</strong>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="110"
                      value={newWeight}
                      onChange={(e) => setNewWeight(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Shoulder */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Shoulder width (inches)</span>
                      <strong className="text-neutral-950 font-bold">{newShoulder}"</strong>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="19"
                      step="0.25"
                      value={newShoulder}
                      onChange={(e) => setNewShoulder(parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Bust */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Bust contour (inches)</span>
                      <strong className="text-neutral-950 font-bold">{newBust}"</strong>
                    </div>
                    <input
                      type="range"
                      min="28"
                      max="48"
                      step="0.5"
                      value={newBust}
                      onChange={(e) => setNewBust(parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Waist */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Natural waist (inches)</span>
                      <strong className="text-neutral-950 font-bold">{newWaist}"</strong>
                    </div>
                    <input
                      type="range"
                      min="22"
                      max="44"
                      step="0.5"
                      value={newWaist}
                      onChange={(e) => setNewWaist(parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Hip */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Hips contour (inches)</span>
                      <strong className="text-neutral-950 font-bold">{newHip}"</strong>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="52"
                      step="0.5"
                      value={newHip}
                      onChange={(e) => setNewHip(parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>

                  {/* Inseam */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-stone-600">
                      <span>Leg Inseam length (inches)</span>
                      <strong className="text-neutral-950 font-bold">{newInseam}"</strong>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="34"
                      step="0.5"
                      value={newInseam}
                      onChange={(e) => setNewInseam(parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Real-time calculated predicted size preview */}
              <div className="bg-stone-50 border border-stone-150 p-4 rounded-2xl flex items-center justify-between font-mono text-[11px]">
                <div>
                  <span className="text-stone-400 block uppercase">Algorithmic TrueFit prediction</span>
                  <span className="text-neutral-950 font-bold mt-0.5 block">
                    Estimated Model: {(newBust <= 32) ? "DRZ 32-T (S / Small)" : (newBust <= 35) ? "DRZ 34-T (M / Medium)" : (newBust <= 38) ? "DRZ 36-T (M / Medium Standard)" : (newBust <= 41) ? "DRZ 38-T (L / Large)" : "DRZ 40-T (XL / Extra Large)"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block uppercase">Confidence margin</span>
                  <span className="text-emerald-600 font-bold mt-0.5 block">98% Accuracy score</span>
                </div>
              </div>

              {/* Buttons footer */}
              <div className="flex gap-3 justify-end pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingRelative(false);
                    setEditingCard(null);
                  }}
                  className="px-5 py-3 rounded-full border border-stone-200 text-stone-600 text-xs font-mono uppercase hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-neutral-950 text-white hover:bg-stone-900 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-bold flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a880] mr-1" />
                  <span>Save sizing blueprint</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

