import { defineStore } from 'pinia';
import { computed, reactive, Ref, ref } from 'vue';
import AppLayout from '@/layout/AppLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import { LayoutConfig, LayoutState } from '@/layout/composables/types';

const layoutConfig = reactive<LayoutConfig>({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  darkTheme: false,
  menuMode: 'static',
});

const layoutState = reactive<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
});

export const useAppStore = defineStore('app', () => {
  const layout = ref('AuthLayout');

  const mainLayout = computed(() => {
    return layout.value === 'AppLayout' ? AppLayout : AuthLayout;
  });

  const setMainLayout = (layoutName: string) => {
    layout.value = layoutName;
  };

  const setActiveMenuItem = (item: Ref<any> | any) => {
    layoutState.activeMenuItem = item.value || item;
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle('app-dark');
  };

  const toggleDarkMode = (event: MouseEvent) => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const toggleMenu = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return {
    getPrimary,
    getSurface,
    isDarkTheme,
    isSidebarActive,
    layout,
    layoutConfig,
    layoutState,
    mainLayout,
    setActiveMenuItem,
    setMainLayout,
    toggleDarkMode,
    toggleMenu,
  };
});
