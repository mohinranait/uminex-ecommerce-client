// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_74G4393Hy_cbN564Laj8hYH246b0Dfg",
  authDomain: "uminex-ecommerce-app.firebaseapp.com",
  projectId: "uminex-ecommerce-app",
  storageBucket: "uminex-ecommerce-app.appspot.com",
  messagingSenderId: "620850173317",
  appId: "1:620850173317:web:1da81dee835e08f42ea0ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;