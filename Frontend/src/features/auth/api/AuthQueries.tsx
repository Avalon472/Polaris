import api from "@/lib/axios";
import type { AuthUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

//Auth query to grab logged in user
export const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/");
      return data as AuthUser;
    },
    //Don't retry, don't refetch, user needs to log in again
    retry: false,
    staleTime: Infinity,
  });
