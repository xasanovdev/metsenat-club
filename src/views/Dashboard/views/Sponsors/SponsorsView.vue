<template>
  <FilterModal
    v-show="filterModal.modalValue"
    :modalValue="filterModal.modalValue"
    :closeModalOverlay="filterModal.closeModalOverlay"
    :closeModal="filterModal.closeModal"
  >
    asfsafsasfsa
  </FilterModal>

  <div class="py-6 w-full flex items-center justify-center bg-[#FCFCFC]">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <routerLink class="flex-1 inline-block" :to="{ name: 'Dashboard' }">
          <CTabButton path="/dashboard" buttonText="Dashboard" />
        </routerLink>
        <routerLink
          class="flex-1 inline-block"
          :to="{ name: 'Sponsors', query: { page: store.sponsorsCurrentPage } }"
        >
          <CTabButton path="/sponsors" buttonText="Homiylar" />
        </routerLink>
        <routerLink
          class="flex-1 inline-block"
          :to="{ name: 'Students', query: { page: store.studentsCurrentPage } }"
        >
          <CTabButton path="/students" buttonText="Talabalar" />
        </routerLink>
      </div>
      <div class="flex w-full items-center justify-end gap-4 md:gap-5">
        <CInput v-model="search" placeholder="Qidirish" class="md:max-w-[284px] py-[15px] w-full" />
        <CButton @click="filterModal.openModal" variant="primary" class="px-8" text="Filter">
          <img src="/filter.svg" alt="filter icon" />
        </CButton>
      </div>
    </div>
  </div>
  <div class="bg-[#F5F5F7] pb-20">
    <div class="container mx-auto px-6 overflow-x-auto">
      <CTable />
    </div>
  </div>

  <router-view></router-view>
</template>
<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CInput from '@/components/CInput/CInput.vue';
import CTabButton from '@/components/CTabButton/CTabButton.vue';
import { useModal } from '@/composables/useModal';
import { useDataStore } from '@/stores/data';

import CTable from './components/CTable.vue';
import FilterModal from './components/FilterModal.vue';

const search = ref('')

const store = useDataStore()

const { modal } = useModal()

const filterModal = modal()
</script>
