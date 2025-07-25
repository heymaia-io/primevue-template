<template>
    <RouterView />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

const matcher = window.matchMedia('(prefers-color-scheme: dark)');

const onThemeChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
        document.documentElement.classList.add('app-dark');
    } else {
        document.documentElement.classList.remove('app-dark');
    }
};

onMounted(() => {
    if (matcher.matches) {
        document.documentElement.classList.add('app-dark');
    }
    matcher.addEventListener('change', onThemeChange);
});

onBeforeUnmount(() => {
    matcher.removeEventListener('change', onThemeChange);
});
</script>