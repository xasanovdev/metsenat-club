<template>
  <p v-if="validation" class="text-red-500">{{ validationText }} is required.</p>
</template>

<script setup>
defineProps(['validation', 'validationText'])
</script>
