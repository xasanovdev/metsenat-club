<template>
  <CTable>
    <!-- students list row head cells -->
    <template #header>
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
    </template>

    <template #body>
      <div class="w-full">
        <li v-if="loading" class="text-center">
          <Skeleton />
        </li>

        <template v-else>
          <ul class="flex w-full flex-col gap-4 mt-3 mb-12 overflow-y-auto">
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
                <li class="w-[15%] text-center">
                  <a :href="`tel:${item.contract}`">{{ formatNumber(item.contract) }}</a>
                </li>
                <li class="w-[8%] text-center flex items-center justify-center">
                  <routerLink :to="{ name: 'Student', params: { id: item.id } }">
                    <img src="/eye.svg" alt="eye icon" />
                  </routerLink>
                </li>
              </ul>
            </li>
          </ul>
        </template>

        <div class="flex items-center justify-between">
          <div>
            {{ store.studentsList?.count }} tadan
            {{ (store.studentsCurrentPage - 1) * store.paginationCountStudents }}-{{
              store.studentsCurrentPage * store.paginationCountStudents
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
            :dataList="store.studentsList.count"
            :currentPage="store.studentsCurrentPage"
            :paginationCount="store.paginationCountStudents"
          />
        </div>
      </div>
    </template>
  </CTable>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CPagination from '@/components/CPagination/CPagination.vue'
import CTable from '@/components/CTable/CTable.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatNumber } from '@/utils/formatNumber'
import { generatePaginationData } from '@/utils/paginationArray'

import Skeleton from './Skeleton.vue'

const store = useDataStore()

const paginationValues = computed(() =>
  generatePaginationData(
    store.studentsCurrentPage,
    store.studentsList.count,
    store.paginationCountStudents
  )
)

const totalPage = computed(() => store.studentsCurrentPage * store.paginationCountStudents)

const nextPage = () => {
  fetchData(store.studentsCurrentPage + 1, store.paginationCountStudents)
}

const prevPage = () => {
  fetchData(store.studentsCurrentPage - 1, store.paginationCountStudents)
}

const changePagination = (count) => {
  if (count !== '...') {
    console.log(count)
    fetchData(count, store.paginationCountStudents)
  }
}

const selectPaginationCount = (paginationCountStudents) =>
  fetchData(store.studentsCurrentPage, paginationCountStudents, 'force')

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

const fetchData = async (page, page_size, force) => {
  console.log('Page size', page_size)
  if (store.studentsList.length === 0 || store.studentsCurrentPage !== page || force) {
    try {
      console.log(page_size)
      store.studentsCurrentPage = page
      store.paginationCountStudents = page_size
      store.studentsList = []

      const response = await get('student-list/', { page: page, page_size: page_size })

      store.studentsList = response

      console.log(
        store.studentsCurrentPage,
        store.studentsList.count,
        store.paginationCountStudents
      )

      router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

      // totalPage.value = store.studentsCurrentPage * store.paginationCountStudents

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(store.studentsCurrentPage, store.paginationCountStudents)
})
</script>
