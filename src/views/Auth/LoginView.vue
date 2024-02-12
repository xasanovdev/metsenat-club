<template>
  <div class="min-h-screen max-w-[379px] w-full mx-auto flex items-center justify-center">
    <div class="flex w-full items-center flex-col gap-12">
      <RouterLink :to="{ name: 'Dashboard' }">
        <img src="/loginlogo.svg" alt="Login Logo Image" />
      </RouterLink>

      <div class="max-w-[379px] w-full p-8 bg-white rounded-xl">
        <h2 class="text-2xl font-semibold mb-4">Kirish</h2>
        <form @submit.prevent="handleLogin">
          <FormGroup
            class="mb-4"
            label="Login"
            id="username"
            type="text"
            placeholder="Ismingizni kiriting..."
            :validation="$v.username.$error"
            validationText="Ism va Familyangizni"
            v-model="credentials.username"
          />

          <FormGroup
            class="mb-4"
            label="Parol"
            id="password"
            type="password"
            placeholder="Parolingizni kiriting..."
            validationText="Parolingizni"
            :validation="$v.password.$error"
            v-model="credentials.password"
          />

          <vue-recaptcha
            class="w-full pb-4"
            sitekey="6LfieGspAAAAAC7M5zSmR9Q3qMdgU0j1EDY5xUIS"
            size="normal"
            theme="light"
            hl="uz"
            @verify="recaptchaVerified"
            @expire="recaptchaExpired"
            @fail="recaptchaFailed"
            ref="vueRecaptcha"
          >
          </vue-recaptcha>

          <CButton type="submit" :loading="auth.loading" variant="secondary"> Kirish </CButton>

          <Validation
            class="mt-2 bg-red-50 p-2 rounded-md"
            :validation="auth.error"
            :validationText="auth.error"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import Validation from '@/components/Base/Validation.vue'

import VueRecaptcha from 'vue3-recaptcha2'

import { useAuthStore } from '@/stores/auth'

import FormGroup from '@/components/Base/FormGroup.vue'
import CButton from '@/components/Base/CButton.vue'

import router from '@/router'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()

const credentials = reactive({
  username: '',
  password: ''
})

const rules = {
  username: { required, minLength: minLength(6), maxLength: maxLength(50) },
  password: { required, minLength: minLength(6), maxLength: maxLength(24) }
}

const $v = useVuelidate(rules, credentials)

const toast = useToast()

const handleLogin = async () => {
  const result = await $v.value.$validate()

  if (!result) {
    return $v
  }
  if (localStorage.getItem('_grecaptcha')) {
    await auth.login(credentials)

    router.push({ name: 'Statistics' })
  } else {
    toast.error('Recaptcha muvaffaqiyatsiz boldi', 1000)
  }
}

// Event handlers for reCAPTCHA
const recaptchaVerified = (response) => {
  console.log('reCAPTCHA verification successful:', response)
}

const recaptchaExpired = () => {
  console.log('reCAPTCHA verification expired')
}

const recaptchaFailed = () => {
  console.log('reCAPTCHA verification failed')
}
</script>
