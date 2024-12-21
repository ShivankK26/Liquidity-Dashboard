
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbmNkCzFdpr9WckOqVXGuRc3iWlC9wOBg",
  authDomain: "liquiditydashboard.firebaseapp.com",
  projectId: "liquiditydashboard",
  storageBucket: "liquiditydashboard.appspot.com",
  messagingSenderId: "803125546999",
  appId: "1:803125546999:web:74b3501611de3aa2eae8f2",
  measurementId: "G-M9L86E4QSG"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)