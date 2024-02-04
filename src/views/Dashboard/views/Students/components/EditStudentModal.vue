<template>
  <CModal @childFunction="setChildFunction">
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              {{ studentData?.full_name }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </span>
              <CInput
                v-model="studentData.full_name"
                placeholder="Abdullayev Abdulla Abdulla o’g’li"
              />
              <span v-if="errors?.full_name" class="text-red-500">{{ errors?.full_name[0] }}</span>
            </label>
          </div>
          <div>
            <label>
              {{ studentData?.phone }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
                >Telefon raqam</span
              >
              <CInput v-model="studentData.phone" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
              <span v-if="errors?.phone" class="text-red-500">{{ errors?.phone[0] }}</span>
            </label>
          </div>
          <div class="col-span-1">
            <label>
              {{ studentData?.institute }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</span>
              <CDropdown
                v-model="studentData.institute.name"
                property="name"
                :options="instituteList"
              />
              <span v-if="errors?.institute" class="text-red-500">{{ errors?.institute[0] }}</span>
            </label>
          </div>
          <div>
            <label>
              {{ studentData?.contract }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
                >Kontrakt summa</span
              >
              <CInput
                v-model="studentData.contract"
                placeholder="Abdullayev Abdulla Abdulla o’g’li"
              />
              <span v-if="errors?.contract" class="text-red-500">{{ errors?.contract[0] }}</span>
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

const studentData = ref('')

const { put, get } = useFetch()

const route = useRoute()

const errors = ref(null)

const childFunction = ref(null)

const setChildFunction = (func) => {
  childFunction.value = func
}

const instituteList = ref([])

const fetchInstituteList = async () => {
  try {
    const response = await get(`institute-list/`)
    instituteList.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchData = async () => {
  try {
    console.log('asfsa')
    const response = await get(`student-detail/${route.params.id}`)

    studentData.value = response

    console.log(studentData.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchInstituteList()
  fetchData()
})

const updateStudent = async () => {
  const selectedInstitute = computed(() => {
    return instituteList.value.find(
      (item) => item.name.trim() === studentData.value.institute?.name.trim()
    )
  })

  try {
    const response = await put(`student-update/${studentData.value.id}/`, {
      id: studentData.value.id,
      institute: selectedInstitute.value?.id,
      full_name: studentData.value.full_name,
      phone: studentData.value.phone,
      type: studentData.value.type?.name === 'Bakalavr' ? 1 : 2,
      contract: studentData.value.contract
    })

    if (
      Array.isArray(response.full_name) ||
      Array.isArray(response.contract) ||
      Array.isArray(response.phone) ||
      Array.isArray(response.institute)
    ) {
      errors.value = response
    } else {
      console.log(childFunction.value)
      childFunction.value()

      errors.value = null
    }
    console.log(response)
    // router.push({ name: 'Students' })
    // document.body.classList.remove('overflow-hidden')
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
</script>
