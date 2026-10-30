import api from "@/lib/axios";
import type { AuthUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

//Auth query to grab logged in user
export const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/");
        return data as AuthUser;
      } catch (err: any) {
        if (err?.response?.status === 401) return null; // logged out, not a failure
        throw err;
      }
    },
    //Don't retry, don't refetch, user needs to log in again
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
