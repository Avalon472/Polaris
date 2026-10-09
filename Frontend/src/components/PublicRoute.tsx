import { useAuthUser } from "@/features/auth/api/AuthQueries";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { data: authUser } = useAuthUser();
  if (authUser) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PublicRoute;
