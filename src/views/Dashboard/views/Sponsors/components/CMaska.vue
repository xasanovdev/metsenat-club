<template>
  <td class="" rowspan="10" colspan="8">
    <div
      v-for="number in numbers"
      :key="number"
      class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1"
    >
      <div class="flex w-full py-2 px-2 my-2 gap-4">
        <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
        <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
      </div>
    </div>
  </td>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])

    return { numbers }
  }
}
</script>
