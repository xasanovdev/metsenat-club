<template>
  <!-- Todo: refactor two filter modals in sponsors and students pages -->
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide"
          >Talabalik turi</span
        >
        {{ filterStudent.type }}

        <CDropdown v-model="filterStudent.type" property="name" :options="optionsType"></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide">OTm</span>
        {{ filterStudent.institute }}

        <CDropdown
          v-model="filterStudent.institute"
          property="name"
          :options="instituteList"
        ></CDropdown>
      </div>
    </template>

    <template #footer>
      <CButton @click="clear" variant="primary">
        <span class="flex items-center justify-center gap-[10px]">
          Tozalash
          <img src="/clear.svg" alt="clear icon" />
        </span>
      </CButton>
      <CButton @click="filterData" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Natijalarni ko‘rish
          <img src="/eyeWhite.svg" alt="eyeWhite icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Common/CModal.vue'
import { useFetch } from '@/composables/useFetch'
import { useDataStore } from '@/stores/data'
import { optionsType } from '@/utils/lists'

const store = useDataStore()

const filterStudent = ref({
  type: '',
  institute: ''
})

const { get } = useFetch()

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
