import { confisAxios } from "../api/config-http";


export const getAllOrderAdmin = async(data:any) => {
    const url = `/order/?page=${data.page}&limit=${data.limit}&order_status=${data.order_status}&phone_number=${data.phone_number}`;
    const result = await confisAxios.get(url);
    return result.data;
}