// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQqn8sTOO34RnbW5AWfegClYKqe-XM8E4",
  authDomain: "tugas-akhir-997ec.firebaseapp.com",
  projectId: "tugas-akhir-997ec",
  storageBucket: "tugas-akhir-997ec.appspot.com",
  messagingSenderId: "1055206685852",
  appId: "1:1055206685852:web:60cff78c02a917392b8159",
  measurementId: "G-6L1X7PPWHP",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
