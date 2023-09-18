import { Result } from "@banjoanton/utils";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    getId: publicProcedure.input(z.object({ slug: z.string() })).query(({ input, ctx }) => {
        const { slug } = input;
        const externalId = ctx.userId;

        return Result.ok({ externalId, slug });
    }),
});
