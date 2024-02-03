<template>
  <CTable>
    <!-- sponsors list row head cells -->
    <template #header>
      <li class="mt-7">
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
    </template>
    <template #body>
      <div class="w-full">
        
        <li v-if="loading" class="text-center">
          <Skeleton />
        </li>

        <template v-else>
          <ul class="flex w-full flex-col gap-4 mt-3 mb-12 overflow-y-auto">
            <li
              v-for="(item, index) in store.sponsorsList?.results"
              :key="index"
              class="bg-white py-[22px] px-[14px] rounded-lg"
            >
              <ul class="flex items-center justify-between">
                <li class="w-[2%] text-center">{{ index + 1 }}</li>
                <li class="w-[34%] text-left">{{ item.full_name }}</li>
                <li class="w-[10%] text-center">
                  <a :href="`tel:${item.phone}`">{{ formatNumber(item.phone) }}</a>
                </li>
                <li class="w-[16%] text-center">{{ formatNumber(item.spent) }}</li>
                <li class="w-[15%] text-center">{{ formatNumber(item.sum) }}</li>
                <li class="w-[15%] text-center">{{ formatDate(item.created_at) }}</li>
                <li class="w-[8%] text-center">
                  <CBadge :status="item.get_status_display"></CBadge>
                </li>
                <li class="w-[8%] text-center flex items-center justify-center">
                  <routerLink :to="{ name: 'Sponsor', params: { id: item.id } }">
                    <img src="/eye.svg" alt="eye icon" />
                  </routerLink>
                </li>
              </ul>
            </li>
          </ul>
        </template>

        <div class="flex items-center justify-between">
          <div>
            {{ store.sponsorsList?.count }} tadan
            {{ (store.sponsorsCurrentPage - 1) * store.paginationCountSponsors }}-{{
              store.sponsorsCurrentPage * store.paginationCountSponsors
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
            :dataList="store.sponsorsList.count"
            :currentPage="store.sponsorsCurrentPage"
            :paginationCount="store.paginationCountSponsors"
          />
        </div>
      </div>
    </template>
  </CTable>
</template>

<script setup>
import {
  computed,
  onMounted,
} from 'vue';

import CBadge from '@/components/CBadge/CBadge.vue';
import CPagination from '@/components/CPagination/CPagination.vue';
import CTable from '@/components/CTable/CTable.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { generatePaginationData } from '@/utils/paginationArray';

import Skeleton from './Skeleton.vue';

const store = useDataStore()

const { get, loading } = useFetch()

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

const paginationValues = computed(() =>
  generatePaginationData(
    store.sponsorsCurrentPage,
    store.sponsorsList.count,
    store.paginationCountSponsors
  )
)

const totalPage = computed(() => store.sponsorsCurrentPage * store.paginationCountSponsors)

const nextPage = () => {
  fetchData(store.sponsorsCurrentPage + 1, store.paginationCountSponsors)
}

const prevPage = () => {
  fetchData(store.sponsorsCurrentPage - 1, store.paginationCountSponsors)
}

const changePagination = (count) => {
  if (count !== '...') {
    fetchData(count, store.paginationCountSponsors)
  }
}

const selectPaginationCount = (paginationCountSponsors) =>
  fetchData(store.sponsorsCurrentPage, paginationCountSponsors, 'force')

const fetchData = async (page, page_size, force) => {
  if (store.sponsorsList.length === 0 || store.sponsorsCurrentPage !== page || force) {
    try {
      store.sponsorsCurrentPage = page
      store.paginationCountSponsors = page_size

      store.sponsorsList = []
      const response = await get('sponsor-list/', { page: page, page_size: page_size })

      store.sponsorsList = response

      router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

      // totalPage.value = store.studentsCurrentPage * store.paginationCountStudents

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(store.sponsorsCurrentPage, store.paginationCountSponsors)
})
</script>
