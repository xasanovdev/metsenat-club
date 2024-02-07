<template>
  <button
    class="w-full flex items-center justify-center gap-[10px] py-[14px] border-2 border-indigo-200 hover:border-indigo-300 duration-200 hover:bg-indigo-50 font-bold hover:text-indigo-300"
  >
    <slot />

    {{ buttonText }}
  </button>
</template>

<script setup>
defineProps(['buttonText'])
</script>

<style scoped>
/* Add any additional styling specific to this component */
</style>
