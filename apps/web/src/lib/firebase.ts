import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBnJEQY3zZatM2UBPJsVKh2r0dBDhIZlU",
    authDomain: "banjotest.firebaseapp.com",
    projectId: "banjotest",
    storageBucket: "banjotest.appspot.com",
    messagingSenderId: "311195903232",
    appId: "1:311195903232:web:86a702445bc7d7be3fbfe5",
}; // TODO: Add firebase config

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
