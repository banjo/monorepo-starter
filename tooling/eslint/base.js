/** @type {import("eslint").Linter.Config} */
const config = {
    extends: ["prettier", "@banjoanton/eslint-config"],
    env: {
        node: true,
        es2022: true,
    },
    rules: {
        "turbo/no-undeclared-env-vars": "off",
        "n/no-unpublished-import": "off",
        "import/no-unresolved": "off",
        "n/no-unsupported-features/node-builtins": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "promise/always-return": "off",
        "consistent-return": "off",
        "require-await": "off",
        "no-empty-function": "off",
        "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
        "unicorn/consistent-function-scoping": "warn",
        "@typescript-eslint/no-empty-function": "off",
    },
    ignorePatterns: [
        "**/.eslintrc.cjs",
        "**/*.config.js",
        "**/*.config.cjs",
        ".next",
        "dist",
        "pnpm-lock.yaml",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
};

// eslint-disable-next-line no-undef
module.exports = config;
