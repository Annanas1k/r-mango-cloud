// components/layout/AppSidebar.tsx
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import {
  Plus,
  Users,
  Clock,
  Star,
  Trash2,
  Home,
  Cloud,
  Computer,
  AlertCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // Importat pentru a verifica starea (open/collapsed)
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NewButtonDropDown } from "./NewButtonDropDown";
import { useCloudUpload } from "@/hooks/useCloudUpload";

const navGroups = [
  {
    labelKey: "sidebar.general",
    items: [
      { titleKey: "sidebar.home", url: "/cloud/home", icon: Home },
      { titleKey: "sidebar.myCloud", url: "/cloud/my-cloud", icon: Cloud },
      {
        titleKey: "sidebar.computers",
        url: "/cloud/my-computers",
        icon: Computer,
      },
    ],
  },
  {
    labelKey: "sidebar.quickAccess",
    items: [
      { titleKey: "sidebar.shared", url: "/cloud/shared-with-me", icon: Users },
      { titleKey: "sidebar.recent", url: "/cloud/recent", icon: Clock },
      { titleKey: "sidebar.starred", url: "/cloud/starred", icon: Star },
    ],
  },
  {
    labelKey: "sidebar.utilities",
    items: [
      { titleKey: "sidebar.spam", url: "/cloud/spam", icon: AlertCircle },
      { titleKey: "sidebar.trash", url: "/cloud/trash", icon: Trash2 },
    ],
  },
];

export const AppSidebar = () => {
  const { t } = useTranslation("sidebar");
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useSidebar(); // Preluăm starea dacă sidebar-ul este deschis/restrâns
  const {
    fileInputRef,
    folderInputRef,
    handleCreateFolder,
    handleFileInputChange,
    handleFolderInputChange,
    openFilePicker,
    openFolderPicker,
  } = useCloudUpload();

  return (
    // 🔴 1. Cheia este atributul collapsible="icon"
    <Sidebar collapsible="icon">
      {/* -------------------------------------------------------------- */}
      {/* Header — Logo & Button "New"                                    */}
      {/* -------------------------------------------------------------- */}
      <SidebarHeader className="p-3">
        <div
          onClick={() => navigate("/cloud/home")}
          className="flex shrink-0 cursor-pointer items-center gap-3 overflow-hidden"
        >
          <img
            className="h-10 w-10 shrink-0 object-contain"
            src="/logo/MANOG-ICON.svg"
            alt="rMango Cloud Logo"
          />
          {open && (
            <h1 className="text-lg font-bold tracking-tight whitespace-nowrap">
              r<span className="text-primary">Mango</span> Cloud
            </h1>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <input
          ref={folderInputRef}
          type="file"
          className="hidden"
          // @ts-expect-error - webkitdirectory nu e în tipurile standard React/DOM,
          // dar e suportat de toate browserele majore (Chrome, Edge, Safari)
          webkitdirectory=""
          directory=""
          multiple
          onChange={handleFolderInputChange}
        />
        <NewButtonDropDown
          className="w-full mt-2"
          createFolder={handleCreateFolder}
          onUploadFileClick={openFilePicker}
          onUploadFolderClick={openFolderPicker}
        >
          <Button
            onClick={() => console.log("New action")}
            className={`w-full transition-all ${
              open
                ? "justify-start gap-2 h-11 px-4 text-base"
                : "h-10 w-10 p-0 justify-center"
            }`}
            size={open ? "lg" : "icon"}
            title={!open ? t("sidebar.new") : undefined}
          >
            <Plus className="h-5 w-5 shrink-0" />
            {open && <span>{t("sidebar.new")}</span>}
          </Button>
        </NewButtonDropDown>
      </SidebarHeader>

      {/* -------------------------------------------------------------- */}
      {/* Navigare principală                                            */}
      {/* -------------------------------------------------------------- */}
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.labelKey}>
            <SidebarGroupLabel>{t(group.labelKey)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.titleKey}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={t(item.titleKey)} // Afișează Tooltip când sidebar-ul e restrâns
                        onClick={() => navigate(item.url)}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{t(item.titleKey)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* -------------------------------------------------------------- */}
      {/* Footer — Storage info                                          */}
      {/* -------------------------------------------------------------- */}
      <SidebarFooter className="p-3">
        {open ? (
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              Storage (inca nu lucareaza)
            </p>

            <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-primary h-full w-[45%]" />
            </div>
            <p className="mt-1">6.7 GB of 15 GB used</p>
          </div>
        ) : (
          <div className="flex justify-center" title="6.7 GB of 15 GB used">
            <Cloud className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
