import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    getId: protectedProcedure.input(z.object({ slug: z.string() })).query(({ input, ctx }) => {
        const { slug } = input;
        const externalId = ctx.userId;

        if (!externalId) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Some error",
            });
        }

        return { externalId, slug };
    }),
});
