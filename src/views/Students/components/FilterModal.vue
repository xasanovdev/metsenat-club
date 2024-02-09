<template>
  <CModal @close="emit('closeModal')" @closeModalOverlay="emit('closeModalOverlay')">
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

      <CButton @click="filterStudents" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Natijalarni ko‘rish
          <img src="/eyeWhite.svg" alt="eyeWhite icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Base/CModal.vue'

import { useDataStore } from '@/stores'

import { optionsType } from '@/utils'

const store = useDataStore()

const emit = defineEmits(['closeModal', 'closeModalOverlay'])

const filterStudent = ref({
  type: '',
  institute: ''
})

const instituteList = ref([])

onMounted(async () => {
  await store.fetchInstituteList()
  instituteList.value = store.instituteList
})

const clear = () => {
  filterStudent.value.type = ''
  filterStudent.value.institute = ''
}

// const close = ref('')

// const setClose = (func) => {
//   console.log('salom')
//   close.value = func
// }

const filterStudents = () => {
  emit('closeModal')
}
</script>
