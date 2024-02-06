<template>
  <CTable :titles="columns" :data="students.studentsList?.results">
    <!-- students list row head cells -->

    <template #header>
      <ul class="text-gray-400 text-left flex px-[14px]">
        <li
          v-for="(column, index) in columns"
          :key="index"
          :class="`w-[${column.width}]`"
          class="text-center"
        >
          {{ column.label }}
        </li>
      </ul>
    </template>

    <!-- Content for the default scoped slot (dynamic content for each item) -->

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
      {{ students.studentsList?.count }} tadan
      {{ (students.studentsCurrentPage - 1) * students.paginationCountStudents }}-{{
        students.studentsCurrentPage * students.paginationCountStudents
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
      :dataList="students.studentsList.count"
      :currentPage="students.studentsCurrentPage"
      :paginationCount="students.paginationCountStudents"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CPagination from '@/components/Common/CPagination.vue'
import CTable from '@/components/Common/CTable.vue'
import { useFetch } from '@/composables/useFetch'

import router from '@/router'
import { generatePaginationData } from '@/utils/index'
import { useStudents } from '@/stores/students'

const students = useStudents()

const paginationValues = computed(() =>
  generatePaginationData(
    students.studentsCurrentPage,
    students.studentsList.count,
    students.paginationCountStudents
  )
)

const totalPage = computed(() => students.studentsCurrentPage * students.paginationCountStudents)

const nextPage = () => {
  fetchData(students.studentsCurrentPage + 1, students.paginationCountStudents)
}

const prevPage = () => {
  fetchData(students.studentsCurrentPage - 1, students.paginationCountStudents)
}

const changePagination = (count) => {
  if (count !== '...') {
    fetchData(count, students.paginationCountStudents)
  }
}

const selectPaginationCount = (paginationCountStudents) => {
  students.studentsCurrentPage = 1
  fetchData(students.studentsCurrentPage, paginationCountStudents, 'force')
}

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
  if (students.studentsList.length === 0 || students.studentsCurrentPage !== page || force) {
    try {
      students.studentsCurrentPage = page
      students.paginationCountStudents = page_size
      students.studentsList = []

      const response = await get('student-list/', { page: page, page_size: page_size })

      students.studentsList = response

      router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

      // totalPage.value = students.studentsCurrentPage * students.paginationCountStudents

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  fetchData(students.studentsCurrentPage, students.paginationCountStudents)
})
</script>
