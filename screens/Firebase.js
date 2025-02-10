// firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVEfpLH5YFE9zL-KZvPB8SNCLA9BVjQPs",
  authDomain: "audiorecorderapp-96175.firebaseapp.com",
  projectId: "audiorecorderapp-96175",
  storageBucket: "audiorecorderapp-96175.firebasestorage.app",
  messagingSenderId: "700389466050",
  appId: "1:700389466050:web:18f3265225e84431a3405b",
  measurementId: "G-JPF2M4L47T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth to use in other parts of the app
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
