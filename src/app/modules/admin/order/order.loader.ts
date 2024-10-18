import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createOrderAdmin,
  deleteOrderAdmin,
  editOrderAdmin,
  getAllOrderAdmin,
  getOrderAdminById,
} from "../../../services/order-admin.service";
import { message } from "antd";

const CACHE_KEYS = {
  InforDataOrder: "INFOR_DATA_ORDER",
};

export const useGetAllOrder = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataOrder, data], () =>
    getAllOrderAdmin(data)
  );
};

export const useGetOrderById = (data: { order_id: string }) => {
  return useQuery(
    [CACHE_KEYS.InforDataOrder, data.order_id],
    () => getOrderAdminById(data),
    {
      enabled: !!data.order_id,
    }
  );
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return createOrderAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataOrder);
        message.success("Order added successfully");
      },
      onError: () => {
        message.error("Product exiteds");
      },
    }
  );
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: FormData) => {
      return editOrderAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataOrder);
        message.success("Order edited successfully");
      },
      onError: () => {
        message.error("Order exiteds");
      },
    }
  );
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return deleteOrderAdmin(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataOrder);
        message.success("Order deleted successfully");
      },
      onError: () => {
        message.error("Order deleted failed");
      },
    }
  );
};
