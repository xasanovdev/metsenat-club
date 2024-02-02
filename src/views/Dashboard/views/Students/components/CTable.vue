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
        </div>
      </template>
    </template>
    <template #body>
      <div>
        {{ store.studentsList?.count }} tadan
        {{ (store.studentsCurrentPage - 1) * store.paginationCountStudents }}-{{
          store.studentsCurrentPage * store.paginationCountStudents
        }}
        ko'rsatilmoqda
      </div>
      <div class="flex h-full justify-center items-center gap-4">
        <div class="relative">
          <CDropdown
            class="text-sm font-bold"
            size="sm"
            v-model="store.paginationCountStudents"
            :readonly="true"
            position="reverse"
            property="value"
            :options="paginationData"
            @update:model-value="selectPaginationCount"
          ></CDropdown>
        </div>
        <div class="flex h-full items-center gap-4">
          <button
            class="rounded-md w-8 h-8 border-2 duration-200 flex items-center justify-center"
            :class="[
              store.studentsCurrentPage !== 1
                ? 'border-[#E0E7FF] bg-white hover:border-[#3366ff]'
                : 'bg-[#DFE3E8]'
            ]"
            @click="prevPage"
            :disabled="store.studentsCurrentPage === 1"
          >
            <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
          </button>
          <button
            v-for="(item, index) in paginationValues"
            :key="index"
            :class="[item === store.studentsCurrentPage ? 'border-[#3366ff] text-[#3366ff]' : '']"
            class="rounded-md w-8 h-8 bg-white border-2 duration-200 flex items-center justify-center"
            @click="changePagination(item)"
          >
            <span class="text-[14px] font-bold">{{ item }}</span>
          </button>
          <button
            :class="[
              store.studentsList.count < totalPage
                ? 'bg-[#DFE3E8]'
                : 'border-[#E0E7FF] bg-white hover:border-[#3366ff]'
            ]"
            :disabled="store.studentsList.count < totalPage"
            class="rounded-md w-8 h-8 border-2 duration-200 flex items-center justify-center"
            @click="nextPage"
          >
            <img src="/arrow.svg" alt="arrow icon" />
          </button>
        </div>
      </div>
    </template>
  </CTable>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatNumber } from '@/utils/formatNumber'
import { generatePaginationData } from '@/utils/paginationArray'

import CMaska from './CMaska.vue'
import CDropdown from '@/components/CDropdown/CDropdown.vue'
import CTable from '@/components/CTable/CTable.vue'

const store = useDataStore()

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
const selectPaginationCount = () => {
  fetchData(store.studentsCurrentPage, store.paginationCountStudents, 'token')
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

const paginationData = [{ value: '10' }, { value: '20' }, { value: '30' }, { value: '40' }]

const paginationValues = computed(() =>
  generatePaginationData(
    store.studentsCurrentPage,
    store.studentsList.count,
    store.paginationCountStudents
  )
)

const { get, loading } = useFetch()

const totalPage = ref(store.studentsCurrentPage * store.paginationCountStudents)

const fetchData = async (page, page_size, token) => {
  if (store.studentsList.length === 0 || store.studentsCurrentPage !== page || token) {
    try {
      console.log(page_size)
      store.studentsCurrentPage = page
      store.studentsList = []

      const response = await get('student-list/', { page: page, page_size: page_size })

      store.studentsList = response

      console.log(
        store.studentsCurrentPage,
        store.studentsList.count,
        store.paginationCountStudents
      )

      router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

      totalPage.value = store.studentsCurrentPage * store.paginationCountStudents

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
