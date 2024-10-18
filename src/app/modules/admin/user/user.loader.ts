import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addUserAdmin,
  deleteUserAdmin,
  editUSerAdmin,
  getAllUserAdmin,
  getUserById,
} from "../../../services/user-admin.service";
import { message } from "antd";

const CACHE_KEYS = {
  InforDataUser: "INFOR_DATA_USER",
};

export const useGetUser = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataUser, data], () =>
    getAllUserAdmin(data)
  );
};

export const useGetUserById = (data: { id: string }) => {
  return useQuery([CACHE_KEYS.InforDataUser, data.id], () => getUserById(data), {
    enabled: !!data.id,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addUserAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataUser);
        message.success("User added sucessfully");
      },
      onError: () => {
        message.error("User exiteds");
      },
    }
  );
};

export const editUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return editUSerAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataUser);
        message.success("User edited successfully");
      },
      onError: () => {
        message.error("user exiteds");
      },
    }
  );
};

export const deleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: any) => {
      return deleteUserAdmin(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataUser);
        message.success("User deleted successfully");
      },
      onError: () => {
        message.error("User deleted failed");
      },
    }
  );
};
