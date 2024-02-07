import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get, post } = useFetch()

export const useDataStore = defineStore('data', () => {
  const instituteList = ref([])
  const searchResults = ref([])

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

  const getSearchResults = async (text) => {
    try {
      const response = await post('search/', text)
      searchResults.value = response
      console.log(searchResults.value)
    } catch (error) {
      console.error(error)
    }
  }

  return { instituteList, fetchInstituteList, getSearchResults, searchResults }
})
