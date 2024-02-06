<template>
  <FilterModal
    v-show="filterModal.modalValue"
    :modalValue="filterModal.modalValue"
    :closeModalOverlay="filterModal.closeModalOverlay"
    :closeModal="filterModal.closeModal"
  />

  <div class="py-6 w-full flex items-center justify-center bg-gray-50">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <RouterLink class="flex-1 inline-block" :to="{ name: 'Dashboard' }">
          <CTabButton path="/dashboard" buttonText="Dashboard" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Sponsors',
            query: { page: store.sponsorsCurrentPage, page_size: store.paginationCountSponsors }
          }"
        >
          <CTabButton path="/sponsors" buttonText="Homiylar" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Students',
            query: { page: store.studentsCurrentPage, page_size: store.paginationCountStudents }
          }"
        >
          <CTabButton path="/students" buttonText="Talabalar" />
        </RouterLink>
      </div>
      <div class="flex w-full items-center justify-end gap-4 md:gap-5">
        <CInput v-model="search" placeholder="Qidirish" class="md:max-w-[284px] py-[15px] w-full" />
        <CButton @click="filterModal.openModal" variant="primary" class="px-8">
          <span class="flex items-center justify-center gap-[10px]">
            Filter
            <img src="/filter.svg" alt="filter icon" />
          </span>
        </CButton>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 pb-20">
    <div class="container mx-auto px-6 overflow-x-auto">
      <RouterLink class="w-full" to="/new-student">
        <CButton variant="secondary">
          <span class="flex items-center justify-center gap-[10px]">
            Talaba qo‘shish
            <img src="/plusWhite.svg" alt="white plus icon" />
          </span>
        </CButton>
      </RouterLink>

      <StudenstTable />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import CTabButton from '@/components/Base/CTabButton.vue'
import { useModal } from '@/composables/useModal'
import { useDataStore } from '@/stores/data'

import StudenstTable from './components/StudenstTable.vue'
import FilterModal from './components/FilterModal.vue'

const search = ref('')

const store = useDataStore()

const { modal } = useModal()

const filterModal = modal()
</script>
