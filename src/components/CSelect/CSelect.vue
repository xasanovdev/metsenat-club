<template>
  <div class="relative grid grid-cols-4 gap-3 w-full">
    <div class="relative w-full" :class="{ 'bg-[#E0E7FF] border-[#2E5BFF]': selectedFilter === 'all' }">
      <img v-if="selectedFilter === 'all'" class="absolute -right-1 -top-1" src="../../../public/select.svg" alt="">
      <input 
        type="radio"
        class="hidden"
        id="option-all"
        v-model="selectedFilter"
        value="all"
        @change="filterData"
      />
      <label for="option-all" class="w-full text-sm font-medium h-[52px] rounded-md flex items-center justify-center border-2 cursor-pointer" :class="{ 'bg-[#E0E7FF] border-[#2E5BFF]': selectedFilter === 'all' }">
        All
      </label>
    </div>
    <div class="relative" v-for="option in filterOptions" :key="option">
      <img v-if="selectedFilter === option" class="absolute -right-1 -top-1" src="../../../public/select.svg" alt="">
      <input 
        type="radio"
        class="hidden"
        :id="'option-' + option"
        v-model="selectedFilter"
        :value="option"
        @change="filterData"
      />
      <label :for="'option-' + option" class="w-full text-sm font-medium h-[52px] rounded-md flex items-center justify-center border-2 cursor-pointer" :class="{ 'bg-[#E0E7FF] border-[#2E5BFF]': selectedFilter === option }">
        {{ formatNumber(option) }}
        <span class="text-[#2E5BFF] ml-[2px]">UZS</span>
      </label>
    </div>
  </div>

  <div class="mt-4 mx-auto text-center">
    <!-- Display filtered data here -->
    <div v-for="item in filteredData" :key="item.id" :class="{ 'bg-blue-100': isSelected(item.id) }">
      <span>{{ item.name }}</span>
      <span class="ml-2 text-gray-500">Given Sum: {{ formatNumber(item.given_sum) }} <span>UZS</span></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { formatNumber } from '@/utils/formatNumber';

const filterOptions = [1000000, 5000000, 7000000, 10000000, 30000000, 50000000]; // Adjust based on your monetary values

const selectedFilter = ref('all');

// Sample data for demonstration
const data = [
  { id: 1, name: 'Item 1', given_sum: 1000 },
  { id: 2, name: 'Item 2', given_sum: 1500 },
  { id: 3, name: 'Item 3', given_sum: 1200 },
  // ... more data
];

const filteredData = computed(() => {
  if (selectedFilter.value === null || selectedFilter.value === 'all') {
    return data;
  }

  return data.filter(item => item.given_sum === selectedFilter.value);
});

const filterData = () => {
  // Perform any additional filtering logic if needed
};

const isSelected = (itemId) => {
  const item = data.find(item => item.id === itemId);
  return item && item.given_sum === selectedFilter.value;
};

</script>

<style scoped>
.bg-blue-100 {
  background-color: #ebf8ff; /* Adjust the background color as needed */
}
</style>
