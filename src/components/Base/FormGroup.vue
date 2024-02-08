<template>
  <div class="w-full flex flex-col gap-2">
    <label :for="id" class="block text-sm uppercase font-semibold text-gray-600">
      {{ label }}:
    </label>

    <CInput
      :modelValue="modelValue"
      :id="id"
      :placeholder="placeholder"
      :isInValid="validation"
      :title="validationText"
      @update:modelValue="updateModelValue"
    />

    <Validation :validation="validation" :validationText="validationText" />
  </div>
</template>

<script setup>
import CInput from '@/components/Base/CInput.vue'
import Validation from '../Base/Validation.vue'

const { modelValue, label, id, type, validation, validationText, placeholder } = defineProps({
  modelValue: { type: String, default: '' },
  type: {
    type: String,
    default: ''
  },
  validationText: {
    type: String,
    default: ''
  },

  id: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },

  placeholder: {
    type: String,
    default: ''
  },

  validation: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value) => {
  emit('update:modelValue', value)
}
</script>
