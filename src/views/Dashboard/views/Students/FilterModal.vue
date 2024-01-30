<template>
  <template v-if="loading">
    <div>loading...</div>
  </template>

  <template v-else>
    <CModal :filterStudent="filterStudent">
      <template v-slot:title>Tahrirlash</template>
      <template v-slot:body>
        <div class="flex flex-col items-start gap-4">
          <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">
            Talabalik turi
          </p>
          {{ filterStudent.type.id }}
          <CDropdown v-model="filterStudent.type" :options="options"></CDropdown>
        </div>
        <div class="flex flex-col items-start gap-4 mt-7">
          <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">OTm</p>
          {{ filterStudent.institute.id }}
          <CDropdown v-model="filterStudent.institute" :options="data"></CDropdown>
        </div>
      </template>

      <template v-slot:footer>
        <CButton variant="primary" text="Tozalash">
          <img src="/clear.svg" alt="" />
        </CButton>
      </template>
    </CModal>
  </template>
</template>

<script setup>
import {
  ref,
  watch,
} from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useFetch } from '@/composables/useFetch/useFetch';

const data = ref(null)

const { get, loading } = useFetch()

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

const filterStudent = ref({
  type: '',
  institute: ''
})

</script>
