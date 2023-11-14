import { raise } from "@banjoanton/utils";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const getFirebaseConfig = () => {
    const key =
        import.meta.env.VITE_FIREBASE_CONFIG ?? raise("VITE_FIREBASE_CONFIG is not defined");

    const config = atob(key);
    return JSON.parse(config);
};

export const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);
