/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Fabric, MOCK_FABRICS, BodyMeasurements, AIRecommendation, RelativeSizeCard } from "../types";
import { ArrowLeft, Sparkles, MessageSquare, ShieldCheck, HelpCircle, Truck, Info, PhoneCall } from "lucide-react";
import { useState } from "react";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onConfigureMeasurements: () => void;
  onAddToCart: (selectedFabric: Fabric, selectedColor: { name: string; hex: string }, customizations: any, finalPrice: number) => void;
  userMeasurements: BodyMeasurements;
  aiRecommendation: AIRecommendation;
  relativeSizeCards?: RelativeSizeCard[];
}

export default function ProductDetailPage({
  product,
  onBack,
  onConfigureMeasurements,
  onAddToCart,
  userMeasurements,
  aiRecommendation,
  relativeSizeCards = []
}: ProductDetailPageProps) {
  // Sizing Profile selection support (Self vs Relatives)
  const [selectedProfileId, setSelectedProfileId] = useState<string>("user");

  // Dynamically resolve measurements and recommendations based on selection
  const activeProfile = selectedProfileId === "user" 
    ? null 
    : relativeSizeCards.find((r) => r.id === selectedProfileId);

  const activeMeasurements = activeProfile ? activeProfile.measurements : userMeasurements;
  const activeRecommendation = activeProfile ? activeProfile.aiRecommendation : aiRecommendation;

  // Select state controllers
  const [selectedFabric, setSelectedFabric] = useState<Fabric>(
    MOCK_FABRICS.find((f) => product.fabrics.includes(f.id)) || MOCK_FABRICS[0]
  );
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(product.colors[0]);
  const [selectedFitType, setSelectedFitType] = useState<string>("Tailored Comfort");
  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  
  // Customization fields
  const [sleeveLength, setSleeveLength] = useState<string>("Full Sleeve");
  const [lapelStyle, setLapelStyle] = useState<string>("Peak Lapel");
  const [buttonStyle, setButtonStyle] = useState<string>("Single Breasted");
  const [liningMaterial, setLiningMaterial] = useState<string>("Premium Bemberg");
  const [pocketStyle, setPocketStyle] = useState<string>("Classic Flap");
  const [monogramText, setMonogramText] = useState<string>("");
  const [tailorNotes, setTailorNotes] = useState<string>("");
  
  // Simulated State for WhatsApp popup
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState<boolean>(false);
  
  // Gallery images array
  const gallery = [product.imageUrl, ...product.detailImages];

  // Dynamically calculate actual bespoke price
  // Garment basePrice + Fabric luxury premium markup (if any)
  const fabricPremium = selectedFabric.pricePerMeter > 1500 ? (selectedFabric.pricePerMeter - 1200) * 1.5 : 0;
  const finalPrice = Math.round(product.basePrice + fabricPremium);

  const handleCustomAddToCart = () => {
    const customizations = {
      sleeveLength,
      lapelStyle,
      buttonStyle,
      liningMaterial,
      pocketStyle,
      monogramText: monogramText.trim() || undefined,
      tailorNotes: tailorNotes.trim() || undefined,
      fitType: selectedFitType,
      clientName: activeProfile ? `${activeProfile.name} (${activeProfile.relationship})` : "Sanjana Sen (Self)"
    };
    onAddToCart(selectedFabric, selectedColor, customizations, finalPrice);
  };

  const handleWhatsAppTrigger = () => {
    setShowWhatsAppPopup(true);
    // Auto timeout to make it super interactive
    setTimeout(() => {
      setShowWhatsAppPopup(false);
    }, 10000);
  };

  return (
    <div className="bg-white min-h-screen py-10 relative" id="detail-page-root">
      
      {/* Dynamic WhatsApp Assistant Notification popup */}
      {showWhatsAppPopup && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#128c7e] text-white p-5 rounded-2xl shadow-3xl border border-[#075e54] max-w-sm animate-fade-in flex flex-col space-y-3"
          id="whatsapp-notification-box"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">DRZ</div>
              <div>
                <div className="text-xs font-semibold font-sans">Boutique Stylist Online</div>
                <div className="text-[10px] font-mono text-[#25d366] uppercase tracking-widest">Active Chat session</div>
              </div>
            </div>
            <button 
              onClick={() => setShowWhatsAppPopup(false)}
              className="text-white hover:text-stone-300 font-bold text-xs"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] font-sans leading-relaxed text-white/90">
            "Hello! I saw you are reviewing the **{product.name}** in our luxury **{selectedFabric.name}**. I can answer specific tailoring, rise adjustments or fabric feel questions over WhatsApp instantly."
          </p>
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => {
                window.open(`https://wa.me/919999999999?text=Hi, I am configuring the ${product.name} in ${selectedFabric.name}. Need support!`, "_blank");
                setShowWhatsAppPopup(false);
              }}
              className="bg-white text-emerald-900 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg font-bold"
            >
              CHat on WhatsApp
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button */}
        <button
          onClick={onBack}
          id="detail-back-btn"
          className="inline-flex items-center space-x-2 text-stone-500 hover:text-neutral-900 font-mono text-xs uppercase tracking-widest mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collections</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="detail-grid-row">
          
          {/* LEFT COLUMN: Gallery & Specs */}
          <div className="lg:col-span-6 space-y-8" id="detail-left-column">
            
            {/* Gallery Board */}
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-stone-50 border border-stone-200 shadow-xl" id="gallery-primary-box">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Thumbnail track */}
              <div className="flex gap-3" id="gallery-thumb-track">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      activeImage === img ? "border-stone-900 scale-102 ring-2 ring-stone-900/5" : "border-stone-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index}`}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product description */}
            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-150 space-y-4" id="detail-editorial-desc">
              <h3 className="font-serif text-lg text-neutral-950 italic">The Sartorial Design Logic</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">{product.description}</p>
              
              <div className="border-t border-stone-200/60 pt-4" id="detail-editorial-specs">
                <h4 className="text-[10px] font-mono uppercase text-stone-400 tracking-wider mb-2">Bespoke Specifications</h4>
                <ul className="space-y-1.5 text-xs text-stone-600 font-mono">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#c5a880] mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: Configuration board */}
          <div className="lg:col-span-6 space-y-8" id="detail-right-column">
            
            {/* Title & Brand */}
            <div className="border-b border-stone-100 pb-6" id="detail-brand-header">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">{product.category} atelier</span>
                {product.outOfStock && (
                  <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                    Temporarily Out of Stock
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 mt-1">{product.name}</h1>
              <p className="text-stone-500 text-xs font-mono italic mt-1.5">{product.tagline}</p>
              
              {/* Price Calculation Box */}
              <div className="flex items-baseline space-x-3 mt-4" id="detail-price-box">
                <span className="text-2xl font-mono font-semibold text-neutral-950">₹{finalPrice.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Calculated price with weaves and upgrades</span>
              </div>
            </div>

            {/* 1. SELECT FABRICS (With Luxury details) */}
            <div className="space-y-3" id="detail-fabrics-block">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] font-mono uppercase text-[#c5a880] tracking-widest">Touch & Feel: Textile Selection</h4>
                <span className="text-xs font-sans text-stone-400">Atelier Grade</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOCK_FABRICS.map((fab) => {
                  const isAvailable = product.fabrics.includes(fab.id);
                  const isSelected = selectedFabric.id === fab.id;
                  return (
                    <button
                      key={fab.id}
                      disabled={!isAvailable}
                      onClick={() => setSelectedFabric(fab)}
                      className={`relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        !isAvailable ? "opacity-30 cursor-not-allowed border-stone-100 bg-stone-50" : "cursor-pointer"
                      } ${
                        isSelected 
                          ? "border-stone-900 bg-neutral-900 text-white shadow-xl shadow-stone-950/5 scale-102"
                          : "border-stone-150 hover:bg-stone-50 hover:border-stone-300 text-stone-800 bg-white"
                      }`}
                    >
                      <div>
                        {/* Dot indicator for fabric color */}
                        <div className="flex justify-between items-center">
                          <span 
                            className="w-4 h-4 rounded-full border border-stone-300 flex-shrink-0"
                            style={{ backgroundColor: fab.colorHex }}
                          />
                          {isSelected && <span className="text-[9px] font-mono text-[#c5a880] uppercase">Selected</span>}
                        </div>
                        <h5 className="font-sans text-xs font-semibold mt-3 line-clamp-1">{fab.name}</h5>
                        <p className={`text-[9px] font-mono mt-0.5 uppercase ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                          {fab.type}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-dotted border-stone-200/30 flex justify-between text-[8px] font-mono">
                        <span>Orig: {fab.origin.split(",")[0]}</span>
                        <span className="text-[#c5a880]">₹{fab.pricePerMeter}/m</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Fabric Specs Sheet popup details */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-start gap-3 mt-2 font-sans" id="fabric-info-sheet">
                <Info className="w-4.5 h-4.5 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-stone-600 space-y-1">
                  <div className="font-semibold text-neutral-900">{selectedFabric.name} Texture specs:</div>
                  <p className="leading-relaxed">{selectedFabric.desc}</p>
                  <div className="flex gap-4 font-mono text-[9px] text-[#c5a880] uppercase pt-1">
                    <span>Texture: {selectedFabric.texture}</span>
                    <span>•</span>
                    <span>Breathability: {selectedFabric.breathability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SELECT COLORS */}
            <div className="space-y-3" id="detail-colors-block">
              <h4 className="text-[11px] font-mono uppercase text-[#c5a880] tracking-widest">Select Shade</h4>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((col) => {
                  const isSelected = selectedColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-sans transition-all flex items-center space-x-2 cursor-pointer ${
                        isSelected 
                          ? "border-neutral-950 bg-neutral-950 text-white" 
                          : "border-stone-200 text-stone-700 bg-white hover:border-stone-300"
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-stone-300" 
                        style={{ backgroundColor: col.hex }} 
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. SELECT SILHOUETTE FIT */}
            <div className="space-y-3" id="detail-fit-style-block">
              <h4 className="text-[11px] font-mono uppercase text-[#c5a880] tracking-widest">Silhouette Contour Fit</h4>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: "Tailored Comfort", desc: "Allows dual layer sitting flexibility" },
                  { name: "Structured Slim", desc: "Impeccably sharp posture molding" },
                  { name: "Relaxed Professional", desc: "Casual-to-boardroom flowing drapes" }
                ].map((fitOpts) => {
                  const isSelected = selectedFitType === fitOpts.name;
                  return (
                    <button
                      key={fitOpts.name}
                      onClick={() => setSelectedFitType(fitOpts.name)}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? "border-neutral-900 bg-stone-50 ring-1 ring-neutral-900" 
                          : "border-stone-200 hover:border-stone-300 bg-white"
                      }`}
                    >
                      <span className="block text-xs font-semibold text-neutral-950">{fitOpts.name}</span>
                      <span className="block text-[9px] text-stone-400 font-mono mt-1 leading-tight">{fitOpts.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZING PROFILE SELECTOR (SELF vs RELATIVES) */}
            <div className="space-y-3" id="garment-client-selector">
              <h4 className="text-[11px] font-mono uppercase text-[#c5a880] tracking-widest">Tailor garment for</h4>
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-neutral-950 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none cursor-pointer font-sans"
              >
                <option value="user">Self Sizing: Sanjana Sen (Private Cabinet)</option>
                {relativeSizeCards.map((r) => (
                  <option key={r.id} value={r.id}>
                    Relative Profile: {r.name} ({r.relationship})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. ACTIVE AI SIZE RECOMMENDATION AND PROFILE PREVIEW */}
            <div className="bg-stone-50 border border-stone-150 p-6 rounded-3xl space-y-4 shadow-sm" id="detail-ai-recommendation-block">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#c5a880]" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-950">AI TrueFit Diagnostics™</span>
                </div>
                
                {/* Confidence Meter Badge */}
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold">
                  {activeRecommendation.fitConfidence}% Match
                </div>
              </div>

              {/* Sizing Results */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">Recommended Base Blueprint</span>
                  <span className="text-neutral-900 font-semibold mt-0.5 block">{activeRecommendation.predictedSize}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">Est. Silhouette Output</span>
                  <span className="text-neutral-900 font-semibold mt-0.5 block">{selectedFitType}</span>
                </div>
              </div>

              {/* Micro diagnostic insights */}
              <p className="text-[11px] text-stone-500 leading-relaxed font-sans mt-2">
                {activeRecommendation.bodyShapeAnalysis}
              </p>

              {/* Adjustments suggestions */}
              <div className="border-t border-dashed border-stone-200 pt-3 flex flex-col space-y-1 text-[10px] text-stone-600 font-mono">
                <div className="flex justify-between">
                  <span>Waist alignment ease:</span>
                  <span className="text-stone-900">{activeRecommendation.suggestedAdjustments.waist}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shoulder structure:</span>
                  <span className="text-stone-900">{activeRecommendation.suggestedAdjustments.shoulder}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-[9px] text-stone-400 font-mono">
                  Height: {activeMeasurements.height}cm / Shoulder: {activeMeasurements.shoulder}”
                </span>
                <button
                  onClick={onConfigureMeasurements}
                  className="text-[10px] font-mono text-[#c5a880] hover:text-[#b09670] underline tracking-widest uppercase"
                >
                  Configure Measurement Profile
                </button>
              </div>
            </div>


            {/* 5. SEWING & DETAILS CUSTOMIZATION MATRIX */}
            <div className="border border-stone-200/70 p-6 rounded-3xl space-y-5" id="detail-customization-specs">
              <h4 className="text-[11px] font-mono uppercase text-[#c5a880] tracking-widest mb-2 pb-2 border-b border-stone-100">Bespoke Options</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                
                {/* Sleeve option */}
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-2">Sleeve Length</label>
                  <select
                    value={sleeveLength}
                    onChange={(e) => setSleeveLength(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-lg p-2.5 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option>Sleeveless</option>
                    <option>Short</option>
                    <option>3/4 Sleeve</option>
                    <option>Full Sleeve</option>
                  </select>
                </div>

                {/* Lapel option */}
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-2">Lapel / Collar</label>
                  <select
                    value={lapelStyle}
                    disabled={product.category === "Shirts" || product.category === "Ethnic Wear"}
                    onChange={(e) => setLapelStyle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-lg p-2.5 focus:outline-none focus:border-[#c5a880] disabled:opacity-40"
                  >
                    <option>Notch Lapel</option>
                    <option>Peak Lapel</option>
                    <option>Shawl Lapel</option>
                    <option>No Lapel</option>
                  </select>
                </div>

                {/* Button arrangement */}
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-2">Placket Button style</label>
                  <select
                    value={buttonStyle}
                    onChange={(e) => setButtonStyle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-lg p-2.5 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option>Single Breasted</option>
                    <option>Double Breasted</option>
                    <option>Hidden Placket</option>
                  </select>
                </div>

                {/* Pocket arrangement */}
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-2">Pocketing Style</label>
                  <select
                    value={pocketStyle}
                    onChange={(e) => setPocketStyle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-lg p-2.5 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option>Classic Flap</option>
                    <option>Minimal Welt</option>
                    <option>No Pockets</option>
                  </select>
                </div>
              </div>

              {/* Monogram option */}
              <div>
                <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-2">
                  Inner Lapel Monogram (Max 3 Characters)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                  placeholder="e.g. SLK"
                  className="w-full bg-stone-50 border border-stone-150 rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-[#c5a880] tracking-wide"
                />
              </div>

              {/* Custom Tailor Note Box */}
              <div>
                <label className="block text-[9px] font-mono text-[#c5a880] uppercase tracking-wider mb-2">
                  Special Tailoring Instruction Note
                </label>
                <textarea
                  value={tailorNotes}
                  onChange={(e) => setTailorNotes(e.target.value)}
                  placeholder="e.g. Please shorten standard leg inseam by 0.5 inches, or add deeper inner zipped card pocket to corporate blazer."
                  rows={2}
                  className="w-full bg-stone-50 border border-stone-150 rounded-xl p-3 font-sans text-xs focus:outline-none focus:border-[#c5a880] leading-relaxed"
                />
              </div>
            </div>


            {/* 6. ATELIER MILESTONES & TIMELINE TRACKER */}
            <div className="bg-stone-50/50 p-6 rounded-3xl border border-stone-150 text-xs font-sans" id="detail-milestones">
              <div className="flex items-center space-x-2 text-[#c5a880] mb-4">
                <Truck className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase font-semibold tracking-widest text-[#c5a880]">Estimations & Milestones</span>
              </div>
              <p className="text-stone-500 mb-4 text-[11px] leading-relaxed">
                Made-to-order pipeline tailored fresh. Shipments dispatched within 10 days guaranteed across India.
              </p>
              
              <div className="grid grid-cols-5 gap-1.5 text-center text-[8px] font-mono text-stone-400 font-semibold" id="detail-timeline-track">
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-neutral-900 rounded-full"></div>
                  <span className="text-[#c5a880]">01. Drafting</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-neutral-900 rounded-full"></div>
                  <span className="text-[#c5a880]">02. LaserCut</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-neutral-900 rounded-full"></div>
                  <span className="text-neutral-900">03. Handsew</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-stone-200 rounded-full"></div>
                  <span>04. QC Wrap</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-stone-200 rounded-full"></div>
                  <span>05. Dispatch</span>
                </div>
              </div>
            </div>


            {/* 7. PURCHASE ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-100" id="detail-buy-block">
              <button
                onClick={handleCustomAddToCart}
                id="add-to-cart-submit"
                disabled={!!product.outOfStock}
                className={`flex-1 font-mono text-xs uppercase tracking-widest py-5 rounded-full transition-all flex items-center justify-center space-x-2 shadow-xl cursor-pointer ${
                  product.outOfStock
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none"
                    : "bg-neutral-950 text-white hover:bg-neutral-800 shadow-neutral-950/10"
                }`}
              >
                <span>{product.outOfStock ? "Temporarily Out of Stock" : "Draft Pattern & Add to Bag"}</span>
              </button>
              
              <button
                onClick={handleWhatsAppTrigger}
                id="whatsapp-counsel-trigger"
                className="bg-[#25d366] text-white py-5 px-6 rounded-full hover:bg-[#20ba59] transition-all flex items-center justify-center space-x-2 border border-emerald-600 shadow-lg cursor-pointer font-semibold"
                aria-label="Ask Boutique Counselor via WhatsApp"
              >
                <PhoneCall className="w-4 h-4 fill-current text-white" />
                <span className="text-xs uppercase font-mono tracking-wider">Ask Counselor</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 text-center text-[10px] font-mono text-stone-400 pt-2" id="detail-post-sales-badges">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-stone-300 mb-1" />
                <span>Double Stitch Guarantee</span>
              </div>
              <div className="flex flex-col items-center">
                <HelpCircle className="w-4 h-4 text-stone-300 mb-1" />
                <span>30-Day Alteration Free</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-stone-300 mb-1" />
                <span>Secure Transit Insured</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
