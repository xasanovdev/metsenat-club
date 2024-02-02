<template>
  <div class="min-h-screen max-w-[379px] w-full mx-auto flex items-center justify-center">
    <div class="flex w-full items-center flex-col gap-12">
      <div>
        <img src="/loginlogo.svg" alt="Login Logo Image" />
      </div>
      <div class="max-w-[379px] w-full p-8 bg-white rounded-xl">
        <h2 class="text-2xl font-semibold mb-4">Kirish</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block mb-2 text-sm uppercase font-medium text-gray-600"
              >Login:</label
            >
            <CInput v-model="username" type="text" id="username" name="username" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2 text-sm uppercase font-medium text-gray-600"
              >parol:</label
            >
            <CInput v-model="password" type="password" id="password" name="password" required />
          </div>
          <CButton
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Kirish
          </CButton>

          <p class="mt-2 bg-red-50 p-2 rounded-md">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CButton from '@/components/CButton/CButton.vue'
import CInput from '@/components/CInput/CInput.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')

const authStore = useAuthStore()

console.log(authStore)

const { post } = useFetch()

const handleLogin = async () => {
  try {
    const data = await post('auth/login/', { username: username.value, password: password.value })

    authStore.setToken(data)
    error.value = data.detail

    console.log(error.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Login error', error.message)
  }
}
</script>
