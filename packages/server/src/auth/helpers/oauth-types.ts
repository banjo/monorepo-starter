// Shared minimal OAuth provider types to avoid relying on Arctic's type exports
// Extend if you need more fields later
export type TokenLike = { accessToken: () => string };

export type OAuth2Provider<TTokens extends TokenLike = TokenLike> = {
    // Simple OAuth2 flow (e.g., GitHub needs scopes)
    createAuthorizationURL: (state: string, scopes: string[]) => Promise<URL> | URL;
    validateAuthorizationCode: (code: string) => Promise<TTokens>;
};

export type OAuth2ProviderWithPKCE<TTokens extends TokenLike = TokenLike> = {
    // PKCE OAuth2 flow (e.g., Google)
    createAuthorizationURL: (
        state: string,
        codeVerifier: string,
        scopes: string[]
    ) => Promise<URL> | URL;
    validateAuthorizationCode: (code: string, codeVerifier: string) => Promise<TTokens>;
};
