// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3pQI1y1evdTuxqzdbkpR8LVDBB7itj5c",
  authDomain: "bdle-6a511.firebaseapp.com",
  projectId: "bdle-6a511",
  storageBucket: "bdle-6a511.firebasestorage.app",
  messagingSenderId: "1000533227815",
  appId: "1:1000533227815:web:023b87b2f9431c1e3b9102",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(firebaseApp);
