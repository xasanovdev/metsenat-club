<!-- FormGroup.vue -->
<template>
  <div class="w-full flex flex-col gap-2">
    <label :for="id" class="block text-sm uppercase font-semibold text-gray-600">
      <!-- Todo: just use label -->
      {{ labelTitle }}:
    </label>

    <!-- Todo: use v-bind. -->
    <CInput
      :modelValue="modelValue"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :isValid="validation"
      @update:modelValue="updateModelValue"
    />

    <Validation :validation="validation" :validationText="validationText" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CInput from '@/components/Base/CInput.vue'
import Validation from '../Common/Validation.vue'

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
  emit('update:modelValue', value)
}
</script>
