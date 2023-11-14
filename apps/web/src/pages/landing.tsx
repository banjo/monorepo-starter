import { useAuth } from "@/contexts/auth-context";
import { Button } from "@pkg-name/ui";

export const Landing = () => {
    const { signInWithGoogle } = useAuth();
    return (
        <>
            <div className="text-3xl font-bold text-cyan-600">Sign in</div>
            <Button variant="outline" onClick={signInWithGoogle}>
                Sign in with Google
            </Button>
        </>
    );
};
