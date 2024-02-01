<template>
  <div class="w-full">
    <div class="container mx-auto overflow-hidden overflow-x-auto">
      <ul class="w-full whitespace-nowrap flex gap-4 my-12 flex-col list-none p-0">
        <!-- sponsors list row head cells -->
        <li>
          <ul class="text-[#B1B1B8] text-left flex px-[14px]">
            <li
              v-for="(column, index) in columns"
              :key="index"
              :class="[index === 1 ? 'text-left' : 'text-center', `w-[${column.width}]`]"
            >
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
            class="bg-white py-[22px] px-[14px] rounded-lg"
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
        {{ store.sponsorsList?.count }} tadan
        {{ (store.sponsorsCurrentPage - 1) * store.paginationCountSponsors }}-{{
          store.sponsorsCurrentPage * store.paginationCountSponsors
        }}
        ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <CDropdown
            v-model="store.paginationCountSponsors"
            :readonly="true"
            position="reverse"
            property="name"
            :options="paginationData"
          ></CDropdown>
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
                store.sponsorsCurrentPage ===
                Math.ceil(store.sponsorsList?.count / store.paginationCountSponsors),

              'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
                store.sponsorsCurrentPage !==
                Math.ceil(store.sponsorsList?.count / store.paginationCountSponsors)
            }"
            class="p-2 rounded-md border-2 duration-200"
            @click="nextPage"
            :disabled="
              store.sponsorsCurrentPage ===
              Math.ceil(store.sponsorsList?.count / store.paginationCountSponsors)
            "
          >
            <img src="/arrow.svg" alt="arrow icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

import CBadge from '@/components/CBadge/CBadge.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'

import CMaska from './CMaska.vue'
import CDropdown from '@/components/CDropdown/CDropdown.vue'

const store = useDataStore()

const nextPage = () => {
  fetchData(store.sponsorsCurrentPage + 1, store.paginationCountSponsors)
}

const prevPage = () => {
  fetchData(store.sponsorsCurrentPage - 1, store.paginationCountSponsors)
}

const { get, loading } = useFetch()

const forcePagination = ref('forcePagination')

const columns = [
  { label: '#', width: '2%' },
  { label: 'f.i.sh.', width: '34%' },
  { label: 'Tel.Raqami', width: '10%' },
  { label: 'Homiylik summasi', width: '16%' },
  { label: 'Sarflangan summa', width: '15%' },
  { label: 'Holati', width: '15%' },
  { label: 'Sana', width: '8%' },
  { label: 'Amallar', width: '8%' }
]
const paginationData = [
  { id: 1, name: '10' },
  { id: 2, name: '20' },
  { id: 3, name: '30' },
  { id: 4, name: '40' }
]

const totalPage = ref(0)

console.log(store.sponsorsList)
const fetchData = async (page, page_size, forcePagination) => {
  if (
    store.sponsorsList.length === 0 ||
    store.sponsorsCurrentPage !== page ||
    forcePagination.value === 'forcePagination'
  ) {
    try {
      console.log(page_size)
      store.sponsorsCurrentPage = page
      store.sponsorsList = []
      const response = await get('sponsor-list/', { page: page, page_size: page_size })

      store.sponsorsList = response

      router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(store.sponsorsCurrentPage, store.paginationCountSponsors)
})

watch(
  () => store.paginationCountSponsors,

  () => {
    console.log(store.sponsorsCurrentPage, store.paginationCountSponsors)
    fetchData(store.sponsorsCurrentPage, store.paginationCountSponsors, forcePagination)
  },
  {
    immediate: true
  }
)
</script>
