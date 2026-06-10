import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

//Auth query to grab logged in user
export const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/");
      return data;
    },
    //Don't retry, don't refetch, user needs to log in again
    retry: false,
    staleTime: Infinity,
  });

//Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const { data } = await api.post("/auth/login", credentials);
      localStorage.setItem("accessToken", data.token);
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

  return useMutation({
    //Server clears refresh token, queryClient needs to clear its cache
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.clear();
    },
  });
};
