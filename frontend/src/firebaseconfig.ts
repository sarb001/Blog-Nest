
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


  const firebaseConfig = {
    
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  }
  
  console.log('firebaseconfig -  ',firebaseConfig);
  
  console.log('metaa ee',import.meta.env);



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);