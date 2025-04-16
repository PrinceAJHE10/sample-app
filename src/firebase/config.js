import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config object here
  apiKey: "AIzaSyAUfEJ7b8P_0TmuIDP4TOYc8vm7FtO1-rM",
  authDomain: "alumni-76e53.firebaseapp.com",
  projectId: "alumni-76e53",
  storageBucket: "alumni-76e53.firebasestorage.app",
  messagingSenderId: "921976657229",
  appId: "1:921976657229:web:ad92bcf2e98f82746a9304"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 