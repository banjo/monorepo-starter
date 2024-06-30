import { authService } from "@/services/auth-service";
import { Button } from "@pkg-name/ui";

export const Landing = () => (
    <>
        <div className="text-3xl font-bold text-cyan-600">Sign in</div>
        <Button variant="outline" onClick={() => authService.signInWithGithub()}>
            Sign in with Github
        </Button>
    </>
);
