<template>
  <CHeader :variant="headerVariant" />

  <slot />
</template>

<script setup>
import CHeader from '@/components/Layout/CHeader.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const headerVariant = computed(() =>
  route.params.id || route.fullPath === '/new-student' ? 'withoutMenu' : 'default'
)
</script>
