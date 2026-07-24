// routes/router.tsx
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/utils-pages/NotFoundPage";
import LoginPage from "../pages/auth-pages/LoginPage";
import { LoadingUI } from "@/components/shared/LoadingUI";
import { StartLayout } from "@/components/layouts/StartLayout";
import { UserProfileCard } from "@/components/shared/UserProfileCard";
import OverviewPage from "../pages/landing-pages/OverviewPage";
import { AboutPage } from "@/pages/landing-pages/AboutPage";
import { PricingPage } from "@/pages/landing-pages/PricingPage";


export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <StartLayout/>,
        children: [
          {path: "/", element: <OverviewPage />},
          {path: "/about", element: <AboutPage />},
          {path: "/pricing", element: <PricingPage />},
          {path: "/login", element: <LoginPage />},
        ]
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
        element: <UserProfileCard />
      },
      // aici adaugi restul rutelor protejate: /files, /settings etc.
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);