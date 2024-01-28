// auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const state = {
    access: localStorage.getItem('access_token') || null,
    refresh: localStorage.getItem('refresh_token') || null
  }

  const actions = {
    setToken(token) {
      state.access = token.access
      state.refresh = token.refresh
    },

    clearToken() {
      state.access = null
      state.refresh = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    isAuthenticated() {
      return Boolean(state.access && state.refresh)
    }
  }

  return { ...state, ...actions }
})
