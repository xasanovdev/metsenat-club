<template>
  <div
    class="relative dropdown flex"
    :class="[position ? 'flex-col-reverse' : 'flex-col w-full', size === 'sm' ? 'w-14' : '']"
  >
    <div class="relative">
      <input
        @click="toggleDropdown"
        @focus="closeDropdown()"
        :value="searchText"
        @input="updateSearchText"
        class="w-full border border-indigo-200 duration-200 focus:border-blue-700 justify-between bg-gray-50 text-left text-gray-800 rounded-md focus:outline-none flex items-center"
        :class="[
          readonly ? 'cursor-pointer' : '',
          size === 'sm' ? 'p-[5px]' : 'px-4 py-3',
          validation ? 'border-red-500' : ''
        ]"
        :readonly="readonly"
      />
      <img
        class="absolute"
        :class="[
          'duration-200',
          [isDropdownOpen ? '' : 'rotate-180'],
          size === 'sm' ? 'right-1 top-[10px] w-3' : 'mr-2 right-2 top-4'
        ]"
        src="/dropdown.svg"
        alt="Arrow icon"
      />
    </div>
    <transition name="dropdown">
      <div
        v-show="isDropdownOpen"
        :class="[readonly ? '' : 'top-12']"
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
          <label
            class="flex w-full px-4 py-3 items-center cursor-pointer text-sm uppercase font-semibold text-gray-600"
          >
            <input
              type="radio"
              :checked="selectedOption.value === option[property]"
              @change="selectOption(option)"
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
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  options: {
    type: Array,
    default: []
  },
  property: {
    type: String,
    default: ''
  },
  validation: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: ''
  },
  size: {
    type: String
  }
})

console.log(props)
const emit = defineEmits(['update:modelValue'])

const isDropdownOpen = ref(false)
const selectedOption = ref(props?.options[0] || {})
const searchText = ref(props.modelValue || '')

const filteredOptions = computed(() => {
  if (!props.options) {
    return []
  }
  if (props.readonly) {
    return props.options
  }
  return props.options.filter((option) => option[props.property].includes(searchText.value))
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

const selectOption = (option) => {
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
