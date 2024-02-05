import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get } = useFetch()

export const useDashboard = defineStore('dashboard', () => {
  const statisticsList = ref([])

  const getStatistics = async () => {
    try {
      const response = await get('dashboard/')
      statisticsList.value = response
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    statisticsList,
    getStatistics
  }
})
