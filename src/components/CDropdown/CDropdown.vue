<template>
  <div class="relative inline-block w-full">
    <button
      @click="toggleDropdown"
      class="p-4 w-full border border-[#2E5BFF] justify-between bg-[#F9FAFF] text-left text-[#2E384D] rounded-md focus:outline-none flex items-center"
    >
      <span>{{ selectedOption.label }}</span>
      <img :class="['mr-2 duration-200', [isDropdownOpen ? '' : 'rotate-180']]" src="../../../public/dropdown.svg" alt="">
    </button>

    <transition name="dropdown">
      <div v-show="isDropdownOpen" class="absolute w-full mt-2 z-20 bg-white border rounded-lg shadow-lg">
        <div v-for="(option, index) in options" :key="option.value" class="py-3 px-4 cursor-pointer hover:bg-slate-100 duration-200" :class="{ 'border-t': index > 0, 'bg-slate-100': selectedOption.value === option.value }">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedOption"
              :value="option"
              class="mr-2 hidden"
              @change="closeDropdown"
            />
            {{ option.label }}
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);
const selectedOption = ref({ label: 'Barchasi', value: 'Barchasi' });

const options = [
  { label: 'Barchasi', value: 'Barchasi' },
  { label: 'Yangi', value: 'Yangi' },
  { label: 'Moderatsiyada', value: 'Moderatsiyada' },
  { label: 'Tasdiqlangan', value: 'Tasdiqlangan' },
  { label: 'Bekor qilingan', value: 'Bekor qilingan' },
];

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s;
}

.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
