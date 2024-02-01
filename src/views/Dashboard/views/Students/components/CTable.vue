<template>
  <div class="w-full">
    <div class="container mx-auto overflow-hidden overflow-x-auto">
      <ul class="w-full whitespace-nowrap list-none p-0">
        <!-- students list row head cells -->
        <li>
          <ul class="text-[#B1B1B8] text-center flex gap-1 px-[14px]">
            <li
              v-for="(column, index) in columns"
              :key="index"
              :class="`w-[${column.width}]`"
              class="text-center"
            >
              {{ column.label }}
            </li>
          </ul>
        </li>

        <li v-if="loading" class="text-center">
          <CMaska />
        </li>

        <template v-else>
          <div class="flex w-full flex-col gap-4 mt-3 mb-12 overflow-y-auto">
            <li
              v-for="(item, index) in store.studentsList?.results"
              :key="index"
              class="bg-white py-[22px] px-[14px] rounded-lg"
            >
              <ul class="flex items-center justify-between">
                <li class="w-[2%] text-center">{{ index + 1 }}</li>
                <li class="w-[20%] text-left">{{ item.full_name }}</li>
                <li class="w-[10%] text-center">
                  {{ item.type === 1 ? 'Bakalavr' : 'Magistr' }}
                </li>
                <li class="w-[30%] text-center">
                  {{ item.institute?.name }}
                </li>
                <li class="w-[15%] text-center">{{ formatNumber(item.given) }}</li>
                <li class="w-[15%] text-center">{{ formatNumber(item.contract) }}</li>
                <li class="w-[8%] text-center flex items-center justify-center">
                  <router-link :to="{ name: 'Student', params: { id: item.id } }">
                    <img src="/eye.svg" alt="eye icon" />
                  </router-link>
                </li>
              </ul>
            </li>
          </div>
        </template>
      </ul>
    </div>

    <div class="flex items-center justify-between">
      <div>
        {{ store.studentsList?.count }} tadan {{ (store.studentsCurrentPage - 1) * pageSize }}-{{
          store.studentsCurrentPage * pageSize
        }}
        ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <button
          class="p-2 rounded-md border-2 duration-200"
          :class="{
            'border-[#E0E7FF]': store.studentsCurrentPage === 1,
            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.studentsCurrentPage !== 1
          }"
          @click="prevPage"
          :disabled="store.studentsCurrentPage === 1"
        >
          <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
        </button>
        <span>{{ store.studentsCurrentPage }}</span>
        <button
          :class="{
            'border-[#E0E7FF]':
              store.studentsCurrentPage === Math.ceil(store.studentsList?.count / pageSize),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.studentsCurrentPage !== Math.ceil(store.studentsList?.count / pageSize)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="nextPage"
          :disabled="store.studentsCurrentPage === Math.ceil(store.studentsList?.count / pageSize)"
        >
          <img src="/arrow.svg" alt="arrow icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatNumber } from '@/utils/formatNumber'

import CMaska from './CMaska.vue'

const store = useDataStore()

const nextPage = () => {
  fetchData(store.studentsCurrentPage + 1)
}

const prevPage = () => {
  fetchData(store.studentsCurrentPage - 1)
}

const columns = [
  { label: '#', width: '2%' },
  { label: 'f.i.sh.', width: '20%' },
  { label: 'Talabalik turi', width: '10%' },
  { label: 'OTM', width: '30%' },
  { label: 'Ajratilingan summa', width: '15%' },
  { label: 'Kontrakt miqdori', width: '15%' },
  { label: 'Amallar', width: '8%' }
]

const { get, loading } = useFetch()

const totalPage = ref(0)
const pageSize = ref(10)

const fetchData = async (page) => {
  if (store.sponsorsList.length === 0 || store.studentsCurrentPage !== page) {
    try {
      const response = await get('student-list/', { page: page, pageSize: pageSize.value })

      store.studentsList = response

      store.studentsCurrentPage = page

      router.push({ path: `?page=`, query: { page: page } })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(store.studentsCurrentPage)
})
</script>
