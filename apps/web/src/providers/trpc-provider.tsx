import { trpc } from "@/lib/trpc";
import { getApiUrl } from "@/utils/runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { FC, PropsWithChildren, useState } from "react";
import superjson from "superjson";

const createTrpcClient = (backendUrl: string) =>
    trpc.createClient({
        links: [
            httpBatchLink({
                url: `${backendUrl}/trpc`,
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: "include",
                    });
                },
                transformer: superjson,
            }),
        ],
    });

export const TrpcProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => createTrpcClient(getApiUrl()));

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
