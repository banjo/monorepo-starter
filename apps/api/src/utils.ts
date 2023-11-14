import { raise } from "@banjoanton/utils";

export const getUrl = () => {
    return process.env.CLIENT_URL ?? raise("CLIENT_URL is not defined");
};
