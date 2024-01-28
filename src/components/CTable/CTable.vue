<template>
  <div class="w-full">
    <div class="max-w-[1200px] mx-auto overflow-hidden overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="text-[#B1B1B8]">
            <th class="py-3 px-4 text-left">#</th>
            <th class="py-3 px-4 text-left">f.i.sh.</th>
            <th class="py-3 px-4 text-left">Tel.Raqami</th>
            <th class="py-3 px-4 text-left">Homiylik summasi</th>
            <th class="py-3 px-4 text-left">Sarflangan summa</th>
            <th class="py-3 px-4 text-left">Holati</th>
            <th class="py-3 px-4 text-left">Amallar</th>
          </tr>
        </thead>

        <tbody class="w-full">
          <td v-if="loading" colspan="12">
            <div class="w-[1152px] content-loading h-[480px] bg-slate-200"></div>
          </td>

          <template v-else>
            {{ console.log(data) }}
            <tr v-for="(item, index) in data?.results" :key="index">
              <td class="py-3 px-4 text-center">{{ index + 1 }}</td>
              <td class="py-3 px-4 text-left">{{ item.full_name }}</td>
              <td class="py-3 px-4 text-center">{{ item.phone }}</td>
              <td class="py-3 px-4 text-center">{{ item.contract }}</td>
              <td class="py-3 px-4 text-center">{{ item.given }}</td>
              <td class="py-3 px-4 text-center">
                {{ item.get_status_display }}
              </td>
              <td class="py-3 px-4 text-center flex items-center justify-center">
                <img src="../../../public/eye.svg" alt="asfsa" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between">
      <div>
        {{ data?.count }} tadan {{ (currentPage - 1) * 10 }}-{{ currentPage * 10 }} ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <button
          class="p-2 rounded-md border-2 duration-200"
          :class="{
            'border-[#E0E7FF]': currentPage === 1,
            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300': currentPage !== 1
          }"
          @click="setPage(currentPage--)"
          :disabled="currentPage === 1"
        >
          <img class="rotate-180" src="../../../public/arrow.svg" alt="asfsa" />
        </button>
        <span>{{ currentPage }}</span>
        <button
          :class="{
            'border-[#E0E7FF]': currentPage === Math.ceil(data?.count / 10),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              currentPage !== Math.ceil(data?.count / 10)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="setPage(currentPage++)"
          :disabled="currentPage === Math.ceil(data?.count / 10)"
        >
          <img src="../../../public/arrow.svg" alt="asfsa" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useFetch } from '@/composables/useFetch/useFetch';

const { data, loading, setPage } = useFetch('https://metsenatclub.xn--h28h.uz/api/v1/student-list/')
const currentPage = ref(1)

const getData = () => {
  setPage(currentPage.value)
}

getData()
</script>
