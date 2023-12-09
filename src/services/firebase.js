// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcoJPt4n0QMuPPOlVJOrb5mGTpo9S4drc",
  authDomain: "uminex-mern-app.firebaseapp.com",
  projectId: "uminex-mern-app",
  storageBucket: "uminex-mern-app.appspot.com",
  messagingSenderId: "919644719631",
  appId: "1:919644719631:web:0350bdea28049d6074717a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;