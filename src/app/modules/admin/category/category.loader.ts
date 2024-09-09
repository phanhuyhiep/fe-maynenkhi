import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategoryAdmin,
  deleteCategoryAdmin,
  editCategoryAdmin,
  getAllCategoryAdmin,
  getCategoryById,
} from "../../../services/category-admin.service";
import { message } from "antd";

const CACHE_KEYS = {
  InforDataCategory: "INFOR_DATA_CATEGORY",
};

export const useGetCategory = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCategory, data], () =>
    getAllCategoryAdmin(data)
  );
};

export const useGetCategoryById = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCategory, data], () =>
    getCategoryById(data)
  );
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: any) => {
      return deleteCategoryAdmin(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCategory);
        message.success("Category deleted successfully");
      },
      onError: () => {
        message.error("Category deleted failed");
      },
    }
  );
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addCategoryAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCategory);
        message.success("Category added successfully");
      },
      onError: () => {
        message.error("Category exiteds");
      },
    }
  );
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: FormData) => {
      return editCategoryAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCategory);
        message.success("Category edited successfully");
      },
      onError: () => {
        message.error("Category exiteds");
      },
    }
  );
};
