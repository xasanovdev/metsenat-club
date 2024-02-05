<template>
  <CTable :titles="columns" :data="store.sponsorsList?.results">
    <!-- sponsors list row head cells -->

    <template #header>
      <ul class="text-[#B1B1B8] text-left flex px-[14px]">
        <li
          v-for="(column, index) in columns"
          :key="index"
          :class="[index === 1 ? 'text-left' : 'text-center', `w-[${column.width}]`]"
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
    <template v-slot:phone="{ item }">
      {{ item.phone }}
    </template>

    <template v-slot:sum="{ item }">
      {{ item.sum }}
    </template>

    <template v-slot:spent="{ item }">
      {{ item.spent }}
    </template>

    <template v-slot:get_status_display="{ item }">
      <CBadge :status="item.get_status_display" />
    </template>

    <template v-slot:created_at="{ item }">{{ formatDate(item.created_at) }}</template>

    <template v-slot:actions="{ item }">
      <RouterLink class="text-center" :to="{ name: 'Student', params: { id: item.id } }">
        <img class="mx-auto" src="/eye.svg" alt="eye icon" />
      </RouterLink>
    </template>
  </CTable>

  <div class="flex items-center justify-between pb-4">
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
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CPagination from '@/components/Common/CPagination.vue'
import CTable from '@/components/Common/CTable.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { formatDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'
import { generatePaginationData } from '@/utils/paginationArray'

const store = useDataStore()

const { get, loading } = useFetch()

const columns = [
  { label: '#', width: '2%', keys: 'index' },
  { label: 'f.i.sh.', width: '34%', keys: 'full_name' },
  { label: 'Tel.Raqami', width: '10%', keys: 'phone' },
  { label: 'Homiylik summasi', width: '16%', keys: 'sum' },
  { label: 'Sarflangan summa', width: '15%', keys: 'spent' },
  { label: 'Holati', width: '15%', keys: 'get_status_display' },
  { label: 'Sana', width: '8%', keys: 'created_at' },
  { label: 'Amallar', width: '8%', keys: 'actions' }
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

const selectPaginationCount = (paginationCountSponsors) => {
  store.sponsorsCurrentPage = 1
  fetchData(store.sponsorsCurrentPage, paginationCountSponsors, 'force')
}

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
