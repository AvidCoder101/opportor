import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGwl2S1XVPkK64ldXZHE3DF6PvFi6Rs-s",
  authDomain: "opportunetto-b2430.firebaseapp.com",
  projectId: "opportunetto-b2430",
  storageBucket: "opportunetto-b2430.firebasestorage.app",
  messagingSenderId: "284533549301",
  appId: "1:284533549301:web:075418ca894401b9b93dbc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);