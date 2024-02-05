<!-- FormGroup.vue -->
<template>
  <div>
    <label :for="id" class="block mb-2 text-sm uppercase font-medium text-gray-600">
      {{ labelTitle }}:
    </label>

    <!-- Use v-model to bind the value and listen for input events -->
    <CInput
      :modelValue="modelValue"
      :id="id"
      :type="type"
      :is-valid="isValid"
      @update:modelValue="updateModelValue"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CInput from '@/components/CInput/CInput.vue'

const { modelValue, labelTitle, id, type, isValid } = defineProps([
  'modelValue',
  'labelTitle',
  'id',
  'isValid',
  'type'
])

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  // Emit the updated value using the 'update:modelValue' event
  emit('update:modelValue', value)
}
</script>
