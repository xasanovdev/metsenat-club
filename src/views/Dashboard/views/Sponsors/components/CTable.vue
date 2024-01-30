<template>
  <div class="w-full">
    <div class="container mx-auto overflow-hidden overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <!-- sponsors list row head cells -->
        <thead>
          <tr class="text-[#B1B1B8]">
            <th v-for="(column, index) in columns" :key="index" class="py-3 px-4 text-left">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="w-full">
          <!-- sponsors list loading mask-->

          <tr v-if="loading">
            <CMaska />
          </tr>

          <template v-else>
            <tr
              class="bg-white p-4 rounded-lg border-separate"
              v-for="(item, index) in store.sponsorsList?.results"
              :key="index"
            >
              <td class="py-3 px-4 text-center">{{ index + 1 }}</td>
              <td class="py-3 px-4 text-left">{{ item.full_name }}</td>
              <td class="py-3 px-4 text-center">{{ item.phone }}</td>
              <td class="py-3 px-4 text-center">{{ item.spent }}</td>
              <td class="py-3 px-4 text-center">{{ item.sum }}</td>
              <td class="py-3 px-4 text-center">{{ formatDate(item.created_at) }}</td>
              <td class="py-3 px-4 text-center">
                <CBadge :status="item.get_status_display"></CBadge>
              </td>
              <td class="py-3 px-4 text-center flex items-center justify-center">
                <routerLink :to="{ name: 'Sponsor', params: { id: item.id } }">
                  <img src="/eye.svg" alt="eye icon" />
                </routerLink>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between">
      <div>
        {{ store.sponsorsList?.count }} tadan {{ (currentPage - 1) * 10 }}-{{ currentPage * 10 }}
        ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <button
          class="p-2 rounded-md border-2 duration-200"
          :class="{
            'border-[#E0E7FF]': currentPage === 1,
            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300': currentPage !== 1
          }"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
        </button>
        <span>{{ currentPage }}</span>
        <button
          :class="{
            'border-[#E0E7FF]': store.currentPage === Math.ceil(store.sponsorsList?.count / 10),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              currentPage !== Math.ceil(store.sponsorsList?.count / 10)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="nextPage"
          :disabled="currentPage === Math.ceil(store.sponsorsList?.count / 10)"
        >
          <img src="/arrow.svg" alt="arrow icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CBadge from '@/components/CBadge/CBadge.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';
import { formatDate } from '@/utils/formatDate';

import CMaska from './CMaska.vue';

const store = useDataStore()

const nextPage = () => {
  fetchData(currentPage.value + 1)
}

const prevPage = () => {
  fetchData(currentPage.value - 1)
}

const { get, loading } = useFetch()

const columns = [
  '#',
  'f.i.sh.',
  'Tel.Raqami',
  'Homiylik summasi',
  'Sarflangan summa',
  'Holati',
  'Sana',
  'Amallar'
]

const currentPage = ref(1)
const totalPage = ref(0)
const pageSize = ref(10)

console.log(store.sponsorsList)

const fetchData = async (page) => {
  if (store.sponsorsList.length === 0 || currentPage.value !== page) {
    try {
      currentPage.value = page
      const response = await get('sponsor-list/', { page: page, pageSize: pageSize.value })
      store.sponsorsList = response

      router.push({ path: `?page=`, query: { page: page } })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

fetchData(currentPage.value)
</script>
