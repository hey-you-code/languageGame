// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK_8XdMAyQpCHpOWOTVRxjE8SUVz4bY_8",
  authDomain: "languagelearninggame-f966f.firebaseapp.com",
  projectId: "languagelearninggame-f966f",
  storageBucket: "languagelearninggame-f966f.appspot.com",
  messagingSenderId: "832512116079",
  appId: "1:832512116079:web:3a8690daa725f0e7b9949a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
