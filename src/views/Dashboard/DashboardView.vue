<template>
  <div class="w-full pb-20">
    <div class="container mx-auto mt-12 px-6">
      <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <MoneyCard
          v-for="(item, index) in cardStatistics"
          :key="index"
          :title="item.title"
          :amount="item.amount"
          :img="item.img"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useDashboard } from '@/stores/dashboard'

import MoneyCard from '@/components/Common/MoneyCard.vue'

const statistics = useDashboard()

const statisticsData = ref([])

const cardStatistics = computed(() => [
  {
    title: 'Jami to‘langan summa',
    amount: statisticsData.value?.total_paid,
    img: '/moneyBlue.svg'
  },
  {
    title: 'Jami so‘ralgan summa',
    amount: statisticsData.value?.total_need,
    img: '/moneyYellow.svg'
  },
  {
    title: 'Jami to‘langan summa',
    amount: statisticsData.value?.total_must_pay,
    img: '/moneyOrange.svg'
  }
])

onMounted(async () => {
  await statistics.getStatistics()
  console.log(statistics.statisticsList)
  statisticsData.value = statistics?.statisticsList
})
</script>
