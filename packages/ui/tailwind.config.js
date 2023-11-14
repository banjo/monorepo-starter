import baseConfig from "@pkg-name/tailwind-config";

/** @type {import('tailwindcss').Config} */
module.exports = {
    extends: [baseConfig],
    content: ["./src/**/*.{ts,tsx}"],
};
