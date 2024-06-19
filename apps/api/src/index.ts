import { getClientUrl } from "@app/utils";
import { Env } from "@pkg-name/common";
import { appRouter, createTRPCContext } from "@pkg-name/server";
import { NodeContext } from "@pkg-name/server/src/lib/node-context";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
const url = getClientUrl();

app.use(NodeContext.setupContext);

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        middleware: cors({
            credentials: true,
            origin: url,
            allowedHeaders: ["Authorization", "Content-Type"],
        }),
        router: appRouter,
        createContext: opts => {
            const req = opts?.req;
            const res = opts?.res;

            return createTRPCContext({ req, res });
        },
    })
);

const env = Env.server();
const PORT = Number(env.PORT) || 3003;
const isProd = env.NODE_ENV === "production";

console.log(`🚀 Server ready at port ${PORT} - Mode: ${isProd ? "production" : "development"}`);

app.listen(PORT);
