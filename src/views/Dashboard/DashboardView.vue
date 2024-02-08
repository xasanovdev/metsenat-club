<template>
  <div class="w-full pb-20">
    <div class="container mx-auto mt-12 px-6">
      <div class="flex flex-col gap-7">
        <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <MoneyCard
            v-for="(item, index) in cardStatistics"
            :key="index"
            :title="item.title"
            :amount="item.amount"
            :img="item.img"
            :bgColor="item.bgColor"
            :class="`${index === cardStatistics.length - 1 ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-1'}`"
          />
        </div>
      </div>
      <Chart />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useDashboard } from '@/stores/dashboard'

import MoneyCard from '@/components/Common/MoneyCard.vue'
import Chart from '@/components/Chart.vue'

const statistics = useDashboard()

const statisticsData = ref([])

const cardStatistics = computed(() => [
  {
    title: 'Jami to‘langan summa',
    amount: statisticsData.value?.total_paid,
    img: '/moneyBlue.svg',
    bgColor: 'bg-[#4C6FFF1A]'
  },
  {
    title: 'Jami so‘ralgan summa',
    amount: statisticsData.value?.total_need,
    img: '/moneyYellow.svg',
    bgColor: 'bg-[#EDC7001A]'
  },
  {
    title: 'Jami to‘langan summa',
    amount: statisticsData.value?.total_must_pay,
    img: '/moneyOrange.svg',
    bgColor: 'bg-[#ED72001A]'
  }
])

onMounted(async () => {
  await statistics.getStatistics()

  statisticsData.value = statistics?.statisticsList
})
</script>
