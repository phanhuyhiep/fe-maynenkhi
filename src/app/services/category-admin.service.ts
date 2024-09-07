import { confisAxios } from "../api/config-http"


export const getAllCategoryAdmin = async(data:any) => {
    const url = `/category/?page=${data.page}&limit=${data.limit}`
    const result = await confisAxios.get(url)
    return result.data
}

export const deleteCategoryAdmin = async(data:any) => {
    const url =`/category/delete/${data}`
    const result = await confisAxios.delete(url)
    return result.data
}

export const addCategoryAdmin = async(data:any) => {
    const url = `/category/add`;
    const result = await confisAxios.post(url, data);
    return result.data
}

export const editCategoryAdmin = async(data:FormData) => {
    const url = `/category/edit/${data?.get("id")}`
    const result = await confisAxios.put(url, data)
    return result.data
} 
