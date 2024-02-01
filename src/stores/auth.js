import { ref } from 'vue';

// auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const access = ref(localStorage.getItem('access_token') || null)
  const refresh = ref(localStorage.getItem('refresh_token') || null)

  const setToken = (token) => {
    access.value = token.access
    refresh.value = token.refresh
  }

  const clearToken = () => {
    access.value = null
    refresh.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('hasShownToast')
    localStorage.removeItem('refresh_token')
  }

  const isAuthenticated = () => {
    return Boolean(access.value && refresh.value)
  }

  return { access, refresh, setToken, clearToken, isAuthenticated }
})
