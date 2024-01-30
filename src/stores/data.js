// store.js
import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    metaValue: '',
    sponsorsList: [],
    sponsorsCurrentPage: 1,
    studentsList: [],
    studentsCurrentPage: 1,
    instituteList: []
  }),

  actions: {}
})
