<template>
  <input
    class="py-3 px-4 w-full border border-indigo-200 duration-200 focus:border-blue-700 justify-between bg-gray-50 text-left text-gray-800 rounded-md focus:outline-none flex items-center"
    :value="modelValue"
    @input="updateModelValue"
    v-maska
    :type="type"
    :data-maska="title === 'Phone' ? '+998 (##) ###-##-##' : ''"
    :id="id"
    :placeholder="placeholder"
    :class="{
      'border-red-500': isInValid === true
    }"
  />
</template>

<script setup>
import { vMaska } from 'maska'

let { modelValue, type, placeholder, id } = defineProps({
  modelValue: { type: String, default: '' },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },

  isInValid: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  if (typeof modelValue === 'number') {
    modelValue = modelValue.toString()
  }

  modelValue = event.target.value

  emit('update:modelValue', modelValue)
}
</script>
