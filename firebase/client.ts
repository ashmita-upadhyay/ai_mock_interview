// firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7sVid00dkG_PAdtff7sGzex5pFLuLHuQ",
  authDomain: "preppro-31ace.firebaseapp.com",
  projectId: "preppro-31ace",
  storageBucket: "preppro-31ace.appspot.com",
  messagingSenderId: "145958380346",
  appId: "1:145958380346:web:b0916ea41f8d8b8e7de603",
  measurementId: "G-LX824H020G",
};

// Initialize Firebase app only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
