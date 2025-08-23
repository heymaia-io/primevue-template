<template>
  <div class="layout-wrapper">
    <RouterView />
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>


<script setup lang="ts">
defineOptions({
  name: 'AuthLayout',
});
</script>
