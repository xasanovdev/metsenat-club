<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'

import { useRoute } from 'vue-router'

import EmptyLayout from '@/Layout/EmptyLayout.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'

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
