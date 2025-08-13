import { Google } from "arctic";
import { Env, Result } from "@pkg-name/common";
import { Cookie } from "../models";
import { OauthProvider } from "../providers";
import { OauthCoreProvider } from "../core";
import { FetchUser, OauthUserInfo } from "../helpers/user-info";
import { z } from "zod";
import { ofetch } from "ofetch";
import { to } from "@banjoanton/utils";
import { createContextLogger } from "../../lib/context-logger";

const STATE_COOKIE_NAME = "google_oauth_state";
const CODE_VERIFIER_COOKIE_NAME = "google_code_verifier";

const logger = createContextLogger("google-auth-provider");

const scopes = ["profile", "email", "openid"];

const env = Env.server();
const provider = new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
);

const GoogleUserInfoSchema = z.object({
    sub: z.string(),
    name: z.string(),
    picture: z.string(),
    email: z.string().email(),
    email_verified: z.boolean(),
});

type GoogleUserInfo = z.infer<typeof GoogleUserInfoSchema>;

const fetchUser: FetchUser = async accessToken => {
    const tokenPreview = `${accessToken.slice(0, 6)}...(${accessToken.length})`;

    const tryUserinfo = async (url: string) =>
        await to(() =>
            ofetch<GoogleUserInfo>(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
        );

    let [error, userResponse] = await tryUserinfo(
        "https://openidconnect.googleapis.com/v1/userinfo"
    );

    if (error || !userResponse) {
        logger.warn({ error, tokenPreview }, "OpenID userinfo failed, retrying on v3 endpoint");
        [error, userResponse] = await tryUserinfo("https://www.googleapis.com/oauth2/v3/userinfo");
    }

    if (error || !userResponse) {
        logger.error({ error, tokenPreview }, "Error fetching user");
        return Result.error("Error fetching user");
    }

    try {
        const googleUser = GoogleUserInfoSchema.parse(userResponse);
        if (!googleUser.email_verified) {
            logger.warn({ sub: googleUser.sub }, "Unverified Google email");
            return Result.error("Email not verified");
        }

        const user: OauthUserInfo = {
            name: googleUser.name,
            id: Number.parseInt(googleUser.sub, 10),
            email: googleUser.email,
            avatar_url: googleUser.picture,
        };

        const parsed = OauthUserInfo.parse(user);
        return Result.ok(parsed);
    } catch (parseError) {
        logger.error({ error: parseError }, "Error parsing user data");
        return Result.error("Error parsing user data");
    }
};

const cookies: Cookie[] = [
    { name: STATE_COOKIE_NAME, type: "state" },
    { name: CODE_VERIFIER_COOKIE_NAME, type: "code_verifier" },
];

const { login, callback } = OauthCoreProvider.createOauthProviderWithPKCE({
    provider,
    fetchUser,
    cookies,
    oauthProvider: OauthProvider.GOOGLE,
    scopes,
});

export const GoogleAuthProvider = { login, callback };
