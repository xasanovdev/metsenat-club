<template>
  <div class="bg-gray-50 pb-20">
    <div class="container mx-auto px-6 overflow-x-auto">
      <SponsorsTable />
    </div>
  </div>

  <!-- 
  <FilterModal
    v-show="filterModal.modalValue"
    :modalValue="filterModal.modalValue"
    :closeModalOverlay="filterModal.closeModalOverlay"
    :closeModal="filterModal.closeModal"
  /> -->
</template>
<script setup>
import SponsorsTable from './components/SponsorsTable.vue'
import FilterModal from './components/FilterModal.vue'

import { useModal } from '@/composables/useModal'

const { modal } = useModal()

const filterModal = modal()
</script>
