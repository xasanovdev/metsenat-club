<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'

import { useRoute } from 'vue-router'

import AuthLayout from '@/Layout/AuthLayout/AuthLayout.vue'
import DashboardLayout from '@/Layout/DashboardLayout/DashboardLayout.vue'

const route = useRoute()

const layouts = {
  Dashboard: DashboardLayout,
  Auth: AuthLayout
}

const layout = computed(() => {
  return layouts[route.meta.layout] ?? DashboardLayout
})
</script>

<style scoped></style>
