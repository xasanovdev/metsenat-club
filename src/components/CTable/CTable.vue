<template>
  <div class="w-full">
    <template v-if="route.meta.title === 'Sponsors'">
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
            <tr v-if="store.loading">
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
              <tr
                class="bg-white p-4 rounded-lg border-separate"
                v-for="(item, index) in store.data?.results"
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
                  <router-link :to="`/sponsors/${item.id}`">
                    <img src="/eye.svg" alt="eye icon" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>

    <template v-if="route.meta.title === 'Students'">
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
            <tr v-if="store.loading">
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
              <tr class="bg-white" v-for="(item, index) in store.data?.results" :key="index">
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
                  <router-link :to="`/students/${item.id}`">
                    <img src="/eye.svg" alt="eye icon" />
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
        {{ store.data?.count }} tadan {{ (store.currentPage - 1) * 10 }}-{{
          store.currentPage * 10
        }}
        ko'rsatilmoqda
      </div>
      <div class="flex items-center gap-4">
        <button
          class="p-2 rounded-md border-2 duration-200"
          :class="{
            'border-[#E0E7FF]': store.currentPage === 1,
            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.currentPage !== 1
          }"
          @click="prevPage"
          :disabled="store.currentPage === 1"
        >
          <img class="rotate-180" src="/arrow.svg" alt="arrow icon" />
        </button>
        <span>{{ store.currentPage }}</span>
        <button
          :class="{
            'border-[#E0E7FF]': store.currentPage === Math.ceil(store.data?.count / 10),

            'border-blue-300 hover:bg-blue-100 bg-blue-50 hover:border-blue-300':
              store.currentPage !== Math.ceil(store.data?.count / 10)
          }"
          class="p-2 rounded-md border-2 duration-200"
          @click="nextPage"
          :disabled="store.currentPage === Math.ceil(store.data?.count / 10)"
        >
          <img src="/arrow.svg" alt="arrow icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import { useRoute } from 'vue-router';

import CBadge from '@/components/CBadge/CBadge.vue';
import { useDataStore } from '@/stores/data';
import { formatDate } from '@/utils/formatDate';

const route = useRoute()

const store = useDataStore()

const nextPage = () => {
  store.fetchData(++store.currentPage, route.meta.title)
}

const prevPage = () => {
  store.fetchData(--store.currentPage, route.meta.title)
}

onMounted(() => {
  store.fetchData(store.currentPage, route.meta.title)
})
</script>
