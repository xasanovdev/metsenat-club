<template>
  <div class="py-6 w-full flex items-center bg-[#FCFCFC] justify-center">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <router-link class="flex-1 inline-block" to="/dashboard">
          <CTabButton path="/dashboard" buttonText="Dashboard" />
        </router-link>
        <router-link class="flex-1 inline-block" to="/sponsors">
          <CTabButton path="/sponsors" buttonText="Homiylar" />
        </router-link>
        <router-link class="flex-1 inline-block" to="/students">
          <CTabButton path="/students" buttonText="Talabalar" />
        </router-link>
      </div>
      <div class="flex w-full items-center justify-end gap-4 md:gap-5">
        <CInput v-model="search" placeholder="Qidirish" class="md:max-w-[284px] py-[15px] w-full" />

        <router-link class="inline-block" to="/sponsors/filter">
          <CTabButton path="/sponsors/filter" class="flex-1 px-8 w-full" buttonText="Filter">
            <img class="/sponsors/filter" src="/filter.svg" alt="filter icon" />
          </CTabButton>
        </router-link>
      </div>
    </div>
  </div>

  <div class="w-full pb-20">
    <div class="container mx-auto mt-12 px-6">
      <div class="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- total summ of contracts -->
        <div class="flex-1 p-6 flex items-center gap-4 bg-white rounded-lg">
          <img src="/moneyBlue.svg" alt="total summ of contracts icon" />
          <div class="flex items-start flex-col gap-[6px]">
            <p class="text-[12px] text-[#7A7A9D]">Jami to‘langan summa</p>
            <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
              <span class="text-[#2E384D]">{{ data?.total_paid }}</span>
              <span class="text-[#B2B7C1]">UZS</span>
            </p>
          </div>
        </div>
        <!-- Total summ of requested  -->
        <div class="flex-1 p-6 flex items-center gap-4 bg-white rounded-lg">
          <img src="/moneyYellow.svg" alt="total of requested summ icon" />
          <div class="flex items-start flex-col gap-[6px]">
            <p class="text-[12px] text-[#7A7A9D]">Jami so‘ralgan summa</p>
            <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
              <span class="text-[#2E384D]">{{ formatNumber(data?.total_need) }}</span>
              <span class="text-[#B2B7C1]">UZS</span>
            </p>
          </div>
        </div>
        <!-- Total summ of payed  -->
        <div
          class="flex-1 p-6 flex lg:col-span-1 md:col-span-2 col-span-1 items-center gap-4 bg-white rounded-lg"
        >
          <img src="/moneyOrange.svg" alt="total of payed summ icon" />
          <div class="flex items-start flex-col gap-[6px]">
            <p class="text-[12px] text-[#7A7A9D]">Jami to‘langan summa</p>
            <p class="flex text-[20px] whitespace-nowrap font-bold items-center gap-[6px]">
              <span class="text-[#2E384D]">{{ data?.total_must_pay }}</span>
              <span class="text-[#B2B7C1]">UZS</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import CInput from '@/components/CInput/CInput.vue';
import CTabButton from '@/components/CTabButton/CTabButton.vue';
import { useFetch } from '@/composables/useFetch';
import { formatNumber } from '@/utils/formatNumber';

const search = ref('')
const data = ref(null)

const { get } = useFetch()

const fetchData = async () => {
  try {
    const res = await get('dashboard/')
    data.value = res
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
