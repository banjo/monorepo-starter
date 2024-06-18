import { useAuth } from "@/contexts/auth-context";
import { trpc } from "@/lib/trpc";
import { authService } from "@/services/auth-service";
import { getApiUrl } from "@/utils/runtime";
import { Maybe } from "@banjoanton/utils";
import { Cause } from "@pkg-name/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, httpBatchLink } from "@trpc/client";
import { FC, PropsWithChildren, useState } from "react";
import superjson from "superjson";

const createTrpcClient = (backendUrl: string) => {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url: `${backendUrl}/trpc`,
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: "include",
                    });
                },
                headers: async () => {
                    const token = authService.getAuthState().token;
                    if (token) {
                        return {
                            authorization: `Bearer ${token}`,
                        };
                    }

                    return {};
                },
            }),
        ],
        transformer: superjson,
    });
};

export const TrpcProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry(failureCount, error) {
                            if (error instanceof TRPCClientError) {
                                if (
                                    error.data.code === "UNAUTHORIZED" &&
                                    error.shape?.cause === Cause.EXPIRED_TOKEN
                                ) {
                                    authService.refreshToken(); // not best solution, but it works
                                }
                            }

                            return failureCount < 3;
                        },
                    },
                    mutations: {
                        retry(failureCount, error) {
                            if (error instanceof TRPCClientError) {
                                if (
                                    error.data.code === "UNAUTHORIZED" &&
                                    error.shape?.cause === Cause.EXPIRED_TOKEN
                                ) {
                                    authService.refreshToken(); // not best solution, but it works
                                }
                            }

                            return failureCount < 3;
                        },
                    },
                },
            })
    );
    const [trpcClient] = useState(() => createTrpcClient(getApiUrl()));

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
