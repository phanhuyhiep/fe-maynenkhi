import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/login.service";
import { message } from "antd";

const CACHE_KEYS = {
    InforDataLogin: "INFOR_DATA_LOGIN",
  };

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation((data: any) => login(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(CACHE_KEYS.InforDataLogin);
            localStorage.setItem('token', data.access_token);
            message.success("Login success");
            navigate("/");
        },
        onError: () => {
            message.error("Login failed");
        },
    });
};