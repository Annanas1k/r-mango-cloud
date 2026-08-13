<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useAuth } from '@/composables/useAuth';
import {
  ChevronRight,
  FileText,
  Languages,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
} from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const { t, locale } = useI18n();
const { logout } = useAuth();

interface SidebarLinkItem {
  label: string;
  to: string;
  icon: any;
}

interface SidebarGroupConfig {
  label: string;
  children: SidebarLinkItem[];
}

const sidebarGroups: SidebarGroupConfig[] = [
  {
    label: t('sidebar.groups.main'),
    children: [
      { label: t('sidebar.dashboard'), to: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: t('sidebar.groups.management'),
    children: [
      { label: t('sidebar.users'), to: '/users', icon: Users },
      { label: t('sidebar.reports'), to: '/reports', icon: FileText },
    ],
  },
];

// --- Setări: limbă + temă, tratate separat pentru că nu sunt linkuri ---
const LANGUAGES = [
  { code: 'ro', label: 'Română' },
  { code: 'en', label: 'English' },
];

const THEMES = [
  { code: 'light', label: t('sidebar.theme.light'), icon: Sun },
  { code: 'dark', label: t('sidebar.theme.dark'), icon: Moon },
];

const theme = ref<'light' | 'dark'>(
  (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
);

function setLanguage(code: string) {
  locale.value = code;
  localStorage.setItem('locale', code);
}

function setTheme(code: 'light' | 'dark') {
  theme.value = code;
  localStorage.setItem('theme', code);
  document.documentElement.classList.toggle('dark', code === 'dark');
}
</script>

<template>
  <Sidebar variant="floating" collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src="../../assets/background.png" alt="logo">
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">rMango CLoud</span>
              <span class="truncate text-xs">Admin Dashboard</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup v-for="group in sidebarGroups" :key="group.label">
        <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.children" :key="item.to">
              <SidebarMenuButton as-child :tooltip="item.label">
                <RouterLink :to="item.to">
                  <component :is="item.icon" />
                  <span>{{ item.label }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Setări, cu submenu pentru limbă și temă -->
      <SidebarGroup>
        <SidebarGroupLabel>{{ t('sidebar.groups.system') }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible as-child class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="t('sidebar.settings')">
                    <Settings />
                    <span>{{ t('sidebar.settings') }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <!-- Limbă -->
                    <Collapsible as-child class="group/lang">
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger as-child>
                          <SidebarMenuSubButton>
                            <Languages class="size-4" />
                            <span>{{ t('sidebar.language') }}</span>
                            <ChevronRight class="ml-auto size-3 transition-transform duration-200 group-data-[state=open]/lang:rotate-90" />
                          </SidebarMenuSubButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem v-for="lang in LANGUAGES" :key="lang.code">
                              <SidebarMenuSubButton
                                as="button"
                                :is-active="locale === lang.code"
                                @click="setLanguage(lang.code)"
                              >
                                <span>{{ lang.label }}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>

                    <!-- Temă -->
                    <Collapsible as-child class="group/theme">
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger as-child>
                          <SidebarMenuSubButton>
                            <Sun class="size-4" />
                            <span>{{ t('sidebar.theme.label') }}</span>
                            <ChevronRight class="ml-auto size-3 transition-transform duration-200 group-data-[state=open]/theme:rotate-90" />
                          </SidebarMenuSubButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem v-for="opt in THEMES" :key="opt.code">
                              <SidebarMenuSubButton
                                as="button"
                                :is-active="theme === opt.code"
                                @click="setTheme(opt.code as 'light' | 'dark')"
                              >
                                <component :is="opt.icon" class="size-4" />
                                <span>{{ opt.label }}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @click="logout">
            <LogOut />
            Log Out
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
      </div>
    </header>
  </SidebarInset>
</template>