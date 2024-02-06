<template>
  <CHeader />

  <div class="w-full pb-20">
    <div class="container mx-auto mt-12 px-6">
      <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <!-- Todo: create component! -->
        <!-- total summ of contracts -->

        <MoneyCard
          title="Jami to‘langan summa"
          :money="statistics.statisticsList?.total_paid"
          link="/moneyBlue.svg"
        />

        <!-- Total summ of requested  -->

        <MoneyCard
          title="Jami so‘ralgan summa"
          :money="statistics.statisticsList?.total_need"
          link="/moneyYellow.svg"
        />

        <!-- Total summ of payed  -->
        <MoneyCard
          title="Jami to‘langan summa"
          :money="statistics.statisticsList?.total_must_pay"
          link="/moneyOrange.svg"
        />
      </div>

      <!-- Todo: USE CHART -->
      <div class="w-full overflow-x-auto mt-6">
        <img class="w-full" src="/statistics.svg" alt="" />
      </div>
    </div>
  </div>

  <!-- Todo: use vue-toastification -->

  <!-- <p
    v-if="access_token"
    :class="[toast === true ? '' : 'hidden']"
    class="absolute font-bold text-lg text-green-500 bg-amber-50 py-4 px-6 shadow-xl border-b-2 border-green-500 right-6 bottom-6"
  >
    You are succesfully logged in.
  </p> -->
</template>

<script setup>
import { onMounted } from 'vue'

import CTabButton from '@/components/Base/CTabButton.vue'
import { useDataStore } from '@/stores'
import { useDashboard } from '@/stores/dashboard'

import CHeader from '@/components/Base/CHeader.vue'

import MoneyCard from '@/components/Common/MoneyCard.vue'

const store = useDataStore()

const statistics = useDashboard()

onMounted(() => {
  if (statistics?.statisticsList?.length === 0) {
    statistics.getStatistics()
  }
})
</script>
@/stores
