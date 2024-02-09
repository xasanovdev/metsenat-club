<template>
  <CModal @closeModal="emit('closeModal')">
    <template #title>Ogohlantirish</template>
    <template #body>
      <p class="text-lg">Metsenat.uz platformasidan chiqib ketishga rozimisiz ?</p>
    </template>
    <template #footer>
      <CButton @click="handleLogOut" variant="danger"> Chiqib ketish </CButton>

      <CButton @click="emit('closeModal')" variant="primary"> Ortga qaytish </CButton>
    </template>
  </CModal>
</template>

<script setup>
import CButton from '@/components/Base/CButton.vue'
import CModal from '@/components/Base/CModal.vue'
import router from '@/router'

const emit = defineEmits(['closeModal'])

import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'

const { logOut } = useAuthStore()

const handleLogOut = () => {
  logOut()

  router.push({ name: 'Auth' })
}

const close = ref(null)

const setClose = (func) => {
  close.value = func
}
</script>
