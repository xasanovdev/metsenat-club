<template>
  <div class="w-full min-w-[1200px] overflow-x-auto pb-4">
    <div class="w-full whitespace-nowrap pb-2 pt-7">
      <slot name="header"> </slot>
    </div>

    <ul class="flex items-center flex-col gap-4 w-full justify-between">
      <li
        v-for="(item, index) in usersData?.list"
        :key="index"
        class="bg-white w-full py-[22px] px-8 rounded-lg"
      >
        <ul class="flex w-full items-center gap-2 justify-between">
          <li
            :class="`text-center ${headerId === 0 || headerId === titles.length - 1 ? 'w-12' : 'flex-1'}`"
            v-for="(header, headerId) in titles"
            :key="headerId"
          >
            <slot :name="header.keys" :item="item">{{ item[header.keys] }}</slot>
          </li>
        </ul>
      </li>
    </ul>

    <div class="flex items-center justify-between pt-4">
      <div>
        {{ usersData.dataCount }} tadan {{ (usersData.currentPage - 1) * usersData.count }}-{{
          usersData.currentPage * usersData.count
        }}
        ko'rsatilmoqda
      </div>

      <CPagination
        @nextPage="nextPage"
        @prevPage="prevPage"
        @changePagination="changePagination"
        @selectPaginationCount="selectPaginationCount"
        :paginationValues="paginationValues"
        :totalPage="totalPage"
        :dataList="usersData.dataCount"
        :currentPage="usersData.currentPage"
        :paginationCount="usersData.count"
      />
    </div>
  </div>
</template>

<script setup>
import { generatePaginationData } from '@/utils'

import { computed } from 'vue'
import CPagination from '../Layout/CPagination.vue'

const emit = defineEmits(['getUsersData'])

const props = defineProps({
  titles: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
})

const usersData = computed(() => props.data)
console.log(usersData.value)

const paginationValues = computed(() =>
  generatePaginationData(
    usersData.value.currentPage,
    usersData.value.dataCount,
    usersData.value.count
  )
)

const totalPage = computed(() => usersData.value.currentPage * usersData.value.count)

const nextPage = () => {
  emit('getUsersData', usersData.value.currentPage + 1, usersData.value.count, 'force')
}

const prevPage = () => {
  emit('getUsersData', usersData.value.currentPage - 1, usersData.value.count, 'force')
}

const changePagination = (currentPage) => {
  if (currentPage !== '...') {
    emit('getUsersData', currentPage, usersData.value.count, 'force')
  }
}

const selectPaginationCount = (count) => {
  usersData.value.currentPage = 1

  emit('getUsersData', usersData.value.currentPage, count, 'force')
}
</script>
