import { useQuery } from "react-query";
import { getAllOrderAdmin } from "../../../services/order-admin.service";

const CACHE_KEYS = {
    InforDataOrder: "INFOR_DATA_ORDER",
};

export const useGetAllOrder = (data: any) => {
    return useQuery([CACHE_KEYS.InforDataOrder, data], () =>
        getAllOrderAdmin(data)
    );
}