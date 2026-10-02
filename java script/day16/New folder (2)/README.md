# PULSE — Bio-Optimized Clean Energy & Nootropics

> **Startup Product Website & Investor Experience**  
> Built for the $86B Energy Drink Market Disruption. Zero sugar, zero jitters, clinical bio-nootropics, and 82.3% D2C gross margins.

---

## 🚀 Quick Start / How to Run

You can run this website immediately without needing any npm installation or build steps:

### Option 1: Using Python HTTP Server (Recommended)
```powershell
cd C:\Users\acer\.gemini\antigravity\scratch\pulse-energy
python -m http.server 3000
```
Then open your browser to [http://localhost:3000](http://localhost:3000).

### Option 2: Using Node `npx serve`
```powershell
npx serve C:\Users\acer\.gemini\antigravity\scratch\pulse-energy
```

### Option 3: Direct File Open
You can also double-click [`index.html`](file:///C:/Users/acer/.gemini/antigravity/scratch/pulse-energy/index.html) in your browser. (Note: For ES module loading of Firebase, running an HTTP server as shown in Option 1 or 2 is recommended).

---

## 🎯 The 3 Investor Requirements Solved

### 1. "Unique ah irukanum" (Exceptionally Distinct Visual & Sensory Experience)
- **Interactive 3D Can Studio & 360° Drag**: Users can click and drag to rotate the can in full 360° 3D, toggle **Cold Frost condensation droplets**, and switch between 4 SKUs with smooth shader color transitions.
- **Formula X-Ray Mode**: Interactive glowing pins dissecting the can into its active pharmaceutical-grade compounds (Cognizin® Citicoline, L-Theanine, Alpha-GPC, Himalayan Pink Salt).
- **Procedural Web Audio Synthesizer**: In-browser synthesized audio micro-interactions—crisp UI clicks, realistic fizzy can-open pop (`pssst-pop!`) on adding to cart, and victory chimes on checkout—with a live sound visualizer and mute/unmute control.
- **Visual 12-Slot Variety Crate Builder**: Interactive isometric crate where customers and investors can pick and mix 12 cans with visual drop-in slot animations and bundle savings badge.

### 2. "Why should I invest in your product" (Venture Capital & Business Thesis)
- **$86B TAM Disruption**: Capturing market share as consumers flee toxic sugary drinks (Monster, Red Bull) for functional cognitive beverages (12.8% CAGR).
- **Proprietary Formulation IP**: 2 patents pending on micro-encapsulated nootropics masking bitterness with 0g sugar and 24-month ambient shelf stability.
- **Software-Like Unit Economics**:
  - **COGS**: $0.62 / can
  - **Retail Price**: $3.50 / can
  - **D2C Gross Margin**: **82.3%**
  - **Average Order Value (AOV)**: $48.50
  - **90-Day Retention**: **64.2%**
  - **LTV : CAC Ratio**: **3.4x** (Payback period < 2.1 orders)
- **Interactive Investor ROI & Valuation Calculator**:
  - Allows angels and VC partners to adjust active subscriber scale (5k to 150k) to instantly calculate projected ARR ($20M+), Net Gross Profit, and Enterprise Valuation at standard 8x multiples.
- **Confidential Pitch Deck Modal**: Full multi-tab presentation covering The Problem, Solution, Competitor Battlecard (vs Monster, Celsius, Red Bull), Unit Economics, and $3.5M Seed Allocation with downloadable JSON/PDF brief.

### 3. "How your website is different from others"
- Unlike standard Shopify / template e-commerce sites with static images and generic checkout flows:
  - **Single-Page Futuristic Web App**: Seamless transitions, responsive glassmorphism, glowing cursor tracking, and continuous ticker.
  - **Clinical Energy Curve Simulator**: Live interactive Canvas chart comparing blood plasma concentration and alertness of PULSE vs Sugar Energy Drinks vs Coffee over 8 hours with an interactive timeline scrubber and real-time telemetry gauges.
  - **PULSE Match AI Diagnostic**: 3-step bio-diagnostic quiz assessing caffeine sensitivity, circadian peaks, and cognitive demands to recommend tailored formulas.
  - **Full Cart Drawer & Checkout Simulator**: Free shipping progress threshold bar ($50), promo codes (`PULSE20`, `INVESTOR`, `FREESHIP`), and a realistic instant order receipt with tracking ID.

---

## ⚡ Firebase & Offline Demo Fallback

The codebase is built with the **Firebase Modular v11 SDK** (`https://www.gstatic.com/firebasejs/11.10.0/`):

1. **Production Ready**: Paste your project credentials into `firebaseConfig` inside [`firebase.js`](file:///C:/Users/acer/.gemini/antigravity/scratch/pulse-energy/firebase.js).
2. **Offline / Standalone Demo Ready**: When credentials are not yet set, PULSE automatically operates in **Local Demo Mode**—authentication, orders, custom packs, and cart history persist locally in browser storage without errors.

---

## 📁 Project Structure

```
pulse-energy/
├── index.html        # Complete semantic HTML5 structure, modals, 3D viewers & investor deck
├── styles.css        # Cyber-dark design system, responsive layouts, 3D can styling & animations
├── app.js            # Audio synth engine, 3D studio, energy curve canvas, crate builder & cart
├── firebase.js       # Firebase v11 modular SDK with seamless local fallback
└── README.md         # Documentation & investor presentation guide
```
