import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService, AuthState, emptyAuthState } from "@/services/auth-service";
import { Loader } from "@pkg-name/ui";

export type AuthContextType = AuthState & {
    isLoading: boolean;
    signOut: () => void;
};

const emptyContext: AuthContextType = {
    isLoading: false,
    signOut: () => {},
    ...emptyAuthState,
};

const AuthContext = createContext<AuthContextType>(emptyContext);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>(() => authService.getAuthState());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleAuthStateChange = (state: AuthState) => {
            const clone = structuredClone(state);
            setAuthState(clone); // deep clone to avoid reference issues
            setIsLoading(false);
        };

        authService.addAuthStateListener(handleAuthStateChange);
        authService.checkIfUserIsAuthenticated();
        return () => {
            authService.removeAuthStateListener(handleAuthStateChange);
        };
    }, []);

    const signOut = async () => {
        await authService.signOut();
        window.location.href = "/login";
    };

    const contextValue = useMemo(
        () => ({
            isLoading,
            signOut,
            ...authState,
        }),
        [isLoading, authState]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {isLoading ? <Loader>Loading...</Loader> : children}
        </AuthContext.Provider>
    );
};
