import { Env } from "@pkg-name/common";

const env = Env.client();
export const isLocalDevelopment = () => env.VITE_LOCAL_DEVELOPMENT === "true";
export const getApiUrl = () => env.VITE_API_URL;
