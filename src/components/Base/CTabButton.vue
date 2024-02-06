<template>
  <button
    :class="{ 'duration-200  bg-blue-700 font-bold text-white': isActive }"
    class="w-full flex items-center justify-center gap-[10px] py-[14px] border-2 border-indigo-200 hover:border-indigo-300 duration-200 hover:bg-indigo-50 font-bold hover:text-indigo-300 text-[#3366FF99]"
    @click="navigateToPath"
  >
    <slot />

    {{ buttonText }}
  </button>
</template>

<script setup>
import { computed, ref } from 'vue'

import { useRoute } from 'vue-router'

import router from '@/router'

const props = defineProps(['path', 'buttonText', 'variant'])

const route = useRoute()

const isActive = computed(() => route.path === props.path)

const navigateToPath = () => {
  // Use the Vue Router to navigate to the specified path
  router.push(props.path)
}
</script>

<style scoped>
/* Add any additional styling specific to this component */
</style>
