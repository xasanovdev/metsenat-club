<template>
  <div class="w-full min-w-[1200px] overflow-x-auto pb-4">
    <div class="w-full whitespace-nowrap pb-2">
      <!-- students list row head cells -->
      <slot name="header"> </slot>
    </div>

    <ul class="flex items-center flex-col gap-4 w-full justify-between">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="bg-white w-full py-[22px] px-[14px] rounded-lg"
      >
        <ul class="flex items-center justify-between">
          <li
            class="text-center"
            :class="`w-[${header.width}]`"
            v-for="(header, headerId) in titles"
            :key="headerId"
          >
            <!-- Use scoped slot for dynamic content -->
            <slot :name="header.keys" :item="item">{{ item[header.keys] }}</slot>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
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
