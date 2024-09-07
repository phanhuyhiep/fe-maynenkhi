import { RouteObject } from "react-router-dom";
import HomeClient from "./home/home-client";

export const clientRouter: RouteObject[] = [
    {
        path: "/",
        element: <HomeClient/>
    }
]