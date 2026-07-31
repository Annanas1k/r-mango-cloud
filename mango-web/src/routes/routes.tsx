// routes/router.tsx
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/utils-pages/NotFoundPage";
import LoginPage from "../pages/auth-pages/LoginPage";
import { LoadingUI } from "@/components/shared/LoadingUI";
import { StartLayout } from "@/components/layouts/StartLayout";
import OverviewPage from "../pages/landing-pages/OverviewPage";
import { AboutPage } from "@/pages/landing-pages/AboutPage";
import { PricingPage } from "@/pages/landing-pages/PricingPage";
import { HomePage } from "@/pages/cloud-pages/HomePage";
import { CloudPage } from "@/pages/cloud-pages/CloudPage";
import { CloudLayout } from "@/components/layouts/CloudLayout";
import { StarredPage } from "@/pages/cloud-pages/StaredPage";
import { ComputersPage } from "@/pages/cloud-pages/ComputersPgae";
import { ShareWithMePage } from "@/pages/cloud-pages/ShareWithMePape";
import { RecentPage } from "@/pages/cloud-pages/RecentPage";
import { SpamPage } from "@/pages/cloud-pages/SpamPage";
import { TrashPage } from "@/pages/cloud-pages/TrashPage";


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
        path: "/cloud",
        element: <CloudLayout />,
        children: [
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "my-cloud",
            element: <CloudPage />,
          },
          {
            path: "my-computers",
            element: <ComputersPage />
          },
          {
            path: "shared-with-me",
            element: <ShareWithMePage />
          },
          {
            path: "starred",
            element: <StarredPage />,
          },
          {
            path: "recent",
            element: <RecentPage />
          },
          {
            path: "spam",
            element: <SpamPage />
          },
          {
            path: "trash",
            element: <TrashPage />
          }
        ]
      },
      // aici adaugi restul rutelor protejate: /files, /settings etc.
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);