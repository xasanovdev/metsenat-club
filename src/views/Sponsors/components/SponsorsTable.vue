<template>
  <template v-if="sponsors.loading"><div>Loading...</div></template>

  <template v-else>
    <CTable :titles="columns" :data="sponsors?.sponsors?.list">
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
        {{ sponsors?.sponsorsCount }} tadan
        {{ (sponsors.sponsors.currentPage - 1) * sponsors.sponsors.count }}-{{
          sponsors.sponsors.currentPage * sponsors.sponsors.count
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
        :dataList="sponsors.sponsors.sponsorsCount"
        :currentPage="sponsors.sponsors.currentPage"
        :paginationCount="sponsors.sponsors.count"
      />
    </div>
  </template>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CPagination from '@/components/Layout/CPagination.vue'
import CTable from '@/components/Base/CTable.vue'

import { formatDate } from '@/utils'
import { generatePaginationData } from '@/utils'

import { useSponsors } from '@/stores/sponsors'

import router from '@/router'

const sponsors = useSponsors()

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
  generatePaginationData(
    sponsors.sponsors.currentPage,
    sponsors.sponsors.sponsorsCount,
    sponsors.sponsors.count
  )
)

const totalPage = computed(() => sponsors.sponsors.currentPage * sponsors.sponsors.count)

const nextPage = () => {
  getSponsorsListData(sponsors.sponsors.currentPage + 1, sponsors.sponsors.count, 'force')
}

const prevPage = () => {
  getSponsorsListData(sponsors.sponsors.currentPage - 1, sponsors.sponsors.count, 'force')
}

const changePagination = (currentPage) => {
  if (currentPage !== '...') {
    getSponsorsListData(currentPage, sponsors.sponsors.count, 'force')
  }
}

const selectPaginationCount = (count) => {
  sponsors.sponsors.currentPage = 1
  getSponsorsListData(sponsors.sponsors.currentPage, count, 'force')
}

const getSponsorsListData = async (currentPage, count, force) => {
  await sponsors.getSponsorsList(currentPage, count, force)
  router.push({ path: `?page=`, query: { page: currentPage, page_size: count } })
}

onMounted(() => {
  getSponsorsListData(sponsors.sponsors.currentPage, sponsors.sponsors.count)
})
</script>
