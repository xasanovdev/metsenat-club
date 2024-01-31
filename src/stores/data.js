// store.js
import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'

const { get } = useFetch()

export const useDataStore = defineStore('data', {
  state: () => ({
    metaValue: '',
    sponsorsList: [],
    sponsorsCurrentPage: 1,
    studentsList: [],
    studentsCurrentPage: 1,
    instituteList: [], // Variable to store the fetched data
    editSponsorData: {}
  }),

  actions: {
    async fetchInstituteList() {
      try {
        const response = await get('institute-list/')
        this.instituteList = response
      } catch (error) {
        console.error('Error fetching data:', error)
        // You can choose to handle the error here or propagate it to the calling component
        throw error
      }
    },

    // Call this method to fetch and store data when needed
    async fetchData() {
      await this.fetchInstituteList()
      // You can call other actions or perform additional logic here
    }
  },

  // Lifecycle method, similar to onMounted
  onMounted() {
    // Call the fetch method when the store is mounted
    this.fetchData()
  },

  // Watch for changes to instituteList
  onInvalidate() {
    this.$watch(
      () => this.instituteList,
      (newInstituteList) => {
        // Do something with the updated instituteList
        console.log('instituteList changed:', newInstituteList)
      }
    )
  }
})
