<template>
  <div class="w-full min-w-[1200px] overflow-x-auto">
    <div class="container mx-auto overflow-hidden min-w-[1200px] overflow-x-auto">
      <ul class="w-full whitespace-nowrap list-none p-0">
        <!-- students list row head cells -->
        <slot name="header"> </slot>
      </ul>
    </div>

    <div class="flex items-center justify-between">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="bg-white py-[22px] px-[14px] rounded-lg"
      >
        <ul class="flex items-center justify-between">
          <li class="w-[2%] text-center" v-for="(header, headerId) in titles" :key="headerId">
            <slot :data="item" :name="header.keys"> {{ item[header.keys] }}</slot>
          </li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  titles: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>
