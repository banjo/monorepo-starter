import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {}; // TODO: Add firebase config

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
