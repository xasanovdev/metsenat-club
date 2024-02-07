<template>
  <button
    :class="[
      rounded === 'left' ? 'border-l-2 rounded-l-lg' : rounded === 'right' ? ' rounded-r-lg' : '',

      isActive || isLegal
        ? 'duration-200  bg-blue-700 text-white'
        : 'text-[#3366FF99] border-indigo-200 hover:border-indigo-300 duration-200 hover:bg-indigo-50 hover:text-indigo-300'
    ]"
    class="w-full flex items-center justify-center font-bold gap-[10px] py-[14px] border-t-2 border-b-2 border-r-2"
  >
    <slot />

    {{ buttonText }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['buttonText', 'rounded', 'path', 'isLegal'])

const route = useRoute()

const isActive = computed(() => route.name === props.path)
</script>

<style scoped>
/* Add any additional styling specific to this component */
</style>
