import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get } = useFetch()

export const useSponsors = defineStore('sponsors', () => {
  let sponsorsList = ref([])
  let sponsorsCurrentPage = ref(1)
  let paginationCountSponsors = ref(10)

  const getSponsorsList = async (page, page_size, force) => {
    if (sponsorsList.value.length === 0 || sponsorsCurrentPage.value !== page || force) {
      try {
        sponsorsCurrentPage.value = page
        paginationCountSponsors.value = page_size

        sponsorsList.value = []
        const response = await get('sponsor-list/', { page: page, page_size: page_size })

        sponsorsList.value = response

        router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    sponsorsList,
    getSponsorsList,
    sponsorsCurrentPage,
    paginationCountSponsors
  }
})
