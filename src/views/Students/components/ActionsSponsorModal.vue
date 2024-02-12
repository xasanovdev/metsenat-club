<template>
  <CModal @closeModal="emit('closeModal')">
    <template #title> {{ isEdit ? 'Homiy qo‘shish' : 'Homiylarni tahrirlash' }}</template>

    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div v-if="isEdit" class="flex justify-between items-center text-lg font-bold">
          <div>F.I.SH</div>
          <div class="text-slate-400">{{ editSponsorData?.sponsor?.full_name }}</div>
        </div>

        <div v-else class="col-span-2 flex flex-col justify-between gap-2 w-full">
          <label class="flex flex-col gap-2">
            <span class="cursor-pointer text-sm uppercase font-semibold text-gray-600">OTM</span>
            <CDropdown
              :validation="$v.sponsor.$error"
              v-model="filterSponsor.sponsor"
              placeholder="Homiyni kiriting."
              property="full_name"
              :options="sponsorsData"
            />
          </label>
          <Validation :validation="$v.sponsor.$error" validationText="Institut darajangizni" />
        </div>
        {{ filterSponsor.summa }} {{ studentSponsorData }}

        <FormGroup
          class="mt-7"
          label="Ajratilingan summa"
          id="given"
          placeholder="Ajratilingan summangizni kiritng..."
          validationText="Berilgan kontrakt summangizni"
          :validation="$v.summa.$error"
          v-model="filterSponsor.summa"
        />
      </form>

      <p
        v-if="students.actionsSponsorError.length"
        class="mt-2 bg-red-50 p-2 text-red-500 rounded-md"
      >
        {{ error }}
      </p>
    </template>

    <template #footer>
      <template v-if="isEdit">
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

      <template v-else>
        <CButton @click="addSponsor" class="px-8" variant="secondary">
          <span class="flex items-center justify-center gap-[10px]">
            Qo‘shish
            <img src="/plusWhite.svg" alt="filter icon" />
          </span>
        </CButton>
      </template>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref, computed, toRef } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import FormGroup from '@/components/Base/FormGroup.vue'
import CModal from '@/components/Base/CModal.vue'

import { useSponsors } from '@/stores/sponsors'

import { minLength, maxLength, required } from '@vuelidate/validators'
import Validation from '@/components/Base/Validation.vue'

import useVuelidate from '@vuelidate/core'

import { useRoute } from 'vue-router'
import { useStudents } from '@/stores/students'
import { useToast } from 'vue-toastification'

const route = useRoute()

const props = defineProps(['isEdit', 'studentSponsorData'])

const error = computed(() => students.actionsSponsorError)

const emit = defineEmits(['getStudentDetails', 'closeModal'])

const editSponsorData = computed(() => props?.studentSponsorData)

const filterSponsor = ref({
  sponsor: '',
  summa: props.studentSponsorData?.summa
})

const sponsorsData = ref([])

const sponsors = useSponsors()

const students = useStudents()

const toast = useToast()

const getSponsorId = () => {
  const sponsor = sponsorsData.value?.find((item) => {
    if (item.full_name == filterSponsor.value.sponsor) {
      return item
    }
  })
  return sponsor?.id
}

const rules = {
  summa: { required, minLength: minLength(-2147483648), maxLength: maxLength(2147483647) },
  sponsor: !props.isEdit && { required, minLength: minLength(1), maxLength: maxLength(255) }
}

const $v = useVuelidate(rules, filterSponsor)

const addSponsor = async () => {
  const result = await $v.value.$validate()
  console.log('validation result', $v.value)

  if (!result) {
    return $v
  }

  await students.addNewSponsor({
    sponsor: getSponsorId(),
    summa: filterSponsor.value.summa,
    student: route.params.id
  })

  if (!error.value) {
    toast.success(`${filterSponsor.value.sponsor} ismli hamkor muvaffaqiyatli qo'shildi.`)

    filterSponsor.value.summa = ''
    filterSponsor.value.sponsor = ''

    emit('getStudentDetails')
    emit('closeModal')
  }
}

const saveSponsor = async () => {
  await students.updateStudentSponsor({
    id: editSponsorData.value?.id,
    sponsor: editSponsorData.value?.sponsor?.id,
    student: route.params.id,
    summa: filterSponsor.value.summa
  })

  if (!error.value) {
    emit('getStudentDetails')
    emit('closeModal')

    filterSponsor.value.summa = ''

    toast.success(
      `${editSponsorData.value.sponsor.full_name} ismli hamkor muvaffaqiyatli yangilandi.`
    )
  }
}

const deleteSponsor = async () => {
  await students.deleteSponsor(editSponsorData.value?.id)

  toast.error(`${editSponsorData.value.sponsor.full_name} ismli hamkor muvaffaqiyatli o'chirildi.`)

  emit('getStudentDetails')
  emit('closeModal')

  filterSponsor.value.summa = ''
}

onMounted(async () => {
  await sponsors.getSponsorsList(sponsors.sponsors.currentPage, sponsors.sponsors.count, 'force')
  sponsorsData.value = sponsors?.sponsors?.list
})
</script>
