/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fabric, Product, BodyMeasurements, Order, OrderItem } from "../types";
import { CreditCard, Truck, ArrowLeft, ShieldCheck, Sparkles, Check, HelpCircle } from "lucide-react";
import React, { useState } from "react";

interface CheckoutPageProps {
  cartItem: {
    product: Product;
    selectedFabric: Fabric;
    selectedColor: { name: string; hex: string };
    customizations: any;
    finalPrice: number;
  } | null;
  onBack: () => void;
  onPlaceOrder: (newOrder: Order) => void;
  userMeasurements: BodyMeasurements;
}

export default function CheckoutPage({
  cartItem,
  onBack,
  onPlaceOrder,
  userMeasurements
}: CheckoutPageProps) {
  // Address parameters
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressLine, setAddressLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");

  // Payment triggers
  const [paymentStep, setPaymentStep] = useState<"idle" | "razorpay_gateway" | "processing" | "success">("idle");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  if (!cartItem) {
    return (
      <div className="bg-white min-h-[400px] flex flex-col items-center justify-center p-8 text-center" id="checkout-empty">
        <h3 className="font-serif text-lg text-stone-900 font-semibold">Your atelier bag is empty</h3>
        <p className="text-xs text-stone-400 mt-2">Browse our Workspace collections and configure your custom proportions to proceed.</p>
        <button
          onClick={onBack}
          className="mt-6 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Discover Garments
        </button>
      </div>
    );
  }

  // Calc totals
  const totalItemsPrice = cartItem.finalPrice;
  const shippingCharge = 150; // premium courier
  const taxCharge = Math.round(totalItemsPrice * 0.12); // 12% GST Handwoven Textiles Special rate
  const finalOrderTotal = totalItemsPrice + shippingCharge + taxCharge;

  const triggerRazorpaySecure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !pincode) {
      alert("Please enter full address details to calculate custom pattern shipping.");
      return;
    }
    setPaymentStep("razorpay_gateway");
  };

  const handleAuthorizePaymentCombined = () => {
    setPaymentStep("processing");
    
    setTimeout(() => {
      setPaymentStep("success");
      
      const newOrderItem: OrderItem = {
        product: cartItem.product,
        selectedFabric: cartItem.selectedFabric,
        selectedColor: cartItem.selectedColor,
        customizations: cartItem.customizations,
        measurements: userMeasurements,
        aiRecommendation: {
          predictedSize: "US 6 / IN 34 (TrueFit Premium)",
          fitConfidence: 98,
          bodyShapeAnalysis: "Hourglass alignment optimized for desk movements",
          recommendedFitType: "Tailored Comfort",
          suggestedAdjustments: {
            bust: "Contoured snugly",
            waist: "Fitted stretch cushion (+0.5 inches)",
            hip: "Free alignment drape flow",
            shoulder: "Firm alignments structures"
          }
        },
        price: cartItem.finalPrice
      };

      const placedOrderObj: Order = {
        id: `DRZ-${Math.floor(Math.random() * 90000 + 10000)}`,
        date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
        status: "In Queue",
        items: [newOrderItem],
        customerName: fullName,
        customerEmail: "sanjana.sen@corp.in",
        shippingAddress: {
          fullName,
          phone,
          addressLine,
          city,
          state,
          pincode
        },
        payoutStatus: "Paid",
        tailorAssigned: "Master Ramesh (Embroidery Veteran)",
        alterationHistory: []
      };

      onPlaceOrder(placedOrderObj);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen py-12 text-neutral-900 font-sans" id="checkout-root">
      
      {/* 1. MOCK RAZORPAY SECURITY OVERLAY MODAL */}
      {paymentStep === "razorpay_gateway" && (
        <div className="fixed inset-0 bg-neutral-950/70 z-50 flex items-center justify-center p-4" id="razorpay-overlay">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-stone-200 animate-fade-in">
            {/* Razorpay Banner */}
            <div className="bg-[#12122c] p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#528ff0]">SECURED BY RAZORPAY</span>
                <img
                  src="/darzi-name-logo.png"
                  alt="Darzi"
                  className="h-9 w-auto object-contain mt-1 brightness-0 invert"
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block font-mono">Amount Payable</span>
                <span className="text-base font-bold text-[#c5a880] font-mono">₹{finalOrderTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Razorpay Card Details Form */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl text-[10px] font-mono text-stone-500 border border-stone-100 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>PCI-DSS Secured 128-bit Bank encrypted gateway.</span>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-600 focus:ring-0 text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">CVV Code</label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-600 text-center font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleAuthorizePaymentCombined}
                className="w-full bg-[#12122c] text-white font-mono text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-neutral-900 transition-colors font-bold flex items-center justify-center space-x-1 cursor-pointer mt-4"
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>Pay ₹{finalOrderTotal.toLocaleString()} Securely</span>
              </button>
              
              <button
                onClick={() => setPaymentStep("idle")}
                className="w-full text-center text-[10px] font-mono text-stone-400 uppercase tracking-widest"
              >
                Cancel transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. RAZORPAY PROCESSING LOADING SCREEN */}
      {paymentStep === "processing" && (
        <div className="fixed inset-0 bg-neutral-950/80 z-50 flex flex-col items-center justify-center text-white" id="processing-overlay">
          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin mb-4"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400">Razorpay Encrypted handshakes...</span>
          <p className="text-xs text-[#c5a880] mt-2 font-serif italic">Drafting digital patterns. Securing sewing slots.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back and header */}
        <div className="border-b border-stone-100 pb-6 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-stone-500 hover:text-neutral-900 font-mono text-xs uppercase tracking-widest mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          <h1 className="font-serif text-3xl font-semibold">Bespoke Checkout Calibration</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="checkout-grid-row">
          
          {/* LEFT PANEL: Shipping Details form */}
          <div className="lg:col-span-7 space-y-6" id="shipping-address-panel">
            <h3 className="font-serif text-xl font-medium text-stone-900 border-b border-stone-100 pb-3">01. Shipping address</h3>
            
            <form onSubmit={triggerRazorpaySecure} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">Phone Number (India)</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">Address line</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-stone-400 uppercase tracking-wider mb-1">PINCODE</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Secure Delivery parameters */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 flex items-start gap-3 mt-4" id="courier-badge-box">
                <Truck className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-neutral-950 block">BlueDart Premium Atelier Courier</span>
                  All Darzi custom packages ship in zero-compression luxury wardrobe tubes with wooden coat hangers included so garments land in pristine, pressed posture ready for boardroom execution.
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-950 text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-neutral-800 transition-all font-semibold mt-4 shadow-xl cursor-pointer"
              >
                Proceed to Secure Payment Gateway
              </button>
            </form>
          </div>


          {/* RIGHT PANEL: Bespoke Order item summary */}
          <div className="lg:col-span-5 space-y-6" id="checkout-order-summary-panel">
            <h3 className="font-serif text-xl font-medium text-stone-900 border-b border-stone-100 pb-3">02. Order summary</h3>
            
            {/* Garment Summary Card */}
            <div className="bg-stone-50 border border-stone-150 p-6 rounded-3xl space-y-5" id="garment-checkout-card">
              
              <div className="flex gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                  <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">{cartItem.product.category}</span>
                  <h4 className="text-sm font-semibold text-neutral-950 mt-1">{cartItem.product.name}</h4>
                  <p className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mt-0.5">
                    Weave: {cartItem.selectedFabric.name}
                  </p>
                  <p className="text-[10px] font-mono text-stone-500 tracking-wider">
                    Shade: {cartItem.selectedColor.name}
                  </p>
                </div>
              </div>

              {/* Visual guides/options list */}
              <div className="border-t border-dashed border-stone-200 pt-4 space-y-2 text-xs font-mono text-stone-600" id="checkout-customs-list">
                <div className="flex justify-between">
                  <span>Sleeve length:</span>
                  <span className="text-stone-950">{cartItem.customizations.sleeveLength}</span>
                </div>
                {cartItem.customizations.lapelStyle && (
                  <div className="flex justify-between">
                    <span>Lapel:</span>
                    <span className="text-stone-950">{cartItem.customizations.lapelStyle}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Placket spacing:</span>
                  <span className="text-stone-950">{cartItem.customizations.buttonStyle}</span>
                </div>
                {cartItem.customizations.monogramText && (
                  <div className="flex justify-between font-semibold text-[#c5a880]">
                    <span>Golden Monogram:</span>
                    <span className="bg-[#c5a880]/15 px-2 py-0.5 rounded uppercase font-bold text-[#c5a880]">
                      "{cartItem.customizations.monogramText}"
                    </span>
                  </div>
                )}
                {cartItem.customizations.tailorNotes && (
                  <div className="bg-white p-3 rounded-lg border border-stone-150 text-[10px] text-stone-400 font-sans italic my-2 leading-relaxed">
                    Tailoring instructions: "{cartItem.customizations.tailorNotes}"
                  </div>
                )}
              </div>

              {/* Custom Measurements Summary list */}
              <div className="border-t border-stone-200/60 pt-4" id="checkout-measurements-review">
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-2">Saved Atelier Dimensions</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono bg-white border border-stone-150 p-2.5 rounded-xl text-stone-600">
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Height</span>
                    <strong className="text-stone-900">{userMeasurements.height}cm</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Bust</span>
                    <strong className="text-stone-900">{userMeasurements.bust}"</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Waist</span>
                    <strong className="text-stone-900">{userMeasurements.waist}"</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[8px] uppercase">Hip</span>
                    <strong className="text-stone-900">{userMeasurements.hip}"</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Total Panel */}
            <div className="border border-stone-150 p-6 rounded-3xl space-y-3.5 text-xs font-mono" id="checkout-summary-receipt">
              <div className="flex justify-between text-stone-600">
                <span>Apparel drafting & cut:</span>
                <span>₹{totalItemsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Handloom GST tax (12%):</span>
                <span>₹{taxCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Embassy courier insurance:</span>
                <span>₹{shippingCharge.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-stone-250 pt-3.5 flex justify-between font-sans text-sm font-bold text-neutral-950" id="receipt-totals-box">
                <span>Total Payable Bespoke Amount</span>
                <span className="font-mono text-base font-extrabold text-[#c5a880]">₹{finalOrderTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Lifetime security badge */}
            <div className="bg-stone-50 p-5 rounded-2xl text-[10px] text-stone-400 text-center leading-relaxed font-mono" id="post-sales-guarantees-badge">
              <span className="font-semibold uppercase block text-stone-600">✓ Lifetime Alterations Assurance</span>
              Should your waist proportions or hip contour adapt over time, we collect, re-press, re-stitch, and return your Darzi apparel with zero fees.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
