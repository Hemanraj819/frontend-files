// Firebase setup for PULSE Energy
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const isConfigured = firebaseConfig.apiKey !== "PASTE_API_KEY" && Boolean(firebaseConfig.apiKey);

let app = null;
let auth = null;
let db = null;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("⚡ [PULSE] Connected to live Firebase project");
  } catch (err) {
    console.warn("⚡ [PULSE] Firebase initialization fallback to Demo Mode:", err.message);
  }
} else {
  console.info("⚡ [PULSE] Standalone Demo Mode active (offline-ready & local persistence). Replace keys in firebase.js for live backend.");
}

// Local storage fallback for standalone demo operation
export const localStore = {
  getUser: () => {
    const raw = localStorage.getItem("pulse_demo_user");
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem("pulse_demo_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("pulse_demo_user");
    }
  },
  saveOrder: (order) => {
    const orders = JSON.parse(localStorage.getItem("pulse_orders") || "[]");
    const newOrder = { 
      ...order, 
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000), 
      createdAt: new Date().toISOString() 
    };
    orders.unshift(newOrder);
    localStorage.setItem("pulse_orders", JSON.stringify(orders));
    return newOrder;
  },
  getOrders: () => {
    return JSON.parse(localStorage.getItem("pulse_orders") || "[]");
  }
};

export { 
  app, 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
};
