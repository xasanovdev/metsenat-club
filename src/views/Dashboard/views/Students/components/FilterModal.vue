<template>
  <template v-if="loading">
    <div>loading...</div>
  </template>

  <template v-else>
    <CModal>
      <template v-slot:title>Tahrirlash</template>
      <template v-slot:body>
        <div class="flex flex-col items-start gap-4">
          <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">
            Talabalik turi
          </p>
          {{ filterStudent.type }}
          <CDropdown v-model="filterStudent.type" property="name" :options="options"></CDropdown>
        </div>
        <div class="flex flex-col items-start gap-4 mt-7">
          <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">OTm</p>
          {{ filterStudent.institute }}
          <CDropdown v-model="filterStudent.institute" property="name" :options="store?.instituteList"></CDropdown>
        </div>
      </template>

      <template v-slot:footer>
        <CButton variant="primary" text="Tozalash">
          <img src="/clear.svg" alt="clear icon" />
        </CButton>
        <CButton @click="filterData" variant="secondary" text="Natijalarni ko‘rish">
          <img src="/eyeWhite.svg" alt="eye icon" />
        </CButton>
      </template>
    </CModal>
  </template>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useFetch } from '@/composables/useFetch';
import { useDataStore } from '@/stores/data';

const { loading } = useFetch()

const store = useDataStore()

const options = [
  { id: 'Barchasi', name: 'Barchasi' },
  { id: 'Bakalavr', name: 'Bakalavr' },
  { id: 'Magistr', name: 'Magistr' }
]

const filterStudent = ref({
  type: '',
  institute: ''
})

const filterStudentType = computed(() => {
  return filterStudent.value?.type === 'Bakalavr' ? '1' : '2'
})

const filterData = () => {
  store.studentsList.results = store.studentsList.results.filter((item) => {
    if (
      item.type == filterStudentType.value &&
      item.institute.name == filterStudent.value.institute
    ) {
      return item
    }
  })
}
</script>
