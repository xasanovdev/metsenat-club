<template>
  <div class="w-full">
    <template v-if="metaValue === 'Sponsors'">
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
              <th class="py-3 px-4 text-left">Sana</th>
              <th class="py-3 px-4 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody class="w-full">
            <tr v-if="loading">
              <td class="" rowspan="10" colspan="8">
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div class="h-[48px] mb-2 content-loading flex items-center justify-center flex-1">
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-2 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-2 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
              </td>
            </tr>

            <template v-else>
              {{ console.log(data) }}
              <tr v-for="(item, index) in data?.results" :key="index">
                <td class="py-3 px-4 text-center">{{ index + 1 }}</td>
                <td class="py-3 px-4 text-left">{{ item.full_name }}</td>
                <td class="py-3 px-4 text-center">{{ item.phone }}</td>
                <td class="py-3 px-4 text-center">{{ item.spent }}</td>
                <td class="py-3 px-4 text-center">{{ item.sum }}</td>

                <td class="py-3 px-4 text-center">{{ formatDate(item.created_at) }}</td>
                <td class="py-3 px-4 text-center">
                  {{ item.get_status_display }}
                </td>
                <td class="py-3 px-4 text-center flex items-center justify-center">
                  <router-link :to="`/sponsors/${item.id}`">
                    <img src="../../../public/eye.svg" alt="asfsa" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>

    <template v-if="metaValue === 'Students'">
      <div class="max-w-[1200px] mx-auto overflow-hidden overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-[#B1B1B8] text-center">
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">f.i.sh.</th>
              <th class="py-3 px-4">Talabalik turi</th>
              <th class="py-3 px-4">OTM</th>
              <th class="py-3 px-4">Ajratilingan summa</th>
              <th class="py-3 px-4">Kontrakt miqdori</th>
              <th class="py-3 px-4">Amallar</th>
            </tr>
          </thead>

          <tbody class="w-full">
            <tr v-if="loading">
              <td class="" rowspan="10" colspan="8">
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
                <div
                  class="h-[95.94px] mb-2 content-loading flex items-center justify-center flex-1"
                >
                  <div class="flex w-full py-2 px-2 my-2 gap-4">
                    <div class="w-[3%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[11%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[20%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[8%] py-4 bg-[#bebebe] rounded-md"></div>
                    <div class="w-[9%] py-4 bg-[#bebebe] rounded-md"></div>
                  </div>
                </div>
              </td>
            </tr>

            <template v-else>
              {{ console.log(data) }}
              <tr v-for="(item, index) in data?.results" :key="index">
                <td class="py-3 px-4 text-center">{{ index + 1 }}</td>
                <td class="py-3 px-4 text-left">{{ item.full_name }}</td>

                <td class="py-3 px-4 text-center">
                  {{ item.type === 1 ? 'Bakalavr' : 'Magistr' }}
                </td>

                <td class="py-3 px-4 text-center whitespace-normal flex w-[200px]">
                  {{ item.institute.name }}
                </td>
                <td class="py-3 px-4 text-center">{{ item.given }}</td>

                <td class="py-3 px-4 text-center">{{ item.contract }}</td>
                <td class="py-3 px-4 text-center">
                  {{ item.get_status_display }}
                </td>
                <td class="py-3 px-4 text-center flex items-center justify-center">
                  <router-link :to="`/sponsors/${item.id}`">
                    <img src="../../../public/eye.svg" alt="asfsa" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>

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
import {
  ref,
  watch,
} from 'vue';

import { useRoute } from 'vue-router';

import { useFetch } from '@/composables/useFetch/useFetch';
import { formatDate } from '@/utils/formatDate';

const route = useRoute()
const metaValue = ref('')
metaValue.value = route.meta.title

const { data, loading, setPage } = useFetch(
  metaValue.value === 'Students' ? 'student-list/' : 'sponsor-list/'
)

const currentPage = ref(1)

const getData = () => {
  setPage(currentPage.value)
}

watch(
  () => route.meta.title,
  (newValue) => {
    metaValue.value = newValue
    // Update the fetch URL when metaValue changes
    const fetchPath = newValue === 'students' ? 'student-list/' : 'sponsor-list/'
    setPage(currentPage.value, fetchPath)
  }
)

getData()
</script>
