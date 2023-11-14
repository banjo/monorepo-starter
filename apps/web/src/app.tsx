import { AuthProvider } from "@/contexts/auth-context";
import { GlobalLoadingProvider } from "@/providers/global-loading-provider";
import { TrpcProvider } from "@/providers/trpc-provider";
import { Root } from "@/routes/root";
import { ErrorPage } from "@pkg-name/ui";
import "@pkg-name/ui/src/tailwind.css";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import "./index.css";

export const App: FC = () => {
    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <AuthProvider>
                <TrpcProvider>
                    <GlobalLoadingProvider>
                        <Toaster />
                        <Root />
                    </GlobalLoadingProvider>
                </TrpcProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
};
