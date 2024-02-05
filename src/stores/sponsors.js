import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSponsors = defineStore('sponsors', () => {
  const sponsorsList = ref([])
  const sponsorsCurrentPage = ref(1)
  const paginationCountSponsors = ref(10)

  const fetchSponsorsList = () => {}

  return {
    sponsorsList,
    fetchSponsorsList,
    sponsorsCurrentPage,
    paginationCountSponsors
  }
})
