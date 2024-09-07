import { RouteObject } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import ListCategory from "./category/listCategory";

export const adminRouter: RouteObject[] = [
    {
        path: "",
        element: <Dashboard/>
    },
    {
        path:"category",
        element: <ListCategory/>
    }
]