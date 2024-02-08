<template>
  <CModal @close="setClose">
    <template #title>Homiylarni tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="flex justify-between items-center text-lg font-bold">
          <div>F.I.SH</div>
          <div class="text-slate-400">{{ editSponsorData?.sponsor?.full_name }}</div>
        </div>
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              <p class="text-[12px] mt-7 text-neutral-800 mb-2 uppercase font-semibold">
                Ajratilingan summa
              </p>
              <CInput v-model="summa" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
        </div>
      </form>

      <p v-if="error" class="mt-2 bg-red-50 p-2 text-red-500 rounded-md">{{ error }}</p>
    </template>

    <template #footer>
      <CButton @click="deleteSponsor" class="px-8" variant="danger">
        <span class="flex items-center justify-center gap-[10px]">
          Homiyni o‘chirish
          <img src="/redTrash.svg" alt="red trash icon" />
        </span>
      </CButton>

      <CButton @click="saveSponsor" class="px-8" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Saqlash
          <img src="/save.svg" alt="save icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref, watch, reactive } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import CModal from '@/components/Base/CModal.vue'

import { useFetch } from '@/composables/useFetch'

import { useDataStore } from '@/stores'

import { useRoute } from 'vue-router'

const store = useDataStore()

const error = ref('')

const props = defineProps({
  studentSponsorData: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(['getStudentDetails'])

const editSponsorData = reactive({})

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

editSponsorData.value = props?.studentSponsorData

console.log(editSponsorData.value)

const summa = ref(props.studentSponsorData?.summa)

const { put, remove } = useFetch()

const route = useRoute()

const saveSponsor = async () => {
  try {
    const response = await put(`sponsor-summa-update/${props.studentSponsorData?.id}/`, {
      sponsor: props.studentSponsorData?.sponsor?.id,
      student: route.params.id,
      summa: summa.value
    })
    if (!Number(response.summa)) {
      error.value = response.summa
    } else {
      error.value = ''
      close.value()
      emit('getStudentDetails')
    }
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const deleteSponsor = async () => {
  try {
    const response = await remove(`sponsor-summa-delete/${props.studentSponsorData?.id}/`, {
      summa: props.studentSponsorData?.summa
    })

    console.log(response)
    close.value()
    emit('getStudentDetails')
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  watch(
    () => store.editSponsorData,
    (newData) => {
      editSponsorData.value = newData
    }
  )
})
</script>
