import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

// Folosit pentru pagini precum /login - dacă ești deja logat, te scoate afară de acolo
export default function PublicRoute() {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}