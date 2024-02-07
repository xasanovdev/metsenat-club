<template>
  <CTable :titles="columns" :data="sponsors?.list">
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
    <template v-slot:phone="{ item }">
      <a :href="`tel:${item.phone}`">{{ item.phone }}</a>
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
      <RouterLink class="text-center" :to="{ name: 'Sponsor', params: { id: item.id } }">
        <img class="mx-auto" src="/eye.svg" alt="eye icon" />
      </RouterLink>
    </template>
  </CTable>

  <div class="flex items-center justify-between pb-4">
    <div>
      {{ sponsors?.count }} tadan {{ (sponsors.currentPage - 1) * sponsors.count }}-{{
        sponsors.currentPage * sponsors.count
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
      :dataList="sponsors.sponsorsCount"
      :currentPage="sponsors.currentPage"
      :paginationCount="sponsors.count"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CPagination from '@/components/Layout/CPagination.vue'
import CTable from '@/components/Base/CTable.vue'

import { formatDate } from '@/utils'
import { generatePaginationData } from '@/utils'

import { useSponsors } from '@/stores/sponsors'

const { sponsors, getSponsorsList } = useSponsors()

const columns = [
  { label: '#', keys: 'index' },
  { label: 'f.i.sh.', keys: 'full_name' },
  { label: 'Tel.Raqami', keys: 'phone' },
  { label: 'Homiylik summasi', keys: 'sum' },
  { label: 'Sarflangan summa', keys: 'spent' },
  { label: 'Holati', keys: 'get_status_display' },
  { label: 'Sana', keys: 'created_at' },
  { label: 'Amallar', keys: 'actions' }
]

const paginationValues = computed(() =>
  generatePaginationData(sponsors.currentPage, sponsors.sponsorsCount, sponsors.count)
)

const totalPage = computed(() => sponsors.currentPage * sponsors.count)

const nextPage = () => {
  getSponsorsList(sponsors.currentPage + 1, sponsors.count, 'force')
}

const prevPage = () => {
  getSponsorsList(sponsors.currentPage - 1, sponsors.count, 'force')
}

const changePagination = (currentPage) => {
  if (currentPage !== '...') {
    getSponsorsList(currentPage, sponsors.count, 'force')
  }
}

const selectPaginationCount = (count) => {
  sponsors.currentPage = 1
  getSponsorsList(sponsors.currentPage, count, 'force')
}

onMounted(() => {
  getSponsorsList(sponsors.currentPage, sponsors.count)
})
</script>
