import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get } = useFetch()

export const useDataStore = defineStore('data', () => {
  const instituteList = ref([])

  const fetchInstituteList = async () => {
    if (instituteList.value.length > 0) return

    try {
      await get('institute-list/').then((response) => {
        instituteList.value = response
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { instituteList, fetchInstituteList }
})
