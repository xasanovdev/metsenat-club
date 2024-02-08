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
              <CInput
                v-model="editSponsorData.summa"
                placeholder="Abdullayev Abdulla Abdulla o’g’li"
              />
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
import { ref, computed } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import CModal from '@/components/Base/CModal.vue'

import { useStudents } from '@/stores/students'

import { useRoute } from 'vue-router'

const students = useStudents()

const error = computed(() => students.updateSponsorError)

const props = defineProps({
  studentSponsorData: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(['getStudentDetails'])

const editSponsorData = computed(() => props?.studentSponsorData)

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

const route = useRoute()

const saveSponsor = async () => {
  await students.updateStudentSponsor({
    id: editSponsorData.value?.id,
    sponsor: editSponsorData.value?.sponsor?.id,
    student: route.params.id,
    summa: editSponsorData.value.summa
  })
  if (students.updateSponsorError.length === 0) {
    close.value()
    emit('getStudentDetails')
  }
}

const deleteSponsor = async () => {
  await students.deleteSponsor(editSponsorData.value?.id)

  close.value()
  emit('getStudentDetails')
}
</script>
