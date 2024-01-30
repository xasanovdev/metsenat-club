<template>
  <div class="w-full">
    <div class="max-w-[1200px] mx-auto overflow-hidden overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <!-- students list row head cells -->
        <thead>
          <tr class="text-[#B1B1B8] text-center">
            <th v-for="(column, index) in columns" :key="index" class="py-3 px-4">
              {{ column }}
            </th>
          </tr>
        </thead>

        <tbody class="w-full">
          <!-- students list loading mask-->
          <tr v-if="loading">
            <CMaska />
          </tr>

          <template v-else>
            <tr class="bg-white" v-for="(item, index) in store.studentsList?.results" :key="index">
              <td class="py-3 px-4 text-center">{{ index + 1 }}</td>
              <td class="py-3 px-4 text-left">{{ item.full_name }}</td>

              <td class="py-3 px-4 text-center">
                {{ item.type === 1 ? 'Bakalavr' : 'Magistr' }}
              </td>

              <td class="py-3 px-4 text-center whitespace-normal flex w-[200px]">
                {{ item.institute?.name }}
              </td>
              <td class="py-3 px-4 text-center">{{ item.given }}</td>

              <td class="py-3 px-4 text-center">{{ item.contract }}</td>
              <td class="py-3 px-4 text-center flex items-center justify-center">
                {{ item.id }}
                <!--  :to="`/students/${item.id}`" -->

                <routerLink :to="{ name: 'Student', params: { id: item.id } }">
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
        {{ store.studentsList?.count }} tadan {{ (currentPage - 1) * pageSize }}-{{
          currentPage * pageSize
        }}
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
            'border-[#E0E7FF]': currentPage === Math.ceil(store.studentsList?.count / pageSize),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              currentPage !== Math.ceil(store.studentsList?.count / pageSize)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="nextPage"
          :disabled="currentPage === Math.ceil(store.studentsList?.count / pageSize)"
        >
          <img src="/arrow.svg" alt="arrow icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';

import CMaska from './CMaska.vue';

const store = useDataStore()

const nextPage = () => {
  fetchData(currentPage.value + 1)
}

const prevPage = () => {
  fetchData(currentPage.value - 1)
}

const columns = [
  '#',
  'f.i.sh.',
  'Talabalik turi',
  'OTM',
  'Ajratilingan summa',
  'Kontrakt miqdori',
  'Amallar'
]

const { get, loading } = useFetch()

const currentPage = ref(1)
const totalPage = ref(0)
const pageSize = ref(10)

const fetchData = async (page) => {
  if (store.sponsorsList.length === 0 || currentPage.value !== page) {
    try {
      const response = await get('student-list/', { page: page, pageSize: pageSize.value })

      store.studentsList = response

      currentPage.value = page

      router.push({ path: `?page=`, query: { page: page } })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

fetchData(currentPage.value)
</script>
