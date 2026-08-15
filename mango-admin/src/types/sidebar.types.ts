export interface SidebarLinkItem {
    label: string;
    to: string;
    icon: any;
}

export interface SidebarGroupConfig {
    label: string;
    children: SidebarLinkItem[];
}