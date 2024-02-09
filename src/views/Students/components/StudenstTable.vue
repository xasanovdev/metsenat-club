<template>
  <CTable :titles="columns" :data="students?.list">
    <template #header>
      <ul class="text-gray-400 gap-2 text-left flex px-8">
        <li
          v-for="(column, index) in columns"
          :key="index"
          :class="`text-center ${index === 0 || index === columns.length - 1 ? 'w-12' : 'flex-1'}`"
        >
          {{ column.label }}
        </li>
      </ul>
    </template>

    <template v-slot:index="{ item }">
      {{ item.id }}
    </template>
    <template v-slot:full_name="{ item }">
      {{ item.full_name }}
    </template>
    <template v-slot:type="{ item }">
      {{ item.type === 1 ? 'Bakalavr' : 'Magistr' }}
    </template>

    <template v-slot:given="{ item }">
      {{ item.given }}
    </template>

    <template v-slot:contract="{ item }">
      {{ item.contract }}
    </template>

    <template v-slot:actions="{ item }">
      <RouterLink class="text-center" :to="{ name: 'Student', params: { id: item.id } }">
        <img class="mx-auto" src="/eye.svg" alt="eye icon" />
      </RouterLink>
    </template>

    <template v-slot:institute="{ item }">{{ item.institute.name }}</template>
  </CTable>

  <div class="flex items-center justify-between pb-4">
    <div>
      {{ students.studentCount }} tadan {{ (students.currentPage - 1) * students.count }}-{{
        students.currentPage * students.count
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
      :dataList="students.studentCount"
      :currentPage="students.currentPage"
      :paginationCount="students.count"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import CPagination from '@/components/Layout/CPagination.vue'
import CTable from '@/components/Base/CTable.vue'

import { useStudents } from '@/stores/students'

import router from '@/router'

import { generatePaginationData } from '@/utils'

const { students, getStudentsList } = useStudents()

let loading = ref(false)

const getStudentsListData = async (currentPage, count, force) => {
  loading.value = true

  await getStudentsList(currentPage, count, force)

  router.push({ query: { page: currentPage, page_size: count } })

  loading.value = false
}

const paginationValues = computed(() =>
  generatePaginationData(students.currentPage, students.studentCount, students.count)
)

const totalPage = computed(() => students.currentPage * students.count)

const nextPage = () => {
  getStudentsListData(students.currentPage + 1, students.count, 'force')
}

const prevPage = () => {
  getStudentsListData(students.currentPage - 1, students.count, 'force')
}

const changePagination = (count) => {
  if (count !== '...') {
    getStudentsListData(count, students.count, 'force')
  }
}

const selectPaginationCount = (count) => {
  students.currentPage = 1
  getStudentsListData(students.currentPage, count, 'force')
}

const columns = [
  { label: '#', keys: 'index' },
  { label: 'f.i.sh.', keys: 'full_name' },
  { label: 'Talabalik turi', keys: 'type' },
  { label: 'OTM', keys: 'institute' },
  { label: 'Ajratilingan summa', keys: 'given' },
  { label: 'Kontrakt miqdori', keys: 'contract' },
  { label: 'Amallar', keys: 'actions' }
]

onMounted(async () => {
  await getStudentsListData(students.currentPage, students.count)
})
</script>
