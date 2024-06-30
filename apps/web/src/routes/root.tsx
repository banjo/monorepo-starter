import { useAuth } from "@/contexts/auth-context";
import ErrorPage from "@/pages/error";
import { Home } from "@/pages/Home";
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
    const { isAuthenticated } = useAuth();
    const appRouter = createAppRouter(isAuthenticated);

    return <RouterProvider router={appRouter} />;
}
