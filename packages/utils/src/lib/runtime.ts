import { raise } from "@banjoanton/utils";

export const isDev = () =>
    process.env.NODE_ENV === "development" && process.env.LOCAL_DEVELOPMENT === "true";

export const getDevId = () => {
    const id = process.env.DEVELOPMENT_UID ?? raise("DEV_ID is not defined");
    return Number(id);
};
