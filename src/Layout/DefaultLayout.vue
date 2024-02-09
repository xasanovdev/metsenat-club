<template>
  <CHeader />

  <slot />
</template>

<script setup>
import CHeader from '@/components/Layout/CHeader.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
</script>
