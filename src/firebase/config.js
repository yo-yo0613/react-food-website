// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7OaQoxD20SDSXAjxV3DL5bTcw6edgr0",
  authDomain: "food-website-51067.firebaseapp.com",
  databaseURL: "https://food-website-51067-default-rtdb.firebaseio.com",
  projectId: "food-website-51067",
  storageBucket: "food-website-51067.firebasestorage.app",
  messagingSenderId: "694167228914",
  appId: "1:694167228914:web:59cbf4f10e4ee4bf85db6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;