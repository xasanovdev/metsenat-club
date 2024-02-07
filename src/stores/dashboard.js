import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const { get } = useFetch()

export const useDashboard = defineStore('dashboard', () => {
  const statisticsList = ref([])

  const toast = useToast()

  const getStatistics = async () => {
    if (statisticsList.value.length !== 0) {
      return
    }

    await get('dashboard/')
      .then((response) => {
        console.log(response)
        statisticsList.value = response
      })
      .catch((error) => {
        toast.error(`${error}`, {
          autoClose: 1000
        }),
          console.log(error)
      })
  }

  return {
    statisticsList,
    getStatistics
  }
})
