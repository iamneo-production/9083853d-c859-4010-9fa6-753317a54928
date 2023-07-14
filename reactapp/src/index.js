import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import '.login/firebaseConfig.js';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "AIzaSyCRuJo6s3CmcaPxHUZm0anRBunxTk12iNg",
  authDomain: "projectk-5d142.firebaseapp.com",
  projectId: "projectk-5d142",
  storageBucket: "projectk-5d142.appspot.com",
  messagingSenderId: "125384238533",
  appId: "1:125384238533:web:dfc0be6f97cfe6629d57ac",
  measurementId: "G-XDD5K609M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();
const db = getFirestore(app);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
