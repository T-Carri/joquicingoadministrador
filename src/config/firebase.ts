// firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
/* import { getAnalytics } from "firebase/analytics"; */

const firebaseConfig = {
    apiKey: "AIzaSyDVDGkNT6empOMgrF_5PNLT_lLRnoJl5HE",
    authDomain: "bitralspace.firebaseapp.com",
    projectId: "bitralspace",
    storageBucket: "bitralspace.firebasestorage.app",
    messagingSenderId: "116205719772",
    appId: "1:116205719772:web:3240a7912ae47277042419",
    measurementId: "G-GVTCFMZFTV"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
/* const analytics = getAnalytics(app); */