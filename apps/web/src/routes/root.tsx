import { useAuth } from "@/contexts/auth-context";
import ErrorPage from "@/pages/error";
import { Home } from "@/pages/home";
import { Landing } from "@/pages/landing";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const createAppRouter = (isAuthenticated: boolean) =>
    createBrowserRouter([
        {
            path: "/",
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: isAuthenticated ? <Home /> : <Landing />,
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace />,
                },
            ],
        },
    ]);

export function Root() {
    const { userId } = useAuth();
    const isAuthenticated = !!userId;
    const appRouter = createAppRouter(isAuthenticated);

    return <RouterProvider router={appRouter} />;
}
