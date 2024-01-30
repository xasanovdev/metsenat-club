// store.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    metaValue: '',
    sponsorsList: [],
    studentsList: [],
  }),

  actions: {
    // async fetchData(page, metaValue) {
    //   try {
    //     this.loading = true // Set loading to true before making the request
    //     const fetch = useFetch()
    //     const response = await fetch.get(`${metaValue}`, { page: page, pageSize: this.pageSize })

    //     console.log(response)
    //     this.data = response
    //     this.currentPage = page
    //     this.totalPages = Math.ceil(this.data.count / this.pageSize)
    //     this.metaValue = metaValue
    //     window.history.pushState({}, null, `/${metaValue.toLowerCase()}?page=${page}`)
    //   } catch (error) {
    //     console.error('Error fetching data:', error)
    //   } finally {
    //     setTimeout(() => {
    //       this.loading = false
    //     }, 1000)
    //   }
    // }
  }
})
// metaValue === 'Students' ? 'student-list/' : 'sponsor-list/'
