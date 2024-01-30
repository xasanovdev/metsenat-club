<!-- Input.vue -->
<template>
  <input
    class="py-3 px-4 w-full border border-[#E0E7FF] duration-200 focus:border-[#3365FC] justify-between bg-[#F9FAFF] text-left text-[#2E384D] rounded-md focus:outline-none flex items-center"
    :value="modelValue"
    @input="updateModelValue"
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :class="{
      'border-red-500': isValid === false,
    }"
  />
</template>

<script setup>
import { formatNumber } from '@/utils/formatNumber';
import { ref } from 'vue';

let { modelValue, type, placeholder, id } = defineProps([
  'modelValue',
  'type',
  'id',
  'placeholder',
  'isValid'
])

console.log(modelValue);
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  if (typeof modelValue === 'string') {
    console.log(modelValue)
    const refModelValue = ref(modelValue)

    emit('update:modelValue', refModelValue.value)

    modelValue = refModelValue
  }

  modelValue.value = event.target.value

  emit('update:modelValue', modelValue.value)
}
</script>
