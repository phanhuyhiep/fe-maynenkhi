import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addProductAdmin,
  deleteProductAdmin,
  editProductAdmin,
  getAllProductAdmin,
  getProductAdminById,
} from "../../../services/product-admin.service";
import { message } from "antd";

const CACHE_KEYS = {
  InforDataProduct: "INFOR_DATA_PRODUCT",
};

export const useGetAllProduct = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataProduct, data], async () => {
    const result = await getAllProductAdmin(data);
    return result;
  });
};

export const useGetProductById = (data: { id: string }) => {
  return useQuery(
    [CACHE_KEYS.InforDataProduct, data.id],
    () => getProductAdminById(data),
    { enabled: !!data.id }
  );
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addProductAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataProduct);
        message.success("Product added successfully");
      },
      onError: () => {
        message.error("Product exiteds");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: any) => {
      return deleteProductAdmin(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataProduct);
        message.success("Product deleted successfully");
      },
      onError: () => {
        message.error("Product deleted failed");
      },
    }
  );
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: FormData) => {
      return editProductAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataProduct);
        message.success("Product edited success");
      },
      onError: () => {
        message.error("Product exiteds");
      },
    }
  );
};
