import { RouteObject } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import ListCategory from "./category/listCategory";
import { ListProduct } from "./products/listProduct";

export const adminRouter: RouteObject[] = [
    {
        path: "",
        element: <Dashboard/>
    },
    {
        path:"category",
        element: <ListCategory/>
    },
    {
        path:"product",
        element: <ListProduct/>
    }
]