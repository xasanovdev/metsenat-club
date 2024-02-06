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

          <FormGroup
            class="mb-4"
            labelTitle="Login"
            id="username"
            type="text"
            placeholder="Ismingizni kiriting..."
            :validation="$v.username.$error"
            validationText="Username"
            v-model="credentials.username"
          />

          <!-- Password group of input and label -->
          <FormGroup
            class="mb-4"
            labelTitle="Parol"
            id="password"
            type="password"
            placeholder="Parolingizni kiriting..."
            validationText="Password"
            :validation="$v.password.$error"
            v-model="credentials.password"
          />

          <CButton type="submit" :loading="loading" variant="secondary"> Kirish </CButton>
          <!-- Todo: refactor. create component for this action and use inside formgroup or input -->
          <Validation
            class="mt-2 bg-red-50 p-2 rounded-md"
            :validation="error"
            :validationText="error"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { useAuthStore } from '@/stores/auth'

import FormGroup from '@/components/Base/FormGroup.vue'
import CButton from '@/components/Base/CButton.vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import Validation from '@/components/Base/Validation.vue'

const error = ref(false)

const loading = ref(false)

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

const handleLogin = async () => {
  const result = await $v.value.$validate()
  console.log(result)

  if (!result) {
    return $v
  }

  await auth.login(credentials, loading)
}
</script>
