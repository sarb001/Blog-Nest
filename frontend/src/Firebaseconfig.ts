
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

console.log('appkey',import.meta.env.VITE_APIKEY);    // working 
console.log('domain',import.meta.env.VITE_AUTHDOMAIN);    // working
console.log('appid',import.meta.env.VITE_PROJECTID);    // undefined 


const firebaseConfig = {
  apiKey : import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  appId: import.meta.env.VITE_APPID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};


console.log('firebase ==',firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);