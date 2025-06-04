// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6r3XJzOPQEK7sykUFt7EcG9WBBvgrTcM",
  authDomain: "eventsphere-8fbbc.firebaseapp.com",
  projectId: "eventsphere-8fbbc",
  storageBucket: "eventsphere-8fbbc.firebasestorage.app",
  messagingSenderId: "663199590633",
  appId: "1:663199590633:web:2de09f24f4583ab1032878",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
