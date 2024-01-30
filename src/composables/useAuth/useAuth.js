// useAuth.js
import { useAuthStore } from '@/stores/auth';

const API_BASE_URL = 'https://metsenatclub.xn--h28h.uz/api/v1'

export function useAuth() {
  const authStore = useAuthStore()

  async function login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()

      // Save tokens to localStorage
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      // Save tokens to store
      authStore.setToken(data)

      return data
    } catch (error) {
      console.error('Login failed:', error.message)
      throw error
    }
  }

  function logout() {
    // Clear tokens from store
    authStore.clearToken()
  }

  return {
    login,
    logout,
    isAuthenticated: authStore.isAuthenticated
  }
}
