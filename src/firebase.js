// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDRbZZN5nxuc-9FhhJ2pff_ChA7ELYdry0",
  authDomain: "backend-2f323.firebaseapp.com",
  projectId: "backend-2f323",
  storageBucket: "backend-2f323.firebasestorage.app",
  messagingSenderId: "794149257248",
  appId: "1:794149257248:web:81ee27557b17e4f24c3c45",
  databaseUrl: "https://backend-2f323-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;