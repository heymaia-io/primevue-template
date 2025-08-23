import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import AppLayout from '@/layout/AppLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';

export const useAppStore = defineStore('app', () => {
  const isDarkMode = ref(false);
  const layout = ref('AuthLayout');

  const mainLayout = computed(() => {
    return layout.value === 'AppLayout' ? AppLayout : AuthLayout;
  });

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const setMainLayout = (layoutName: string) => {
    layout.value = layoutName;
  };

  return {
    isDarkMode,
    layout,
    mainLayout,
    setMainLayout,
    toggleDarkMode,
  };
});
