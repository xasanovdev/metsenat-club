// store.js
import { useFetch } from '@/composables/useFetch'
import { defineStore } from 'pinia'

const { get } = useFetch()

export const useDataStore = defineStore('data', {
  state: () => ({
    sponsorsList: [],
    sponsorsCurrentPage: 1,
    paginationCountSponsors: 10,

    studentsList: [],
    studentsCurrentPage: 1,
    paginationCountStudents: 10,

    instituteList: [],

    editSponsorData: {},

    updateSponsorData: {}
  }),

  actions: {}
})
