// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_t0ssha4CcG-l_-GTVG_iNZG-HZyKxXw",
  authDomain: "strona-rekrutacyjna.firebaseapp.com",
  projectId: "strona-rekrutacyjna",
  storageBucket: "strona-rekrutacyjna.firebasestorage.app",
  messagingSenderId: "819411130542",
  appId: "1:819411130542:web:b49b936d129eb7a46bf53f",
  measurementId: "G-81RM4R6TR0"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Eksportowanie aplikacji i auth
export { app, auth , db};
