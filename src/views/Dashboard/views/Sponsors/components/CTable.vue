<template>
  <div class="w-full">
    <div class="container mx-auto overflow-hidden overflow-x-auto">
      <ul class="w-full whitespace-nowrap flex gap-4 my-12 flex-col list-none p-0">
        <!-- sponsors list row head cells -->
        <li>
          <ul class="text-[#B1B1B8] text-left flex">
            <li v-for="(column, index) in columns" :key="index" :class="`w-[${column.width}]`">
              {{ column.label }}
            </li>
          </ul>
        </li>

        <li v-if="loading" class="text-center">
          <CMaska />
        </li>

        <template v-else>
          <li
            v-for="(item, index) in store.sponsorsList?.results"
            :key="index"
            class="bg-white py-[22px] px-[14px] rounded-lg border-b border-[#B2B7C1]"
          >
            <ul class="flex items-center justify-between">
              <li class="w-[2%] text-center">{{ index + 1 }}</li>
              <li class="w-[34%] text-left">{{ item.full_name }}</li>
              <li class="w-[10%] text-center">{{ item.phone }}</li>
              <li class="w-[16%] text-center">{{ formatNumber(item.spent) }}</li>
              <li class="w-[15%] text-center">{{ formatNumber(item.sum) }}</li>
              <li class="w-[15%] text-center">{{ formatDate(item.created_at) }}</li>
              <li class="w-[8%] text-center">
                <CBadge :status="item.get_status_display"></CBadge>
              </li>
              <li class="w-[8%] text-center flex items-center justify-center">
                <router-link :to="{ name: 'Sponsor', params: { id: item.id } }">
                  <img src="/eye.svg" alt="eye icon" />
                </router-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>

    <div class="flex items-center justify-between">
      <div>
        {{ store.sponsorsList?.count }} tadan {{ (store.sponsorsCurrentPage - 1) * 10 }}-{{
          store.sponsorsCurrentPage * 10
        }}
        ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <button
          class="p-2 rounded-md border-2 duration-200"
          :class="{
            'border-[#E0E7FF]': store.sponsorsCurrentPage === 1,
            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.sponsorsCurrentPage !== 1
          }"
          @click="prevPage"
          :disabled="store.sponsorsCurrentPage === 1"
        >
          <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
        </button>
        <span>{{ store.sponsorsCurrentPage }}</span>
        <button
          :class="{
            'border-[#E0E7FF]':
              store.sponsorsCurrentPage === Math.ceil(store.sponsorsList?.count / 10),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.sponsorsCurrentPage !== Math.ceil(store.sponsorsList?.count / 10)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="nextPage"
          :disabled="store.sponsorsCurrentPage === Math.ceil(store.sponsorsList?.count / 10)"
        >
          <img src="/arrow.svg" alt="arrow icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CBadge from '@/components/CBadge/CBadge.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'

import CMaska from './CMaska.vue'

const store = useDataStore()

const nextPage = () => {
  fetchData(store.sponsorsCurrentPage + 1)
}

const prevPage = () => {
  fetchData(store.sponsorsCurrentPage - 1)
}

const { get, loading } = useFetch()

const columns = [
  { label: '#', width: '2%' },
  { label: 'f.i.sh.', width: '34%' },
  { label: 'Tel.Raqami', width: '16%' },
  { label: 'Homiylik summasi', width: '10%' },
  { label: 'Sarflangan summa', width: '15%' },
  { label: 'Holati', width: '15%' },
  { label: 'Sana', width: '8%' },
  { label: 'Amallar', width: '8%' }
]

const totalPage = ref(0)
const pageSize = ref(10)

console.log(store.sponsorsList)

const fetchData = async (page) => {
  if (store.sponsorsList.length === 0 || store.sponsorsCurrentPage !== page) {
    try {
      store.sponsorsCurrentPage = page
      const response = await get('sponsor-list/', { page: page, pageSize: pageSize.value })
      store.sponsorsList = response

      router.push({ path: `?page=`, query: { page: page } })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(store.sponsorsCurrentPage)
})
</script>
