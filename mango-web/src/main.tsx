import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n/i18n.config";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
);
