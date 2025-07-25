import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false);

    // Initialize authentication state from localStorage
    const initAuth = () => {
        const stored = localStorage.getItem('isAuthenticated');
        isAuthenticated.value = stored === 'true';
    };

    // Login function
    const login = () => {
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', 'true');
    };

    // Logout function
    const logout = () => {
        isAuthenticated.value = false;
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
    };

    // Initialize on store creation
    initAuth();

    return {
        isAuthenticated,
        login,
        logout
    };
});

export default useAuthStore;
