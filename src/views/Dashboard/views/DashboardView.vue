<template>
  <div class="py-6 w-full flex items-center bg-[#FCFCFC] justify-center">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <RouterLink class="flex-1 inline-block" :to="{ name: 'Dashboard' }">
          <CTabButton path="/dashboard" buttonText="Dashboard" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Sponsors',
            query: { page: store.sponsorsCurrentPage, page_size: store.paginationCountSponsors }
          }"
        >
          <CTabButton path="/sponsors" buttonText="Homiylar" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Students',
            query: { page: store.studentsCurrentPage, page_size: store.paginationCountStudents }
          }"
        >
          <CTabButton path="/students" buttonText="Talabalar" />
        </RouterLink>
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

      <div class="w-full overflow-x-auto mt-6">
        <img class="w-full" src="/statistics.svg" alt="" />
      </div>
    </div>
  </div>

  <p
    v-if="access_token"
    :class="[toast === true ? '' : 'hidden']"
    class="absolute font-bold text-lg text-green-500 bg-amber-50 py-4 px-6 shadow-xl border-b-2 border-green-500 right-6 bottom-6"
  >
    You are succesfully logged in.
  </p>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CTabButton from '@/components/CTabButton/CTabButton.vue'
import { useFetch } from '@/composables/useFetch'
import { useDataStore } from '@/stores/data'
import { formatNumber } from '@/utils/formatNumber'

const data = ref([])

// Check if toast has been shown before
const hasShownToast = localStorage?.getItem('hasShownToast')
const toast = ref(!hasShownToast) // Initialize toast based on whether it has been shown before

const store = useDataStore()

const access_token = localStorage?.getItem('access_token')

// Set the flag in localStorage after a delay
setTimeout(() => {
  toast.value = false
  localStorage.setItem('hasShownToast', 'true')
}, 1000)

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
  if (data?.value?.length === 0) {
    fetchData()
  }
})
</script>
