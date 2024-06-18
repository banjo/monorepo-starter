import { useAuth } from "@/contexts/auth-context";
import { authService } from "@/services/auth-service";
import { Button } from "@pkg-name/ui";

export const Landing = () => {
    return (
        <>
            <div className="text-3xl font-bold text-cyan-600">Sign in</div>
            <Button variant="outline" onClick={async () => await authService.signInWithGoogle()}>
                Sign in with Google
            </Button>
        </>
    );
};
