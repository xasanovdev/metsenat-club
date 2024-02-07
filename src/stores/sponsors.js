import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const { get } = useFetch()

export const useSponsors = defineStore('sponsors', () => {
  const sponsors = reactive({
    list: [],
    currentPage: 1,
    count: 10,
    sponsorsCount: 0,
    details: {}
  })

  let loading = ref(false)

  const getSponsorsList = async (page, page_size, force) => {
    if (sponsors.list.length === 0 || force) {
      try {
        loading.value = true

        await get('sponsor-list/', { page: page, page_size: page_size }).then((res) => {
          sponsors.list = []
          sponsors.sponsorsCount = res.count
          sponsors.list = res.results
          sponsors.currentPage = page
          sponsors.count = page_size
        })
        loading.value = false
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getSponsorDetails = async (id) => {
    try {
      await get(`sponsor-detail/${id}`).then((response) => (sponsors.details = response))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {
    sponsors,
    loading,
    getSponsorDetails,
    getSponsorsList
  }
})
