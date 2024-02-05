<template>
  <button
    :class="[buttonVariants[variant], buttonSize[size]]"
    class="font-semibold py-3.5 rounded-md flex items-center justify-center gap-[10px] w-full disabled:bg-opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
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
  primary: 'hover:bg-light1 bg-[#EDF1FD] text-[#3365FC] hover:bg-opacity-60 px-8',
  secondary: 'text-white bg-[#3365FC] hover:bg-opacity-60 px-8',
  danger: 'bg-[#FFECEB] text-[#FF4945] hover:bg-[#FF9797] hover:bg-opacity-60 px-8'
}

const buttonSize = {
  sm: 'text-md p-2',
  md: 'text-md p-4',
  lg: 'text-lg p-6'
}
</script>
