<template>
  <p v-if="validation" class="text-red-500">{{ validationText }} is required.</p>
</template>

<script setup>
defineProps({
  validation: {
    type: Boolean || String,
    default: false || ''
  },
  validationText: {
    type: String,
    default: ''
  }
})
</script>
