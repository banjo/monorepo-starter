import { Env } from "@pkg-name/common";

const env = Env.server();
export const getClientUrl = () => env.CLIENT_URL;
