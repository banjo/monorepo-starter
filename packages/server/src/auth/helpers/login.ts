import { generateCodeVerifier, generateState } from "arctic";
import { OAuth2Provider, OAuth2ProviderWithPKCE } from "./oauth-types";
import { serializeCookie } from "oslo/cookie";
import { Env } from "@pkg-name/common";
import { Response } from "express";
import { HttpResponse } from "../../model/http-response";
import { MAX_COOKIE_AGE } from "../core";
import { Cookie, ProviderType } from "../models";

const env = Env.server();

type BaseLoginProps = {
    providerType: ProviderType;
    res: Response;
    cookies: Cookie[];
    scopes?: string[];
};

type LoginSimpleProps = {
    providerType: "simple";
    provider: OAuth2Provider;
} & BaseLoginProps;

type LoginPKCEProps = {
    providerType: "pkce";
    provider: OAuth2ProviderWithPKCE;
} & BaseLoginProps;

type LoginProps = LoginSimpleProps | LoginPKCEProps;

export const login = async ({ provider, res, cookies, providerType, scopes }: LoginProps) => {
    const state = generateState();

    if (providerType === "simple") {
        const url = await provider.createAuthorizationURL(state, scopes ?? []);
        const cookie = cookies.find(c => c.type === "state");

        if (!cookie) {
            return HttpResponse.internalServerError({
                res,
                message: "Could not find state cookie",
            });
        }

        const serializedCookie = serializeCookie(cookie.name, state, {
            path: "/",
            secure: env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: MAX_COOKIE_AGE,
            sameSite: "lax",
        });

        return HttpResponse.redirect({ res, url: url.toString(), cookies: [serializedCookie] });
    }

    const codeVerifier = generateCodeVerifier();
    const url = await provider.createAuthorizationURL(state, codeVerifier, scopes ? scopes : []);

    const stateCookie = cookies.find(c => c.type === "state");
    const codeVerifierCookie = cookies.find(c => c.type === "code_verifier");

    if (!stateCookie || !codeVerifierCookie) {
        return HttpResponse.internalServerError({
            res,
            message: "Could not find state or code_verifier cookie",
        });
    }

    const serializedStateCookie = serializeCookie(stateCookie.name, state, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: MAX_COOKIE_AGE,
        path: "/",
        sameSite: "lax",
    });

    const serializedCodeVerifierCookie = serializeCookie(codeVerifierCookie.name, codeVerifier, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: MAX_COOKIE_AGE,
        path: "/",
        sameSite: "lax",
    });

    return HttpResponse.redirect({
        res,
        url: url.toString(),
        cookies: [serializedStateCookie, serializedCodeVerifierCookie],
    });
};
