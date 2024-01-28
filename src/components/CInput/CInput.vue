<!-- Input.vue -->
<template>
  <input
    class="py-3 px-4 w-full rounded-md duration-200 dark:bg-dark1 outline-none font-bold border border-light1 hover:border-indigo-400 dark:border-dark2 dark:hover:border-indigo-400 text-light4 dark:text-white"
    :value="modelValue"
    @input="updateModelValue"
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :class="{
      'border-red-500': isValid === false,
      'border-green-500': isValid === true
    }"
  />
</template>

<script setup>
import { ref } from 'vue';

let { modelValue, type, placeholder, id } = defineProps([
  'modelValue',
  'type',
  'id',
  'placeholder',
  'isValid'
])

console.log(modelValue);
const emit = defineEmits()

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
