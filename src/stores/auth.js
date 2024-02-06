import { ref } from 'vue'

import { defineStore } from 'pinia'
import router from '@/router'
import { useFetch } from '@/composables/useFetch'

const { post } = useFetch()

export const useAuthStore = defineStore('auth', () => {
  const access = ref(localStorage.getItem('access_token') || null)
  const refresh = ref(localStorage.getItem('refresh_token') || null)

  const setToken = (token) => {
    access.value = token.access
    refresh.value = token.refresh
    localStorage.setItem('access_token', token.access)
    localStorage.setItem('refresh_token', token.refresh)
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

  const logOut = () => {
    clearToken()

    router.push({ name: 'Auth' })
  }

  const login = async (credentials, loading) => {
    try {
      loading.value = true
      const data = await post('auth/login/', {
        username: credentials.username,
        password: credentials.password
      })

      if (data.access && data.refresh) {
        console.log(data)
        setToken(data)
        router.push({ name: 'Dashboard' })
      }

      if (data.detail) {
        console.log(data)
        error.value = data?.detail
      }
    } catch (error) {
      console.error('Login error', error.message)
    } finally {
      loading.value = false
    }
  }

  return { access, refresh, setToken, clearToken, isAuthenticated, logOut, login }
})
