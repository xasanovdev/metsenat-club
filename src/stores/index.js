import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const { get, post } = useFetch()

export const useDataStore = defineStore('data', () => {
  const instituteList = ref([])
  const searchResults = ref([])

  const toast = useToast()

  const fetchInstituteList = async () => {
    if (instituteList.value.length > 0) return

    try {
      await get('institute-list/').then((response) => {
        instituteList.value = response
      })
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  const getSearchResults = async (text) => {
    try {
      const response = await post('search/', text)
      searchResults.value = response
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  return { instituteList, fetchInstituteList, getSearchResults, searchResults }
})
