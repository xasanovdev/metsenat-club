<template>
  <CModal @childFunction="setChildFunction">
    <template #title>Ogohlantirish</template>
    <template #body>
      <p class="text-lg">Metsenat.uz platformasidan chiqib ketishga rozimisiz ?</p>
    </template>
    <template #footer>
      <CButton @click="logout" variant="danger"> Chiqib ketish </CButton>

      <CButton @click="childFunction" variant="primary"> Ortga qaytish </CButton>
    </template>
  </CModal>
</template>

<script setup>
import CButton from '@/components/CButton/CButton.vue'
import CModal from '@/components/CModal/CModal.vue'

import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'

import router from '@/router'

const { clearToken } = useAuthStore()

const logout = () => {
  clearToken()

  router.push({ name: 'Auth' })
}

const childFunction = ref(null)

const setChildFunction = (func) => {
  childFunction.value = func
}
</script>
