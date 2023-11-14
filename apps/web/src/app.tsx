import { GlobalLoadingProvider } from "@/providers/global-loading-provider";
import { Root } from "@/routes/root";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "ui";
import "ui/src/tailwind.css";
import "./index.css";

export const App: FC = () => {
    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            {/* <AuthProvider> */}
            {/* <TrpcProvider> */}
            <GlobalLoadingProvider>
                <Toaster />
                <Root />
            </GlobalLoadingProvider>
            {/* </TrpcProvider> */}
            {/* </AuthProvider> */}
        </ErrorBoundary>
    );
};
