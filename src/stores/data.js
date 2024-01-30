// store.js
import { defineStore } from 'pinia';

import { useFetch } from '@/composables/useFetch/useFetch';

export const useDataStore = defineStore('data', {
  state: () => ({
    metaValue: '',
    data: null,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10, // Number of items per page
    loading: false
  }),

  actions: {
    async fetchData(page, metaValue) {
      try {
        this.loading = true // Set loading to true before making the request
        const fetch = useFetch()
        const response = await fetch.get(
          `${metaValue === 'Students' ? 'student-list/' : 'sponsor-list/'}`,
          { page: page, pageSize: this.pageSize }
        )

        console.log(response)
        this.data = response
        this.currentPage = page
        this.totalPages = Math.ceil(this.data.count / this.pageSize)
        this.metaValue = metaValue
        window.history.pushState({}, null, `/${metaValue.toLowerCase()}?page=${page}`)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    }
  }
})
