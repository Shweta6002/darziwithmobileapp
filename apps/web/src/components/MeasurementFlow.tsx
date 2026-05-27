/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BodyMeasurements, AIRecommendation } from "../types";
import { Sparkles, HelpCircle, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface MeasurementFlowProps {
  initialMeasurements: BodyMeasurements;
  onSaveMeasurements: (measurements: BodyMeasurements, recommendation: AIRecommendation) => void;
  onCancel: () => void;
}

export default function MeasurementFlow({
  initialMeasurements,
  onSaveMeasurements,
  onCancel
}: MeasurementFlowProps) {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Custom measurement states state parameters
  const [height, setHeight] = useState<number>(initialMeasurements.height);
  const [weight, setWeight] = useState<number>(initialMeasurements.weight);
  const [bodyType, setBodyType] = useState<string>(initialMeasurements.bodyType || "Hourglass");
  const [shoulder, setShoulder] = useState<number>(initialMeasurements.shoulder);
  const [bust, setBust] = useState<number>(initialMeasurements.bust);
  const [waist, setWaist] = useState<number>(initialMeasurements.waist);
  const [hip, setHip] = useState<number>(initialMeasurements.hip);
  const [inseam, setInseam] = useState<number>(initialMeasurements.inseam);
  
  // Field interaction helper to highlight vector SVG nodes
  const [focusedField, setFocusedField] = useState<string>("general");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Body Type presets containing styling indicators
  const bodyTypesList = [
    { value: "Hourglass", label: "Hourglass", desc: "Balanced hips & shoulders, defined waist outline", icon: "⏳" },
    { value: "Pear", label: "Pear Shape", desc: "Thigh and hip width curves exceed shoulder frame", icon: "🍐" },
    { value: "Rectangle", label: "Rectangle", desc: "Even, athletic dimensions from chest to hips", icon: "▭" },
    { value: "Inverted Triangle", label: "Inverted Triangle", desc: "Athletic shoulders tapering down into slimmer waist", icon: "▼" },
    { value: "Apple", label: "Apple Shape", desc: "Generous middle frame, balanced shoulders and thighs", icon: "🍎" }
  ];

  // Dynamically calculate Fit Confidence score & Sizing prediction as they input!
  // High input proximity to standard ratios increases confidence metrics
  const calculateAIConfidence = (): number => {
    let score = 99;
    if (height < 140 || height > 190) score -= 5;
    if (weight < 40 || weight > 100) score -= 5;
    if (shoulder < 13 || shoulder > 18) score -= 4;
    if (bust < 30 || bust > 46) score -= 4;
    if (waist < 24 || waist > 42) score -= 4;
    return Math.max(88, score);
  };

  const calculatePredictedSize = (): string => {
    // Estimations matching Indian professional metrics
    if (bust <= 32) return "DRZ 32-T (S / Smalltailor)";
    if (bust <= 35) return "DRZ 34-T (M / Intermediatetailor)";
    if (bust <= 38) return "DRZ 36-T (M / Mediumtailor)";
    if (bust <= 41) return "DRZ 38-T (L / Largetailor)";
    return "DRZ 40-T (XL / Comforttailor)";
  };

  const generateAIBodyAnalysis = (): string => {
    const isCurvy = bust - waist > 8 && hip - waist > 8;
    const isPetite = height < 155;
    const shapeStr = bodyType || (isCurvy ? "Hourglass" : "Balanced Silhouette");
    
    return `${shapeStr} proportion detected with ${isPetite ? 'petite vertical rise offsets' : 'standard executive vertical rise'}. We suggest matching sleeve hems with surgeon cuff openings to maintain neat posture dynamics during screen typing. A ${weight}kg skeleton load indicates pattern ease variables should prioritize lateral stretch.`;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setIsSubmitting(true);
    
    // Simulate active deep machine learning calculation process
    setTimeout(() => {
      const finalMeasurements: BodyMeasurements = {
        height,
        weight,
        bodyType: bodyType as any,
        shoulder,
        bust,
        waist,
        hip,
        inseam
      };

      const finalRecommendation: AIRecommendation = {
        predictedSize: calculatePredictedSize(),
        fitConfidence: calculateAIConfidence(),
        bodyShapeAnalysis: generateAIBodyAnalysis(),
        recommendedFitType: "Tailored Comfort",
        suggestedAdjustments: {
          bust: bust < 34 ? "Slightly snug standard tuck" : "Added stretch contour side tuck",
          waist: waist > 30 ? "+0.75 in comfort-stretch waistband ease" : "Contoured precise fit draftings",
          hip: "Free flowing drape outline",
          shoulder: "Zero shoulder droop, targeted alignment"
        }
      };

      onSaveMeasurements(finalMeasurements, finalRecommendation);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen py-10" id="measurement-wizard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wizard Header */}
        <div className="flex justify-between items-center border-b border-stone-100 pb-6 mb-8" id="wizard-header">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880] mb-1 block">Atelier Studio Calibrator</span>
            <h1 className="font-serif text-3xl text-neutral-950 font-semibold">Configure Your TrueFit Profile</h1>
          </div>
          <button
            onClick={onCancel}
            className="text-stone-400 hover:text-neutral-900 font-mono text-xs uppercase"
            id="wizard-exit-btn"
          >
            ✕ Exit Atelier
          </button>
        </div>

        {/* Wizard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="wizard-grid-row">
          
          {/* LEFT SIDE: Active configuration sliders */}
          <div className="lg:col-span-7 space-y-8" id="wizard-left-params">
            
            {/* Steps Progress Visualizer */}
            <div className="flex gap-2" id="wizard-step-bubbles">
              {["01. Sizing Stats", "02. Upper Frame", "03. Lower Frame", "04. Summary Review"].map((label, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 text-center py-2.5 rounded-xl border font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    currentStep === idx 
                      ? "bg-neutral-950 text-white font-semibold border-neutral-950 shadow-md" 
                      : currentStep > idx 
                        ? "bg-stone-50 text-stone-600 border-stone-200" 
                        : "bg-transparent text-stone-300 border-stone-100"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* STEP 0: Sizing General Stats */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in" id="wizard-step-0-panel">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">General Sizing Metrics</h3>
                  <p className="text-stone-500 text-xs mt-1">Provide core framework variables to align the algorithmic pattern drapes.</p>
                </div>

                {/* Slider Height */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">HEIGHT (cm)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="195"
                    value={height}
                    onFocus={() => setFocusedField("height")}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>140cm (4'7")</span>
                    <span>170cm (5'7")</span>
                    <span>195cm (6'5")</span>
                  </div>
                </div>

                {/* Slider Weight */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">WEIGHT (kg)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="110"
                    value={weight}
                    onFocus={() => setFocusedField("weight")}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>40 kg</span>
                    <span>75 kg</span>
                    <span>110 kg</span>
                  </div>
                </div>

                {/* Body Type Selection Cards */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-medium text-stone-700 uppercase">Body Shape Silhouette</label>
                  <p className="text-[11px] text-stone-400">Select the shape description closest to your silhouette average.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {bodyTypesList.map((typeObj) => (
                      <button
                        key={typeObj.value}
                        onClick={() => {
                          setBodyType(typeObj.value);
                          setFocusedField("bodyType");
                        }}
                        className={`text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                          bodyType === typeObj.value 
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xl" 
                            : "bg-stone-50 text-stone-800 border-transparent hover:bg-stone-100"
                        }`}
                      >
                        <span className="text-2xl mt-0.5">{typeObj.icon}</span>
                        <div>
                          <h4 className="text-xs font-semibold">{typeObj.label}</h4>
                          <p className={`text-[10px] mt-1 leading-snug ${bodyType === typeObj.value ? "text-stone-300" : "text-stone-500"}`}>
                            {typeObj.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Upper Frame calibration (Bust & Shoulders) */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in" id="wizard-step-1-panel">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">Upper Torso Alignment</h3>
                  <p className="text-stone-500 text-xs mt-1">Enter your upper frame metrics to avoid jacket sleeve pulls or neck gaping.</p>
                </div>

                {/* Shoulder breadth */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">SHOULDER WIDTH (inches)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{shoulder} in</span>
                  </div>
                  <input
                    type="range"
                    min="12.0"
                    max="19.0"
                    step="0.25"
                    value={shoulder}
                    onFocus={() => setFocusedField("shoulder")}
                    onChange={(e) => setShoulder(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>12.0" (Narrow)</span>
                    <span>15.0" (Average)</span>
                    <span>19.0" (Athletic Broad)</span>
                  </div>
                </div>

                {/* Bust */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">BUST CONTOUR (inches)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{bust} in</span>
                  </div>
                  <input
                    type="range"
                    min="28.0"
                    max="48.0"
                    step="0.5"
                    value={bust}
                    onFocus={() => setFocusedField("bust")}
                    onChange={(e) => setBust(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>28.0"</span>
                    <span>36.0"</span>
                    <span>48.0"</span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-sans italic flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 text-stone-300" />
                    <span>Wrap tape across the fullest projection area of your chest.</span>
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Lower Frame calibration (Waist, Hip, Inseam) */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in" id="wizard-step-2-panel">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">Lower Frame Alignment</h3>
                  <p className="text-stone-500 text-xs mt-1">Calibrate trouser waist seating and straight-hip rise clearances.</p>
                </div>

                {/* Waist */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">NATURAL WAIST (inches)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{waist} in</span>
                  </div>
                  <input
                    type="range"
                    min="22.0"
                    max="44.0"
                    step="0.5"
                    value={waist}
                    onFocus={() => setFocusedField("waist")}
                    onChange={(e) => setWaist(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>22.0"</span>
                    <span>30.0"</span>
                    <span>44.0"</span>
                  </div>
                </div>

                {/* Hips */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">HIPS CONTOUR (inches)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{hip} in</span>
                  </div>
                  <input
                    type="range"
                    min="30.0"
                    max="52.0"
                    step="0.5"
                    value={hip}
                    onFocus={() => setFocusedField("hip")}
                    onChange={(e) => setHip(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>30.0"</span>
                    <span>38.0"</span>
                    <span>52.0"</span>
                  </div>
                </div>

                {/* Inseam */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-mono font-medium text-stone-700">LEG INSEAM LENGTH (inches)</label>
                    <span className="text-sm font-semibold text-neutral-950 font-mono">{inseam} in</span>
                  </div>
                  <input
                    type="range"
                    min="24.0"
                    max="34.0"
                    step="0.5"
                    value={inseam}
                    onFocus={() => setFocusedField("inseam")}
                    onChange={(e) => setInseam(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>24.0" (Short-crop)</span>
                    <span>28.0" (Standard)</span>
                    <span>34.0" (Floor rise)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Summary Review Panel */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in text-neutral-900 font-sans" id="wizard-step-3-panel">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-serif text-xl font-semibold">Verify Pattern Specifications</h3>
                  <p className="text-stone-500 text-xs mt-1">Ensure everything matches before launching our AI neural drapers.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="review-metrics-summary-grid">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Height</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{height} cm</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Weight</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{weight} kg</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Shoulders</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{shoulder}"</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Bust Width</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{bust}"</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Waistline</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{waist}"</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Hips Outspan</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{hip}"</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Leg Inseam</span>
                    <div className="text-sm font-bold font-mono text-neutral-950 mt-1">{inseam}"</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Silhouette Type</span>
                    <div className="text-xs font-bold text-[#c5a880] mt-1.5">{bodyType}</div>
                  </div>
                </div>

                <div className="bg-stone-950 text-white p-6 rounded-2xl border border-neutral-900 flex items-start gap-4" id="ai-review-prediction-banner">
                  <div className="w-10 h-10 bg-[#c5a880]/15 flex items-center justify-center rounded-xl text-[#c5a880]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Estimated Darzi Blueprint Match</h4>
                    <p className="text-[11px] text-[#c5a880] font-mono mt-1 font-bold">{calculatePredictedSize()}</p>
                    <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                      Sizing confidence scored at <strong>{calculateAIConfidence()}% accuracy</strong> based on weight-to-height Indian vertical standards. Final adjustments are hand-verified by our Atelier Master Taylor before cutting raw rolls.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Wizard Buttons footer */}
            <div className="flex justify-between items-center pt-8 border-t border-stone-100" id="wizard-navigation-buttons-row">
              <button
                disabled={currentStep === 0}
                onClick={handleBack}
                className={`py-3.5 px-6 rounded-full border text-xs font-mono uppercase tracking-widest transition-colors ${
                  currentStep === 0 
                    ? "opacity-30 cursor-not-allowed border-stone-100 text-stone-300" 
                    : "border-stone-200 hover:bg-stone-50 text-neutral-900 cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </div>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="bg-neutral-900 text-white py-3.5 px-8 rounded-full hover:bg-neutral-800 transition-all font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-8 rounded-full hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-600/10 font-bold"
                >
                  {isSubmitting ? (
                    <span>Calibrating Engine...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Save atelier profile</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>


          {/* RIGHT SIDE: Glowing vector SVG body alignment guide */}
          <div className="lg:col-span-5" id="wizard-right-illustrations">
            <div className="bg-stone-50 border border-stone-150 rounded-[2rem] p-8 flex flex-col justify-between items-center relative h-[520px] overflow-hidden">
              <span className="font-mono text-[9px] text-[#c5a880] uppercase tracking-widest absolute top-6">
                Active Laser Vector alignment
              </span>

              {/* Vector body outline SVG */}
              <svg 
                viewBox="0 0 100 220" 
                className="w-full h-88 text-stone-300 transition-all saturate-100"
                id="vector-body-guideline-svg"
              >
                {/* Hair Outline */}
                <ellipse cx="50" cy="18" rx="8" ry="7" fill="#c5a880" opacity="0.15" />
                
                {/* Head */}
                <circle cx="50" cy="22" r="6.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
                
                {/* Neck */}
                <path d="M48 28 L48 34 M52 28 L52 34" stroke="currentColor" strokeWidth="0.8" />
                
                {/* Shoulders Spine horizontal */}
                <path 
                  d="M32 38 L68 38" 
                  stroke={focusedField === "shoulder" ? "#c5a880" : "currentColor"} 
                  strokeWidth={focusedField === "shoulder" ? "1.8" : "0.8"} 
                  className="transition-all"
                />
                
                {/* Shoulder joint rings */}
                <circle cx="32" cy="38" r="1.5" fill={focusedField === "shoulder" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />
                <circle cx="68" cy="38" r="1.5" fill={focusedField === "shoulder" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />

                {/* Chest/Bust lines */}
                <path 
                  d="M33 58 L67 58" 
                  stroke={focusedField === "bust" ? "#c5a880" : "currentColor"} 
                  strokeWidth={focusedField === "bust" ? "1.8" : "0.8"} 
                  className="transition-all animate-pulse"
                />
                <circle cx="50" cy="58" r="2.5" fill={focusedField === "bust" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />

                {/* Waist lines narrower torso */}
                <path 
                  d="M36 82 L64 82" 
                  stroke={focusedField === "waist" ? "#c5a880" : "currentColor"} 
                  strokeWidth={focusedField === "waist" ? "1.8" : "0.8"}
                  className="transition-all"
                />
                <circle cx="50" cy="82" r="2.5" fill={focusedField === "waist" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />

                {/* Hips outline layout */}
                <path 
                  d="M32 108 L68 108" 
                  stroke={focusedField === "hip" ? "#c5a880" : "currentColor"} 
                  strokeWidth={focusedField === "hip" ? "1.8" : "0.8"}
                  className="transition-all"
                />
                <circle cx="32" cy="108" r="2" fill={focusedField === "hip" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />
                <circle cx="68" cy="108" r="2" fill={focusedField === "hip" ? "#c5a880" : "none"} stroke="currentColor" strokeWidth="0.5" />

                {/* Leg skeleton outlines inseam */}
                <path 
                  d="M45 108 L45 180" 
                  stroke={focusedField === "inseam" ? "#c5a880" : "currentColor"} 
                  strokeWidth={focusedField === "inseam" ? "1.8" : "0.8"}
                  className="transition-all"
                />
                <path d="M55 108 L55 180" stroke="currentColor" strokeWidth="0.8" />

                {/* Generalized contours of women's frame subtle background */}
                <path 
                  d="M32 38 C32 45 33 55 33 58 C33 70 36 78 36 82 C36 94 32 102 32 108 C32 120 42 185 43 192 L45 192" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.4" 
                  opacity="0.3"
                />
                <path 
                  d="M68 38 C68 45 67 55 67 58 C67 70 64 78 64 82 C64 94 68 102 68 108 C68 120 58 185 57 192 L55 192" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.4" 
                  opacity="0.3"
                />

                {/* Highlight highlight indicator overlays */}
                {focusedField === "height" && (
                  <path d="M12 20 L12 195 M10 20 L14 20 M10 195 L14 195" stroke="#c5a880" strokeWidth="1" />
                )}
              </svg>

              {/* Focused Node Guidelines overlay feedback box */}
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-lg text-center font-sans max-w-xs" id="guidance-overlay-box">
                {focusedField === "general" && (
                  <>
                    <h5 className="text-xs font-semibold text-stone-900 font-mono">Profile Calibrations</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Input simple height and skeleton markers to assist early size templates configuration.</p>
                  </>
                )}
                {focusedField === "height" && (
                  <>
                    <h5 className="text-xs font-semibold text-stone-900 font-mono">Vertical Pattern Shifting</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Adjusts lapel heights and arm-pit clearance offsets to prevent neck gap tightness when rising shoulders.</p>
                  </>
                )}
                {focusedField === "weight" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Lateral Sizing Cushion</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Calculates general mass distribution to add comfortable elastic properties under active corporate sitting sessions.</p>
                  </>
                )}
                {focusedField === "shoulder" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Shoulder Breadth Joint</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Defines blazer pad margins. A standard professional average sits strictly between 14” and 16”.</p>
                  </>
                )}
                {focusedField === "bust" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Full Bust Contour</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Defines front volume coefficients. Crucial to guarantee blazer buttons do not strain or gap under tension.</p>
                  </>
                )}
                {focusedField === "waist" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Natural Waist Line</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Our custom-fit incorporates a +0.5" default relax cushion so your trousers breath smoothly after corporate meals.</p>
                  </>
                )}
                {focusedField === "hip" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Straight Hip Span</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Anchors trousers pocket drapes and Midi sheath skirts, preventing seam pulling over active sitting walks.</p>
                  </>
                )}
                {focusedField === "inseam" && (
                  <>
                    <h5 className="text-xs font-semibold text-[#c5a880] font-mono">Trouser Inseam Length</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Measures crotch crease down to bottom ankle. Crop trouser standard average sits strictly around 27.5”.</p>
                  </>
                )}
                {focusedField === "bodyType" && (
                  <>
                    <h5 className="text-xs font-semibold text-stone-900 font-mono">Silhouette Curvature Outline</h5>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">Drives how custom seams drape over lower and middle curvature, shifting shoulder darts as required.</p>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
