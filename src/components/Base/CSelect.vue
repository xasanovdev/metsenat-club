<template>
  <div class="relative grid grid-cols-4 gap-3 w-full">
    <div
      class="relative w-full"
      :class="{ 'bg-indigo-200 border-blue-700': selectedFilter === 'all' }"
    >
      <img
        v-if="selectedFilter === 'all'"
        class="absolute -right-1 -top-1"
        src="/select.svg"
        alt="select icon"
      />
      <input
        type="radio"
        class="hidden"
        id="option-all"
        v-model="selectedFilter"
        value="all"
        @change="filterData"
      />
      <label
        for="option-all"
        class="w-full text-sm font-medium h-[52px] rounded-md flex items-center justify-center border-2 cursor-pointer"
        :class="{ 'bg-indigo-200 border-blue-700': selectedFilter === 'all' }"
      >
        All
      </label>
    </div>
    <div class="relative" v-for="option in filterOptions" :key="option">
      <img
        v-if="selectedFilter === option"
        class="absolute -right-1 -top-1"
        src="/select.svg"
        alt="seect icon"
      />
      <input
        type="radio"
        class="hidden"
        :id="'option-' + option"
        v-model="selectedFilter"
        :value="option"
        @change="filterData"
      />
      <label
        :for="'option-' + option"
        class="w-full text-sm font-medium h-[52px] rounded-md flex items-center justify-center border-2 cursor-pointer"
        :class="{ 'bg-indigo-200 border-blue-700': selectedFilter === option }"
      >
        {{ formatNumber(option) }}
        <span class="text-blue-700 ml-[2px]">UZS</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { formatNumber } from '@/utils'

const filterOptions = [1000000, 5000000, 7000000, 10000000, 30000000, 50000000] // Adjust based on your monetary values

const props = defineProps(['modelValue'])
const emit = defineEmits('update:modelValue')

const selectedFilter = ref('all')

const filterData = () => {
  emit('update:modelValue', selectedFilter.value)
}
</script>

<style scoped>
.bg-blue-100 {
  background-color: #ebf8ff; /* Adjust the background color as needed */
}
</style>
