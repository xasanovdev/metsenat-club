<template>
  <RouterLink
    class="flex-1 inline-block"
    :to="{
      name: path
    }"
  >
    <TabButton :buttonText="title" :rounded="rounded" :path="path" />
  </RouterLink>
</template>

<script setup>
import TabButton from './TabButton.vue'

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  rounded: {
    type: String,
    default: ''
  }
})
</script>
