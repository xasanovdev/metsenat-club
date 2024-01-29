<template>


  <FilterModal v-show="filterModal.modalValue" :modalValue="filterModal.modalValue" :closeModalOverlay="filterModal.closeModalOverlay" :closeModal="filterModal.closeModal">
    asfsafsasfsa
  </FilterModal>
  
<div class="py-6 w-full flex items-center justify-center">
      <div
        class="max-w-[1200px] w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
      >
        <div
          class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
        >
          <router-link class="flex-1 inline-block" to="/dashboard">
            <CTabButton path="/dashboard" buttonText="Dashboard" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/sponsors">
            <CTabButton path="/sponsors" buttonText="Homiylar" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/students">
            <CTabButton path="/students" buttonText="Talabalar" />
          </router-link>
        </div>
        <div class="flex w-full items-center justify-end gap-4 md:gap-5">
          <CInput
            v-model="search"
            placeholder="Qidirish"
            class="md:max-w-[284px] py-[15px] w-full"
          />
          <CButton @click="filterModal.openModal" class variant="primary" text="Filter">
            <img src="../../../../../public/filter.svg" alt="asfsa" />
          </CButton>
        </div>
      </div>
    </div>
  <div class="w-full h-full bg-[#F5F5F7] pb-20">
    <div class="max-w-[1200px] mx-auto px-6 overflow-hidden overflow-x-auto">
      <CTable />
    </div>
  </div>

  <router-view></router-view>
</template>
<script setup>

import CTabButton from '@/components/CTabButton/CTabButton.vue';
import CInput from '@/components/CInput/CInput.vue';

import { ref } from 'vue';

const search = ref('')
import CTable from '@/components/CTable/CTable.vue';
import FilterModal from './FilterModal.vue';
import { useModal } from '@/composables/useModal/useModal';
import CButton from '@/components/CButton/CButton.vue';

const {modal} = useModal()

const filterModal = modal()

console.log(filterModal);

</script>
