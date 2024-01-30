<template>
  <div class="relative dropdown inline-block w-full">
    <div class="relative">
      <input
        @click="toggleDropdown"
        @focus="closeDropdown()"
        v-model="searchText"
        class="p-4 w-full border border-[#2E5BFF] justify-between bg-[#F9FAFF] text-left text-[#2E384D] rounded-md focus:outline-none flex items-center"
        placeholder="Search..."
      />
      <img class="absolute right-2 top-4" :class="['mr-2 duration-200', [isDropdownOpen ? '' : 'rotate-180']]" src="../../../public/dropdown.svg" alt="" />
    </div>
    <transition name="dropdown">
      <div v-show="isDropdownOpen" class="absolute w-full max-h-[400px] overflow-y-auto mt-2 z-20 bg-white border rounded-lg shadow-lg" @mousedown="onDropdownClick">
        <div v-if="filteredOptions.length === 0" class="px-4 py-3">Qidirayotgan ma'lumotingiz topilmadi :(</div>
        <div v-for="(option, index) in filteredOptions" :key="option.id" class="cursor-pointer hover:bg-slate-100 duration-200" :class="{ 'border-t': index > 0, 'bg-slate-100': selectedOption.value === option.name }">
          <label class="flex w-full px-4 py-3 items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedOption"
              :value="option"
              class="mr-2 hidden"
              @change="onOptionSelected(option)"
            />
            {{ option.name }}
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
  },
});
console.log(props);
const isDropdownOpen = ref(false);
const selectedOption = ref(props?.options[0]);

const searchText = ref('');


const filteredOptions = computed(() => {
  return props?.options?.filter(option => option.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const onDropdownClick = (event) => {
  event.stopPropagation();
};

const closeDropdownOnOutsideClick = (event) => {
  if (isDropdownOpen.value && !event.target.closest('.dropdown')) {
    closeDropdown();
  }
};

const onOptionSelected = (option) => {
  searchText.value = option.name;
  closeDropdown();
};

onMounted(() => {
  document.addEventListener('mousedown', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', closeDropdownOnOutsideClick);
});
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
