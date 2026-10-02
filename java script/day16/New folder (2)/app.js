// PULSE — Bio-Optimized Clean Energy & Nootropics
// Interactive Application Engine: Audio Synthesizer, 3D Studio, Science Simulator, Custom Pack Builder, Investor Portal & E-Commerce

import { 
  isConfigured, 
  auth, 
  db, 
  localStore,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "./firebase.js";

/* ==========================================================
   1. PROCEDURAL WEB AUDIO SYNTHESIZER (Zero External Assets)
   ========================================================== */
class PulseAudio {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("pulse_audio_muted") === "true";
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.debug("Audio playClick error:", e);
    }
  }

  // Realistic fizzy can-opening pop "psssht-pop!"
  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for fizz
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1200, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      // Low pop thud
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      noise.start(now);
      osc.start(now);
      noise.stop(now + 0.15);
      osc.stop(now + 0.12);
    } catch (e) {
      console.debug("Audio playPop error:", e);
    }
  }

  // Chime for quiz completion & checkout
  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch (e) {
      console.debug("Audio playChime error:", e);
    }
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem("pulse_audio_muted", this.muted);
    return !this.muted;
  }
}

const sound = new PulseAudio();

/* ==========================================================
   2. PRODUCT CATALOG & SKU DATA
   ========================================================== */
const PRODUCTS = {
  focus: {
    id: "sku-focus",
    key: "focus",
    name: "FOCUS",
    flavorName: "Cyber Citrus",
    subtitle: "Japanese Yuzu & California Lime",
    caffeine: "180mg Natural Caffeine",
    caffeineMg: 180,
    stack: "Cognizin® Citicoline (250mg) + L-Theanine (200mg)",
    color: "#d8ff00",
    glow: "rgba(216, 255, 0, 0.4)",
    price: 3.50,
    desc: "Engineered for deep-work programmers, financial analysts, and high-intensity esports competitors who require laser-focused clarity with zero jitters.",
    tags: ["DEEP WORK", "COGNIZIN®", "0G SUGAR"]
  },
  overdrive: {
    id: "sku-overdrive",
    key: "overdrive",
    name: "OVERDRIVE",
    flavorName: "Ghost Blackberry",
    subtitle: "Dark Blackberry & Wild Acai",
    caffeine: "200mg Natural Caffeine",
    caffeineMg: 200,
    stack: "Organic Cordyceps (500mg) + Huperzine-A (100mcg)",
    color: "#8a7dff",
    glow: "rgba(138, 125, 255, 0.4)",
    price: 3.50,
    desc: "Maximum clean kinetic power. Enhanced with adaptogenic cordyceps mushrooms to maximize cellular oxygenation and athletic threshold.",
    tags: ["MAX POWER", "ADAPTOGENS", "O2 UPTAKE"]
  },
  flow: {
    id: "sku-flow",
    key: "flow",
    name: "FLOW",
    flavorName: "Zen Matcha",
    subtitle: "Ceremonial Matcha & Crisp Mint",
    caffeine: "120mg Natural Caffeine",
    caffeineMg: 120,
    stack: "L-Theanine (240mg) + Alpha-GPC (150mg)",
    color: "#00ff9d",
    glow: "rgba(0, 255, 157, 0.4)",
    price: 3.50,
    desc: "The 2:1 zen-focus formula. Smooth, tranquil mental alertness with zero cardiovascular strain. Designed for design sessions and study marathons.",
    tags: ["ZEN FLOW", "ALPHA WAVES", "CALM FOCUS"]
  },
  reboot: {
    id: "sku-reboot",
    key: "reboot",
    name: "REBOOT",
    flavorName: "Solar Blood Orange",
    subtitle: "Sicilian Blood Orange & Grapefruit",
    caffeine: "150mg Natural Caffeine",
    caffeineMg: 150,
    stack: "Himalayan Pink Salt + 500mg Bio-Electrolytes",
    color: "#ff4757",
    glow: "rgba(255, 71, 87, 0.4)",
    price: 3.50,
    desc: "Rapid hydration and neural replenishment. Replenishes critical brain osmolytes and electrolytes lost during intense physical or mental exertion.",
    tags: ["HYDRATION", "ELECTROLYTES", "RECOVERY"]
  }
};

/* ==========================================================
   3. CART & STATE MANAGEMENT
   ========================================================== */
let cart = JSON.parse(localStorage.getItem("pulse_cart") || "[]");
let activeCoupon = null; // { code: 'PULSE20', rate: 0.20 }

function saveCart() {
  localStorage.setItem("pulse_cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(item) {
  sound.playPop();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += (item.qty || 1);
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart();
  showToast(`⚡ Added ${item.name} to your PULSE.`);
  openCartDrawer();
}

function updateCartQty(id, delta) {
  sound.playClick();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart();
}

function renderCart() {
  const cartBtn = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartDiscount = document.getElementById("cartDiscount");
  const cartShipping = document.getElementById("cartShipping");
  const cartTotal = document.getElementById("cartTotal");
  const shippingBarText = document.getElementById("shippingBarText");
  const shippingBarFill = document.getElementById("shippingBarFill");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBtn) cartBtn.textContent = totalQty;

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
        <div style="font-size: 32px; margin-bottom: 12px; color: var(--line-strong);">◐</div>
        <p style="font-size: 14px; margin-bottom: 16px;">Your PULSE cart is empty.</p>
        <a href="#products" class="btn btn-sm btn-primary" onclick="document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('drawerOverlay').classList.remove('open');">
          Explore Lineup
        </a>
      </div>
    `;
    cartSubtotal.textContent = "$0.00";
    cartDiscount.textContent = "-$0.00";
    cartShipping.textContent = "$0.00";
    cartTotal.textContent = "$0.00";
    if (shippingBarFill) shippingBarFill.style.width = "0%";
    if (shippingBarText) shippingBarText.innerHTML = `Add <strong>$50.00</strong> more to unlock <strong>FREE Express Shipping!</strong>`;
    return;
  }

  // Calculate financials
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discountAmount = 0;
  if (activeCoupon) {
    discountAmount = subtotal * activeCoupon.rate;
  }
  const isFreeShipping = subtotal >= 50 || (activeCoupon && activeCoupon.freeShip);
  const shipping = isFreeShipping ? 0 : 4.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  // Render items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-thumb" style="border-color: ${item.color || 'var(--accent)'}; color: ${item.color || 'var(--accent)'};">
        ${item.key ? item.key.charAt(0).toUpperCase() : '12'}
      </div>
      <div class="cart-meta">
        <strong>${item.name}</strong>
        <span>${item.detail || 'Standard 355ml Can'}</span>
        <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="step-btn" data-cart-qty="${item.id}" data-delta="-1">-</button>
        <span style="font-family: var(--font-mono); font-size: 13px; min-width: 16px; text-align: center;">${item.qty}</span>
        <button class="step-btn" data-cart-qty="${item.id}" data-delta="1">+</button>
      </div>
    </div>
  `).join("");

  // Update DOM readouts
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
  cartShipping.textContent = isFreeShipping ? "FREE" : `$${shipping.toFixed(2)}`;
  cartTotal.textContent = `$${finalTotal.toFixed(2)}`;

  // Free shipping progress bar
  if (shippingBarFill && shippingBarText) {
    const progress = Math.min(100, (subtotal / 50) * 100);
    shippingBarFill.style.width = `${progress}%`;
    if (subtotal >= 50) {
      shippingBarText.innerHTML = `🎉 <strong>FREE Express Shipping unlocked!</strong>`;
    } else {
      const remaining = (50 - subtotal).toFixed(2);
      shippingBarText.innerHTML = `Add <strong>$${remaining}</strong> more to unlock <strong>FREE Express Shipping!</strong>`;
    }
  }
}

function openCartDrawer() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("drawerOverlay")?.classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("drawerOverlay")?.classList.remove("open");
}

/* ==========================================================
   4. INTERACTIVE 3D HERO CAN & FLAVOR SWITCHING
   ========================================================== */
function initHeroCan() {
  const pills = document.querySelectorAll(".flavor-pill");
  const heroCanFlavor = document.getElementById("heroCanFlavor");
  const heroCanMeta = document.getElementById("heroCanMeta");
  const heroCanWave = document.getElementById("heroCanWave");
  const heroCanMark = document.getElementById("heroCanMark");
  const cursorGlow = document.getElementById("cursorGlow");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      sound.playClick();
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const flavorKey = pill.getAttribute("data-flavor");
      const prod = PRODUCTS[flavorKey];
      if (!prod) return;

      if (heroCanFlavor) {
        heroCanFlavor.textContent = prod.name;
        heroCanFlavor.style.color = prod.color;
      }
      if (heroCanMeta) {
        heroCanMeta.textContent = `${prod.flavorName.toUpperCase()} / ${prod.caffeine.toUpperCase()}`;
      }
      if (heroCanWave) {
        heroCanWave.style.borderTopColor = prod.color;
        heroCanWave.style.boxShadow = `0 0 25px ${prod.glow}`;
      }
      if (heroCanMark) {
        heroCanMark.style.borderColor = prod.color;
        heroCanMark.style.color = prod.color;
        heroCanMark.style.boxShadow = `0 0 28px ${prod.glow}`;
      }
      if (cursorGlow) {
        cursorGlow.style.background = `radial-gradient(circle, ${prod.glow}, transparent 70%)`;
      }
    });
  });

  // Hero Parallax Tilt on Cursor Move
  const heroWrap = document.querySelector(".hero-can-wrap");
  const heroCan = document.getElementById("heroCan");
  if (heroWrap && heroCan) {
    heroWrap.addEventListener("mousemove", (e) => {
      const rect = heroWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroCan.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 20}deg) rotateZ(6deg) translateY(-8px)`;
    });

    heroWrap.addEventListener("mouseleave", () => {
      heroCan.style.transform = `rotate(8deg)`;
    });
  }
}

/* ==========================================================
   5. 3D CAN STUDIO & FORMULA X-RAY (ENGINEERED FIX)
   ========================================================== */
let studioAngle = 0;
let studioTilt = 0;
let studioIsAutoSpin = true;
let studioAutoSpinRaf = null;
let currentStudioFlavor = "focus";

function initStudio() {
  const studioCan = document.getElementById("studioCan");
  const can3dStage = document.getElementById("can3dStage");
  const toggleFrostBtn = document.getElementById("toggleFrostBtn");
  const toggleXrayBtn = document.getElementById("toggleXrayBtn");
  const toggleAutoSpinBtn = document.getElementById("toggleAutoSpinBtn");
  const xrayPins = document.getElementById("xrayPins");
  const studioAngleSlider = document.getElementById("studioAngleSlider");
  const studioAngleValue = document.getElementById("studioAngleValue");
  const studioAngleBadge = document.getElementById("studioAngleBadge");

  // Core 3D Rotation Function
  function updateCanRotation(angle, tilt = studioTilt) {
    studioAngle = (angle % 360 + 360) % 360;
    studioTilt = Math.max(-15, Math.min(15, tilt));

    if (studioCan) {
      studioCan.style.transform = `rotateY(${studioAngle}deg) rotateX(${studioTilt}deg)`;
    }
    if (studioAngleSlider) {
      studioAngleSlider.value = Math.round(studioAngle);
    }
    if (studioAngleValue) {
      studioAngleValue.textContent = `${Math.round(studioAngle)}°`;
    }
    if (studioAngleBadge) {
      if (studioAngle > 110 && studioAngle < 250) {
        studioAngleBadge.textContent = "SUPPLEMENT FACTS (BACK)";
      } else {
        studioAngleBadge.textContent = "360° INTERACTIVE 3D (FRONT)";
      }
    }
  }

  // Smooth Auto-Spin via requestAnimationFrame
  function autoSpinLoop() {
    if (studioIsAutoSpin) {
      updateCanRotation(studioAngle + 0.6);
    }
    studioAutoSpinRaf = requestAnimationFrame(autoSpinLoop);
  }
  studioAutoSpinRaf = requestAnimationFrame(autoSpinLoop);

  // Mouse & Touch 360 Drag Interaction
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let baseAngle = 0;
  let baseTilt = 0;

  function onPointerDown(clientX, clientY) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    baseAngle = studioAngle;
    baseTilt = studioTilt;
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
  }

  function onPointerMove(clientX, clientY) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    const newAngle = baseAngle + deltaX * 0.8;
    const newTilt = baseTilt - deltaY * 0.2;
    updateCanRotation(newAngle, newTilt);
  }

  function onPointerUp() {
    isDragging = false;
  }

  if (can3dStage) {
    can3dStage.addEventListener("mousedown", (e) => {
      // Ignore clicks on xray pins
      if (e.target.closest(".xray-pin")) return;
      onPointerDown(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
      onPointerMove(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", onPointerUp);

    // Touch support
    can3dStage.addEventListener("touchstart", (e) => {
      if (e.target.closest(".xray-pin")) return;
      if (e.touches && e.touches[0]) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchend", onPointerUp);
  }

  // Quick Angle Buttons
  document.getElementById("btnAngleLeft")?.addEventListener("click", () => {
    sound.playClick();
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
    updateCanRotation(studioAngle - 45);
  });

  document.getElementById("btnAngleRight")?.addEventListener("click", () => {
    sound.playClick();
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
    updateCanRotation(studioAngle + 45);
  });

  document.getElementById("btnAngleFront")?.addEventListener("click", () => {
    sound.playClick();
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
    updateCanRotation(0, 0);
  });

  document.getElementById("btnAngleBack")?.addEventListener("click", () => {
    sound.playClick();
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
    updateCanRotation(180, 0);
  });

  // Angle Slider Scrubbing
  studioAngleSlider?.addEventListener("input", (e) => {
    studioIsAutoSpin = false;
    if (toggleAutoSpinBtn) toggleAutoSpinBtn.classList.remove("active");
    updateCanRotation(parseFloat(e.target.value));
  });

  // Toggles
  toggleFrostBtn?.addEventListener("click", () => {
    sound.playClick();
    const isActive = toggleFrostBtn.classList.toggle("active");
    studioCan?.classList.toggle("frosted", isActive);
    showToast(isActive ? "❄️ Cold Frost Condensation Enabled" : "Condensation Cleared");
  });

  toggleXrayBtn?.addEventListener("click", () => {
    sound.playClick();
    const isActive = toggleXrayBtn.classList.toggle("active");
    xrayPins?.classList.toggle("active", isActive);

    // If can is showing back, gently face front so user sees X-Ray hotspots
    if (isActive && (studioAngle > 90 && studioAngle < 270)) {
      updateCanRotation(0, 0);
    }
    showToast(isActive ? "⚡ Formula X-Ray Mode: Click pins for clinical data" : "X-Ray Mode Off");
  });

  toggleAutoSpinBtn?.addEventListener("click", () => {
    sound.playClick();
    studioIsAutoSpin = !studioIsAutoSpin;
    toggleAutoSpinBtn.classList.toggle("active", studioIsAutoSpin);
  });

  // Hotspot pin click interactions
  document.querySelectorAll(".xray-pin").forEach(pin => {
    pin.addEventListener("click", (e) => {
      e.stopPropagation();
      sound.playClick();
      const pinId = pin.getAttribute("data-pin");
      const tooltip = pin.querySelector(".pin-tooltip strong")?.textContent;
      showToast(`🔬 Bio-Compound: ${tooltip || 'Active Clinical Nootropic'}`);
    });
  });

  // Direct Flavor Selector Buttons in the Studio
  document.querySelectorAll(".studio-flv-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      sound.playClick();
      document.querySelectorAll(".studio-flv-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const flavorKey = btn.getAttribute("data-studio-flavor");
      updateStudioFlavor(flavorKey);
    });
  });

  // Studio Add to Cart & 12-Pack
  document.getElementById("studioAddToCartBtn")?.addEventListener("click", () => {
    const prod = PRODUCTS[currentStudioFlavor];
    addToCart({
      id: prod.id,
      key: prod.key,
      name: `PULSE ${prod.name}`,
      detail: `${prod.flavorName} (Single Can)`,
      price: prod.price,
      color: prod.color
    });
  });

  document.getElementById("studioBuildPackBtn")?.addEventListener("click", () => {
    sound.playClick();
    incrementCrateFlavor(currentStudioFlavor, 1);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
  });

  // Initial render of default flavor
  updateStudioFlavor("focus");
}

function updateStudioFlavor(flavorKey) {
  const prod = PRODUCTS[flavorKey];
  if (!prod) return;
  currentStudioFlavor = flavorKey;

  const studioCanFlavor = document.getElementById("studioCanFlavor");
  const studioCanMeta = document.getElementById("studioCanMeta");
  const studioCanMark = document.getElementById("studioCanMark");
  const studioCanWave = document.getElementById("studioCanWave");

  const studioEyebrow = document.getElementById("studioEyebrow");
  const studioTitle = document.getElementById("studioTitle");
  const studioDesc = document.getElementById("studioDesc");
  const studioStack = document.getElementById("studioStack");
  const studioCaffeine = document.getElementById("studioCaffeine");
  const factsStackName = document.getElementById("factsStackName");
  const factsCaffeine = document.getElementById("factsCaffeine");

  if (studioCanFlavor) {
    studioCanFlavor.textContent = prod.name;
    studioCanFlavor.style.color = prod.color;
  }
  if (studioCanMeta) {
    studioCanMeta.textContent = `${prod.flavorName.toUpperCase()} / ${prod.caffeine.toUpperCase()}`;
  }
  if (studioCanMark) {
    studioCanMark.style.borderColor = prod.color;
    studioCanMark.style.color = prod.color;
    studioCanMark.style.boxShadow = `0 0 24px ${prod.glow}`;
  }
  if (studioCanWave) {
    studioCanWave.style.borderTopColor = prod.color;
    studioCanWave.style.boxShadow = `0 0 25px ${prod.glow}`;
  }

  if (studioEyebrow) studioEyebrow.textContent = `FORMULA — ${prod.name}`;
  if (studioTitle) studioTitle.textContent = prod.flavorName;
  if (studioDesc) studioDesc.textContent = prod.desc;
  if (studioStack) studioStack.textContent = prod.stack;
  if (studioCaffeine) studioCaffeine.textContent = `${prod.caffeineMg} mg`;

  // Update back facts panel
  if (factsStackName) factsStackName.textContent = prod.stack.split("+")[0].trim();
  if (factsCaffeine) factsCaffeine.textContent = `Natural Caffeine (${prod.caffeineMg}mg)`;

  // Keep studio flavor buttons in sync
  document.querySelectorAll(".studio-flv-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-studio-flavor") === flavorKey);
  });
}

/* ==========================================================
   6. INTERACTIVE ENERGY CURVE & CRASH SIMULATOR
   ========================================================== */
function initEnergySimulator() {
  const canvas = document.getElementById("energyCanvas");
  const slider = document.getElementById("hourSlider");
  const hourDisplay = document.getElementById("hourDisplay");
  const pulseFocusMeter = document.getElementById("pulseFocusMeter");
  const sugarCrashMeter = document.getElementById("sugarCrashMeter");
  const jitterMeter = document.getElementById("jitterMeter");

  if (!canvas || !slider) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    drawChart(parseFloat(slider.value));
  }

  function getPulseEnergy(t) {
    if (t <= 0.8) return 20 + (75 * (t / 0.8));
    if (t <= 5.5) return 95 - ((t - 0.8) * 1.5);
    return Math.max(30, 88 - ((t - 5.5) * 22));
  }

  function getSugarEnergy(t) {
    if (t <= 0.6) return 20 + (80 * (t / 0.6));
    if (t <= 2.2) return 100 - ((t - 0.6) * 55);
    return Math.max(12, 12 + Math.sin(t) * 5);
  }

  function getCoffeeEnergy(t) {
    if (t <= 0.5) return 20 + (70 * (t / 0.5));
    if (t <= 3.5) return 90 - ((t - 0.5) * 22);
    return Math.max(22, 24 + ((8 - t) * 1.5));
  }

  function drawChart(currentHour) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const padLeft = 50;
    const padRight = 30;
    const padTop = 35;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // Draw Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;

    for (let y = 0; y <= 4; y++) {
      const lineY = padTop + (plotH * (y / 4));
      ctx.beginPath();
      ctx.moveTo(padLeft, lineY);
      ctx.lineTo(w - padRight, lineY);
      ctx.stroke();

      ctx.fillStyle = "#676772";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(`${100 - y * 25}%`, 14, lineY + 4);
    }

    // Time ticks (0h to 8h)
    for (let hr = 0; hr <= 8; hr += 2) {
      const lineX = padLeft + (plotW * (hr / 8));
      ctx.beginPath();
      ctx.moveTo(lineX, padTop);
      ctx.lineTo(lineX, h - padBottom);
      ctx.stroke();

      ctx.fillStyle = "#676772";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(`${hr}h`, lineX - 6, h - padBottom + 18);
    }

    // Baseline threshold line
    const baselineY = padTop + (plotH * 0.7);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.moveTo(padLeft, baselineY);
    ctx.lineTo(w - padRight, baselineY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillText("Resting Baseline", w - padRight - 95, baselineY - 6);

    // Plot Sugar Curve (Red / Crash)
    ctx.beginPath();
    ctx.strokeStyle = "#ff4757";
    ctx.lineWidth = 2.5;
    for (let x = 0; x <= plotW; x += 3) {
      const t = (x / plotW) * 8;
      const val = getSugarEnergy(t);
      const py = padTop + plotH * (1 - val / 100);
      if (x === 0) ctx.moveTo(padLeft + x, py);
      else ctx.lineTo(padLeft + x, py);
    }
    ctx.stroke();

    // Plot Coffee Curve (Violet / Jitter)
    ctx.beginPath();
    ctx.strokeStyle = "#8a7dff";
    ctx.lineWidth = 2;
    for (let x = 0; x <= plotW; x += 3) {
      const t = (x / plotW) * 8;
      const val = getCoffeeEnergy(t);
      const py = padTop + plotH * (1 - val / 100);
      if (x === 0) ctx.moveTo(padLeft + x, py);
      else ctx.lineTo(padLeft + x, py);
    }
    ctx.stroke();

    // Plot PULSE Curve (Neon Lime / Alpha Waves) with soft glow
    ctx.beginPath();
    ctx.strokeStyle = "#d8ff00";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "rgba(216, 255, 0, 0.6)";
    ctx.shadowBlur = 10;
    for (let x = 0; x <= plotW; x += 3) {
      const t = (x / plotW) * 8;
      const val = getPulseEnergy(t);
      const py = padTop + plotH * (1 - val / 100);
      if (x === 0) ctx.moveTo(padLeft + x, py);
      else ctx.lineTo(padLeft + x, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Current Hour Scrubber
    const scrubX = padLeft + (plotW * (currentHour / 8));
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(scrubX, padTop);
    ctx.lineTo(scrubX, h - padBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Scrubber indicator head
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(scrubX, padTop - 6, 5, 0, Math.PI * 2);
    ctx.fill();

    // Intersection dots
    const pulseY = padTop + plotH * (1 - getPulseEnergy(currentHour) / 100);
    const sugarY = padTop + plotH * (1 - getSugarEnergy(currentHour) / 100);

    ctx.fillStyle = "#d8ff00";
    ctx.beginPath();
    ctx.arc(scrubX, pulseY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff4757";
    ctx.beginPath();
    ctx.arc(scrubX, sugarY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Legend on canvas top right
    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = "#d8ff00";
    ctx.fillText("● PULSE (Cognizin Nootropic)", padLeft + 10, padTop - 12);
    ctx.fillStyle = "#ff4757";
    ctx.fillText("● Legacy Sugar Drink", padLeft + 220, padTop - 12);
    ctx.fillStyle = "#8a7dff";
    ctx.fillText("● Black Coffee", padLeft + 380, padTop - 12);

    ctx.restore();
  }

  function updateTelemetry(hr) {
    if (hourDisplay) hourDisplay.textContent = `Hour ${hr.toFixed(1)}`;
    const pVal = Math.round(getPulseEnergy(hr));
    const sVal = Math.round(getSugarEnergy(hr));

    if (pulseFocusMeter) pulseFocusMeter.textContent = `${pVal}%`;
    if (sugarCrashMeter) {
      const crashRisk = Math.max(0, 100 - sVal);
      sugarCrashMeter.textContent = `${crashRisk}%`;
    }
    if (jitterMeter) {
      if (hr < 2.5) {
        jitterMeter.textContent = "4% (Calm Focus)";
        jitterMeter.style.color = "var(--c-flow)";
      } else {
        jitterMeter.textContent = "2% (Resting)";
        jitterMeter.style.color = "var(--text-dim)";
      }
    }
  }

  slider.addEventListener("input", (e) => {
    sound.playClick();
    const hr = parseFloat(e.target.value);
    drawChart(hr);
    updateTelemetry(hr);
  });

  window.addEventListener("resize", resizeCanvas);
  setTimeout(resizeCanvas, 100);
}

/* ==========================================================
   7. PRODUCT LINEUP GRID INJECTION
   ========================================================== */
function initProductGrid() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = Object.values(PRODUCTS).map(prod => `
    <div class="product-card" style="--card-accent: ${prod.color}; --card-glow: ${prod.glow};">
      <div>
        <div class="pc-top">
          <span class="pc-code">${prod.id.toUpperCase()}</span>
          <span class="pc-tag" style="border-color: ${prod.color}; color: ${prod.color};">${prod.tags[0]}</span>
        </div>

        <!-- 3D Mini Can Visualizer -->
        <div class="mini-can" data-flavor-key="${prod.key}" title="Click to inspect in 3D Studio">
          <div class="can-top"></div>
          <div class="can-body">
            <div class="can-burst" style="border-color: ${prod.color}; color: ${prod.color}; box-shadow: 0 0 16px ${prod.glow};">P</div>
            <div class="can-name">PULSE</div>
            <div class="can-flavor" style="color: ${prod.color}; font-size: 13px;">${prod.name}</div>
            <div class="can-meta">${prod.flavorName.toUpperCase()}</div>
            <div class="can-wave" style="border-top-color: ${prod.color}; box-shadow: 0 0 16px ${prod.glow};"></div>
            <div class="can-small">ENERGY DRINK</div>
          </div>
          <div class="can-bottom"></div>
        </div>
      </div>

      <div class="pc-bottom">
        <h3>${prod.name}</h3>
        <p>${prod.subtitle}</p>

        <div class="pc-bio-pills">
          ${prod.tags.map(t => `<span class="bio-pill">${t}</span>`).join("")}
        </div>

        <div class="pc-row">
          <div class="price">$${prod.price.toFixed(2)} <span>/ can</span></div>
          <button class="add-btn" data-add-sku="${prod.key}" title="Add to cart" aria-label="Add ${prod.name} to cart">+</button>
        </div>
      </div>
    </div>
  `).join("");

  // Bind add buttons
  document.querySelectorAll("[data-add-sku]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const sku = btn.getAttribute("data-add-sku");
      const prod = PRODUCTS[sku];
      if (prod) {
        addToCart({
          id: prod.id,
          key: prod.key,
          name: `PULSE ${prod.name}`,
          detail: `${prod.flavorName} (Single Can)`,
          price: prod.price,
          color: prod.color
        });
      }
    });
  });

  // Clicking a product card focuses it in the 3D Studio
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const miniCan = card.querySelector(".mini-can");
      if (miniCan) {
        const key = miniCan.getAttribute("data-flavor-key");
        updateStudioFlavor(key);
        document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ==========================================================
   8. CUSTOM 12-PACK "VARIETY CRATE" BUILDER
   ========================================================== */
const crateState = {
  focus: 0,
  overdrive: 0,
  flow: 0,
  reboot: 0
};

function initCrateBuilder() {
  renderCrateSlots();

  document.querySelectorAll(".step-btn[data-flavor]").forEach(btn => {
    btn.addEventListener("click", () => {
      const flavor = btn.getAttribute("data-flavor");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      incrementCrateFlavor(flavor, delta);
    });
  });

  document.getElementById("addCustomPackBtn")?.addEventListener("click", () => {
    sound.playPop();
    const totalSlots = Object.values(crateState).reduce((a, b) => a + b, 0);
    if (totalSlots !== 12) return;

    const breakdown = Object.entries(crateState)
      .filter(([_, count]) => count > 0)
      .map(([k, c]) => `${c}x ${PRODUCTS[k].name}`)
      .join(", ");

    addToCart({
      id: "crate-custom-12",
      name: "Custom 12-Pack Variety Crate",
      detail: breakdown,
      price: 34.00,
      color: "var(--accent)"
    });
  });
}

function incrementCrateFlavor(flavor, delta) {
  const currentTotal = Object.values(crateState).reduce((a, b) => a + b, 0);
  if (delta > 0 && currentTotal >= 12) {
    showToast("⚠️ Crate is full! All 12 slots are assigned.");
    return;
  }
  if (delta < 0 && crateState[flavor] <= 0) return;

  sound.playClick();
  crateState[flavor] += delta;
  document.getElementById(`count-${flavor}`).textContent = crateState[flavor];
  renderCrateSlots();
}

function renderCrateSlots() {
  const grid = document.getElementById("crateGrid");
  const statusText = document.getElementById("crateStatusText");
  const addBtn = document.getElementById("addCustomPackBtn");

  if (!grid) return;

  // Flatten active slots
  const slots = [];
  Object.entries(crateState).forEach(([key, count]) => {
    for (let i = 0; i < count; i++) {
      slots.push(PRODUCTS[key]);
    }
  });

  const totalFilled = slots.length;

  if (statusText) {
    if (totalFilled === 12) {
      statusText.innerHTML = `🎉 <span style="color: var(--accent);">12 / 12 SLOTS COMPLETE (BUNDLE SAVED $8)</span>`;
      sound.playChime();
    } else {
      statusText.textContent = `${totalFilled} / 12 SLOTS FILLED`;
    }
  }

  if (addBtn) {
    if (totalFilled === 12) {
      addBtn.disabled = false;
      addBtn.innerHTML = `Add Custom Crate to Cart ($34.00) <span>+</span>`;
    } else {
      addBtn.disabled = true;
      addBtn.textContent = `Fill ${12 - totalFilled} More Slots to Add`;
    }
  }

  // Render 12 slot elements
  let html = "";
  for (let i = 0; i < 12; i++) {
    if (i < totalFilled) {
      const p = slots[i];
      html += `
        <div class="crate-slot filled" style="--slot-color: ${p.color}; --slot-glow: ${p.glow};">
          <span class="slot-icon">${p.name.charAt(0)}</span>
          <span class="slot-name">${p.name}</span>
        </div>
      `;
    } else {
      html += `
        <div class="crate-slot">
          <span style="color: #444; font-size: 11px;">+</span>
        </div>
      `;
    }
  }
  grid.innerHTML = html;
}

/* ==========================================================
   9. INVESTOR THESIS & INTERACTIVE FINANCIAL MODEL
   ========================================================== */
function initInvestorModel() {
  const subSlider = document.getElementById("subscribersSlider");
  const subCountDisplay = document.getElementById("subscribersCountDisplay");
  const arrDisplay = document.getElementById("calcArrDisplay");
  const grossDisplay = document.getElementById("calcGrossDisplay");
  const valDisplay = document.getElementById("calcValuationDisplay");

  function calculateModel() {
    if (!subSlider) return;
    const subs = parseInt(subSlider.value, 10);
    if (subCountDisplay) subCountDisplay.textContent = subs.toLocaleString();

    // D2C Subscription bundle: $48.50/mo average
    const monthlyRev = subs * 48.50;
    const arr = monthlyRev * 12;
    const grossProfit = arr * 0.823; // 82.3% D2C gross margin
    const valuation = arr * 8.0; // 8.0x ARR multiple standard

    if (arrDisplay) arrDisplay.textContent = `$${(arr / 1000000).toFixed(1)}M`;
    if (grossDisplay) grossDisplay.textContent = `$${(grossProfit / 1000000).toFixed(1)}M`;
    if (valDisplay) valDisplay.textContent = `$${(valuation / 1000000).toFixed(1)}M`;
  }

  subSlider?.addEventListener("input", () => {
    sound.playClick();
    calculateModel();
  });
  calculateModel();

  // Pitch Deck Modal Tabs & Content
  initPitchDeckModal();
}

function initPitchDeckModal() {
  const deckModal = document.getElementById("investorModal");
  const openBtns = [
    document.getElementById("openInvestorDeckBtn"),
    document.getElementById("heroInvestorBtn"),
    document.getElementById("openDeckModalBtn"),
    document.getElementById("footerInvestorLink")
  ];

  openBtns.forEach(btn => {
    btn?.addEventListener("click", () => {
      sound.playClick();
      deckModal?.classList.add("open");
      renderDeckTab("problem");
    });
  });

  const tabs = document.querySelectorAll(".deck-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      sound.playClick();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.getAttribute("data-tab");
      renderDeckTab(tabName);
    });
  });

  document.getElementById("downloadDeckBtn")?.addEventListener("click", () => {
    sound.playClick();
    const brief = {
      company: "PULSE Energy Inc.",
      category: "Functional Nootropic Beverages",
      round: "Seed / Series A ($3.5M)",
      tam: "$86B Global Energy Beverage Market",
      unitEconomics: {
        cogs: "$0.62 / can",
        mrp: "$3.50 / can",
        d2cGrossMargin: "82.3%",
        aov: "$48.50",
        repeatRate90d: "64.2%"
      },
      traction: {
        waitlist: "120,000+ organic subscribers",
        pilotArr: "$1.8M",
        ltvCac: "3.4x"
      },
      patentsPending: 2,
      contact: "invest@pulseenergy.co"
    };
    const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PULSE_Investor_Executive_Summary.json";
    a.click();
    showToast("📄 Investor Executive Brief downloaded.");
  });
}

function renderDeckTab(tabName) {
  const content = document.getElementById("deckContent");
  if (!content) return;

  if (tabName === "problem") {
    content.innerHTML = `
      <div style="padding: 10px 0;">
        <h4 style="font-family: var(--font-display); font-size: 26px; margin-bottom: 12px;">The $86B Crisis: Legacy Energy Drinks are Toxic</h4>
        <p style="color: var(--text-dim); font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
          For 30 years, legacy brands (Red Bull, Monster) built empire-scale distribution on artificial caffeine, synthetic taurine, and up to 34g of high-fructose corn syrup.
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div class="spec-card">
            <span style="color: var(--c-reboot);">84% CONSUMERS</span>
            <strong style="font-size: 15px;">Experience Sugar Crashes</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Hypoglycemic collapse within 90 minutes of consumption.</p>
          </div>
          <div class="spec-card">
            <span style="color: var(--c-reboot);">68% REPORT</span>
            <strong style="font-size: 15px;">Jitters & Heart Racing</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Unbuffered synthetic caffeine causes vasoconstriction and anxiety.</p>
          </div>
          <div class="spec-card">
            <span style="color: var(--c-flow);">THE SHIFT</span>
            <strong style="font-size: 15px;">Knowledge Worker Demand</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Engineers and creators require cognitive endurance, not toxic adrenaline.</p>
          </div>
        </div>
      </div>
    `;
  } else if (tabName === "solution") {
    content.innerHTML = `
      <div style="padding: 10px 0;">
        <h4 style="font-family: var(--font-display); font-size: 26px; margin-bottom: 12px;">The Solution: Bio-Optimized Clean Neuro-Stack</h4>
        <p style="color: var(--text-dim); font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
          PULSE pairs natural caffeine with pharmaceutical-grade Cognizin® Citicoline and L-Theanine in clinically validated 2:1 ratios to modulate alpha-frequency brain waves (8-12 Hz) for calm, sustained 6-hour flow states.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
          <div class="spec-card" style="border-color: var(--accent);">
            <strong style="color: var(--accent); font-size: 16px;">Proprietary Micro-Encapsulation IP</strong>
            <p style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">
              Overcomes the historic barrier of nootropics: bitter active botanicals are encapsulated in clean lipid spheres, yielding pristine flavor without sugar or sucralose.
            </p>
          </div>
          <div class="spec-card" style="border-color: var(--c-flow);">
            <strong style="color: var(--c-flow); font-size: 16px;">100% Infinitely Recyclable Aluminum</strong>
            <p style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">
              Zero plastic packaging. Carbon-negative fulfillment and solar-brewed production facilities.
            </p>
          </div>
        </div>
      </div>
    `;
  } else if (tabName === "battlecard") {
    content.innerHTML = `
      <div style="padding: 10px 0;">
        <h4 style="font-family: var(--font-display); font-size: 26px; margin-bottom: 8px;">Direct Competitor Battlecard</h4>
        <p style="color: var(--text-dim); font-size: 13px; margin-bottom: 16px;">Why PULSE wins the next generation of high-earning consumers:</p>
        <table class="battlecard-table">
          <thead>
            <tr>
              <th>Feature / Metric</th>
              <th style="color: var(--accent);">PULSE</th>
              <th>Monster / Red Bull</th>
              <th>Celsius</th>
              <th>Artisanal Coffee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sugar / Carbohydrates</td>
              <td class="highlight-cell">0g Sugar / 5 Cal</td>
              <td>27g - 34g Sugar</td>
              <td>0g (Sucralose)</td>
              <td>0g (Acidity spikes)</td>
            </tr>
            <tr>
              <td>Bioactive Nootropics</td>
              <td class="highlight-cell">Cognizin® + Theanine + Cordyceps</td>
              <td>None (Chemical Taurine)</td>
              <td>Basic Vitamin B Mix</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Crash-Free Duration</td>
              <td class="highlight-cell">6.0+ Hours Sustained</td>
              <td>1.5 Hours (Crash)</td>
              <td>2.5 Hours</td>
              <td>1.8 Hours</td>
            </tr>
            <tr>
              <td>D2C Gross Margin</td>
              <td class="highlight-cell">82.3%</td>
              <td>Retail only (~52%)</td>
              <td>~48% Blended</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>90-Day Retention</td>
              <td class="highlight-cell">64.2%</td>
              <td>Undisclosed</td>
              <td>~36%</td>
              <td>Daily habit</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else if (tabName === "economics") {
    content.innerHTML = `
      <div style="padding: 10px 0;">
        <h4 style="font-family: var(--font-display); font-size: 26px; margin-bottom: 12px;">Software-Like D2C Unit Economics</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px;">
          <div class="telemetry-card good">
            <span>COGS / CAN</span>
            <strong>$0.62</strong>
          </div>
          <div class="telemetry-card good">
            <span>RETAIL PRICE</span>
            <strong>$3.50</strong>
          </div>
          <div class="telemetry-card good">
            <span>GROSS MARGIN</span>
            <strong>82.3%</strong>
          </div>
          <div class="telemetry-card good">
            <span>CAC PAYBACK</span>
            <strong>&lt; 2.1 Orders</strong>
          </div>
        </div>
        <p style="color: var(--text-dim); font-size: 13px; line-height: 1.6;">
          Our direct-to-consumer variety crate model generates an Average Order Value (AOV) of $48.50 with a Customer Acquisition Cost (CAC) of $22.40. With a 64.2% 90-day repeat subscription rate, customer Lifetime Value (LTV) exceeds $148.00, providing an exceptional 3.4x LTV:CAC ratio.
        </p>
      </div>
    `;
  } else if (tabName === "ask") {
    content.innerHTML = `
      <div style="padding: 10px 0;">
        <h4 style="font-family: var(--font-display); font-size: 26px; margin-bottom: 12px;">The Investment Round: $3.5M Seed Allocation</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="spec-card">
              <span style="color: var(--accent);">45% • $1.575M</span>
              <strong>Inventory & Scaled Co-Packing</strong>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Bulk botanical sourcing & multi-facility canned production runs.</p>
            </div>
            <div class="spec-card">
              <span style="color: var(--c-overdrive);">35% • $1.225M</span>
              <strong>Omnichannel Growth & Creator Flywheel</strong>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Performance digital acquisition + tech/founder ambassador program.</p>
            </div>
            <div class="spec-card">
              <span style="color: var(--c-flow);">20% • $700K</span>
              <strong>R&D, Clinical Trials & IP Filing</strong>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Double-blind placebo EEG cognitive study publication.</p>
            </div>
          </div>
          <div style="background: #15151e; border: 1px solid var(--line-strong); border-radius: 18px; padding: 24px; text-align: center;">
            <div class="badge badge-pulse" style="margin-bottom: 12px;">ROUND STATUS</div>
            <h5 style="font-family: var(--font-display); font-size: 28px; margin-bottom: 8px;">65% Allocated</h5>
            <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 20px;">$2.27M committed by prominent consumer angels and tier-1 seed funds.</p>
            <a href="mailto:invest@pulseenergy.co?subject=PULSE%20Seed%20Syndicate%20Inquiry" class="btn btn-primary" style="width: 100%;">
              Schedule Partner Meeting ↗
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

/* ==========================================================
   10. PULSE MATCH DIAGNOSTIC QUIZ
   ========================================================== */
const QUIZ_QUESTIONS = [
  {
    step: 1,
    eyebrow: "STEP 01 / 03 — COGNITIVE DEMAND",
    title: "What is your primary daily challenge?",
    options: [
      { id: "opt-code", title: "Deep Software & Complex Engineering", desc: "Long uninterrupted logic flow requiring sustained mental clarity.", flavor: "focus" },
      { id: "opt-speed", title: "High-Intensity Kinetic & Creative Sprints", desc: "Fast execution, deadlines, presentations, or physical output.", flavor: "overdrive" },
      { id: "opt-calm", title: "Creative Flow & High Stress Environments", desc: "Zen composure, zero anxiety, and sustained design focus.", flavor: "flow" },
      { id: "opt-endure", title: "Multi-Hour Endurance & Long Workdays", desc: "Rehydration, electrolyte replenishment, and preventing 3 PM crash.", flavor: "reboot" }
    ]
  },
  {
    step: 2,
    eyebrow: "STEP 02 / 03 — CAFFEINE PHARMACOLOGY",
    title: "How does your metabolism handle caffeine?",
    options: [
      { id: "opt-sensitive", title: "I get jittery easily", desc: "Prefer L-Theanine buffering to neutralize heart racing.", flavor: "flow" },
      { id: "opt-optimal", title: "Moderate tolerance (1-2 cups)", desc: "Love clean natural green tea caffeine without the crash.", flavor: "focus" },
      { id: "opt-heavy", title: "High tolerance / Need max boost", desc: "Need full 200mg kinetic drive + adaptogens.", flavor: "overdrive" },
      { id: "opt-hydrated", title: "Dehydrated & fatigued", desc: "Need electrolytes + bio-minerals alongside energy.", flavor: "reboot" }
    ]
  },
  {
    step: 3,
    eyebrow: "STEP 03 / 03 — TASTE PROFILE",
    title: "Which flavor signature excites your palate?",
    options: [
      { id: "opt-citrus", title: "Cyber Citrus (Japanese Yuzu & Lime)", desc: "Crisp, tart, razor-sharp citrus botanicals.", flavor: "focus" },
      { id: "opt-berry", title: "Ghost Blackberry (Wild Acai & Currant)", desc: "Bold, rich dark berry with velvety smooth finish.", flavor: "overdrive" },
      { id: "opt-matcha", title: "Zen Matcha (Ceremonial Matcha & Mint)", desc: "Earthy, calming, antioxidant-rich green tea.", flavor: "flow" },
      { id: "opt-orange", title: "Solar Blood Orange (Sicilian Citrus)", desc: "Sweet-tart sun-ripened citrus with pink salt crispness.", flavor: "reboot" }
    ]
  }
];

let quizCurrentIndex = 0;
let quizAnswers = [];

function initMatchQuiz() {
  const modal = document.getElementById("quizModal");
  const startBtns = [
    document.getElementById("startQuiz"),
    document.getElementById("heroStartQuizBtn"),
    document.getElementById("ctaMatchBtn")
  ];

  startBtns.forEach(btn => {
    btn?.addEventListener("click", () => {
      sound.playClick();
      quizCurrentIndex = 0;
      quizAnswers = [];
      modal?.classList.add("open");
      renderQuizStep();
    });
  });
}

function renderQuizStep() {
  const container = document.getElementById("quizContent");
  const progressFill = document.getElementById("quizProgressFill");
  if (!container) return;

  if (quizCurrentIndex >= QUIZ_QUESTIONS.length) {
    renderQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[quizCurrentIndex];
  if (progressFill) {
    progressFill.style.width = `${((quizCurrentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
  }

  container.innerHTML = `
    <div class="eyebrow">${q.eyebrow}</div>
    <h3>${q.title}</h3>
    <p class="quiz-question">Choose the response that reflects your daily routine:</p>
    <div class="quiz-options">
      ${q.options.map(opt => `
        <button class="quiz-option" data-flavor="${opt.flavor}">
          <strong>${opt.title}</strong>
          <span>${opt.desc}</span>
        </button>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      sound.playClick();
      const flavor = btn.getAttribute("data-flavor");
      quizAnswers.push(flavor);
      quizCurrentIndex++;
      renderQuizStep();
    });
  });
}

function renderQuizResult() {
  const container = document.getElementById("quizContent");
  const progressFill = document.getElementById("quizProgressFill");
  if (!container) return;

  sound.playChime();
  if (progressFill) progressFill.style.width = "100%";

  // Determine dominant flavor
  const counts = { focus: 0, overdrive: 0, flow: 0, reboot: 0 };
  quizAnswers.forEach(f => { if (counts[f] !== undefined) counts[f]++; });
  let topFlavor = "focus";
  let maxCount = -1;
  Object.entries(counts).forEach(([k, c]) => {
    if (c > maxCount) {
      maxCount = c;
      topFlavor = k;
    }
  });

  const matched = PRODUCTS[topFlavor];

  container.innerHTML = `
    <div class="quiz-result">
      <div class="result-header">
        <div class="badge badge-pulse">98.4% METABOLIC COMPATIBILITY</div>
        <h3 style="font-size: clamp(38px, 5vw, 60px); margin: 12px 0 8px;">
          YOUR PULSE IS <span style="color: ${matched.color};">${matched.name}.</span>
        </h3>
        <p style="color: var(--text-dim); font-size: 14px;">
          Based on your neurological demands, we recommend <strong>${matched.flavorName}</strong> for peak cellular performance.
        </p>
      </div>

      <div class="result-layout">
        <div class="mini-can" style="margin: 0 auto; filter: drop-shadow(0 20px 30px ${matched.glow});">
          <div class="can-top"></div>
          <div class="can-body">
            <div class="can-burst" style="border-color: ${matched.color}; color: ${matched.color};">P</div>
            <div class="can-name">PULSE</div>
            <div class="can-flavor" style="color: ${matched.color}; font-size: 14px;">${matched.name}</div>
            <div class="can-meta">${matched.flavorName.toUpperCase()}</div>
            <div class="can-wave" style="border-top-color: ${matched.color};"></div>
          </div>
          <div class="can-bottom"></div>
        </div>

        <div>
          <div class="result-meters">
            <div class="result-meter">
              <span>ALPHA-WAVE FOCUS</span>
              <strong style="color: ${matched.color};">97% (OPTIMAL)</strong>
              <div class="meter-track"><span style="width: 97%; background: ${matched.color};"></span></div>
            </div>
            <div class="result-meter">
              <span>CRASH-FREE INDEX</span>
              <strong style="color: ${matched.color};">100% (ZERO DIP)</strong>
              <div class="meter-track"><span style="width: 100%; background: ${matched.color};"></span></div>
            </div>
          </div>

          <div style="background: #14141c; border-radius: 14px; padding: 14px; margin-bottom: 20px; font-size: 12px; color: var(--text-dim);">
            <strong style="color: #fff; display: block; margin-bottom: 4px;">ACTIVE BIO-STACK:</strong>
            ${matched.stack}
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <button class="btn btn-primary" id="quizAddMatchedBtn">
              Add ${matched.name} to Cart <span>+</span>
            </button>
            <button class="btn btn-ghost" id="quizRetakeBtn">
              Retake Quiz ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("quizAddMatchedBtn")?.addEventListener("click", () => {
    addToCart({
      id: matched.id,
      key: matched.key,
      name: `PULSE ${matched.name}`,
      detail: `${matched.flavorName} (Matched Formula)`,
      price: matched.price,
      color: matched.color
    });
    document.getElementById("quizModal")?.classList.remove("open");
  });

  document.getElementById("quizRetakeBtn")?.addEventListener("click", () => {
    sound.playClick();
    quizCurrentIndex = 0;
    quizAnswers = [];
    renderQuizStep();
  });
}

/* ==========================================================
   11. CHECKOUT SIMULATOR & FIREBASE ORDER PERSISTENCE
   ========================================================== */
function initCheckout() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponInput = document.getElementById("couponInput");

  // Promo Code Engine
  applyCouponBtn?.addEventListener("click", () => {
    sound.playClick();
    const code = (couponInput?.value || "").trim().toUpperCase();
    if (code === "PULSE20") {
      activeCoupon = { code: "PULSE20", rate: 0.20 };
      showToast("🎉 Promo code PULSE20 applied! 20% OFF your order.");
    } else if (code === "INVESTOR") {
      activeCoupon = { code: "INVESTOR", rate: 0.30 };
      showToast("💎 Investor VIP Pass: 30% OFF applied!");
    } else if (code === "FREESHIP") {
      activeCoupon = { code: "FREESHIP", rate: 0, freeShip: true };
      showToast("🚀 Code FREESHIP applied! Free Express Shipping unlocked.");
    } else {
      showToast("⚠️ Invalid promo code. Try PULSE20 or INVESTOR");
    }
    renderCart();
  });

  // Simulated Checkout
  checkoutBtn?.addEventListener("click", async () => {
    if (cart.length === 0) {
      showToast("⚠️ Your cart is empty.");
      return;
    }

    sound.playChime();
    closeCartDrawer();

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = activeCoupon ? subtotal * activeCoupon.rate : 0;
    const shipping = (subtotal >= 50 || (activeCoupon && activeCoupon.freeShip)) ? 0 : 4.99;
    const finalAmount = Math.max(0, subtotal - discount + shipping);

    const orderData = {
      orderId,
      items: [...cart],
      total: finalAmount,
      date: new Date().toLocaleDateString()
    };

    // Save order in Firestore or local mock
    if (isConfigured && db) {
      try {
        await addDoc(collection(db, "orders"), {
          ...orderData,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn("Firestore save failed, using localStore fallback:", err);
        localStore.saveOrder(orderData);
      }
    } else {
      localStore.saveOrder(orderData);
    }

    // Populate Receipt Modal
    const receiptOrderId = document.getElementById("receiptOrderId");
    const receiptTotal = document.getElementById("receiptTotal");
    if (receiptOrderId) receiptOrderId.textContent = orderId;
    if (receiptTotal) receiptTotal.textContent = `$${finalAmount.toFixed(2)}`;

    // Clear cart
    cart = [];
    activeCoupon = null;
    if (couponInput) couponInput.value = "";
    saveCart();

    checkoutModal?.classList.add("open");
  });
}

/* ==========================================================
   12. USER AUTHENTICATION & DEMO FALLBACK
   ========================================================== */
function initAuth() {
  const accountBtn = document.getElementById("accountBtn");
  const accountModal = document.getElementById("accountModal");
  const authForm = document.getElementById("authForm");
  const demoUserBtn = document.getElementById("demoUserBtn");
  const authStatus = document.getElementById("authStatus");
  const userOrdersPanel = document.getElementById("userOrdersPanel");
  const ordersList = document.getElementById("ordersList");
  const logoutBtn = document.getElementById("logoutBtn");

  accountBtn?.addEventListener("click", () => {
    sound.playClick();
    accountModal?.classList.add("open");
    checkUserSession();
  });

  demoUserBtn?.addEventListener("click", () => {
    sound.playClick();
    const demoUser = { email: "investor@pulseenergy.co", displayName: "Venture Partner", uid: "demo-investor-001" };
    localStore.setUser(demoUser);
    showToast("⚡ Signed in as Guest Demo Investor.");
    checkUserSession();
  });

  authForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    sound.playClick();
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (isConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        showToast("⚡ Welcome back to PULSE.");
      } catch (err) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          showToast("⚡ PULSE account created successfully.");
        } catch (authErr) {
          if (authStatus) authStatus.textContent = authErr.message;
        }
      }
    } else {
      // Local fallback
      localStore.setUser({ email, displayName: email.split("@")[0], uid: "usr-" + Date.now() });
      showToast("⚡ Signed in (Local Demo Mode).");
      checkUserSession();
    }
  });

  logoutBtn?.addEventListener("click", async () => {
    sound.playClick();
    if (isConfigured && auth) {
      await signOut(auth);
    }
    localStore.setUser(null);
    showToast("Signed out.");
    checkUserSession();
  });

  function checkUserSession() {
    const user = localStore.getUser();
    if (user) {
      if (authStatus) authStatus.innerHTML = `Active Session: <strong>${user.email}</strong>`;
      if (userOrdersPanel) userOrdersPanel.style.display = "block";
      renderUserOrders();
    } else {
      if (authStatus) authStatus.textContent = "";
      if (userOrdersPanel) userOrdersPanel.style.display = "none";
    }
  }

  function renderUserOrders() {
    if (!ordersList) return;
    const orders = localStore.getOrders();
    if (orders.length === 0) {
      ordersList.innerHTML = `<p style="color: var(--text-muted);">No past orders found in this session.</p>`;
    } else {
      ordersList.innerHTML = orders.map(ord => `
        <div style="padding: 10px 0; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between;">
          <div>
            <strong style="color: #fff;">${ord.orderId || ord.id}</strong>
            <div style="font-size: 10px; color: var(--text-muted);">${ord.items ? ord.items.length : 1} item(s) • ${ord.date || 'Today'}</div>
          </div>
          <div style="font-family: var(--font-mono); color: var(--accent); font-weight: 700;">
            $${(ord.total || 34.00).toFixed(2)}
          </div>
        </div>
      `).join("");
    }
  }
}

/* ==========================================================
   13. TOAST NOTIFICATIONS & GLOBAL UI LISTENERS
   ========================================================== */
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initGlobalUI() {
  // Sound toggle button
  const soundToggle = document.getElementById("soundToggle");
  const soundLabel = document.getElementById("soundLabel");

  if (sound.muted) {
    soundToggle?.classList.remove("active");
    if (soundLabel) soundLabel.textContent = "AUDIO OFF";
  }

  soundToggle?.addEventListener("click", () => {
    const isNowOn = sound.toggle();
    if (isNowOn) {
      soundToggle.classList.add("active");
      if (soundLabel) soundLabel.textContent = "AUDIO ON";
      sound.playClick();
      showToast("🔊 Procedural Web Audio ON");
    } else {
      soundToggle.classList.remove("active");
      if (soundLabel) soundLabel.textContent = "AUDIO OFF";
      showToast("🔇 Audio muted.");
    }
  });

  // Cart button & close
  document.getElementById("cartBtn")?.addEventListener("click", () => {
    sound.playClick();
    openCartDrawer();
  });
  document.getElementById("closeCart")?.addEventListener("click", () => {
    sound.playClick();
    closeCartDrawer();
  });
  document.getElementById("drawerOverlay")?.addEventListener("click", closeCartDrawer);

  // Modal close buttons (data-close="modalId")
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      sound.playClick();
      const modalId = btn.getAttribute("data-close");
      document.getElementById(modalId)?.classList.remove("open");
    });
  });

  // Cart item delegation (+ / -)
  document.getElementById("cartItems")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-qty]");
    if (btn) {
      const id = btn.getAttribute("data-cart-qty");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      updateCartQty(id, delta);
    }
  });

  // Scroll reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Dynamic Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Navigation scroll styling
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("nav");
    if (window.scrollY > 50) {
      nav?.classList.add("scrolled");
    } else {
      nav?.classList.remove("scrolled");
    }
  });

  // Cursor glow tracker
  const cursorGlow = document.getElementById("cursorGlow");
  window.addEventListener("pointermove", (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });
}

/* ==========================================================
   INITIALIZATION BOOTSTRAP
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initGlobalUI();
  initHeroCan();
  initStudio();
  initEnergySimulator();
  initProductGrid();
  initCrateBuilder();
  initInvestorModel();
  initMatchQuiz();
  initCheckout();
  initAuth();
  renderCart();

  console.log("⚡ [PULSE] System initialized. Ready for investors & consumers.");
});
