import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxXrmDQxXP9UgBEw3v_sHXbNfJmlaXW_g",
  authDomain: "housing-property-1eb80.firebaseapp.com",
  projectId: "housing-property-1eb80",
  storageBucket: "housing-property-1eb80.appspot.com",
  messagingSenderId: "999023944676",
  appId: "1:999023944676:web:1df776cfc9244b351b5df1",
  measurementId: "G-C6EDKW3295",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
