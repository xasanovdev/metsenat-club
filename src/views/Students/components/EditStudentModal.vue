<template>
  <CModal @closeModal="emit('closeModal')">
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <FormGroup
            label="F.I.Sh. (Familiya Ism Sharif)"
            id="full_name"
            type="text"
            placeholder="Ism familyangizni kiritng..."
            validationText="Fullname"
            :validation="$v.full_name.$error"
            v-model="studentData.full_name"
          />

          <FormGroup
            label="Telefon raqam"
            id="phone"
            placeholder="Telefon raqamingizni kiritng..."
            validationText="Phone"
            :validation="$v.phone.$error"
            v-model="studentData.phone"
          />

          <div class="col-span-1 flex flex-col justify-between gap-2 w-full">
            <label class="flex flex-col gap-2">
              <span class="text-[12px] text-gray-600 uppercase font-semibold">OTM</span>
              <CDropdown
                v-model="studentData.institute.name"
                property="name"
                :validation="$v.institute.$error"
                :options="instituteList"
              />
            </label>
          </div>

          <FormGroup
            label="Kontrakt summa"
            id="contract"
            placeholder="Kontrakt summangizni kiritng..."
            validationText="Contract"
            :validation="$v.contract.$error"
            v-model="studentData.contract"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <CButton @click="updateStudent" variant="secondary" text="Natijalarni ko‘rish">
        <span class="flex items-center justify-center gap-[10px]">
          Natijalarni ko‘ris
          <img src="/save.svg" alt="save icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Base/CModal.vue'
import FormGroup from '@/components/Base/FormGroup.vue'

import { useStudents } from '@/stores/students'
import { useDataStore } from '@/stores'

import useVuelidate from '@vuelidate/core'
import { required, maxValue } from '@vuelidate/validators'

const emit = defineEmits(['getStudentDetails', 'closeModal'])

const studentData = ref([])

const students = useStudents()

const store = useDataStore()

const instituteList = ref([])

onMounted(async () => {
  await store.fetchInstituteList()

  instituteList.value = store.instituteList

  studentData.value = { ...students?.students?.details }
})

const rules = {
  full_name: { required },
  phone: { required },
  contract: { required, maxValue: maxValue(2147483647) },
  institute: { required }
}

const $v = useVuelidate(rules, studentData)

const updateStudent = async () => {
  const result = await $v.value.$validate()

  if (!result) {
    return $v
  }

  await students.updateStudentDetails({
    full_name: studentData.value.full_name,
    type: studentData.value.type?.name === 'Bakalavr' ? 1 : 2,
    phone: studentData.value.phone,
    institute: instituteList.value.find((item) => item.name === studentData.value.institute?.name)
      .id,
    id: studentData.value.id,
    given: studentData.value.contract
  })

  emit('getStudentDetails')
  emit('closeModal')
}
</script>
