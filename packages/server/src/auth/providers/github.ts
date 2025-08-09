import { GitHub } from "arctic";
import { Env, Result } from "@pkg-name/common";
import { FetchUser, OauthUserInfo } from "../helpers/user-info";
import { OauthCoreProvider } from "../core";
import { OauthProvider } from "../providers";
import { Cookie } from "../models";
import { to } from "@banjoanton/utils";
import { ofetch } from "ofetch";
import { createContextLogger } from "../../lib/context-logger";

const COOKIE_NAME = "github_oauth_state";
const env = Env.server();
const logger = createContextLogger("github-auth-provider");

if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    logger.error("Missing GitHub client ID or secret");
}

const provider = new GitHub(env.GITHUB_CLIENT_ID || "", env.GITHUB_CLIENT_SECRET || "", null);

const fetchUser: FetchUser = async (accessToken: string) => {
    const [githubUserData, error] = await to(() =>
        ofetch<OauthUserInfo>("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    );

    if (error) {
        logger.error({ error }, "Error fetching user");
        return Result.error("Error fetching user");
    }

    const parsed = OauthUserInfo.parse(githubUserData);
    return Result.ok(parsed);
};

const cookies: Cookie[] = [
    {
        name: COOKIE_NAME,
        type: "state",
    },
];

const { login, callback } = OauthCoreProvider.createOauthProvider({
    provider,
    fetchUser,
    cookies,
    oauthProvider: OauthProvider.GITHUB,
});

export const GithubAuthProvider = { login, callback };
