import { RouteObject } from "react-router-dom";
import { Login } from "./login/login";

export const clientRouter: RouteObject[] = [
    {
        path: "",
        element: <Login/>
    }
]