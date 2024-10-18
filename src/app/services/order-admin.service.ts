import { confisAxios } from "../api/config-http";


export const getAllOrderAdmin = async(data:any) => {
    const url = `/order/?page=${data.page}&limit=${data.limit}&order_status=${data?.order_status}&searchTerm=${data?.searchTerm}`;
    const result = await confisAxios.get(url);
    return result.data;
}

export const getOrderAdminById = async(data:any) => {
    const url = `/order/${data.order_id}`;
    const result = await confisAxios.get(url);
    return result.data;
}

export const createOrderAdmin = async(data:any) => {
    const url = `/order/add`;
    const result = await confisAxios.post(url, data);
    return result.data;
}

export const editOrderAdmin = async(data:FormData) => {
    const url = `/order/edit/${data?.get("id")}`;
    const result = await confisAxios.put(url, data);
    return result.data;
}

export const deleteOrderAdmin = async(data:any) => {
    const url =`/order/delete/${data}`;
    const result = await confisAxios.delete(url);
    return result.data
}