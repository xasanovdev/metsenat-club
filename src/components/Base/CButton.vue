<template>
  <button
    :class="[buttonVariants[variant], buttonSize[size]]"
    class="font-semibold py-3.5 rounded-md w-full disabled:bg-opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
    :disabled="loading"
  >
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
})

const buttonVariants = {
  primary: 'bg-blue-100 text-blue-700 hover:bg-opacity-60 px-8',
  secondary: 'text-white bg-blue-700 hover:bg-opacity-60 px-8',
  danger: 'bg-rose-100 text-red-600 hover:bg-rose-400 hover:bg-opacity-60 px-8'
}

const buttonSize = {
  sm: 'text-md p-2',
  md: 'text-md p-4',
  lg: 'text-lg p-6'
}
</script>
