<template>
  <CTable :titles="columns" :data="store.studentsList?.results">
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

    <template #keys="{ data }"> {{ data.full_name }} </template>
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
    fetchData(count, store.paginationCountStudents)
  }
}

const selectPaginationCount = (paginationCountStudents) =>
  fetchData(store.studentsCurrentPage, paginationCountStudents, 'force')

const columns = [
  { label: '#', width: '2%', keys: 'index' },
  { label: 'f.i.sh.', width: '20%', keys: 'full_name' },
  { label: 'Talabalik turi', width: '10%', keys: 'type' },
  { label: 'OTM', width: '30%', keys: 'institute' },
  { label: 'Ajratilingan summa', width: '15%', keys: 'given' },
  { label: 'Kontrakt miqdori', width: '15%', keys: 'contract' },
  { label: 'Amallar', width: '8%', keys: 'actions' }
]

const { get, loading } = useFetch()

const fetchData = async (page, page_size, force) => {
  if (store.studentsList.length === 0 || store.studentsCurrentPage !== page || force) {
    try {
      store.studentsCurrentPage = page
      store.paginationCountStudents = page_size
      store.studentsList = []

      const response = await get('student-list/', { page: page, page_size: page_size })

      store.studentsList = response

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
