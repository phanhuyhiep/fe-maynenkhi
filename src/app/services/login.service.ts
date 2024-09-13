import { confisAxios } from "../api/config-http";


export const login = async(data: any) => {
    const url = `/auth/login`;
    const result = await confisAxios.post(url, data);
    return result.data;
};