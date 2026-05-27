# Darzi Atelier - Premium Mobile Costume Suite
Bespoke tailoring, digital size calibrations, and luxury styling drapes mapped directly to a premium mobile-first experience. Built using **React Native**, **Expo Router (v3)**, and styled with **NativeWind** utilizing the Darzi editorial identity.

---

## 🎨 Visual Identity & Style Manifest
This mobile setup perfectly aligns with the high-society editorial aesthetic of the Darzi web platform:
- **Beige Canvas Palette** (`#faf9f6`): Soft off-white canvas backgrounds minimize ocular fatigue while promoting a high-end atelier boutique mood.
- **Muted Gilded Accents** (`#c5a880`): Muted gold tokens elevate progress steppers, call-to-actions, and active TrueFit indicators.
- **Deep Charcoal Solids** (`#17181c`): Premium readability contrast and structured button faces.

---

## 📦 Directory Tree & Architecture Mapping
```
apps/mobile/
├── package.json               # Expo & Nativewind dependencies
├── README.md                  # Comprehensive platform guides
├── store/
│   └── useFitStore.ts         # Zustand lightweight state cache engine
├── services/
│   └── api.ts                 # Axios server client proxies (NestJS matched)
├── types/
│   └── index.ts               # Shared models & interfaces declarations
├── constants/
│   └── theme.ts               # Palette and typography variables
└── app/
    ├── _layout.tsx            # App core entry & status bar
    ├── (tabs)/
    │   ├── _layout.tsx        # Bottom tab navigator (Lucide Icons)
    │   ├── index.tsx          # Home: curation carousels & AI teaser
    │   ├── discover.tsx       # Discover: search, grid products, stock indicator
    │   ├── orders.tsx         # Track: interactive stitching pipeline
    │   └── profile.tsx        # Profile: digital sizing cards database
    ├── product/
    │   └── [id].tsx           # Details: fiber selectors & sizing matching
    ├── measure/
    │   └── index.tsx          # Calibration: 4-step interactive digital measuring
    └── checkout/
        └── index.tsx          # Razorpay: secure gateway totals receipts
```

---

## 🚀 Execution & Developer Launch instructions
Ensure you have the Expo CLI tooling installed globally.

1. **Synchronize Dependencies**:
   Inside `/apps/mobile/` execute:
   ```bash
   npm install
   ```

2. **Launch Developer Server**:
   ```bash
   npx expo start
   ```

3. **Check Quality Controls (Linter & TS compilation)**:
   ```bash
   npm run ts:check
   ```

---

## ⚡ Mobile Performance and UX Enhancements
- **No-Clutter Visuals**: Avoid multi-tiered navigation drawers. Keep focus locked onto the main 4 tabs.
- **Adaptive Lazy Image Loading**: Leverage fast image component pools to avoid stuttering on dense catalogs.
- **Smart Recalc Fallbacks**: Offline fallback storage ensures measurements persist inside Zustand even when networks drop, synchronizing patterns smoothly.
