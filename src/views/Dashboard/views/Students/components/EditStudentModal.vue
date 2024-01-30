<template>
  <template v-if="loading">
    <article>loading...</article>
  </template>

  <template v-else>
    <CModal>
      <template v-slot:title>Tahrirlash</template>
      <template v-slot:body>
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
                <CDropdown v-model="user.institute" :options="store.instituteList" />
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
      <template v-slot:footer>
        <CButton @click="updateStudent" variant="secondary" text="Natijalarni ko‘rish">
          <img src="/save.svg" alt="save icon" />
        </CButton>
      </template>
    </CModal>
  </template>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CInput from '@/components/CInput/CInput.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';

const store = useDataStore()

const { get, loading, put } = useFetch()

const props = defineProps(['data'])

const user = ref({
  id: '',
  full_name: props.data?.full_name,
  phone: props.data?.phone,
  institute: props.data?.institute?.name,
  type: props.data?.type,
  contract: props.data?.contract
})
const updateStudent = async () => {
  try {
    const response = await put(`student-update/${props.data.id}/`, {
      id: props.data.id,
      institute: user.value.institute?.id,
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
