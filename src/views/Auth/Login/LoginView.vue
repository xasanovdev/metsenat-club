<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuth } from '@/composables/useAuth/useAuth'
import router from '@/router'

const { login } = useAuth()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // Perform login and wait for it to complete
    const data = await login(username.value, password.value)

    // Redirect to the dashboard upon successful login
    // You can also update the UI or perform other actions here
    if (data) {
      // Redirect to the dashboard route
      // Use the appropriate route name or path
      router.push({ name: 'Dashboard' })

      // Alternatively, you can update the UI or perform other actions here
    }
  } catch (error) {
    console.error('Login error', error.message)
    // Handle login error, e.g., display an error message to the user
  }
}
</script>
