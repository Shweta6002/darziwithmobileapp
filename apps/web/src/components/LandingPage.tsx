/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, ChevronRight, Ruler, Award, Sparkles, MessageCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onDesignPerfectFit: () => void;
  onBrowseCollections: () => void;
  onStartMeasurements: () => void;
}

export default function LandingPage({
  onDesignPerfectFit,
  onBrowseCollections,
  onStartMeasurements
}: LandingPageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [teaserHeight, setTeaserHeight] = useState("163");
  const [teaserBust, setTeaserBust] = useState("34");
  const [teaserWaist, setTeaserWaist] = useState("28");
  const [teaserSizeOutput, setTeaserSizeOutput] = useState("DRZ 36-T (Highly Tailored)");

  const handleSimulateTeaser = () => {
    // Elegant deterministic rule
    const bustNum = parseInt(teaserBust) || 34;
    const sizeVal = bustNum + 2;
    setTeaserSizeOutput(`DRZ ${sizeVal}-T (Tailored Slimfit)`);
  };

  const steps = [
    {
      title: "01. Design Customization",
      description: "Select your corporate silhouette—from crop blazers to high-waist trousers. Select necklines, sleeve rise, pockets, and custom lapels.",
      badge: "No standard sizes",
      image: "https://images.unsplash.com/photo-1487309078313-fe80c3e15ade?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "02. Select Premium Indian Textiles",
      description: "Touch the finest Banarasi Linen-Liva blends, tri-acetate crease-free crepe, and buttery soft Bhagalpur Mulberry Silk cotton.",
      badge: "Artisanal & Eco-safe",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "03. Guided AI Sizing Engine",
      description: "Input height, weight, and key areas. Our machine-learning algorithms cross-reference historic alteration loops to draft a perfect pattern.",
      badge: "98% First-Fit Accuracy",
      image: "https://images.unsplash.com/photo-1558191053-8ed98e652a5e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "04. Master Tailor Crafting",
      description: "Your digital pattern is physicalized. Master tailors in our local atelier hand-cut, drape, double-stitch, and monogram your garment.",
      badge: "Ready in 10 Days",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const testimonials = [
    {
      name: "Radhika Sen",
      designation: "Partner at Sequoia-Scale VP",
      location: "Bangalore",
      comment: "I spent active career years adjusting blazer shoulders that looked oversized. My Darzi Pragati coat fits like a glove. The sweat-guards and active phone pockets are game-changing.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Priya Nair",
      designation: "Product Lead at RazorFin Tech",
      location: "Mumbai",
      comment: "I wore the Shiva trousers to our IPO presentation. Sitting down for hours with zero creases and a waist that stretches with me was luxurious. The khadi-denim shirt is equally beautiful.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Anjali Gupta",
      designation: "Director of HR, ConsultPro",
      location: "Gurugram",
      comment: "Darzi solved corporate clothes shopping and returns. The AI predicted size adjusted for my shoulder average flawlessly. The tailoring is pristine, and buttons are extra secured.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="bg-white min-h-screen" id="landing-page-root">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 overflow-hidden" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Column Typography */}
            <div className="lg:col-span-7 flex flex-col space-y-8 animate-fade-in" id="hero-left-column">
              <div className="inline-flex items-center space-x-2 bg-stone-50 border border-stone-100 rounded-full px-4 py-1.5 self-start">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="text-[10px] font-mono tracking-widest text-stone-600 uppercase">
                  Re-engineering Custom Corporate Womenswear
                </span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-900 leading-[1.05]" id="hero-title">
                The Silhouette <br />
                <span className="italic font-normal text-stone-500 font-serif">Of Power.</span>
              </h1>
              
              <p className="text-stone-600 text-base sm:text-lg max-w-xl font-sans" id="hero-subtext">
                Uncompromising luxury corporate tailoring for Indian women professionals. 
                Custom-fit draftings created through AI-assisted body alignment, 
                tailored in fine local Banarasi cottons, fine merino, and breathable stretch crepe.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4" id="hero-cta-group">
                <button
                  onClick={onDesignPerfectFit}
                  id="hero-primary-cta"
                  className="bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-8 py-5 rounded-full hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2 group shadow-xl shadow-neutral-900/10 cursor-pointer"
                >
                  <span>Design Your Perfect Fit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#c5a880]" />
                </button>
                <button
                  onClick={onBrowseCollections}
                  id="hero-secondary-cta"
                  className="border border-stone-250 py-5 px-8 text-neutral-900 font-mono text-xs uppercase tracking-widest rounded-full hover:bg-stone-50 transition-all text-center cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>

              {/* Sub features list */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-100 font-mono" id="hero-features-grid">
                <div>
                  <div className="text-lg font-bold text-neutral-900">10 Days</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-widest">Doorstep Delivery</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">98.4%</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-widest">First-Fit Match</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">Free</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-widest">Lifetime Alterations</div>
                </div>
              </div>
            </div>

            {/* Hero Right Column - Premium Asymmetrical Fashion Imagery */}
            <div className="lg:col-span-5 relative" id="hero-right-column">
              <div className="relative w-full h-[550px] rounded-3xl overflow-hidden bg-stone-100 group border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700"
                  alt="Corporate Tailor Coat Premium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] object-top"
                  referrerPolicy="no-referrer"
                  id="hero-img-primary"
                />
                
                {/* Floating Micro AI Widget */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-stone-100 shadow-xl flex items-center justify-between" id="hero-floating-badge">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#c5a880]/10 flex items-center justify-center rounded-xl text-[#c5a880]">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-950 font-sans">Indian Fit Optimization</div>
                      <div className="text-[10px] font-mono text-stone-500">Recalculated rise for height averages</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              </div>

              {/* Tiny overlapping image for boutique layer feel */}
              <div className="absolute -top-6 -left-6 hidden xl:block w-36 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400"
                  alt="Close design detail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. HOW DARZI WORKS (DYNAMIC STEPPER) */}
      <section className="py-24 bg-stone-50 border-y border-stone-100" id="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16" id="stepper-header">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-stone-400 mb-3">Atelier Guidelines</h2>
            <p className="font-serif text-3xl sm:text-4xl px-2 text-neutral-900">
              The Digital Sartorial Journey
            </p>
            <p className="text-stone-500 text-sm mt-3">
              We substitute mass production rack shopping with dynamic mathematical pattern drafting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="stepper-content-grid">
            
            {/* Step Selection - Left Panel */}
            <div className="lg:col-span-5 space-y-3" id="stepper-steps-left">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  id={`step-trigger-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl transition-all border cursor-pointer ${
                    activeStep === idx 
                      ? "bg-white border-stone-200 shadow-xl shadow-stone-100/50 translate-x-1" 
                      : "bg-transparent border-transparent hover:bg-stone-100/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      activeStep === idx ? "bg-stone-950 text-white" : "bg-stone-200 text-stone-600"
                    }`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-neutral-950 mt-3">{step.title}</h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">{step.description}</p>
                </button>
              ))}
            </div>

            {/* Step Visual Preview - Right Panel */}
            <div className="lg:col-span-7" id="stepper-visual-right">
              <div className="bg-white rounded-3xl p-8 border border-stone-150 shadow-2xl relative h-100 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 left-0 bottom-0 opacity-10 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="relative z-10 flex gap-6 h-full items-center">
                  <div className="w-1/2 flex flex-col justify-between h-full py-2">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880]">Active Sizing Step</span>
                      <h4 className="font-serif text-2xl text-neutral-900 mt-1 leading-snug">{steps[activeStep].title}</h4>
                      <p className="text-xs text-stone-500 mt-3 leading-relaxed">{steps[activeStep].description}</p>
                    </div>

                    <button 
                      onClick={onStartMeasurements}
                      className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-neutral-950 hover:text-[#c5a880] transition-colors mt-4 self-start"
                    >
                      <span>LAUNCH ATELIER CALIBRATOR</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <div className="w-1/2 h-full rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 shadow-inner">
                    <img
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2.5 z-10 mt-2">
                  {steps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === idx ? "w-10 bg-neutral-900" : "w-4.5 bg-stone-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. DYNAMIC AI FIT ESTIMATOR TEASER */}
      <section className="py-24 bg-white" id="ai-teaser-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-neutral-900 via-[#1a1917] to-neutral-950 text-white rounded-[2.5rem] p-8 sm:p-14 lg:p-18 border border-neutral-800 shadow-3xl relative overflow-hidden">
            
            {/* Ambient pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Teaser Left */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-neutral-800/85 border border-neutral-700/50 px-3.5 py-1 rounded-full text-[10px] font-mono text-[#c5a880] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#c5a880]" />
                  <span>Interactive Sizer Preview</span>
                </div>
                
                <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-tight">
                  Calculate Your <br />
                  <span className="italic text-[#c5a880]">Darzi Fit</span> Instantly.
                </h2>
                
                <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                  We developed our neural fitting engine specifically for corporate silhouettes. Input your core metrics to preview how our patterns adapt to your torso contour.
                </p>

                <div className="space-y-4 pt-2 text-stone-300 font-mono text-xs">
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-4.5 h-4.5 text-[#c5a880]" />
                    <span>Cross-references 12,000+ custom measurement profiles</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Ruler className="w-4.5 h-4.5 text-[#c5a880]" />
                    <span>Estimates drape rise, shoulder alignment & waist-ease values</span>
                  </div>
                </div>
              </div>

              {/* Teaser Calculator Board */}
              <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl" id="teaser-calc-board">
                <span className="font-mono text-[9px] tracking-widest text-[#c5a880] uppercase">Micro TrueFit Core Inputs</span>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={teaserHeight}
                      onChange={(e) => setTeaserHeight(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-2">Bust (in)</label>
                    <input
                      type="number"
                      value={teaserBust}
                      onChange={(e) => setTeaserBust(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-2">Waist (in)</label>
                    <input
                      type="number"
                      value={teaserWaist}
                      onChange={(e) => setTeaserWaist(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors text-center"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSimulateTeaser}
                  id="teaser-calc-submit"
                  className="w-full bg-white text-neutral-950 font-mono text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-stone-100 transition-colors font-semibold mt-6 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>RE-CALCULATE PATTERN MATCH</span>
                </button>

                {/* Sizing Output Display Box */}
                <div className="mt-6 border-t border-white/10 pt-4" id="teaser-output-box">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                    <div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Recommended Digital Base Size</div>
                      <div className="text-sm font-semibold text-[#c5a880] mt-1 font-mono">{teaserSizeOutput}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Confidence</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1 font-mono">98% Match</div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button 
                    onClick={onDesignPerfectFit}
                    className="text-[10px] font-mono text-[#c5a880] hover:text-white underline tracking-widest uppercase transition-colors"
                  >
                    Unlock Full 8-Point Measurement Studio
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 4. REVIEWS & TESTIMONIALS */}
      <section className="py-24 bg-stone-50 border-t border-stone-150" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16" id="testimonials-header">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-stone-400 mb-2 block">Executive Feedback</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 italic">Trusted by Women Leaders</h2>
            <p className="text-stone-500 text-sm mt-3 font-sans">
              From tech unicorn founders to consulting advisors, women in major spaces style with Darzi to reclaim postural elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                id={`testimonial-card-${index}`}
                className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/30 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex text-[#c5a880] space-x-1.5 mb-5 font-bold font-serif">★★★★★</div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed tracking-wide italic font-sans">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-6 border-t border-stone-100 pt-4" id={`testimonial-author-${index}`}>
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 font-sans">{test.name}</h4>
                    <p className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mt-0.5">{test.designation}</p>
                    <p className="text-[9px] text-stone-400 font-mono italic">{test.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Trust Accents */}
          <div className="mt-16 text-center border-t border-stone-150 pt-10" id="trust-accents">
            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.25em]">Guaranteed Atelier Process Assured</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-6 text-xs text-stone-500 font-mono uppercase tracking-widest">
              <span>✓ Certified Luxury Indian Weaves</span>
              <span>✓ Triple-Secured Stitch Loops</span>
              <span>✓ High Sitting desk ease ratios</span>
              <span>✓ Climate-smart cooling layers</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
