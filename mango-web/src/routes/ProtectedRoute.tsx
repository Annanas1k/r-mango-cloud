// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoute() {
  const { status } = useAppSelector((state) => state.auth);

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}