<template>
  <template v-if="loading">
    <article class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">loading...</div>
    </article>
  </template>

  <template v-else>
    <header class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">
        <div class="w-full flex items-center gap-4">
          <div class="cursor-pointer" @click="$router.go(-1)">
            <img src="/back.svg" alt="arrow left" />
          </div>
          <p class="text-[#28293D] text-2xl font-bold">Talaba qo‘shish</p>
        </div>
      </div>
    </header>

    <div class="w-full h-full p-[32px] bg-[#F5F5F7] flex flex-col justify-between">
      <form
        @submit.prevent="addStudent"
        class="max-w-[793px] w-full bg-white p-7 mx-auto rounded-xl"
      >
        <div class="grid grid-cols-2 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </p>
              {{ user.fullName }}
              <CInput v-model="user.full_name" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Telefon raqam</p>
              {{ user.phoneNumber }}
              <CInput
                v-model="user.phone"
                type="string"
                placeholder="Abdullayev Abdulla Abdulla o’g’li"
              />
            </label>
          </div>
          <div class="col-span-2">
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</p>
              {{ user.institute }}
              <CDropdown v-model="user.institute" :options="data" />
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Talabalik turi</p>
              {{ user.type?.name }}
              <CDropdown v-model="user.type" :options="options" />
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Kontrakt summa</p>
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
        <CButton class="w-full" type="submit" variant="secondary" text="Qo‘shish">
          <img src="/plusWhite.svg" alt="plus icon" />
        </CButton>
      </form>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CInput from '@/components/CInput/CInput.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';

const data = ref(null)

const { get, loading, post } = useFetch()
const generataId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const user = ref({
  id: generataId(),
  full_name: '',
  phone: '',
  institute: '',
  type: '',
  contract: ''
})

const addStudent = async () => {
  try {
    const response = await post(`student-create/`, {
      id: user.value.id,
      institute: user.value.institute?.id,
      full_name: user.value.full_name,
      phone: user.value.phone,
      type: user.value.type?.name === 'Bakalavr' ? 1 : 2,
      contract: user.value.contract
    })

    data.value = response
    user.value = {
      id: generataId(),
      full_name: '',
      phone: '',
      institute: '',
      type: '',
      contract: ''
    }
    router.push({ name: 'Student', params: { id: response.id } })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchData = async () => {
  try {
    const response = await get(`institute-list/`)
    data.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
fetchData()

const options = [
  { id: 'Barchasi', name: 'Barchasi' },
  { id: 'Bakalavr', name: 'Bakalavr' },
  { id: 'Magistr', name: 'Magistr' }
]
</script>
