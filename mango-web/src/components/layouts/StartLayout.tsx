import { Outlet } from "react-router";
import { StartHeader } from "../shared/StartHeader";
import { StartFooter } from "../shared/StartFooter";
import { ScrollToTop } from "../utils/ScrollToTop";

export const StartLayout = () => {
  return (
    <div>
      <ScrollToTop />
      {/* header */}
      <StartHeader />
      <main>
        <Outlet />
      </main>
      <StartFooter />
    </div>
  );
};
