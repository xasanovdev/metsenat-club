<template>
  <CModal @closeModal="emit('closeModal')">
    <template #title>Homiy qo‘shish</template>
    <template #body>
      <div class="col-span-2 flex flex-col justify-between gap-2 w-full">
        <label class="flex flex-col gap-2">
          <span class="cursor-pointer text-sm uppercase font-semibold text-gray-600">OTM</span>
          <CDropdown
            :validation="$v.sponsor.$error"
            v-model="filterSponsor.sponsor"
            property="full_name"
            :options="sponsorsData"
          />
        </label>
        <Validation :validation="$v.sponsor.$error" validationText="Institute" />
      </div>

      <FormGroup
        class="mt-7"
        label="Ajratilingan summa"
        id="given"
        type="number"
        placeholder="Ajratilingan summangizni kiritng..."
        validationText="Given amount of money"
        :validation="$v.summa.$error"
        v-model="filterSponsor.summa"
      />

      <p
        v-if="students.addNewSponsorError.length"
        class="mt-2 bg-red-50 p-2 text-red-500 rounded-md"
      >
        {{ students.addNewSponsorError }}
      </p>
    </template>

    <template #footer>
      <CButton @click="addSponsor" class="px-8" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Qo‘shish
          <img src="/plusWhite.svg" alt="filter icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

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

const route = useRoute()

const emit = defineEmits(['getStudentDetails', 'closeModal'])

const filterSponsor = ref({
  sponsor: '',
  summa: ''
})

const sponsors = useSponsors()

const students = useStudents()

const sponsorsData = ref([])

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
  sponsor: { required, minLength: minLength(1), maxLength: maxLength(255) }
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

  if (students.addNewSponsorError.length === 0) {
    filterSponsor.value.summa = ''
    filterSponsor.value.sponsor = ''

    emit('getStudentDetails')
    emit('closeModal')
  }
}

onMounted(async () => {
  await sponsors.getSponsorsList(sponsors.sponsors.currentPage, sponsors.sponsors.count, 'force')
  sponsorsData.value = sponsors?.sponsors?.list
})
</script>
