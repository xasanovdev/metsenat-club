<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

import AuthLayout from '@/Layout/AuthLayout/AuthLayout.vue';
import DashboardLayout from '@/Layout/DashboardLayout/DashboardLayout.vue';


const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'Dashboard':
      return DashboardLayout
    case 'Auth':
      return AuthLayout
    default:
      return 'salom'
  }
})
</script>

<style scoped></style>
