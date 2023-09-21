const baseConfig = require("ui/tailwind.config");

module.exports = {
    ...baseConfig,
    content: ["../../packages/ui/src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    plugins: [],
};
