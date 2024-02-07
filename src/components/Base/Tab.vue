<template>
  <RouterLink
    class="flex-1 inline-block"
    :class="{ 'duration-200  bg-blue-700 font-bold text-white': isActive }"
    :to="{
      name: path
    }"
  >
    <TabButton :buttonText="title" />
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import TabButton from './TabButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps(['path', 'title'])

const isActive = computed(() => route.name === props.path)
</script>
