<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Talabalik turi</p>
        {{ filterStudent.type }}

        <CDropdown v-model="filterStudent.type" property="name" :options="optionsType"></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">OTm</p>
        {{ filterStudent.institute }}
        <CDropdown
          v-model="filterStudent.institute"
          property="name"
          :options="store?.instituteList"
        ></CDropdown>
      </div>
    </template>

    <template #footer>
      <CButton @click="clear" variant="primary" text="Tozalash">
        <img src="/clear.svg" alt="clear icon" />
      </CButton>
      <CButton @click="filterData" variant="secondary" text="Natijalarni ko‘rish">
        <img src="/eyeWhite.svg" alt="eye icon" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { computed, ref } from 'vue'

import CButton from '@/components/CButton/CButton.vue'
import CDropdown from '@/components/CDropdown/CDropdown.vue'
import CModal from '@/components/CModal/CModal.vue'
import { useDataStore } from '@/stores/data'
import { optionsType } from '@/utils/lists'

const store = useDataStore()

const filterStudent = ref({
  type: '',
  institute: ''
})

const clear = () => {
  filterStudent.value.type = ''
  filterStudent.value.institute = ''
}

const studentDataType = computed(() => {
  if (filterStudent.value.type == '') {
    return 'Barchasi'
  } else {
    return filterStudent.value.type
  }

  // eslint-disable-next-line no-unreachable
  return filterStudent.value.type == 'Bakalavr' ? '1' : '2'
})

const filterData = () => {
  if (studentDataType.value == 'Barchasi') {
    store.studentsList.results = store?.studentsList?.results.filter((item) => {
      if (item.institute.name == filterStudent.value.institute) {
        return item
      } else {
        return
      }
    })

    return
  }

  store.studentsList.results = store?.studentsList?.results.filter((item) => {
    if (
      item.type == studentDataType.value ||
      item.institute.name == filterStudent.value.institute
    ) {
      return item
    }
  })
}
</script>
