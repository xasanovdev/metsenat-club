<template>
  <div class="md:col-span-1 p-6 flex items-center gap-4 bg-white rounded-lg">
    <img :src="link" alt="money image" />
    <div class="flex items-start flex-col gap-[6px]">
      <p class="text-[12px] text-[#7A7A9D]">{{ title }}</p>
      <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
        <span class="text-[#2E384D]">{{ money }}</span>
        <span class="text-[#B2B7C1]">UZS</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(['money', 'link', 'title'])
</script>
