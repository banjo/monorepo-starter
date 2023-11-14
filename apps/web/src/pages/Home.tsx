import { useAuth } from "@/contexts/auth-context";
import { trpc } from "@/lib/trpc";
import { Button } from "@pkg-name/ui";
import React from "react";

export const Home: React.FC = () => {
    const { signOut } = useAuth();
    const { data } = trpc.auth.getId.useQuery({ slug: "test" }, { staleTime: 0 });

    return (
        <>
            <div className="text-3xl font-bold text-cyan-600">
                Hello world from user with id {data?.externalId}!
            </div>
            <Button variant="outline" onClick={signOut}>
                Sign out
            </Button>
        </>
    );
};
