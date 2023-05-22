// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuDlev6iHZdXucnSJYyX087KoqVht4NF4",
  authDomain: "react-project-eca04.firebaseapp.com",
  projectId: "react-project-eca04",
  storageBucket: "react-project-eca04.appspot.com",
  messagingSenderId: "448366853745",
  appId: "1:448366853745:web:7d1619ff49d728eaa6a5d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// firestore
export const db = getFirestore(app)