<template>
  <button
    :class="{
      'duration-200  bg-[#3366FF] font-bold text-white': isActive
    }"
    class="w-full flex items-center justify-center gap-[10px] py-[14px] border-2 border-[#E0E7FF] hover:border-indigo-300 duration-200 hover:bg-indigo-50 font-bold hover:text-indigo-300 text-[#3366FF99] border-[3E0E7FF]"
    @click="navigateToPath"
  >
    <slot />

    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default:''
    },
    buttonText: {
      type: String,
      default: 'Dashboard'
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path
    }
  },
  methods: {
    navigateToPath() {
      // Use the Vue Router to navigate to the specified path
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
/* Add any additional styling specific to this component */
</style>
