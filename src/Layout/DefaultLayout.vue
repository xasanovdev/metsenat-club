<template>
  <!-- Todo: use Tailwind config for colors -->
  <CHeader :variant="headerVariant" />

  <slot />
</template>

<script setup>
import CHeader from '@/components/Layout/CHeader.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)
const headerVariant = computed(() =>
  route.params.id || route.fullPath === '/new-student' ? 'withoutMenu' : 'default'
)
</script>
