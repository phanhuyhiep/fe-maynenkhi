import { confisAxios } from "../api/config-http";

export const getAllUserAdmin = async (data: any) => {
  const url = `/auth/?page=${data.page}&limit=${data.limit}&email=${data.email}`;
  const result = await confisAxios.get(url);
  return result.data;
};

export const getUserById = async (data: { id: string }) => {
  const url = `/auth/${data.id}`;
  const result = await confisAxios.get(url);
  return result.data;
};

export const addUserAdmin = async (data: any) => {
  const url = `/auth/register`;
  const result = await confisAxios.post(url, data);
  return result.data;
};

export const editUSerAdmin = async (data: any) => {
  const url = `/auth/edit/${data?.get("id")}`;
  const result = await confisAxios.put(url, data);
  return result.data;
};

export const deleteUserAdmin = async (data:any) => {
    const url = `/auth/delete/${data}`;
    const result = await confisAxios.delete(url);
    return result.data;
}
