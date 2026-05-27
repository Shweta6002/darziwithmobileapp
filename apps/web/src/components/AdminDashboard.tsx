/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, MOCK_FABRICS, BodyMeasurements, Product } from "../types";
import { Settings, Users, Ruler, Star, RefreshCw, BarChart, TrendingUp, Cpu, Award, Plus, FolderPlus, Palette, Sliders, CheckCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface AdminDashboardProps {
  ordersList: Order[];
  products: Product[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onToggleStock: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
  onAssignTailor: (orderId: string, tailor: string) => void;
  onResolveAlteration: (orderId: string) => void;
}

export default function AdminDashboard({
  ordersList,
  products,
  onAddProduct,
  onRemoveProduct,
  onToggleStock,
  onUpdateOrderStatus,
  onAssignTailor,
  onResolveAlteration
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory" | "alterations" | "analytics" | "collections">("orders");
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Collections Creator Workspace states
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdTagline, setNewProdTagline] = useState("");
  const [newProdCat, setNewProdCat] = useState<Product["category"]>("Suits");
  const [newProdBasePrice, setNewProdBasePrice] = useState(7200);
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdDesignedFor, setNewProdDesignedFor] = useState("");
  const [newProdImageUrl, setNewProdImageUrl] = useState("");
  const [selectedFabricIds, setSelectedFabricIds] = useState<string[]>(["f-linen", "f-wool"]);
  const [prodColors, setProdColors] = useState<{ name: string; hex: string }[]>([
    { name: "Midnight Charcoal", hex: "#17181c" },
    { name: "Classic Slate", hex: "#4e5058" }
  ]);
  const [colorInputName, setColorInputName] = useState("");
  const [colorInputHex, setColorInputHex] = useState("#1f2022");

  const sampleImagesList = [
    {
      label: "Regal Charcoal Suit",
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600"
    },
    {
      label: "Classic Oxford Shirt",
      url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=600"
    },
    {
      label: "Contoured Shift Dress",
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600"
    },
    {
      label: "Royal Sherwani Jacket",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    },
    {
      label: "Linen Informal Blazer",
      url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdTagline.trim() || !newProdImageUrl.trim()) {
      alert("Please fill in basic fields (Name, Tagline, Image URL).");
      return;
    }

    const newProductObj: Product = {
      id: "p-" + Date.now(),
      name: newProdName,
      tagline: newProdTagline,
      category: newProdCat,
      basePrice: Number(newProdBasePrice) || 6800,
      rating: 5.0,
      reviewCount: 3,
      imageUrl: newProdImageUrl,
      detailImages: [newProdImageUrl],
      fabrics: selectedFabricIds,
      colors: prodColors.length > 0 ? prodColors : [{ name: "Carbon Tech", hex: "#1c1d1f" }],
      description: newProdDesc || "Meticulously balanced wardrobe silhouette customized to client measurement dimensions using modern contour blueprints.",
      specs: [
        "Proportional arm-hole arm comfort standard",
        "Laser-cut single layer stitch basted alignment",
        "Classic drape weight balance logic",
        "Double-lined durable internal lapel shield"
      ],
      defaultCustomization: {
        sleeveLength: "Full Sleeve",
        lapelStyle: (newProdCat === "Suits" || newProdCat === "Blazers") ? "Peak Lapel" : undefined,
        buttonStyle: "Single Breasted",
        liningMaterial: "Premium Bemberg",
        pocketStyle: "Classic Flap",
        monogramText: ""
      },
      designedFor: newProdDesignedFor || "Global Impact Boardroom"
    };

    onAddProduct(newProductObj);
    setIsAddingProduct(false);

    // Reset fields
    setNewProdName("");
    setNewProdTagline("");
    setNewProdCat("Suits");
    setNewProdBasePrice(7200);
    setNewProdDesc("");
    setNewProdDesignedFor("");
    setNewProdImageUrl("");
    setSelectedFabricIds(["f-linen", "f-wool"]);
    setProdColors([
      { name: "Midnight Charcoal", hex: "#17181c" },
      { name: "Classic Slate", hex: "#4e5058" }
    ]);
  };

  const handleAddColorToken = () => {
    if (!colorInputName.trim()) return;
    setProdColors([...prodColors, { name: colorInputName, hex: colorInputHex }]);
    setColorInputName("");
  };

  const tailors = [
    "Master Ramesh (Embroidery Veteran)",
    "Master Anita (Blazer Specialist)",
    "Master Yusuf (Trouser Pattern Guru)",
    "Master Fatima (Silk Drape Expert)"
  ];

  // Static Inventory levels
  const inventory = [
    { name: "Banarasi Crisp Linen", current: 180, total: 300, color: "#eae1d4", markup: 0 },
    { name: "Ultra-Light Merino Tweed", current: 40, total: 150, color: "#2b303a", markup: 120 },
    { name: "Mulberry Silk Cotton", current: 95, total: 200, color: "#e3c099", markup: 90 },
    { name: "Tri-Acetate Stretch Crepe", current: 220, total: 250, color: "#121212", markup: 40 },
    { name: "Handspun Khadi Denim", current: 130, total: 150, color: "#45556a", markup: 0 }
  ];

  return (
    <div className="bg-white min-h-screen py-12 text-neutral-900 font-sans" id="admin-dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with stats overview */}
        <div className="border-b border-stone-100 pb-8 mb-8" id="admin-header-panel">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880] mb-1 block">Atelier Workshop Console</span>
              <h1 className="font-serif text-3xl font-semibold">Delhi/Bangalore Atelier Hub</h1>
              <p className="text-stone-400 text-xs mt-0.5">Control room managing laser-cut workflows, master tailor queues, and live sizing calibrations.</p>
            </div>
            
            {/* Direct hub stats */}
            <div className="flex gap-4 mt-6 md:mt-0 font-mono text-[10px]" id="hub-quick-stats">
              <div className="bg-stone-50 p-4 border border-stone-150 rounded-xl">
                <span className="text-stone-400 block uppercase">Atelier Squeeze Queue</span>
                <strong className="text-xl font-bold font-mono text-neutral-950 block mt-0.5">{ordersList.length} Custom Patterns</strong>
              </div>
              <div className="bg-stone-50 p-4 border border-stone-150 rounded-xl">
                <span className="text-stone-400 block uppercase">Alteration Backfill</span>
                <strong className="text-xl font-bold font-mono text-amber-600 block mt-0.5">1 Active Ticket</strong>
              </div>
              <div className="bg-stone-50 p-4 border border-stone-150 rounded-xl">
                <span className="text-stone-400 block uppercase">Textile Roll Reserves</span>
                <strong className="text-xl font-bold font-mono text-emerald-600 block mt-0.5">665 m Left</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Tab Track */}
        <div className="flex border-b border-stone-150 gap-4 mb-8 pb-1" id="admin-tab-controls-row">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer ${
              activeTab === "orders" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Pattern Orders Lanes ({ordersList.length})
            {activeTab === "orders" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>
          
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer ${
              activeTab === "inventory" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Fabric Inventory Roll Gauge
            {activeTab === "inventory" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>

          <button
            onClick={() => setActiveTab("alterations")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer ${
              activeTab === "alterations" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Under Alteration Lanes
            {activeTab === "alterations" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer ${
              activeTab === "analytics" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
          >
            Sartorial Live Analytics
            {activeTab === "analytics" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>

          <button
            onClick={() => setActiveTab("collections")}
            className={`pb-3 font-mono text-xs uppercase tracking-widest relative cursor-pointer min-w-max ${
              activeTab === "collections" ? "text-neutral-900 font-semibold" : "text-stone-400 hover:text-neutral-950"
            }`}
            id="tab-admin-collections-trigger"
          >
            Collections Management ({products?.length || 0})
            {activeTab === "collections" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" />}
          </button>
        </div>


        {/* ACTIVE MAIN CONTENTS PANEL */}

        {/* 1. ORDER PIPELINE TABLE */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in" id="admin-tab-orders-panel">
            <h3 className="font-serif text-lg text-neutral-900 font-medium">Bespoke Laser Cut Queue</h3>
            
            {ordersList.length === 0 ? (
              <div className="text-center py-16 bg-stone-50 border border-stone-150 rounded-3xl" id="admin-orders-empty">
                <Cpu className="w-8 h-8 text-stone-300 mx-auto" />
                <h4 className="text-xs font-mono font-semibold text-stone-900 mt-4">Atelier queue is empty.</h4>
                <p className="text-xs text-stone-400 mt-1">Pending order drafting triggers from clients.</p>
              </div>
            ) : (
              <div className="border border-stone-150 rounded-3xl overflow-hidden shadow-sm" id="admin-orders-table-box">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-150 text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                      <th className="p-5">Order ID</th>
                      <th className="p-5">Client Profile</th>
                      <th className="p-5">Garment Blueprint Spec</th>
                      <th className="p-5">Atelier Seam Master Assigned</th>
                      <th className="p-5">Laser Pattern Stage</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {ordersList.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/50 transition-colors" id={`admin-row-order-${order.id}`}>
                        {/* ID */}
                        <td className="p-5 font-mono text-[#c5a880] font-bold">{order.id}</td>
                        {/* Customer Info */}
                        <td className="p-5">
                          <strong className="text-neutral-950 block">{order.customerName}</strong>
                          <span className="text-[10px] text-stone-400 block mt-0.5">{order.customerEmail}</span>
                          <span className="text-[9px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded block w-max mt-1">PIN: {order.shippingAddress.pincode}</span>
                        </td>
                        {/* Product and Fabrics */}
                        <td className="p-5 space-y-1">
                          <div className="font-semibold text-neutral-950">{order.items[0]?.product.name}</div>
                          <div className="text-[10px] text-stone-500 font-mono">
                            Weave: <strong>{order.items[0]?.selectedFabric.name}</strong> 
                          </div>
                          <div className="text-[10px] text-stone-400 uppercase font-mono tracking-widest leading-none">
                            Lining: {order.items[0]?.customizations.liningMaterial || "Premium Bemberg"} • Pocket: {order.items[0]?.customizations.pocketStyle}
                          </div>
                          {order.items[0]?.customizations.monogramText && (
                            <span className="inline-block bg-[#c5a880]/15 text-[#c5a880] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-1">
                              MONO: "{order.items[0].customizations.monogramText}"
                            </span>
                          )}
                        </td>
                        {/* Tailor Assign */}
                        <td className="p-5 font-mono">
                          <select
                            value={order.tailorAssigned || ""}
                            onChange={(e) => onAssignTailor(order.id, e.target.value)}
                            className="bg-white border border-stone-200 rounded-lg p-2 text-[11px] font-mono text-stone-700 focus:outline-none focus:border-[#c5a880]"
                          >
                            <option value="">-- Assign Master Tailor --</option>
                            {tailors.map((tailor) => (
                              <option key={tailor} value={tailor}>
                                {tailor}
                              </option>
                            ))}
                          </select>
                        </td>
                        {/* Order Phase */}
                        <td className="p-5">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className="bg-stone-50 border border-stone-200 rounded-lg p-2 text-[11px] text-neutral-900 font-mono focus:outline-none focus:border-[#c5a880]"
                          >
                            <option value="In Queue">In Queue / Laser prepping</option>
                            <option value="Pattern Drafted">Pattern Drafted</option>
                            <option value="Hand-Cut">Hand-Cut (Shearing Roll)</option>
                            <option value="Tailoring">Tailoring (Active Stitch)</option>
                            <option value="Quality Check">Quality Check (Double loop QC)</option>
                            <option value="Dispatched">Dispatched (BlueDart Courier)</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        {/* Action details panel */}
                        <td className="p-5 text-right">
                          <button
                            onClick={() => {
                              // Display diagnostic data summary overlay in browser
                              alert(`DIAGNOSTIC ANCHOR FOR ${order.customerName}:\nHeight: ${order.items[0]?.measurements.height}cm\nBust: ${order.items[0]?.measurements.bust}"\nWaist: ${order.items[0]?.measurements.waist}"\nHips: ${order.items[0]?.measurements.hip}"\nInseams: ${order.items[0]?.measurements.inseam}"`);
                            }}
                            className="bg-stone-50 border border-stone-200 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
                          >
                            Inspection Metric DNA
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 2. FABRIC ROLL METERS INVENTORY LEVELS */}
        {activeTab === "inventory" && (
          <div className="space-y-6 animate-fade-in" id="admin-tab-inventory-panel">
            <h3 className="font-serif text-lg text-neutral-900 font-medium">Loom Inventory & Textile Reserve Roll Monitor</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="inventory-roll-grid">
              {inventory.map((fab, idx) => {
                const percentage = Math.round((fab.current / fab.total) * 100);
                const isCritical = percentage < 30;

                return (
                  <div key={idx} className="bg-stone-50 p-6 rounded-3xl border border-stone-150 space-y-4" id={`inventory-item-${idx}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="w-4 h-4 rounded-full border border-stone-300" 
                          style={{ backgroundColor: fab.color }} 
                        />
                        <h4 className="font-sans text-sm font-semibold text-neutral-950">{fab.name}</h4>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        isCritical ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {isCritical ? "RE-WEAVE REQ" : "HEALTHY RESERVE"}
                      </span>
                    </div>

                    {/* Gauge percentage visuals */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-stone-400">Available Reserve roll:</span>
                        <strong className="text-neutral-950">{fab.current}m / {fab.total}m</strong>
                      </div>
                      
                      {/* Metric bar */}
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isCritical ? "bg-red-500" : "bg-stone-900"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono pt-2 text-stone-500 border-t border-stone-200/50">
                      <span>Ref markup adjustment:</span>
                      <strong className="text-neutral-900">₹{fab.markup}/m premium</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. UNDER ALTERATION TRACKER */}
        {activeTab === "alterations" && (
          <div className="space-y-6 animate-fade-in" id="admin-tab-alterations-panel">
            <h3 className="font-serif text-lg text-neutral-900 font-medium">Bespoke Alterations Seam Rework Queue</h3>
            
            <div className="border border-stone-150 rounded-3xl overflow-hidden shadow-sm" id="admin-alt-tickets-table">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-150 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    <th className="p-5">Ticket ID</th>
                    <th className="p-5">Client ID</th>
                    <th className="p-5">Garment Seam Problem note</th>
                    <th className="p-5">Rework Lead seam master</th>
                    <th className="p-5 text-right">Rework control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  <tr className="hover:bg-stone-50/50 transition-colors" id="admin-alt-row-static-1">
                    <td className="p-5 font-mono text-amber-600 font-bold">AL-4592</td>
                    <td className="p-5">
                      <strong className="text-neutral-900 block">Sanjana Sen</strong>
                      <span className="text-[10px] text-stone-400 block mt-0.5">sanjana.sen@corp.in</span>
                    </td>
                    <td className="p-5">
                      <p className="max-w-md text-stone-600 leading-relaxed text-[11px]">
                        "Trouser natural waistline seating is perfect, but request adding a +0.5" stretch ease tolerance inside the back seam loops to optimize ergonomics under long consult sessions."
                      </p>
                    </td>
                    <td className="p-5 font-mono text-stone-600">
                      Master Ramesh (Embroidery Veteran)
                    </td>
                    <td className="p-5 text-right font-mono">
                      <button
                        onClick={() => {
                          onResolveAlteration("AL-4592");
                          alert("Alteration concierge ticket completed. Notification dispatched to BlueDart for next-day collection.");
                        }}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-600 hover:text-white px-3.5 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-widest transition-colors cursor-pointer font-semibold"
                      >
                        REWORK RESOLVED
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DESIGN LIVE ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fade-in text-neutral-900 font-sans" id="admin-tab-analytics-panel">
            <h3 className="font-serif text-lg text-neutral-900 font-medium">Sartorial Demographics & Business Analytics</h3>
            
            {/* Business metrics indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-150/70 text-left relative overflow-hidden">
                <span className="text-stone-400 text-[9px] font-mono uppercase block">Gross Merchandise Volume (GMV)</span>
                <strong className="text-2xl font-bold font-mono text-neutral-950 mt-1 block">₹5,42,000</strong>
                <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% MoM rise in tailored coats (May 2026)</span>
                </span>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-150/70 text-left">
                <span className="text-stone-400 text-[9px] font-mono uppercase block">Customer CAC LTV Ratio</span>
                <strong className="text-2xl font-bold font-mono text-neutral-950 mt-1 block">5.4x Ratio</strong>
                <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1 mt-1.5">
                  <Star className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Driven by low returns: 98% direct first-fit success</span>
                </span>
              </div>

              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-150/70 text-left">
                <span className="text-stone-400 text-[9px] font-mono uppercase block">Average Order Value (AOV)</span>
                <strong className="text-2xl font-bold font-mono text-neutral-950 mt-1 block font-mono">₹7,800</strong>
                <span className="text-[10px] text-[#c5a880] font-mono flex items-center gap-1 mt-1.5">
                  <Award className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Driven by premium weaver markups</span>
                </span>
              </div>
            </div>

            {/* Custom SVG Bar Chart - Sizing demographics */}
            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-150 space-y-4" id="demographic-custom-chart-wrapper">
              <div className="flex justify-between items-center border-b border-stone-200/50 pb-4">
                <div>
                  <h4 className="font-serif text-base text-neutral-950">Silhouette Choice Demographics</h4>
                  <p className="text-[11px] text-stone-400">Total customer silhouette selections mapped across Indian IT and Consulting hubs.</p>
                </div>
                <div className="flex gap-4 font-mono text-[9px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-900"></span> Suits & Blazers</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#c5a880]"></span> trousers & shirts</span>
                </div>
              </div>

              {/* Vector Bar Chart */}
              <div className="h-64 flex items-end gap-6 pt-8 px-4 font-mono text-[9px]" id="svg-analytics-barchart">
                {[
                  { city: "Bangalore", valueBlazers: 85, valuePants: 60 },
                  { city: "Mumbai (IK)", valueBlazers: 65, valuePants: 90 },
                  { city: "Gurugram", valueBlazers: 110, valuePants: 50 },
                  { city: "Hyderabad", valueBlazers: 40, valuePants: 70 },
                  { city: "Chennai (IT)", valueBlazers: 30, valuePants: 55 }
                ].map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end space-y-1.5">
                    {/* Bar track */}
                    <div className="w-full flex justify-center items-end gap-1.5 h-40">
                      {/* Suits Bar */}
                      <div 
                        onMouseEnter={() => setHoveredMetric(`suits-${idx}`)}
                        onMouseLeave={() => setHoveredMetric(null)}
                        className="w-4 bg-neutral-900 rounded-t-md hover:opacity-80 transition-all cursor-pointer relative group"
                        style={{ height: `${data.valueBlazers * 1.2}px` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-[8px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-15">
                          Blazers: {data.valueBlazers}
                        </div>
                      </div>
                      {/* Trousers Bar */}
                      <div 
                        onMouseEnter={() => setHoveredMetric(`pants-${idx}`)}
                        onMouseLeave={() => setHoveredMetric(null)}
                        className="w-4 bg-[#c5a880] rounded-t-md hover:opacity-80 transition-all cursor-pointer relative group"
                        style={{ height: `${data.valuePants * 1.2}px` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-[8px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-15">
                          Trousers: {data.valuePants}
                        </div>
                      </div>
                    </div>
                    {/* Label */}
                    <span className="text-stone-500 uppercase tracking-widest text-[9px] block text-center pt-1 border-t border-stone-200 w-full">
                      {data.city}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 5. COLLECTIONS DIRECTORY VIEW */}
        {activeTab === "collections" && (
          <div className="space-y-6 animate-fade-in text-neutral-900 font-sans" id="admin-tab-collections">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-100 pb-5 gap-4">
              <div>
                <h3 className="font-serif text-lg text-neutral-950 italic">Atelier Saccard Collection Directory</h3>
                <p className="text-xs text-stone-400 mt-0.5">Control, check, and introduce custom silhouettes directly into client catalog views.</p>
              </div>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="bg-neutral-950 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-5 rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center space-x-1.5 cursor-pointer font-bold h-max"
                id="admin-add-collection-btn"
              >
                <Plus className="w-4 h-4 text-[#c5a880]" />
                <span>+ Add Item to Collection</span>
              </button>
            </div>

            {/* List products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="collections-inventory-grid">
              {products.map((item) => {
                // Find fabrics
                const itemFabrics = MOCK_FABRICS.filter((f) => item.fabrics.includes(f.id));

                return (
                  <div key={item.id} className="bg-white rounded-3xl border border-stone-150/70 overflow-hidden group flex flex-col justify-between hover:shadow-md transition-shadow" id={`collection-view-${item.id}`}>
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-square overflow-hidden bg-stone-100">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${item.outOfStock ? "grayscale opacity-70" : ""}`}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-neutral-900 font-mono text-[8px] uppercase tracking-widest py-1 px-2.5 rounded-full border border-stone-200">
                          {item.category}
                        </span>
                        {item.outOfStock && (
                          <span className="absolute top-4 right-4 bg-red-650 text-white font-mono text-[8px] uppercase tracking-widest py-1 px-2 rounded-full border border-red-500 font-bold shadow-md">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>

                      {/* Info body */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h4 className="font-serif text-base font-semibold text-neutral-900">{item.name}</h4>
                          <p className="text-[11px] text-[#c5a880] font-mono mt-0.5">{item.tagline}</p>
                        </div>

                        <p className="text-xs text-stone-500 leading-relaxed max-w-sm line-clamp-2">
                          {item.description}
                        </p>

                        {/* Colors bubble preview */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono uppercase text-stone-400 block">Color Shades Options</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {item.colors?.map((c, cIdx) => (
                              <div key={cIdx} className="flex items-center space-x-1 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-200" title={c.name}>
                                <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} />
                                <span className="text-[8px] text-stone-500 font-mono">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Fabrics preview */}
                        <div className="space-y-1.5 pb-4">
                          <span className="text-[9px] font-mono uppercase text-stone-400 block">Loom Textile Blueprints</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {itemFabrics.map((f) => (
                              <span key={f.id} className="text-[8px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-sans border border-stone-200/50">
                                {f.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Atelier Management Zone */}
                        <div className="border-t border-stone-100/70 pt-4 space-y-2.5">
                          <span className="text-[9px] font-mono uppercase text-[#c5a880] block tracking-widest">Admin Controls</span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => onToggleStock(item.id)}
                              className={`flex-1 text-center font-mono text-[9px] uppercase tracking-wider py-2 px-2.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                                item.outOfStock
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-250 hover:bg-emerald-100/80"
                                  : "bg-amber-50 text-amber-800 border-amber-250 hover:bg-amber-100/80"
                              }`}
                              title={item.outOfStock ? "Mark as In Stock" : "Mark as Out of Stock"}
                            >
                              {item.outOfStock ? "Set In Stock" : "Mark Out of Stock"}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove "${item.name}" from Atelier collections permanently?`)) {
                                  onRemoveProduct(item.id);
                                }
                              }}
                              className="text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg p-2 transition-colors flex items-center justify-center cursor-pointer"
                              title="Delete silhouette permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Lower stats pane */}
                    <div className="bg-stone-50 p-4 border-t border-stone-100 flex justify-between items-center text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-stone-400 block uppercase">Base Cost</span>
                        <strong className="text-neutral-950 font-bold">₹{item.basePrice.toLocaleString()}</strong>
                      </div>
                      <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded">
                        FOR: {item.designedFor}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 5. ADD ITEM MODAL OVERLAY */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="add-product-modal-root">
          <div className="bg-white rounded-[2rem] border border-stone-200 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-fade-in relative text-neutral-900 text-left">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-stone-150 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-950">Add Silhouette To Collections</h3>
                <p className="text-xs text-stone-400 mt-0.5">Introduce a new premium model with supported textile rolls, custom color tokens, and base rate.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsAddingProduct(false)}
                className="text-stone-400 hover:text-stone-700 font-mono text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProductSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Garment Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Silk Heritage Kurta"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Tagline Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Effortless royal heritage wedding fit"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Silhouette Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Category Silhouette</label>
                  <select
                    value={newProdCat}
                    onChange={(e) => setNewProdCat(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
                  >
                    <option value="Suits">Suits</option>
                    <option value="Blazers">Blazers</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Ethnic Wear">Ethnic Wear</option>
                  </select>
                </div>

                {/* Base Price */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    max={50000}
                    value={newProdBasePrice}
                    onChange={(e) => setNewProdBasePrice(Number(e.target.value) || 0)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                {/* Designed For */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Designed For Persona</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium corporate events"
                    value={newProdDesignedFor}
                    onChange={(e) => setNewProdDesignedFor(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Product Description</label>
                <textarea
                  rows={2}
                  placeholder="Tell clients about construction, style contours, comfort stretch lines..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-150 rounded-xl p-4 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                />
              </div>

              {/* Image Input and Presets */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Model Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="Paste Unsplash image URL or click a preset below"
                    value={newProdImageUrl}
                    onChange={(e) => setNewProdImageUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors font-mono"
                    id="admin-collection-image-url-input"
                  />
                </div>

                {/* Image presets */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">Quick Asset Presets</span>
                  <div className="flex gap-2 flex-wrap">
                    {sampleImagesList.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewProdImageUrl(preset.url)}
                        className={`text-[9px] border py-1.5 px-3 rounded-lg font-mono transition-colors cursor-pointer ${
                          newProdImageUrl === preset.url 
                            ? "bg-[#c5a880] text-white border-[#c5a880]" 
                            : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fabrics multi selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Allowable Loom Premium Fabrics</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOCK_FABRICS.map((fabric) => {
                    const isChecked = selectedFabricIds.includes(fabric.id);
                    return (
                      <button
                        key={fabric.id}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            setSelectedFabricIds(selectedFabricIds.filter(id => id !== fabric.id));
                          } else {
                            setSelectedFabricIds([...selectedFabricIds, fabric.id]);
                          }
                        }}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center space-x-2 cursor-pointer ${
                          isChecked 
                            ? "bg-neutral-950 text-white border-neutral-950" 
                            : "bg-stone-50 hover:bg-stone-100 text-neutral-800 border-stone-150"
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-stone-300 flex-shrink-0" style={{ backgroundColor: fabric.colorHex }} />
                        <span className="text-[11px] truncate">{fabric.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Setup */}
              <div className="space-y-4 bg-stone-50 p-4 rounded-2xl border border-stone-150/70">
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-bold">Color Palette Accents</label>
                
                {/* Add standard color */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1 text-left">
                    <span className="text-[8px] text-stone-400 uppercase font-mono">Shade name (e.g. Royal Indigo)</span>
                    <input
                      type="text"
                      placeholder="e.g., Royal Indigo"
                      value={colorInputName}
                      onChange={(e) => setColorInputName(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1 w-20 text-left font-mono">
                    <span className="text-[8px] text-stone-400 uppercase">Picker</span>
                    <input
                      type="color"
                      value={colorInputHex}
                      onChange={(e) => setColorInputHex(e.target.value)}
                      className="w-full h-8 px-1 py-0.5 bg-white border border-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColorToken}
                    className="bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-[10px] uppercase font-bold py-2.5 px-4 rounded-lg tracking-wider cursor-pointer"
                  >
                    + Add shade
                  </button>
                </div>

                {/* Colors pool */}
                {prodColors.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-stone-200/50">
                    <span className="text-[8px] text-stone-400 uppercase font-mono block">Selected active shades ({prodColors.length})</span>
                    <div className="flex gap-2 flex-wrap">
                      {prodColors.map((color, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 bg-white border border-stone-200 px-2.5 py-1.5 rounded-lg text-xs font-mono">
                          <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: color.hex }} />
                          <span className="text-[10px]">{color.name}</span>
                          <button
                            type="button"
                            onClick={() => setProdColors(prodColors.filter((_, cIdx) => cIdx !== idx))}
                            className="text-red-500 hover:text-red-700 ml-1.5 text-[9px] font-bold cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-stone-150 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-[10px] uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-850 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-6 rounded-full font-bold transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-[#c5a880]" />
                  <span>Save To Catalog</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
