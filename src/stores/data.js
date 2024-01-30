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
    loading: false,
  }),

  actions: {
    async fetchData(page, metaValue) {
      console.log(page, metaValue);
      try {
        this.loading = true; // Set loading to true before making the request
        const fetch = useFetch();
        const response = await fetch.get(
          `${metaValue === 'Students' ? 'student-list/' : 'sponsor-list/'}`,
          { page: page, pageSize: this.pageSize }
        );
        console.log(response);
        this.data = response;
        this.currentPage = page;
        this.totalPages = Math.ceil(this.data.count / this.pageSize);
        this.metaValue = metaValue;
        window.history.pushState(
          {},
          null,
          `/${metaValue.toLowerCase()}?page=${page}`
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false; // Set loading to false after the request completes (success or error)
      }
    },
  },

  // Add watches for store state changes
  watches: {
    metaValue(newValue, oldValue) {
      console.log(`metaValue changed from ${oldValue} to ${newValue}`);
    },

    data(newValue, oldValue) {
      console.log('Data changed:', newValue);
    },

    currentPage(newValue, oldValue) {
      console.log(`currentPage changed from ${oldValue} to ${newValue}`);
    },

    totalPages(newValue, oldValue) {
      console.log(`totalPages changed from ${oldValue} to ${newValue}`);
    },

    pageSize(newValue, oldValue) {
      console.log(`pageSize changed from ${oldValue} to ${newValue}`);
    },

    loading(newValue, oldValue) {
      console.log(`loading changed from ${oldValue} to ${newValue}`);
    },
  },
});
