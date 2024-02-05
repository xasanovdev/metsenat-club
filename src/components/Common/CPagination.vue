<template>
  <div class="flex h-full justify-center items-center gap-4">
    <div class="relative">
      <CDropdown
        class="text-sm font-bold"
        size="sm"
        v-model="paginationCount"
        :readonly="true"
        position="reverse"
        property="value"
        :options="paginationData"
        @update:model-value="selectPaginationCount(paginationCount)"
      ></CDropdown>
    </div>

    <div class="flex h-full items-center gap-4">
      <button
        class="rounded-md w-8 h-8 border-2 duration-200 flex items-center justify-center"
        :class="[
          currentPage !== 1 ? 'border-[#E0E7FF] bg-white hover:border-[#3366ff]' : 'bg-[#DFE3E8]'
        ]"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
      </button>
      <button
        v-for="(item, index) in paginationValues"
        :key="index"
        :class="[item === currentPage ? 'border-[#3366ff] text-[#3366ff]' : '']"
        class="rounded-md w-8 h-8 bg-white border-2 duration-200 flex items-center justify-center"
        @click="changePagination(item)"
      >
        <span class="text-[14px] font-bold">{{ item }}</span>
      </button>
      <button
        :class="[
          dataList < totalPage ? 'bg-[#DFE3E8]' : 'border-[#E0E7FF] bg-white hover:border-[#3366ff]'
        ]"
        :disabled="dataList < totalPage"
        class="rounded-md w-8 h-8 border-2 duration-200 flex items-center justify-center"
        @click="nextPage"
      >
        <img src="/arrow.svg" alt="arrow icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CDropdown from '@/components/Base/CDropdown.vue'

const props = defineProps([
  'totalPage',
  'paginationValues',
  'dataList',
  'currentPage',
  'paginationCount'
])
const paginationCount = ref(props.paginationCount)

const emit = defineEmits(['nextPage', 'prevPage', 'changePagination', 'selectPaginationCount'])

const paginationData = [{ value: '10' }, { value: '20' }, { value: '30' }, { value: '40' }]

const nextPage = () => {
  emit('nextPage')
}

const prevPage = () => {
  emit('prevPage')
}

const changePagination = (count) => {
  if (count !== '...') {
    emit('changePagination', count)
  }
}

const selectPaginationCount = (paginationCount) => {
  emit('selectPaginationCount', paginationCount)
}
</script>
