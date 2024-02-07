import { ref } from 'vue'

import { defineStore } from 'pinia'

import { useFetch } from '@/composables/useFetch'

import 'vue3-toastify/dist/index.css'
import { useToast } from 'vue-toastification'

const { post } = useFetch()

export const useAuthStore = defineStore('auth', () => {
  const access = ref(localStorage.getItem('access_token') || null)
  const refresh = ref(localStorage.getItem('refresh_token') || null)

  const toast = useToast()

  const error = ref(false)

  const loading = ref(false)

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

    toast.success('You are succesfully logged out.', {
      autoClose: 1000
    })
  }

  const login = async (credentials) => {
    loading.value = true

    await post('auth/login/', {
      username: credentials.username,
      password: credentials.password
    })
      .then((data) => {
        if (data.access && data.refresh) {
          setToken(data)

          toast.success('You are succesfully logged in.', {
            autoClose: 1000
          })
        }

        if (data.detail) {
          error.value = data?.detail

          toast.error(`${error.value}`, {
            autoClose: 1000
          })
        }
      })
      .catch((error) => {
        toast.error(`${error}`, {
          autoClose: 1000
        })
      })
      .finally(() => (loading.value = false))
  }

  return { access, refresh, setToken, clearToken, error, loading, isAuthenticated, logOut, login }
})
