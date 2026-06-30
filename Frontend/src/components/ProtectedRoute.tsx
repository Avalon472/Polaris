import { useAuthUser } from "@/features/auth/api/AuthQueries";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: authUser } = useAuthUser();
  if (!authUser) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
