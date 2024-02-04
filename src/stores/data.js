import { defineStore } from 'pinia';

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
