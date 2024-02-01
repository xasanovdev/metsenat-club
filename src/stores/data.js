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
    editSponsorData: {},
    updateSponsorData: {}
  }),

  actions: {}
})
