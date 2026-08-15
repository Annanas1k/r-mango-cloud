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
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/composables/useAuth';
import {
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
} from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingsStore, type Language } from '@/stores/settings.store';
import type { SidebarGroupConfig } from '@/types/sidebar.types';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const { t } = useI18n();
const { logout } = useAuth();

const settingsStore = useSettingsStore();
const { theme, language } = storeToRefs(settingsStore);
const { setThemeExplicit, setLanguage } = settingsStore;

const isDark = computed({
  get: () => theme.value === 'dark',
  set: (value: boolean) => setThemeExplicit(value ? 'dark' : 'light'),
});



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

      <!-- Setări: Collapsible cu temă (switch) + limbă (3 butoane) -->
      <SidebarGroup>
        <SidebarGroupLabel>{{ t('sidebar.groups.system') }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible as-child class="group/settings">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="t('sidebar.settings')">
                    <Settings class="size-4" />
                    <span>{{ t('sidebar.settings') }}</span>
                    <ChevronRight class="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/settings:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div class="flex flex-col gap-3 px-2 py-2">
                    <!-- Rând temă -->
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-xs text-muted-foreground">
                        {{ t('sidebar.theme.label') }}
                      </span>
                      <div class="flex items-center gap-1.5">
                        <Sun class="size-3.5 text-muted-foreground" />
                        <Switch v-model="isDark" :aria-label="t('sidebar.theme.label')" />
                        <Moon class="size-3.5 text-muted-foreground" />
                      </div>
                    </div>

                    <!-- Rând limbă -->
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-xs text-muted-foreground">
                        {{ t('sidebar.language') }}
                      </span>
                        <ToggleGroup
                          type="single"
                          :model-value="language"
                          variant="outline"
                          class="flex gap-2"
                          @update:model-value="(val) => val && setLanguage(val as Language)"
                        >
                          <ToggleGroupItem value="en" class="rounded-md">EN</ToggleGroupItem>
                          <ToggleGroupItem value="ro" class="rounded-md">RO</ToggleGroupItem>
                          <ToggleGroupItem value="ru" class="rounded-md">RU</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                  </div>
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