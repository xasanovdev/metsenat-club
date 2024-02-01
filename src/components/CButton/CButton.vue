<template>
  <button
    :class="[
      'font-semibold tracking-wide py-[14px] rounded-md duration-200 flex items-center justify-center gap-[10px]',
      styles[variant],
      sizes[size],
      { 'cursor-not-allowed opacity-50': loading }
    ]"
    :disabled="loading"
  >
    <template v-if="!loading">
      <slot></slot>
      {{ text }}
    </template>
    <template v-else> Loading... </template>
  </button>
</template>

<script setup>
const props = defineProps({
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

const styles = {
  primary: 'hover:bg-light1 bg-[#EDF1FD] text-[#3365FC] hover:bg-opacity-60 px-8',
  secondary: 'text-white bg-[#3365FC] hover:bg-opacity-60 px-8',
  danger: 'bg-[#FFECEB] text-[#FF4945] hover:bg-[#FF9797] hover:bg-opacity-60 px-8'
}

const sizes = {
  sm: 'text-md p-2',
  md: 'text-md p-4',
  lg: 'text-lg p-6'
}
</script>

<style></style>
