import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../shared/AppSidebar";
import { TopBar } from "../shared/TopBar";
import { CopyRight } from "../shared/CopyRight";
import { InfoSideComponent } from "../shared/InfoSideComponent";
import { useAppSelector } from "@/redux/hooks";
import { selectDetailsView } from "@/redux/settings/settingsSlice";

export const CloudLayout = () => {
    const detailsView = useAppSelector(selectDetailsView);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-screen overflow-hidden">
                <TopBar />
                
                <div className="flex flex-1 overflow-hidden relative">
                    <main className="flex-1 p-6 overflow-y-auto transition-all duration-300 ease-in-out">
                        <Outlet />
                    </main>

                    <aside
                        className={`
                            w-100 border-l bg-background h-full overflow-y-auto
                            transition-all duration-500 ease-in-out transform
                            ${detailsView 
                                ? "translate-x-0 opacity-100 relative" 
                                : "translate-x-full opacity-0 pointer-events-none absolute right-0"
                            }
                        `}
                    >
                        <InfoSideComponent />
                    </aside>
                </div>

                <div className="p-5 border-t bg-background z-10">
                    <CopyRight />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};