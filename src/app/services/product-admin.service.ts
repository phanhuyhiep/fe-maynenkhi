import { confisAxios } from "../api/config-http";

export const getAllProductAdmin = async (data: any) => {
  const url = `/product/?page=${data.page}&limit=${data.limit}&categoryName=${data?.categoryName}&productName=${data.productName}`;
  const result = await confisAxios.get(url);
  return result.data;
};

export const addProductAdmin = async (data: any) => {
  const url = `/product/add`;
  const result = await confisAxios.post(url, data);
  return result.data;
};

export const deleteProductAdmin = async (data: any) => {
  const url = `/product/delete/${data}`;
  const result = await confisAxios.delete(url);
  return result.data;
};

export const editProductAdmin = async (data: FormData) => {
  const url = `/product/edit/${data?.get("id")}`;
  const result = await confisAxios.put(url, data);
  return result.data;
};
