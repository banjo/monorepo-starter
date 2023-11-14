import { Button } from "@pkg-name/ui";
import React from "react";

export const Home: React.FC = () => {
    return (
        <>
            <div className="text-3xl font-bold text-cyan-600">Hello world!</div>
            <Button variant="outline">Click me</Button>
        </>
    );
};
