import { Env } from "@pkg-name/common";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const env = Env.client();

const getFirebaseConfig = () => {
    const key = env.VITE_FIREBASE_CONFIG;

    const config = atob(key);
    return JSON.parse(config);
};

export const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);
