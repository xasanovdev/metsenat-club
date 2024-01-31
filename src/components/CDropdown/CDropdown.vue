<template>
  <div class="relative dropdown inline-block w-full">
    <div class="relative">
      <input
        @click="toggleDropdown"
        @focus="closeDropdown()"
        :value="searchText"
        @input="updateSearchText"
        class="px-4 py-3 w-full border focus:border-[#2E5BFF] justify-between bg-[#F9FAFF] text-left text-[#2E384D] rounded-md focus:outline-none flex items-center"
        placeholder="Search..."
      />
      <img
        class="absolute right-2 top-4"
        :class="['mr-2 duration-200', [isDropdownOpen ? '' : 'rotate-180']]"
        src="/dropdown.svg"
        alt="Arrow icon"
      />
    </div>
    <transition name="dropdown">
      <div
        v-show="isDropdownOpen"
        class="absolute w-full max-h-[400px] overflow-y-auto mt-2 z-20 bg-white border rounded-lg shadow-lg"
        @mousedown="onDropdownClick"
      >
        <div v-if="filteredOptions.length === 0" class="px-4 py-3">
          Qidirayotgan ma'lumotingiz topilmadi :(
        </div>
        <div
          v-for="(option, index) in filteredOptions"
          :key="option[property]"
          class="cursor-pointer hover:bg-slate-100 duration-200"
          :class="{
            'border-t': index > 0,
            'bg-slate-100': selectedOption.value === option[property]
          }"
        >
          <label class="flex w-full px-4 py-3 items-center cursor-pointer">
            <input
              type="radio"
              :checked="selectedOption.value === option[property]"
              @change="onOptionSelected(option)"
              class="mr-2 hidden"
            />

            {{ option[property] }}
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps(['options', 'property', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

console.log(props)

const isDropdownOpen = ref(false)
const selectedOption = ref(props?.options[0] || {})
const searchText = ref(props.modelValue || '')

const filteredOptions = computed(() => {
  if (!props.options) {
    return []
  }

  return props.options.filter((option) =>
    option[props.property].toLowerCase().includes(searchText.value?.toLowerCase())
  )
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const onDropdownClick = (event) => {
  event.stopPropagation()
}

const closeDropdownOnOutsideClick = (event) => {
  if (isDropdownOpen.value && !event.target.closest('.dropdown')) {
    closeDropdown()
  }
}

const onOptionSelected = (option) => {
  searchText.value = option[props.property]
  emit('update:modelValue', option[props.property])
  closeDropdown()
}

const updateSearchText = (event) => {
  searchText.value = event.target.value
}

onMounted(() => {
  document.addEventListener('mousedown', closeDropdownOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', closeDropdownOnOutsideClick)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
