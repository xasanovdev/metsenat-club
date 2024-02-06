<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'

import { useRoute } from 'vue-router'

import EmptyLayout from '@/layout/EmptyLayout.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

const route = useRoute()

const layouts = {
  Dashboard: DefaultLayout,
  Auth: EmptyLayout
}

const layout = computed(() => {
  return layouts[route.meta.layout] ?? DefaultLayout
})
</script>

<style scoped></style>
