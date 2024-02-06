import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get } = useFetch()

export const useDataStore = defineStore('data', () => {
  const instituteList = ref([])

  const fetchInstituteList = async () => {
    try {
      const response = await get(`institute-list/`)
      instituteList.value = response
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { instituteList, fetchInstituteList }
})
