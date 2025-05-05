// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC6He0e-zSOBj07lU7kQ5eO7aeBZAcCCQ8",
    authDomain: "software-rop.firebaseapp.com",
    databaseURL: "https://software-rop-default-rtdb.firebaseio.com", // Add this line for Realtime Database
    projectId: "software-rop",
    storageBucket: "software-rop.appspot.com", // Fixed storage bucket URL
    messagingSenderId: "931089123625",
    appId: "1:931089123625:web:19cf35c78aaa38c53b8f38",
    measurementId: "G-8L0J9T7L9H"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Get Firestore instance
const db = getFirestore(app);

export { db };