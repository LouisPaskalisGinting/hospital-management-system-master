import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const firebaseConfig = {
  apiKey: "AIzaSyC1SUY2klkhoY3xhaxcJ7f1imyscJo-klg",
  authDomain: "klinik-kasih-ibu.firebaseapp.com",
  projectId: "klinik-kasih-ibu",
  storageBucket: "klinik-kasih-ibu.appspot.com",
  messagingSenderId: "55149306479",
  appId: "1:55149306479:web:f5db8a0e9be86f4aabe39a",
  measurementId: "G-VCES9EJB60",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();