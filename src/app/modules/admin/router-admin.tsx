import { RouteObject } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import ListCategory from "./category/listCategory";
import { ListProduct } from "./products/listProduct";
import { ListOrder } from "./order/listOrder";
import { ListUser } from "./user/listUser";
import {ListComment} from "./comment/comment";
import { ListContact } from "./contact/contact";
import { Listvoucher } from "./voucher/voucher";
import { ListSlice } from "./slice/slice";
import { Statistic } from "./statistic/statistic";

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
    },
    {
        path:"order",
        element: <ListOrder/>
    },
    {
        path:"user",
        element: <ListUser/>
    },
    {
        path:"comment",
        element: <ListComment/>
    },
    {
        path:"contact",
        element: <ListContact/>
    },
    {
        path:"voucher",
        element: <Listvoucher/>
    },
    {
        path:"slice",
        element: <ListSlice/>
    },
    {
        path:"statistic",
        element: <Statistic/>
    },
    
]