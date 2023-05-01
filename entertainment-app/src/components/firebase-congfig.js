import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDNmdJOtqfPs7eYAvTLwX6OneolprnMmok",
    authDomain: "entertainment-login-fa750.firebaseapp.com",
    projectId: "entertainment-login-fa750",
    storageBucket: "entertainment-login-fa750.appspot.com",
    messagingSenderId: "883347866816",
    appId: "1:883347866816:web:50a896c61aeab0d9a75925",
    measurementId: "G-JH0JMGJTDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app

const provider = new GoogleAuthProvider();

export const signInWithGoogle = signInWithPopup(auth, provider);