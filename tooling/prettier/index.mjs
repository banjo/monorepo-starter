import base from "@banjoanton/prettier-config";

/** @type {import("prettier").Config} */
const config = {
    ...base,
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
