<template>
  <header class="w-full py-[30px] bg-[#FDFDFD]">
    <div class="container mx-auto px-6">
      <div class="w-full flex items-center gap-4">
        <RouterLink :to="{ name: 'Students' }" class="cursor-pointer">
          <img src="/back.svg" alt="arrow left" />
        </RouterLink>
        <span class="text-slate-900 text-2xl font-bold">Talaba q o‘shish</span>
      </div>
    </div>
  </header>

  <div class="w-full h-full p-[32px] bg-[#F5F5F7] flex flex-col justify-between">
    <form
      @submit.prevent="createNewStudent"
      class="max-w-[793px] w-full bg-white p-7 mx-auto rounded-xl"
    >
      <div class="grid grid-cols-2 gap-x-7 gap-y-[50px]">
        <div>
          <label>
            <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
              F.I.Sh. (Familiya Ism Sharif)
            </span>
            {{ user.full_name }}
            <CInput v-model="user.full_name" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
          </label>
        </div>
        <div>
          <label>
            <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Telefon raqam</span>
            {{ user.phone }}
            <CInput
              v-model="user.phone"
              type="string"
              placeholder="Abdullayev Abdulla Abdulla o’g’li"
            />
          </label>
        </div>
        <div class="col-span-2">
          <label>
            <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</span>
            {{ user.institute }}
            <CDropdown v-model="user.institute" property="name" :options="instituteList" />
          </label>
        </div>
        <div>
          <label>
            <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
              >Talabalik turi</span
            >
            {{ user.type }}

            <CDropdown v-model="user.type" property="name" :options="optionsType" />
          </label>
        </div>
        <div>
          <label>
            <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
              >Kontrakt summa</span
            >
            {{ user.contract }}
            <CInput
              v-model="user.contract"
              type="number"
              placeholder="Abdullayev Abdulla Abdulla o’g’li"
            />
          </label>
        </div>
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
import CInput from '@/components/Base/CInput.vue'

import { useDataStore } from '@/stores'
import { useStudents } from '@/stores/students'

import { optionsType } from '@/utils'

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

onMounted(async () => {
  await store.fetchInstituteList()
  instituteList.value = store.instituteList
})

const createNewStudent = async () => {
  await students.postNewStudent(user, instituteList)
}
</script>
