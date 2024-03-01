import { useAuth } from "@/contexts/auth-context";
import { toastError } from "@/utils/error";
import { Maybe, attempt, defaults } from "@banjoanton/utils";
import { Cause } from "@pkg-name/utils";
import { TRPCClientError } from "@trpc/client";
import { toast as internalToast } from "react-hot-toast";

type HandleErrorOptionProps = {
    toast?: boolean;
    errorMessage?: string;
};

const DEFAULT_OPTIONS = {
    toast: false,
};

const causeLog: Record<Cause, Maybe<string>> = {
    EXPIRED_TOKEN: undefined,
};

export const useError = () => {
    const { refreshToken } = useAuth();

    const handleError = async (error: unknown, opts?: HandleErrorOptionProps) => {
        const { toast, errorMessage } = defaults(opts, DEFAULT_OPTIONS);

        if (error instanceof TRPCClientError) {
            const cause = Cause.from(error);
            if (cause === Cause.EXPIRED_TOKEN) {
                await refreshToken();
            }

            const message = attempt(() => causeLog[cause as Cause]);
            if (message && toast) {
                internalToast.error(message);
                return;
            }
        }

        if (errorMessage && toast) {
            internalToast.error(errorMessage);
        } else if (toast) {
            toastError(error);
        }
    };

    return {
        handleError,
    };
};
