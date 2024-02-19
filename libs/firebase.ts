// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmiD-sXl4BhZN8nSF-ip-qxRV0LMLnmk8",
    authDomain: "e-shop-zivana.firebaseapp.com",
    projectId: "e-shop-zivana",
    storageBucket: "e-shop-zivana.appspot.com",
    messagingSenderId: "658342363426",
    appId: "1:658342363426:web:de0240c02c5e852170657b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp