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
    sponsorsCount: 0
  })

  const getSponsorsList = async (page, page_size, force) => {
    if (sponsors.list.length === 0 || force) {
      try {
        await get('sponsor-list/', { page: page, page_size: page_size }).then((res) => {
          sponsors.list = []
          sponsors.sponsorsCount = res.count
          sponsors.list = res.results
          sponsors.currentPage = page
          sponsors.count = page_size

          router.push({ path: `?page=`, query: { page: page, page_size: page_size } })
        })
      } catch (error) {
        // Todo: useToast
        console.log(error)
      }
    }
  }

  return {
    sponsors,
    getSponsorsList
  }
})
