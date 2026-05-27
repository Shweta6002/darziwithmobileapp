import { useState } from "react";
import { 
  Smartphone, 
  QrCode, 
  Sparkles, 
  ShoppingBag, 
  Compass, 
  User, 
  Scissors, 
  ArrowRight, 
  Check, 
  Layers, 
  Terminal, 
  Copy,
  ChevronRight,
  Info
} from "lucide-react";

export default function MobilePreviewPage() {
  const [activeTab, setActiveTab] = useState<"home" | "discover" | "orders" | "profile" | "measure">("home");
  const [calibrationStep, setCalibrationStep] = useState<number>(1);
  const [fitPreference, setFitPreference] = useState<"Slim" | "Regular" | "Relaxed">("Regular");
  const [measurementValues, setMeasurementValues] = useState({
    neck: 15.5,
    chest: 40,
    shoulder: 18.5,
    sleeve: 34
  });
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("cd apps/mobile && npm install && npx expo start");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStepNext = () => {
    if (calibrationStep < 4) {
      setCalibrationStep(s => s + 1);
    } else {
      setActiveTab("profile");
      setCalibrationStep(1);
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="mobile-preview-workspace">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#c5a880]/10 text-[#c5a880] px-4 py-1.5 rounded-full border border-[#c5a880]/20">
            <Smartphone className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Native Experience Suite</span>
          </div>
          <img
            src="/darzi-name-logo.png"
            alt="Darzi"
            className="h-20 sm:h-24 w-auto object-contain mx-auto"
          />
          <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Scan and run the bespoke Expo.js mobile experience directly on your cellular device, or explore the live high-fidelity interactive physical simulator below.
          </p>
        </div>

        {/* Master Control Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column A: Setup instructions & Official QR code */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The Ultimate Expo Go QR Code Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm space-y-6 relative overflow-hidden" id="qr-scandoc-holder">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center space-x-3.5 pb-4 border-b border-stone-100">
                <div className="bg-[#c5a880]/15 p-2 rounded-xl">
                  <QrCode className="w-6 h-6 text-[#c5a880]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-neutral-900 font-bold">Expo Dev Tunnel & System Code</h3>
                  <p className="text-stone-400 text-xs">Scan using matching iOS/Android Expo Go clients</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Simulated high-quality QR vector block */}
                <div className="md:col-span-5 flex flex-col items-center space-y-3">
                  <div className="p-4 bg-white rounded-3xl border-2 border-[#c5a880]/25 shadow-md hover:border-[#c5a880] transition-colors duration-300">
                    {/* SVG Vector high-fidelity QR representation */}
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      {/* Quiet Zone Grid */}
                      <rect width="100" height="100" fill="white" />
                      
                      {/* Position Finder: Top-Left */}
                      <rect x="5" y="5" width="25" height="25" fill="#17181c" rx="2" />
                      <rect x="10" y="10" width="15" height="15" fill="white" rx="1" />
                      <rect x="13" y="13" width="9" height="9" fill="#c5a880" rx="1" />
                      
                      {/* Position Finder: Top-Right */}
                      <rect x="70" y="5" width="25" height="25" fill="#17181c" rx="2" />
                      <rect x="75" y="10" width="15" height="15" fill="white" rx="1" />
                      <rect x="78" y="13" width="9" height="9" fill="#c5a880" rx="1" />
                      
                      {/* Position Finder: Bottom-Left */}
                      <rect x="5" y="70" width="25" height="25" fill="#17181c" rx="2" />
                      <rect x="10" y="75" width="15" height="15" fill="white" rx="1" />
                      <rect x="13" y="78" width="9" height="9" fill="#c5a880" rx="1" />

                      {/* Small Alignment Pattern Bottom-Right */}
                      <rect x="75" y="75" width="10" height="10" fill="#17181c" rx="1" />
                      <rect x="78" y="78" width="4" height="4" fill="white" />
                      
                      {/* Simulated Random Data Modules block pattern */}
                      <g fill="#17181c">
                        {/* Selected dense modules matching real app scheme */}
                        <rect x="35" y="5" width="5" height="10" />
                        <rect x="42" y="8" width="8" height="5" />
                        <rect x="55" y="5" width="5" height="15" />
                        <rect x="62" y="12" width="5" height="5" />
                        
                        <rect x="35" y="20" width="10" height="5" />
                        <rect x="50" y="22" width="15" height="5" />
                        <rect x="42" y="27" width="8" height="8" fill="#c5a880" />
                        
                        <rect x="5" y="35" width="15" height="5" />
                        <rect x="10" y="42" width="5" height="12" />
                        <rect x="25" y="38" width="8" height="5" />
                        <rect x="35" y="35" width="15" height="15" fill="#17181c" />
                        <rect x="40" y="40" width="5" height="5" fill="white" />
                        
                        <rect x="55" y="35" width="12" height="5" />
                        <rect x="72" y="38" width="5" height="15" />
                        <rect x="82" y="35" width="15" height="5" />
                        <rect x="90" y="42" width="5" height="10" />

                        <rect x="5" y="55" width="10" height="5" />
                        <rect x="22" y="52" width="8" height="12" />
                        <rect x="35" y="55" width="5" height="20" />
                        <rect x="45" y="60" width="15" height="5" />
                        <rect x="52" y="68" width="8" height="12" />

                        <rect x="70" y="55" width="20" height="5" />
                        <rect x="75" y="62" width="5" height="8" />
                        <rect x="85" y="68" width="10" height="5" />

                        <rect x="35" y="80" width="15" height="5" />
                        <rect x="42" y="88" width="12" height="6" />
                        <rect x="58" y="82" width="5" height="12" />
                        
                        <rect x="70" y="88" width="5" height="7" />
                        <rect x="88" y="88" width="8" height="5" fill="#c5a880" />
                      </g>
                    </svg>
                  </div>
                  <span className="font-mono text-[9px] text-stone-400 font-bold uppercase tracking-widest bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                    EXPO DEEPLINK PORT 8081
                  </span>
                </div>

                {/* Explicit Scanning instructions */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono text-neutral-900 uppercase tracking-wider font-bold">Quick Execution Protocol:</h4>
                  
                  <ol className="text-xs space-y-3.5 text-stone-600 font-sans" id="scanning_steps">
                    <li className="flex items-start space-x-2.5">
                      <span className="bg-stone-100 text-stone-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">1</span>
                      <p>Download the free official **Expo Go** application from the iOS App Store or Android Google Play Store.</p>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <span className="bg-stone-100 text-stone-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">2</span>
                      <p>Ensure your cellular device is connected to the matching network host running the local computer stream.</p>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <span className="bg-stone-100 text-stone-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">3</span>
                      <p>Open the screen **Camera tool** (iOS) or trigger the **Scan QR Code** action inside Expo Go (Android) to load the compiled applet immediately.</p>
                    </li>
                  </ol>

                  <div className="mt-2 bg-amber-50 rounded-2xl p-3 border border-amber-200/50 flex items-start space-x-2">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10.5px] text-amber-800 leading-normal font-sans">
                      <strong>Host Sync Notice:</strong> Dev servers bind cleanly on <code className="bg-amber-100 px-1 rounded text-neutral-900">0.0.0.0</code> and proxy via the Expo runtime stack configured under <code className="bg-amber-100 px-1 rounded text-neutral-900">/apps/mobile</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Commands Block Workspace */}
            <div className="bg-stone-900 p-6 rounded-[2rem] border border-stone-800 text-[#b1b1b1] space-y-4" id="developer_terminal">
              <div className="flex justify-between items-center pb-3 border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-[#c5a880]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#c5a880] font-bold">Atelier CLI Terminals</span>
                </div>
                <button
                  onClick={copyCommand}
                  className="p-1.5 rounded bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
                  title="Copy launch commands"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="space-y-1.5 font-mono text-xs text-stone-300">
                <p className="text-stone-500"># Direct commands to initialize and spawn the developer bridge:</p>
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 overflow-x-auto whitespace-nowrap">
                  <span className="text-[#c5a880] select-none">$</span> cd apps/mobile && npm install && npx expo start
                </div>
                <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1">
                  <span>Bundler listens on dynamic node instances</span>
                  <span className="text-[#c5a880]">Expo Config v3</span>
                </div>
              </div>
            </div>

            {/* Sizing Calibration Sync Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-stone-200">
                <h4 className="font-serif text-sm text-neutral-900 font-bold mb-1.5">Offline-Ready TrueFit State</h4>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Zustand acts as a robust persistent layer keeping biometric patterns and 4-step measurements safely cached on the device, syncing with NestJS APIs lazily upon checkout.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200">
                <h4 className="font-serif text-sm text-neutral-900 font-bold mb-1.5">Aesthetic Architecture</h4>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Engineered using Expo Router v3 and lightweight CSS compiled utility stylesheets (NativeWind) preventing layout shift and delivering bespoke luxury styling drapes.
                </p>
              </div>
            </div>

          </div>

          {/* Column B: Interactive High Fidelity Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="text-center mb-4">
              <span className="font-mono text-[10px] tracking-widest text-[#c5a880] uppercase block font-bold">Interactive Dynamic Frame</span>
              <p className="text-stone-500 text-[11.5px]">Click elements inside to simulate mobile experience live.</p>
            </div>

            {/* Smart Phone Case Wrapper (Gold/Metallic styling) */}
            <div className="w-[340px] h-[670px] bg-neutral-900 rounded-[50px] p-3.5 shadow-2xl border-[5px] border-neutral-800 relative" id="mobile_viewport_device">
              
              {/* Phone Speaker & Dynamic Island */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mr-2" />
                <div className="w-12 h-1 bg-neutral-900 rounded" />
              </div>

              {/* Screen Inner Glass Box */}
              <div className="w-full h-full bg-[#faf9f6] rounded-[38px] overflow-hidden flex flex-col relative border border-neutral-950/20 select-none">
                
                {/* Simulated Screen Status Bar */}
                <div className="h-10 pt-4 px-6 flex justify-between items-center text-[10px] font-mono font-semibold text-neutral-900 z-40 bg-[#faf9f6]">
                  <span>20:28</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[8px]">5G</span>
                    <div className="w-4.5 h-2.5 border border-neutral-900 rounded-sm p-0.5 flex items-center">
                      <div className="bg-neutral-900 h-full w-[85%] rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Screen Scrollable Viewport area */}
                <div className="flex-1 overflow-y-auto px-4.5 pb-20 pt-1" id="simulator-screen-scroll">
                  
                  {/* TAB 1: HOME */}
                  {activeTab === "home" && (
                    <div className="space-y-5 animate-fade-in">
                      {/* Brand Header */}
                      <div className="text-center py-2">
                        <img
                          src="/darzi-name-logo.png"
                          alt="Darzi"
                          className="h-9 w-auto object-contain mx-auto"
                        />
                      </div>

                      {/* Promo Hero Swipe Banner */}
                      <div className="relative rounded-2xl overflow-hidden bg-neutral-950 text-white p-5 space-y-2">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300')` }} />
                        <span className="text-[8px] bg-[#c5a880] text-neutral-950 px-2 py-0.5 rounded-full tracking-wider font-mono uppercase font-bold inline-block">ATELIER AUTUMN</span>
                        <h4 className="font-serif text-lg leading-tight font-semibold">The Royal Cashmere Drape</h4>
                        <p className="text-[10px] text-stone-400">Perfect digital calibrations with handcrafted luxury tailoring.</p>
                        <button 
                          onClick={() => setActiveTab("measure")}
                          className="bg-[#c5a880] text-neutral-950 text-[9px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold flex items-center space-x-0.5"
                        >
                          <span>Calibrate Fit</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      {/* Trending Curation Grid Header */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-serif text-xs font-bold text-neutral-950">Atelier Curations</span>
                          <span className="text-[9px] text-[#c5a880] font-mono">View All</span>
                        </div>

                        {/* Scroll horizon products list */}
                        <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
                          <div className="w-32 bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex-shrink-0">
                            <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-1.5 relative">
                              <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <span className="absolute bottom-1 right-1 bg-neutral-950 text-[#c5a880] px-1 py-0.5 rounded text-[7px] font-mono">₹45,000</span>
                            </div>
                            <span className="font-serif font-bold text-[10.5px] truncate block text-neutral-950">Cashmere Suit</span>
                            <span className="text-stone-400 text-[8.5px] font-mono block">Custom Woolen blend</span>
                          </div>

                          <div className="w-32 bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex-shrink-0">
                            <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-1.5 relative">
                              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <span className="absolute bottom-1 right-1 bg-neutral-950 text-[#c5a880] px-1 py-0.5 rounded text-[7px] font-mono">₹28,500</span>
                            </div>
                            <span className="font-serif font-bold text-[10.5px] truncate block text-neutral-950">Atelier Blazer</span>
                            <span className="text-stone-400 text-[8.5px] font-mono block">Fine Gilded Weave</span>
                          </div>
                        </div>
                      </div>

                      {/* Measurement Quick Launcher banner */}
                      <div className="bg-[#faf6f0] border border-[#c5a880]/30 rounded-xl p-4 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h5 className="font-serif text-serif text-xs font-bold text-neutral-950">Size Calibration active</h5>
                          <p className="text-[9.5px] text-stone-500">Recalibrate your digital fit profile.</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab("measure")}
                          className="bg-neutral-950 text-white rounded-full p-2"
                        >
                          <Scissors className="w-3.5 h-3.5 text-[#c5a880]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DISCOVER (Catalog) */}
                  {activeTab === "discover" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center py-1">
                        <h3 className="font-serif text-sm font-bold text-neutral-950">Bespoke Catalog</h3>
                        <span className="text-[8.5px] font-mono text-stone-400 uppercase tracking-widest">Seasonal Fabrics</span>
                      </div>

                      {/* Fabric Selection rows */}
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="bg-white p-2 rounded-xl border border-stone-200">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-1.5 relative">
                            <img src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <span className="absolute top-1 left-1 bg-red-100 text-red-700 text-[7px] font-mono font-bold px-1 py-0.5 rounded">ONLY 2 LEFT</span>
                          </div>
                          <span className="font-serif text-[10.5px] font-bold text-neutral-950 block">Imperial Cashmere</span>
                          <span className="text-[8.5px] text-stone-500 font-mono">₹8,500/meter</span>
                        </div>

                        <div className="bg-white p-2 rounded-xl border border-stone-200">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-1.5 relative">
                            <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <span className="absolute top-1 left-1 bg-emerald-100 text-emerald-700 text-[7px] font-mono font-bold px-1 py-0.5 rounded">IN STOCK</span>
                          </div>
                          <span className="font-serif text-[10.5px] font-bold text-neutral-950 block">Highland Tweed</span>
                          <span className="text-[8.5px] text-stone-500 font-mono">₹5,200/meter</span>
                        </div>

                        <div className="bg-white p-2 rounded-xl border border-stone-200">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-1.5 relative">
                            <img src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="font-serif text-[10.5px] font-bold text-neutral-950 block">Italian Silk Velvet</span>
                          <span className="text-[8.5px] text-stone-500 font-mono">₹14,000/meter</span>
                        </div>

                        <div className="bg-white p-2 rounded-xl border border-stone-200">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-1.5 relative">
                            <img src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="font-serif text-[10.5px] font-bold text-neutral-950 block">Varanasi Brocade</span>
                          <span className="text-[8.5px] text-stone-500 font-mono">₹11,500/meter</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MEASURE (Interactive Digital Meter Wizard) */}
                  {activeTab === "measure" && (
                    <div className="space-y-4 animate-fade-in text-neutral-900">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-[#c5a880] uppercase tracking-widest font-bold">Step {calibrationStep} of 4</span>
                        <span className="text-[8px] font-mono text-stone-400 uppercase">TrueFit Calibrator</span>
                      </div>

                      {/* Header Title */}
                      <div>
                        <h4 className="font-serif text-sm font-bold">
                          {calibrationStep === 1 && "Neck Collar Fit Metric"}
                          {calibrationStep === 2 && "Shoulder Span Calibration"}
                          {calibrationStep === 3 && "Sleeve Silhouette Length"}
                          {calibrationStep === 4 && "Waist Draping Profile"}
                        </h4>
                        <p className="text-stone-500 text-[10px] leading-relaxed">
                          {calibrationStep === 1 && "Measure loosely around raw neck boundary with two finger allowance."}
                          {calibrationStep === 2 && "Measure horizontally across highest shoulder tips bone boundary."}
                          {calibrationStep === 3 && "Measure from shoulder peak bone point to matching cuffs wrist point."}
                          {calibrationStep === 4 && "Measure around navel line level keeping tape perfectly level."}
                        </p>
                      </div>

                      {/* Interactive adjustment Dial */}
                      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center py-5 space-y-3">
                        <div className="text-center">
                          <span className="text-[9px] font-mono text-stone-400 block uppercase">Calibrated Value:</span>
                          <span className="text-2xl font-serif text-[#c5a880] font-bold">
                            {calibrationStep === 1 && `${measurementValues.neck}"`}
                            {calibrationStep === 2 && `${measurementValues.shoulder}"`}
                            {calibrationStep === 3 && `${measurementValues.sleeve}"`}
                            {calibrationStep === 4 && `${measurementValues.chest}"`}
                          </span>
                        </div>

                        {/* Slider controls */}
                        <input 
                          type="range" 
                          min={calibrationStep === 1 ? "12" : calibrationStep === 2 ? "15" : calibrationStep === 3 ? "28" : "30"}
                          max={calibrationStep === 1 ? "20" : calibrationStep === 2 ? "24" : calibrationStep === 3 ? "40" : "54"}
                          step="0.5"
                          value={
                            calibrationStep === 1 ? measurementValues.neck :
                            calibrationStep === 2 ? measurementValues.shoulder :
                            calibrationStep === 3 ? measurementValues.sleeve :
                            measurementValues.chest
                          }
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setMeasurementValues(prev => ({
                              ...prev,
                              neck: calibrationStep === 1 ? val : prev.neck,
                              shoulder: calibrationStep === 2 ? val : prev.shoulder,
                              sleeve: calibrationStep === 3 ? val : prev.sleeve,
                              chest: calibrationStep === 4 ? val : prev.chest,
                            }));
                          }}
                          className="w-full accent-[#c5a880]"
                        />

                        {/* Visual Fit Profile Preference Toggle */}
                        {calibrationStep === 4 && (
                          <div className="w-full pt-1.5 space-y-2">
                            <span className="text-[8px] font-mono text-stone-400 block uppercase text-center">Fit Preference Curve</span>
                            <div className="grid grid-cols-3 gap-1">
                              {(["Slim", "Regular", "Relaxed"] as const).map((pref) => (
                                <button
                                  key={pref}
                                  onClick={() => setFitPreference(pref)}
                                  className={`py-1 text-[8px] font-mono rounded border transition ${
                                    fitPreference === pref 
                                      ? "bg-[#c5a880] text-neutral-950 border-[#c5a880] font-bold" 
                                      : "bg-white text-stone-600 border-stone-200"
                                  }`}
                                >
                                  {pref}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <button 
                        onClick={handleStepNext}
                        className="w-full py-2.5 bg-neutral-950 text-white rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold flex items-center justify-center space-x-1"
                      >
                        <span>{calibrationStep === 4 ? "Save Calibration" : "Next Calibration"}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#c5a880]" />
                      </button>
                    </div>
                  )}

                  {/* TAB 4: ORDERS (Active Stitch Tracker pipeline) */}
                  {activeTab === "orders" && (
                    <div className="space-y-4 animate-fade-in text-neutral-900">
                      <div className="flex justify-between items-center py-1">
                        <h3 className="font-serif text-sm font-bold">Stitching Tracker</h3>
                        <span className="text-[8.5px] font-mono text-emerald-600 font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded">Active Suite</span>
                      </div>

                      {/* Active Order Card info */}
                      <div className="bg-white p-4.5 rounded-xl border border-stone-200 space-y-3">
                        <div className="flex justify-between items-center text-[9px] font-mono pb-2 border-b border-stone-100">
                          <span className="text-stone-400 font-bold">INV-B9284</span>
                          <span className="text-[#c5a880] font-extrabold">₹37,800</span>
                        </div>

                        {/* Interactive Vertical Stepper */}
                        <div className="space-y-3.5 relative pl-4">
                          <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-stone-200" />
                          
                          <div className="relative flex items-start space-x-2">
                            <span className="absolute -left-4 w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-white flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </span>
                            <div>
                              <span className="text-[10px] font-bold text-neutral-950 block leading-tight">Digital Mesh Fitting</span>
                              <span className="text-[8px] text-stone-400 block">Sizing pattern finalized via trueFit AI</span>
                            </div>
                          </div>

                          <div className="relative flex items-start space-x-2">
                            <span className="absolute -left-4 w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-white flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </span>
                            <div>
                              <span className="text-[10px] font-bold text-neutral-950 block leading-tight">Atelier Fabric Allocation</span>
                              <span className="text-[8px] text-stone-400 block">Imperial Wool allocated by Master Tailor</span>
                            </div>
                          </div>

                          <div className="relative flex items-start space-x-2">
                            <span className="absolute -left-4 w-3.5 h-3.5 rounded-full bg-[#c5a880] border-2 border-white animate-pulse" />
                            <div>
                              <span className="text-[10px] font-bold text-[#c5a880] block leading-tight">Hand-Cut & Pin Stitching</span>
                              <span className="text-[8px] text-stone-500 block">Master Tailor crafting sleeves & side linings</span>
                            </div>
                          </div>

                          <div className="relative flex items-start space-x-2">
                            <span className="absolute -left-4 w-3.5 h-3.5 rounded-full bg-stone-200 border-2 border-white" />
                            <div>
                              <span className="text-[10px] font-bold text-stone-400 block leading-tight">Quality Verification</span>
                              <span className="text-[8px] text-stone-400 block">Digital scope overlap and seam tensile checks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: PROFILE */}
                  {activeTab === "profile" && (
                    <div className="space-y-4 animate-fade-in text-neutral-900">
                      <div className="flex items-center space-x-3 py-1.5">
                        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-serif text-xs font-bold">Sanjana Sen</h4>
                          <span className="text-[8.5px] font-mono text-stone-400 block uppercase">Bespoke Advocate</span>
                        </div>
                      </div>

                      {/* Calibration Metrics database */}
                      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                        <span className="text-[8.5px] font-mono text-[#c5a880] uppercase tracking-widest font-bold block">Biometric calibrations</span>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex justify-between items-center">
                            <span className="text-[9px] text-stone-400 uppercase font-mono">Neck Fit</span>
                            <span className="font-bold text-stone-800">{measurementValues.neck}"</span>
                          </div>
                          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex justify-between items-center">
                            <span className="text-[9px] text-stone-400 uppercase font-mono">Shoulders</span>
                            <span className="font-bold text-stone-800">{measurementValues.shoulder}"</span>
                          </div>
                          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex justify-between items-center">
                            <span className="text-[9px] text-stone-400 uppercase font-mono">Sleeves</span>
                            <span className="font-bold text-stone-800">{measurementValues.sleeve}"</span>
                          </div>
                          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex justify-between items-center">
                            <span className="text-[9px] text-stone-400 uppercase font-mono">Chest</span>
                            <span className="font-bold text-stone-800">{measurementValues.chest}"</span>
                          </div>
                        </div>

                        <div className="text-center pt-1">
                          <span className="text-[8.5px] font-mono text-stone-400">Fit Preference Level: <strong>{fitPreference} Fit</strong></span>
                        </div>
                      </div>

                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-white flex items-center space-x-3">
                        <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <div className="flex-1">
                          <span className="text-[9px] font-mono text-[#c5a880] block font-bold">AI Pattern Draft</span>
                          <span className="text-[8px] text-stone-400 block leading-tight">Calibrated pattern matched perfectly with cashmere specs</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Simulated Screen Bottom Bottom-Navigation Tabs Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#faf9f6]/95 border-t border-stone-200 flex justify-around items-center px-2 z-40">
                  <button 
                    onClick={() => setActiveTab("home")}
                    className={`flex flex-col items-center space-y-0.5 ${activeTab === "home" ? "text-[#c5a880]" : "text-stone-400"}`}
                  >
                    <Compass className="w-4.5 h-4.5" />
                    <span className="text-[8.5px] font-mono">Curation</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("discover")}
                    className={`flex flex-col items-center space-y-0.5 ${activeTab === "discover" ? "text-[#c5a880]" : "text-stone-400"}`}
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <span className="text-[8.5px] font-mono">Fabrics</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("measure")}
                    className={`flex flex-col items-center space-y-0.5 ${activeTab === "measure" ? "text-[#c5a880]" : "text-stone-400"}`}
                  >
                    <Scissors className="w-4.5 h-4.5" />
                    <span className="text-[8.5px] font-mono">Measure</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("orders")}
                    className={`flex flex-col items-center space-y-0.5 ${activeTab === "orders" ? "text-[#c5a880]" : "text-stone-400"}`}
                  >
                    <Layers className="w-4.5 h-4.5" />
                    <span className="text-[8.5px] font-mono">Track</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`flex flex-col items-center space-y-0.5 ${activeTab === "profile" ? "text-[#c5a880]" : "text-stone-400"}`}
                  >
                    <User className="w-4.5 h-4.5" />
                    <span className="text-[8.5px] font-mono">Fit Card</span>
                  </button>
                </div>

                {/* Simulated Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-neutral-900 rounded-full z-50 pointer-events-none" />

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
