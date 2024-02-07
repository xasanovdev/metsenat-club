<!-- Input.vue -->
<template>
  <input
    class="py-3 px-4 w-full border border-indigo-200 duration-200 focus:border-blue-700 justify-between bg-gray-50 text-left text-gray-800 rounded-md focus:outline-none flex items-center"
    :value="modelValue"
    @input="updateModelValue"
    v-maska
    :data-maska="title === 'Phone' ? '+998 (##) ###-##-##' : ''"
    :id="id"
    :placeholder="placeholder"
    :class="{
      'border-red-500': isValid === true
    }"
  />
</template>

<script setup>
import { vMaska } from 'maska'

let { modelValue, type, placeholder, id } = defineProps([
  'modelValue',
  'type',
  'id',
  'placeholder',
  'isValid',
  'title'
])

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  // Convert to string if modelValue is a number
  if (typeof modelValue === 'number') {
    modelValue = modelValue.toString()
  }

  // Update modelValue
  modelValue = event.target.value

  // Emit the updated value
  emit('update:modelValue', modelValue)
}
</script>
