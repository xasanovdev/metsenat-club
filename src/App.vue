<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import {
  computed,
  onMounted,
} from 'vue';

import { useRoute } from 'vue-router';

import AuthLayout from '@/Layout/AuthLayout/AuthLayout.vue';
import DashboardLayout from '@/Layout/DashboardLayout/DashboardLayout.vue';

import { useFetch } from './composables/useFetch';
import { useDataStore } from './stores/data';

const route = useRoute()

const layouts = {
  Dashboard: DashboardLayout,
  Auth: AuthLayout
}

const layout = computed(() => {
  return layouts[route.meta.layout] ?? DashboardLayout
})

const store = useDataStore()

const { get } = useFetch()

const fetchInstituteList = async () => {
  try {
    const response = await get(`institute-list/`)
    store.instituteList = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchInstituteList()
})
</script>

<style scoped></style>
