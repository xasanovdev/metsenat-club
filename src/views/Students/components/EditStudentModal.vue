<template>
  <CModal @close="setClose">
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
            type="number"
            placeholder="Telefon raqamingizni kiritng..."
            validationText="Phone"
            :validation="$v.phone.$error"
            v-model="studentData.phone"
          />

          <div class="col-span-1 flex flex-col justify-between gap-2 w-full">
            <label class="flex flex-col gap-2">
              {{ studentData?.institute }}
              <span class="text-[12px] text-neutral-800 mb-2 uppercase font-medium">OTM</span>
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
            type="number"
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
import { computed, onMounted, ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'

import CModal from '@/components/Base/CModal.vue'

import { useStudents } from '@/stores/students'
import { useDataStore } from '@/stores'
import useVuelidate from '@vuelidate/core'

import { required, maxValue } from '@vuelidate/validators'
import FormGroup from '@/components/Base/FormGroup.vue'

const emit = defineEmits(['getStudentDetails'])

const studentData = ref([])

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

const students = useStudents()

const store = useDataStore()

const instituteList = ref([])

onMounted(async () => {
  await store.fetchInstituteList()

  instituteList.value = store.instituteList

  console.log(students.students)

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
  console.log('validation result', $v.value)

  if (!result) {
    return $v
  }
  await students.updateStudentDetails({
    id: studentData.value.id,
    institute: instituteList.value.find(
      (item) => item.name.trim() === studentData.value.institute?.name.trim()
    ),
    full_name: studentData.value.full_name,
    phone: studentData.value.phone,
    type: studentData.value.type?.name === 'Bakalavr' ? 1 : 2,
    contract: studentData.value.contract
  })

  close.value()
  emit('getStudentDetails')
}
</script>
