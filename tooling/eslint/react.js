/** @type {import('eslint').Linter.Config} */
const config = {
    extends: [
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended", // TODO: this eslint is not working, fix it
    ],
    rules: {
        "react/prop-types": "off",
    },
    globals: {
        React: "writable",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    plugins: ["react", "react-hooks", "jsx-a11y"],
    env: {
        browser: true,
    },
};

// eslint-disable-next-line no-undef
module.exports = config;
