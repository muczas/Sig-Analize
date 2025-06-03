// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2b2r9OYopEdqw60hpxJdzUD59r_HAtvI",
  authDomain: "pazig-app.firebaseapp.com",
  projectId: "pazig-app",
  storageBucket: "pazig-app.firebasestorage.app",
  messagingSenderId: "539336982805",
  appId: "1:539336982805:web:bce87016a71cda7cd9e91c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
