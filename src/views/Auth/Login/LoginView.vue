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
            <label for="username" class="block mb-2 text-sm uppercase font-medium text-gray-600">lOGIN:</label>
            <CInput v-model="username" type="text" id="username" name="username" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2 text-sm uppercase font-medium text-gray-600">pAROL:</label>
            <CInput v-model="password" type="password" id="password" name="password" required />
          </div>
          <CButton
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
          Kirish
          </CButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CInput from '@/components/CInput/CInput.vue';
import { useAuth } from '@/composables/useAuth/useAuth';
import router from '@/router';

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
