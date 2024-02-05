<!-- FormGroup.vue -->
<template>
  <div class="w-full flex flex-col gap-2">
    <label :for="id" class="block text-sm uppercase font-semibold text-gray-600">
      {{ labelTitle }}:
    </label>

    <!-- Use v-model to bind the value and listen for input events -->
    <CInput
      :modelValue="modelValue"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :isValid="validation"
      @update:modelValue="updateModelValue"
    />
    <span v-if="validation" class="text-red-500">{{ validationText }} is required.</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CInput from '@/components/CInput/CInput.vue'

const { modelValue, labelTitle, id, type, validation, validationText, placeholder } = defineProps([
  'modelValue',
  'labelTitle',
  'id',
  'validation',
  'type',
  'validationText',
  'placeholder'
])

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  // Emit the updated value using the 'update:modelValue' event
  emit('update:modelValue', value)
}
</script>
