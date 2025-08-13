import { Result } from "@pkg-name/common";
import { z } from "zod";

export const OauthUserInfo = z.object({
    id: z.number(),
    email: z.string(),
    avatar_url: z.string().optional(),
    name: z.string().optional(),
});

export type OauthUserInfo = z.infer<typeof OauthUserInfo>;

export type SimpleResult<T> = ReturnType<typeof Result.ok<T>> | ReturnType<typeof Result.error>;

export type FetchUser = (accessToken: string) => Promise<SimpleResult<OauthUserInfo>>;
