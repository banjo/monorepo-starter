import { Home } from "@/pages/Home";
import ErrorPage from "@/routes/error-page";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: (
            <>
                <Outlet />
            </>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "*",
                element: <Navigate to={"/"} />,
            },
        ],
    },
]);

// TODO: use one router instead as firebase support that
const signedOutRouter = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <>Landing page</>,
            },
            {
                path: "*",
                element: <Navigate to={"/"} />,
            },
        ],
    },
]);

export function Root() {
    // const { userId } = useAuth();

    // if (!userId) {
    //     return <RouterProvider router={signedOutRouter} />;
    // }

    return <RouterProvider router={router} />;
}
