import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: {
      usernameOrEmail: string;
      password: string;
    }) => {
      const { data } = await api.post("/auth/login", credentials);
      localStorage.setItem("accessToken", data.accessToken);
      //Refresh token is set as httpOnly cookie by the server automatically
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful");
    },
  });
};

//Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    //Server clears refresh token, queryClient needs to clear its cache
    //and explicitly clear authUser to prevent any race conditions from page navigation
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: {
      email: string;
      username: string;
      password: string;
    }) => {
      const { data } = await api.post("/auth/signup", credentials);
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    },
  });
};
