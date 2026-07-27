import { Outlet } from "react-router"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "../shared/AppSidebar"
import { TopBar } from "../shared/TopBar";
import { CopyRight } from "../shared/CopyRight";

export const CloudLayout = () =>{
    return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <TopBar />
            <main className="flex-1 p-6">
            <Outlet />
            </main>
            <div className="p-5 border-t">
                <CopyRight />
            </div>
        </SidebarInset>
        </SidebarProvider>
    );
}