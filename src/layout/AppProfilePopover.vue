<template>
    <div>
        <Button
            type="button"
            icon="pi pi-user"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_panel"
            class="p-button-rounded p-button-text"
        />

        <Popover ref="op">
            <div class="flex flex-column">
                <Button
                    @click="goToProfile"
                    label="Profile"
                    icon="pi pi-user"
                    class="p-button-text p-button-plain"
                />
                <Button
                    @click="goToSettings"
                    label="Settings"
                    icon="pi pi-cog"
                    class="p-button-text p-button-plain"
                />
                <Button
                    @click="handleLogout"
                    label="Logout"
                    icon="pi pi-sign-out"
                    class="p-button-text p-button-plain"
                />
            </div>
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const op = ref();

const toggle = (event: any) => {
    op.value.toggle(event);
};

const goToProfile = () => {
    router.push('/profile');
};

const goToSettings = () => {
    router.push('/settings');
};

const handleLogout = () => {
    authStore.logout();
};
</script>
