import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";


// Firebase config
const firebaseConfig = {

  apiKey: "AIzaSyAzkGfJ1xDnorrAsfkoKnJi8nvuNrodkaA",

  authDomain: "zenstore-b53f9.firebaseapp.com",

  projectId: "zenstore-b53f9",

  storageBucket: "zenstore-b53f9.appspot.com",

  messagingSenderId: "221972271042",

  appId: "1:221972271042:web:78ce25c4b2676fdec0905b",

};


// Initialize app
const app = initializeApp(firebaseConfig);


// Authentication
export const auth = getAuth(app);


// Firestore Database (for orders, users, cart)
export const db = getFirestore(app);


// Storage (for product images, user profile images)
export const storage = getStorage(app);


export default app;
