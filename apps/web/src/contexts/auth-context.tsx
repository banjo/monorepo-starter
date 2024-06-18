import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "@pkg-name/ui";
import { User } from "firebase/auth";
import { AuthState, authService } from "@/services/auth-service";

export type AuthContextType = {
    user: User | null;
    userId: string | undefined;
    isLoading: boolean;
    token: string | undefined;
};

const emptyContext: AuthContextType = {
    userId: undefined,
    isLoading: false,
    user: null,
    token: undefined,
};

const AuthContext = createContext<AuthContextType>(emptyContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>(authService.getAuthState());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleAuthStateChange = (state: AuthState) => {
            setAuthState(state);
            setIsLoading(false);
        };

        authService.addAuthStateListener(handleAuthStateChange);

        return () => {
            authService.removeAuthStateListener(handleAuthStateChange);
        };
    }, []);

    const contextValue: AuthContextType = {
        user: authState.user,
        userId: authState.user?.uid,
        token: authState.token,
        isLoading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {isLoading ? <Loader>Loading...</Loader> : children}
        </AuthContext.Provider>
    );
};
