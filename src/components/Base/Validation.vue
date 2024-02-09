<template>
  <p v-if="validation" class="text-red-500">{{ validationText }} to'g'ri kiriting.</p>
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
