<template>
  <div class="w-full min-w-[1200px] overflow-x-auto pb-4">
    <div class="w-full whitespace-nowrap pb-2 pt-7">
      <slot name="header"> </slot>
    </div>

    <ul class="flex items-center flex-col gap-4 w-full justify-between">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="bg-white w-full py-[22px] px-8 rounded-lg"
      >
        <ul class="flex w-full items-center gap-2 justify-between">
          <li
            :class="`text-center ${headerId === 0 || headerId === titles.length - 1 ? 'w-12' : 'flex-1'}`"
            v-for="(header, headerId) in titles"
            :key="headerId"
          >
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
