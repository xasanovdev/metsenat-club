import { reactive, ref } from 'vue'

import { defineStore } from 'pinia'

import { useToast } from 'vue-toastification'

import { useFetch } from '@/composables/useFetch'

const { get } = useFetch()

export const useSponsors = defineStore('sponsors', () => {
  const toast = useToast()

  const sponsors = reactive({
    list: [],
    currentPage: 1,
    count: 10,
    dataCount: 0,
    details: {}
  })

  let loading = ref(false)

  const getSponsorsList = async (page, page_size, force) => {
    if (sponsors.list.length === 0 || force) {
      loading.value = true

      return await get('sponsor-list/', { page: page, page_size: page_size })
        .then((res) => {
          sponsors.list = []
          sponsors.dataCount = res.count
          sponsors.list = res.results
          sponsors.currentPage = page
          sponsors.count = page_size
          loading.value = false
        })
        .catch((error) => {
          loading.value = false
          console.error(error)
          toast.error(`${error}`, {
            autoClose: 1000
          })
        })
    }
  }

  const getSponsorDetails = async (id) => {
    return await get(`sponsor-detail/${id}`)
      .then((response) => {
        sponsors.details = response
      })
      .catch((error) => {
        console.error(error)
        toast.error(`${error}`, {
          autoClose: 1000
        })
      })
  }

  return {
    sponsors,
    loading,
    getSponsorDetails,
    getSponsorsList
  }
})
