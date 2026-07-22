import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoute() {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}