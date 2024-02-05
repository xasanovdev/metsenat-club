<template>
  <CTable :titles="columns" :data="sponsors.sponsorsList?.results">
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
      {{ sponsors.sponsorsList?.count }} tadan
      {{ (sponsors.sponsorsCurrentPage - 1) * sponsors.paginationCountSponsors }}-{{
        sponsors.sponsorsCurrentPage * sponsors.paginationCountSponsors
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
      :dataList="sponsors.sponsorsList.count"
      :currentPage="sponsors.sponsorsCurrentPage"
      :paginationCount="sponsors.paginationCountSponsors"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CPagination from '@/components/Common/CPagination.vue'
import CTable from '@/components/Common/CTable.vue'

import { formatDate } from '@/utils/formatDate'
import { generatePaginationData } from '@/utils/paginationArray'
import { useSponsors } from '@/stores/sponsors'

const sponsors = useSponsors()

console.log(sponsors)

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
    sponsors.sponsorsCurrentPage,
    sponsors.sponsorsList.count,
    sponsors.paginationCountSponsors
  )
)

const totalPage = computed(() => sponsors.sponsorsCurrentPage * sponsors.paginationCountSponsors)

const nextPage = () => {
  sponsors.getSponsorsList(sponsors.sponsorsCurrentPage + 1, sponsors.paginationCountSponsors)
}

const prevPage = () => {
  sponsors.getSponsorsList(sponsors.sponsorsCurrentPage - 1, sponsors.paginationCountSponsors)
}

const changePagination = (count) => {
  if (count !== '...') {
    sponsors.getSponsorsList(count, sponsors.paginationCountSponsors)
  }
}

const selectPaginationCount = (paginationCountSponsors) => {
  sponsors.sponsorsCurrentPage = 1
  sponsors.getSponsorsList(sponsors.sponsorsCurrentPage, paginationCountSponsors, 'force')
}

onMounted(() => {
  sponsors.getSponsorsList(sponsors.sponsorsCurrentPage, sponsors.paginationCountSponsors)
})
</script>
