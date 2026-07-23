// routes/router.tsx
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/utils-pages/NotFoundPage";
import StartPage from "../pages/landing-pages/StartPage";
import LoginPage from "../pages/auth-pages/LoginPage";
import { LoadingUI } from "@/components/shared/LoadingUI";


export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/loading",
        element: <LoadingUI />,
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <StartPage />,
      },
      // aici adaugi restul rutelor protejate: /files, /settings etc.
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);