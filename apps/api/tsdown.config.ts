import { defineConfig } from "tsdown";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: ["cjs"],
    minify: isProduction,
    sourcemap: true,
    external: ["@prisma/client", "pino"],
});
