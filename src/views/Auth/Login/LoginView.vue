<template>
  <div class="min-h-screen max-w-[379px] w-full mx-auto flex items-center justify-center">
    <div class="flex w-full items-center flex-col gap-12">
      <RouterLink :to="{ name: 'Dashboard' }">
        <img src="/loginlogo.svg" alt="Login Logo Image" />
      </RouterLink>

      <div class="max-w-[379px] w-full p-8 bg-white rounded-xl">
        <h2 class="text-2xl font-semibold mb-4">Kirish</h2>
        <form @submit.prevent="handleLogin">
          <!-- Username group of input and label -->
          <div class="mb-4">
            <FormGroup
              labelTitle="Login"
              id="username"
              type="text"
              v-model="credentials.username"
            />

            <span v-if="$v.username.$error" class="text-red-500">Username is required.</span>
          </div>

          <!-- Password group of input and label -->
          <div class="mb-4">
            <FormGroup
              labelTitle="Parol"
              id="password"
              type="password"
              v-model="credentials.password"
            />

            <span v-if="$v.password.$error" class="text-red-500">Password is required.</span>
          </div>
          <CButton type="submit" :loading="loginLoading" variant="secondary"> Kirish </CButton>
          <p v-if="error" class="mt-2 bg-red-50 p-2 text-red-500 rounded-md">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

import FormGroup from '@/components/FormGroup/FormGroup.vue'
import CButton from '@/components/CButton/CButton.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const credentials = reactive({
  username: '',
  password: ''
})

const { post } = useFetch()

const error = ref('')

const loginLoading = ref(false)

const authStore = useAuthStore()

const rules = {
  username: { required },
  password: { required }
}

const $v = useVuelidate(rules, credentials)

console.log($v.value)

const handleLogin = async () => {
  // working vuelidate for validate
  const result = await $v.value.$validate()
  console.log(result)

  if (!result) {
    return $v
  }

  try {
    loginLoading.value = true
    const data = await post('auth/login/', {
      username: credentials.username,
      password: credentials.password
    })

    authStore.setToken(data)
    error.value = data?.detail

    console.log(error.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Login error', error.message)
  } finally {
    loginLoading.value = false
  }
}
</script>
