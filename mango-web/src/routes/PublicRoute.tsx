// routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function PublicRoute() {
  const { status } = useAppSelector((state) => state.auth);

  if (status === "authenticated") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}