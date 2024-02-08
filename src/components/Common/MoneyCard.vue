<template>
  <div class="p-6 flex items-center gap-4 bg-white rounded-lg">
    <div
      :class="['bg-[' + bgColor + ']']"
      class="flex items-center justify-center w-12 h-12 rounded-md"
    >
      <img :src="img" alt="money image" width="28" height="20" />
    </div>

    <div class="flex items-start flex-col gap-[6px]">
      <p class="text-[12px] font-semibold text-gray-400">{{ title }}</p>
      <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
        <span class="text-gray-800">{{ amount }}</span>
        <span class="text-slate-300">UZS</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(['amount', 'img', 'title', 'bgColor'])
</script>
