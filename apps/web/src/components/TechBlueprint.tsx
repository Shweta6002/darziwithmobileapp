/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, Database, Shield, Layout, Settings, Code } from "lucide-react";

export default function TechBlueprint() {
  return (
    <div className="bg-white min-h-screen py-12 text-neutral-900 font-sans animate-fade-in" id="blueprint-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Block */}
        <div className="border-b border-stone-100 pb-8">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880] mb-2 block">System Engineering Spec</span>
          <h1 className="font-serif text-4xl font-semibold">Architectural Technical Specifications</h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 max-w-2xl font-sans leading-relaxed">
            Detailed modular structures, folder layout patterns, API microservices schemas, and persistent database mappings structured to handle high scalability, secure payments, and neural size-prediction workloads.
          </p>
        </div>


        {/* Grid 1: Hierarchy and structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="blueprint-structure-grid">
          
          {/* Left: Component Hierarchy */}
          <div className="lg:col-span-6 bg-stone-50 p-8 rounded-3xl border border-stone-150 space-y-4">
            <div className="flex items-center space-x-2 text-[#c5a880] pb-2 border-b border-stone-200/50 mb-4">
              <Layout className="w-5 h-5 text-[#c5a880]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">01. Component Hierarchy tree</h3>
            </div>
            
            <pre className="text-[10px] font-mono leading-relaxed text-stone-700 whitespace-pre overflow-x-auto bg-stone-100/40 p-4 rounded-2xl border border-stone-150" id="pre-hierarchy-tree">
{`App.tsx [Main Context Router & Global States]
 ├── Navigation.tsx [Adaptive Top/Bottom Bar]
 ├── LandingPage.tsx [Editorial Hero & AI Sizer Teaser]
 ├── ProductListingPage.tsx [Premium Filter Matrix, Catalog Cards]
 ├── ProductDetailPage.tsx [Fabric Details, Monogram Specs, Sizer widget]
 │    ├── WhatsApp Chat Console [Popup overlay stylist link]
 │    └── Delivery timeline stepper [Interactive milestones Tracker]
 ├── MeasurementFlow.tsx [8-Point Calibrator Core Wizard]
 │    └── Vector SVG Body Guidelines [Glowing element focus nodes]
 ├── CheckoutPage.tsx [Customer Address form, Totals receipt, Razorpay secure]
 │    └── Razorpay Secure modal [Credit cards credentials validation]
 ├── UserDashboard.tsx [Customer Core Vault]
 │    └── Alterations Concierge Ticket creator [BlueDart schedules trigger]
 ├── AdminDashboard.tsx [Workshop operators workspace]
 │    ├── Pattern Orders Lanes [Tailor queue assignments manager]
 │    ├── Fabric Inventory roll gauge [Loom levels reserves]
 │    └── Sartorial Live Analytics [SVG business charts metrics]
 └── AIConsultantChat.tsx [Slide-out Gemini Stylist chat overlay]`}
            </pre>
          </div>

          {/* Right: Folder structure */}
          <div className="lg:col-span-6 bg-stone-50 p-8 rounded-3xl border border-stone-150 space-y-4">
            <div className="flex items-center space-x-2 text-[#c5a880] pb-2 border-b border-stone-200/50 mb-4">
              <Code className="w-5 h-5 text-[#c5a880]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">02. Microservices Directory Layout</h3>
            </div>
            
            <pre className="text-[10px] font-mono leading-relaxed text-stone-700 whitespace-pre overflow-x-auto bg-stone-100/40 p-4 rounded-2xl border border-stone-150" id="pre-folder-structure">
{`darzi-production/
 ├── package.json [Shared install, web/backend scripts, production build]
 ├── tsconfig.json [Bespoke strict TypeScript declarations]
 └── apps/
      ├── backend/
      │    └── server.ts [Express APIs / Vite middleware / static host]
      ├── web/
      │    ├── vite.config.ts [Vite HMR overrides & build rules]
      │    ├── index.html [Client frame anchor]
      │    └── src/
      │         ├── main.tsx [React client entry point rendering]
      │         ├── App.tsx [App routes context & Local Storage cache layer]
      │         ├── index.css [Google Webfonts Playfair/PlusJakarta & tailwind configurations]
      │         ├── types.ts [TypeScript custom fabrics/products interfaces declarations]
      │         └── components/
      │              ├── Navigation.tsx
      │              ├── LandingPage.tsx
      │              ├── ProductListingPage.tsx
      │              ├── ProductDetailPage.tsx
      │              ├── MeasurementFlow.tsx
      │              ├── CheckoutPage.tsx
      │              ├── UserDashboard.tsx
      │              ├── AdminDashboard.tsx
      │              └── AIConsultantChat.tsx
      └── mobile/
           ├── app/ [Expo Router screens]
           ├── services/ [Mobile API client]
           ├── store/ [Fit/order Zustand store]
           └── constants/ [Theme tokens]`}
            </pre>
          </div>

        </div>


        {/* Grid 2: Microservice API suggestion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="blueprint-api-row">
          
          {/* Left: API Suggestions */}
          <div className="lg:col-span-7 bg-stone-50 p-8 rounded-[2rem] border border-stone-150 space-y-6">
            <div className="flex items-center space-x-2 text-[#c5a880] pb-2 border-b border-stone-200/50">
              <Settings className="w-5 h-5 text-[#c5a880]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">03. Production API Endpoints Suggestion</h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-1.5" id="api-dns-1">
                <div className="flex justify-between font-mono">
                  <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase text-[9px]">POST /api/v1/gemini/consult</span>
                  <span className="text-stone-400">Public Auth</span>
                </div>
                <p className="text-stone-600 font-sans leading-relaxed text-[10px]">
                  Calls Google Gemini-3.5-flash model to provide dynamic womenswear sizing, fabric drapes, or boardroom etiquette corporate styling recommendations.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-1.5" id="api-dns-2">
                <div className="flex justify-between font-mono">
                  <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase text-[9px]">POST /api/v1/gemini/analyze-measurements</span>
                  <span className="text-stone-400">Secure JWT Sizing Auth</span>
                </div>
                <p className="text-stone-600 font-sans leading-relaxed text-[10px]">
                  Pipes 8-point measurements to Gemini models utilizing JSON schemas. Returns predictions, fit shape analyses, confidence indicators, and custom dart seam modifications.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-1.5" id="api-dns-3">
                <div className="flex justify-between font-mono">
                  <span className="text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded font-bold uppercase text-[9px]">POST /api/v1/checkout/razorpay-initiate</span>
                  <span className="text-stone-400">Payment Auth required</span>
                </div>
                <p className="text-stone-600 font-sans leading-relaxed text-[10px]">
                  Generates an encrypted transaction hash with Razorpay API, including tax margins, fabric upgrades and shipping insurance payloads.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-1.5" id="api-dns-4">
                <div className="flex justify-between font-mono">
                  <span className="text-red-800 bg-red-50 px-2 py-0.5 rounded font-bold uppercase text-[9px]">PUT /api/v1/orders/:orderId/assign-tailor</span>
                  <span className="text-stone-400">Atelier Admin Scope Only</span>
                </div>
                <p className="text-stone-600 font-sans leading-relaxed text-[10px]">
                  Permit workshop operator managers to queue individual tailor assignments, shifting sewing logs based on fabric complexity.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Database Schema */}
          <div className="lg:col-span-5 bg-stone-50 p-8 rounded-[2rem] border border-stone-150 space-y-6">
            <div className="flex items-center space-x-2 text-[#c5a880] pb-2 border-b border-stone-200/50">
              <Database className="w-5 h-5 text-[#c5a880]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">04. Relational Database Scheme</h3>
            </div>

            <pre className="text-[10px] font-mono leading-relaxed text-stone-700 whitespace-pre overflow-x-auto bg-stone-100/40 p-4 rounded-2xl border border-stone-150" id="pre-database-schemas">
{`-- SQL Database Structure (PostgreSQL)

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_measurements (
  user_id VARCHAR(255) REFERENCES users(id),
  height NUMERIC(5,2),
  weight NUMERIC(5,2),
  body_type VARCHAR(50),
  shoulder NUMERIC(4,2),
  bust NUMERIC(4,2),
  waist NUMERIC(4,2),
  hip NUMERIC(4,2),
  inseam NUMERIC(4,2),
  recalibrated_at TIMESTAMP
);

CREATE TABLE orders (
  id VARCHAR(100) PRIMARY KEY,
  date DATE NOT NULL,
  status VARCHAR(60),
  price DECIMAL(10,2),
  customer_id VARCHAR(255) REFERENCES users(id),
  payout_status VARCHAR(30) DEFAULT 'Pending',
  assigned_tailor VARCHAR(150),
  shipping_address JSONB
);`}
            </pre>
          </div>

        </div>


        {/* Visual 3: Tech Architecture Diagram Block */}
        <div className="bg-[#121212] text-white p-8 sm:p-12 rounded-[2.5rem] border border-neutral-800 relative overflow-hidden" id="blueprint-diagram-accent">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-[10px] font-mono text-[#c5a880] uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[#c5a880]" />
              <span>Scale Matrix & CDN Architecture</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl leading-tight">
              A Scalable Frontend & Sizing Engine Orchestration
            </h2>

            <p className="text-[#a0a0a0] text-xs sm:text-sm max-w-xl leading-relaxed font-sans">
              To minimize return margins and maximize user conversion, Darzi drafts patterns lazily. The client's React layout caches measurements locally, leveraging Edge Cloud Run endpoints backed by a distributed Redis layer. Heavy algorithmic sizing and fit calculations are offloaded async to our Node queues and verified by the Master-Tailor UI.
            </p>

            {/* Micro visualization Flowsheet */}
            <div className="border border-neutral-800 p-6 rounded-2xl bg-neutral-900/40 text-[9px] font-mono grid grid-cols-1 md:grid-cols-5 text-center gap-4 items-center" id="arch-flows-grid">
              <div className="p-3 bg-neutral-850 rounded-xl border border-neutral-800">
                <span className="text-[#c5a880] block font-bold">Client UI Frame</span>
                <span className="text-stone-500 mt-1 block leading-normal">Vite React / Tailwind CSS V4</span>
              </div>
              <div className="text-stone-600 text-xs hidden md:block">──▶</div>
              <div className="p-3 bg-neutral-850 rounded-xl border border-neutral-800">
                <span className="text-[#c5a880] block font-bold">API Gate Proxy</span>
                <span className="text-stone-500 mt-1 block leading-normal">Cloudflare Edge / Express proxy</span>
              </div>
              <div className="text-stone-600 text-xs hidden md:block">──▶</div>
              <div className="p-3 bg-[#c5a880]/10 rounded-xl border border-[#c5a880]/20">
                <span className="text-[#c5a880] block font-bold">AI trueFit engine</span>
                <span className="text-stone-500 mt-1 block leading-normal">Gemini-3.5-flash / Pattern drafts</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Brand New Section: Mobile App Architecture Curation */}
        <div className="bg-stone-50 p-8 sm:p-10 rounded-[2.5rem] border border-stone-200 space-y-6" id="mobile-blueprint-section">
          <div className="flex items-center space-x-2 text-[#c5a880] pb-2 border-b border-stone-200">
            <Layout className="w-5 h-5 text-[#c5a880]" />
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold">05. Premium React Native (Expo) Mobile System Schema</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4 text-xs">
              <p className="text-stone-600 font-sans leading-relaxed">
                We engineered a high-performance, responsive React Native mobile stack under <code className="bg-stone-100 px-1 py-0.5 rounded text-neutral-900 font-mono">/apps/mobile</code> styled with <strong>NativeWind</strong> (utility-first Tailwind core) and managed asynchronously via <strong>Zustand state cores</strong>.
              </p>
              
              <div className="space-y-2.5">
                <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-start space-x-3">
                  <span className="text-[10px] font-mono bg-neutral-950 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">A</span>
                  <div className="flex-1">
                    <span className="font-serif italic font-bold text-neutral-900 block mb-0.5">Apple & Zara level Minimalist UX</span>
                    <span className="text-stone-500 text-[10px] leading-relaxed block">Clean horizontal swipe cataloging, reduced typographic weight, and expansive breathing margins block layout noise.</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-start space-x-3">
                  <span className="text-[10px] font-mono bg-[#c5a880] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">B</span>
                  <div className="flex-1">
                    <span className="font-serif italic font-bold text-neutral-900 block mb-0.5 font-bold">Offline-First TrueFit Calibrator</span>
                    <span className="text-stone-500 text-[10px] leading-relaxed block">Sizing curves and 4-step metric wizard results persist client-side, syncing lazily to NestJS API threads upon payment confirmation.</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-start space-x-3">
                  <span className="text-[10px] font-mono bg-[#10b981] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">C</span>
                  <div className="flex-1">
                    <span className="font-serif italic font-bold text-neutral-900 block mb-0.5">Secure Mobile Stepper Gateway</span>
                    <span className="text-stone-500 text-[10px] leading-relaxed block">Razorpay web checkout sheets map custom items, textile roll prices, and tailoring queue priorities safely with transaction tracking.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-stone-900 text-stone-300 p-6 rounded-3xl border border-stone-800 space-y-3 font-mono">
              <span className="text-[9px] text-[#c5a880] tracking-widest font-bold uppercase block">Mobile Native Workspace Mapping</span>
              <pre className="text-[9.5px] leading-relaxed text-[#b1b1b1] overflow-x-auto whitespace-pre">
{`apps/mobile/
 ├── package.json              # NativeWind & Expo-Safe core
 ├── README.md                 # Setup, variables & lint metrics
 ├── store/useFitStore.ts      # Zustand digital size profiles cache
 ├── services/api.ts           # Axios APIs client & fallbacks
 ├── types/index.ts            # High-fidelity shared contracts
 └── app/                      # Expo Router (v3) directory
      ├── _layout.tsx          # safe-area wrappers & theme configs
      ├── (tabs)/              # Botton tabs framework
      │    ├── index.tsx       # Home: curation best sellers row
      │    ├── discover.tsx    # Catalog: dual col grid with stock alerts
      │    ├── orders.tsx      # Stepper tracker: tailor, stitch, deliver
      │    └── profile.tsx     # Account: biometric size database
      ├── product/[id].tsx     # Custom detailing & textile selectors
      ├── measure/index.tsx    # calibrator: 4-step dynamic user flow
      └── checkout/index.tsx   # payments: razorpay invoice receipt`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
