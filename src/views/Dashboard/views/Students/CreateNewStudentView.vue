<template>
  <header class="w-full py-[30px] bg-[#FDFDFD]">
    <div class="container mx-auto px-6">
      <div class="w-full flex items-center gap-4">
        <RouterLink :to="{ name: 'Students' }" class="cursor-pointer">
          <img src="/back.svg" alt="arrow left" />
        </RouterLink>
        <span class="text-slate-900 text-2xl font-bold">Talaba qo‘shish</span>
      </div>
    </div>
  </header>

  <div class="w-full h-full p-[32px] bg-[#F5F5F7] flex flex-col justify-between">
    <form
      @submit.prevent="createNewStudent"
      class="max-w-[793px] w-full bg-white p-7 mx-auto rounded-xl"
    >
      <div class="grid grid-cols-2 gap-x-7 gap-y-[50px]">
        <FormGroup
          label="F.I.Sh. (Familiya Ism Sharif)"
          id="full_name"
          type="text"
          placeholder="Ismingizni kiriting..."
          :validation="$v.full_name.$error"
          validationText="Fullname"
          v-model="user.full_name"
        />

        <FormGroup
          label="Telefon raqam"
          id="phone"
          type="text"
          placeholder="Telelefon raqamingizni kiriting..."
          :validation="$v.phone.$error"
          validationText="Contract sum"
          v-model="user.phone"
        />

        <div class="col-span-2">
          <label>
            <span class="cursor-pointer text-sm uppercase font-semibold text-gray-600">OTM</span>
            {{ user.institute }}
            <CDropdown v-model="user.institute" property="name" :options="instituteList" />
          </label>
        </div>

        <div>
          <label>
            <span class="cursor-pointer text-sm uppercase font-semibold text-gray-600"
              >Talabalik turi</span
            >
            {{ user.type }}

            <CDropdown v-model="user.type" property="name" :options="optionsType" />
          </label>
        </div>
        <FormGroup
          label="Kontrakt summa"
          id="contract"
          type="text"
          placeholder="Kontrak summangizni kiriting..."
          :validation="$v.contract.$error"
          validationText="Phone"
          v-model="user.contract"
        />
      </div>
      <hr class="my-7" />
      <CButton class="w-full" type="submit" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Qo‘shish <img src="/plusWhite.svg" alt="plus icon" />
        </span>
      </CButton>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'

import FormGroup from '@/components/Base/FormGroup.vue'
import { useDataStore } from '@/stores'
import { useStudents } from '@/stores/students'

import { optionsType } from '@/utils'
import useVuelidate from '@vuelidate/core'

import { required, minLength, maxLength } from '@vuelidate/validators'

const store = useDataStore()
const students = useStudents()

let instituteList = ref([])

const user = ref({
  full_name: '',
  phone: '',
  institute: '',
  type: '',
  contract: ''
})

const rules = {
  full_name: { required },
  phone: { required },
  contract: { required, maxLength: maxLength(2147483647) }
}

const $v = useVuelidate(rules, user)

onMounted(async () => {
  await store.fetchInstituteList()
  instituteList.value = store.instituteList
})

const createNewStudent = async () => {
  const result = await $v.value.$validate()

  if (!result) {
    return $v
  }

  await students.postNewStudent(user, instituteList)
}
</script>
