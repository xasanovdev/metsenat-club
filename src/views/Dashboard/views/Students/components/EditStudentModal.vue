<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="grid grid-cols-1 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              {{ user?.full_name }}
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </p>
              <CInput v-model="user.full_name" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div>
            <label>
              {{ user?.phone }}
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Telefon raqam</p>
              <CInput v-model="user.phone" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div class="col-span-1">
            <label>
              {{ user?.institute }}
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</p>
              <CDropdown
                v-model="user.institute.name"
                property="name"
                :options="store?.instituteList"
              />
            </label>
          </div>
          <div>
            <label>
              {{ user?.contract }}
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Kontrakt summa</p>
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
import { computed, onMounted, ref } from 'vue'

import CButton from '@/components/CButton/CButton.vue'
import CDropdown from '@/components/CDropdown/CDropdown.vue'
import CInput from '@/components/CInput/CInput.vue'
import CModal from '@/components/CModal/CModal.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useDataStore } from '@/stores/data'
import { useRoute } from 'vue-router'

const store = useDataStore()

const { get, loading, put } = useFetch()

const props = defineProps(['data'])

console.log(props)

const route = useRoute()

console.log(store?.studentsList?.results, route.params.id)

const studentData = store?.studentsList?.results?.find((student) => student?.id == route.params.id)

console.log(studentData)

const user = ref({
  id: '',
  full_name: studentData?.full_name,
  phone: studentData?.phone,
  institute: studentData?.institute,
  type: studentData?.type,
  contract: studentData?.contract
})

console.log(user)

const updateStudent = async () => {
  const selectedInstitute = computed(() => {
    return store?.instituteList.find(
      (item) => item.name.trim() === user.value.institute?.name.trim()
    )
  })

  try {
    const response = await put(`student-update/${studentData.id}/`, {
      id: studentData.id,
      institute: selectedInstitute.value?.id,
      full_name: user.value.full_name,
      phone: user.value.phone,
      type: user.value.type?.name === 'Bakalavr' ? 1 : 2,
      contract: user.value.contract
    })
    console.log(response)
    router.push({ name: 'Students' })
    document.body.classList.remove('overflow-hidden')
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
</script>
