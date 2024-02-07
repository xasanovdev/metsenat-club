<template>
  <div class="p-6 flex items-center gap-4 bg-white rounded-lg">
    <img :src="img" alt="money image" width="28" height="20" />
    <div class="flex items-start flex-col gap-[6px]">
      <p class="text-[12px] text-violet-300">{{ title }}</p>
      <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
        <span class="text-gray-800">{{ amount }}</span>
        <span class="text-slate-300">UZS</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(['amount', 'img', 'title'])
</script>
