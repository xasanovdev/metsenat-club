<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              {{ user?.full_name }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </span>
              <CInput v-model="user.full_name" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div>
            <label>
              {{ user?.phone }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
                >Telefon raqam</span
              >
              <CInput v-model="user.phone" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div class="col-span-1">
            <label>
              {{ user?.institute }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</span>
              <CDropdown v-model="user.institute.name" property="name" :options="instituteList" />
            </label>
          </div>
          <div>
            <label>
              {{ user?.contract }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
                >Kontrakt summa</span
              >
              <CInput v-model="user.contract" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <CButton @click="updateStudent" variant="secondary" text="Natijalarni ko‘rish">
        <img src="/save.svg" alt="save icon" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { useRoute } from 'vue-router';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CInput from '@/components/CInput/CInput.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';

const store = useDataStore()

const { put, get } = useFetch()

const route = useRoute()

const instituteList = ref([])

const fetchInstituteList = async () => {
  try {
    const response = await get(`institute-list/`)
    instituteList.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchInstituteList()
})

const studentData = store?.studentsList?.results?.find((student) => student?.id == route.params.id)

const user = ref({
  id: '',
  full_name: studentData?.full_name,
  phone: studentData?.phone,
  institute: studentData?.institute,
  type: studentData?.type,
  contract: studentData?.contract
})

const updateStudent = async () => {
  const selectedInstitute = computed(() => {
    return instituteList.value.find(
      (item) => item.name.trim() === user.value.institute?.name.trim()
    )
  })

  try {
    await put(`student-update/${studentData.id}/`, {
      id: studentData.id,
      institute: selectedInstitute.value?.id,
      full_name: user.value.full_name,
      phone: user.value.phone,
      type: user.value.type?.name === 'Bakalavr' ? 1 : 2,
      contract: user.value.contract
    })

    router.push({ name: 'Students' })
    document.body.classList.remove('overflow-hidden')
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
</script>
