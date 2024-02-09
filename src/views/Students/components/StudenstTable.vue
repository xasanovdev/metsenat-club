<template>
  <CTable :titles="columns" :data="students.students" @getUsersData="getStudentsListData">
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
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CTable from '@/components/Base/CTable.vue'

import { useStudents } from '@/stores/students'

import router from '@/router'

const students = useStudents()

let loading = ref(false)

const columns = [
  { label: '#', keys: 'index' },
  { label: 'f.i.sh.', keys: 'full_name' },
  { label: 'Talabalik turi', keys: 'type' },
  { label: 'OTM', keys: 'institute' },
  { label: 'Ajratilingan summa', keys: 'given' },
  { label: 'Kontrakt miqdori', keys: 'contract' },
  { label: 'Amallar', keys: 'actions' }
]

const getStudentsListData = async (currentPage, count, force) => {
  loading.value = true

  await students.getStudentsList(currentPage, count, force)

  router.push({ query: { page: currentPage, page_size: count } })

  loading.value = false
}

onMounted(async () => {
  await getStudentsListData(students.students.currentPage, students.students.count)
})
</script>
