import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6--T3tqoVwl30VwoEzxbzm6lgp2GoeuI",
  authDomain: "curso-e6937.firebaseapp.com",
  projectId: "curso-e6937",
  storageBucket: "curso-e6937.firebasestorage.app",
  messagingSenderId: "965410352281",
  appId: "1:965410352281:web:adc9228a13e39d44e01c08",
  measurementId: "G-1KXP5H3W23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
