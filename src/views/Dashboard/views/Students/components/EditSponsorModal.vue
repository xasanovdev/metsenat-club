<template>
  <CModal>
    <template #title>Homiylarni tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="flex justify-between items-center text-lg font-bold">
          <div>F.I.SH</div>
          <div class="text-slate-400">{{ editSponsorData.sponsor.full_name }}</div>
        </div>
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              <p class="text-[12px] mt-7 text-[#1D1D1F] mb-2 uppercase font-semibold">
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
    </template>

    <template #footer>
      <CButton @click="deleteSponsor" text="Homiyni o‘chirish" class="px-8" variant="danger">
        <img src="/redTrash.svg" alt="" />
      </CButton>

      <CButton @click="saveSponsor" text="Saqlash" class="px-8" variant="secondary">
        <img src="/save.svg" alt="" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import CModal from '@/components/CModal/CModal.vue'
import CInput from '@/components/CInput/CInput.vue'
import { useDataStore } from '@/stores/data'
import { onMounted, ref, watch } from 'vue'
import CButton from '@/components/CButton/CButton.vue'
import { useFetch } from '@/composables/useFetch'
import { useRoute } from 'vue-router'
const store = useDataStore()

const editSponsorData = ref({})

editSponsorData.value = { ...store.editSponsorData }

console.log(editSponsorData.value)
const { loading, post, put, remove } = useFetch()

const route = useRoute()

console.log(route.params.id)

const saveSponsor = async () => {
  try {
    const response = await put(`sponsor-summa-update/${editSponsorData.value.id}/`, {
      sponsor: editSponsorData.value.sponsor.id,
      student: route.params.id,
      summa: editSponsorData.value.summa
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const deleteSponsor = async () => {
  try {
    const response = await remove(`sponsor-summa-delete/${editSponsorData.value.id}/`, {
      sponsor: editSponsorData.value.sponsor.id
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  watch(
    () => store.editSponsorData,
    (newData) => {
      // Do something when editSponsorData changes
      console.log('editSponsorData changed:', newData)

      // Update the local ref if needed
      editSponsorData.value = newData
    }
  )
})
</script>
