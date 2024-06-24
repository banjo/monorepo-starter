import { getClientUrl } from "@app/utils";
import { Env } from "@pkg-name/common";
import { appRouter, createContextLogger, createTRPCContext, startupLog } from "@pkg-name/server";
import { NodeContext } from "@pkg-name/server/src/lib/node-context";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
const url = getClientUrl();
const logger = createContextLogger("api");

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

            // @ts-ignore - info is missing on request type?
            return createTRPCContext({ req, res });
        },
    })
);

const env = Env.server();
const PORT = Number(env.PORT) || 3003;

app.listen(PORT, () => {
    startupLog("API");
});
