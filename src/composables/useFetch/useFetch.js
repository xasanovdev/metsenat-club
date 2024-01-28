// useFetch.js
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

const BASE_URL = 'https://metsenatclub.xn--h28h.uz/api/v1/'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)

  const fetchData = async () => {
    try {
      loading.value = true

      const response = await fetch(
        `${BASE_URL}${url}?page=${currentPage.value}&pageSize=${pageSize.value}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      data.value = result
    } catch (err) {
      error.value = err.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  onMounted(() => {
    fetchData()
  })

  onUnmounted(() => {
    // Clean up, if needed
  })

  const setPage = (page) => {
    currentPage.value = page
    fetchData()
  }

  const setPageSize = (size) => {
    pageSize.value = size
    fetchData()
  }

  return {
    data,
    error,
    loading,
    setPage,
    setPageSize
  }
}
