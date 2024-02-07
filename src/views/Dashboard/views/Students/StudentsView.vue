<template>
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

  <FilterModal
    v-show="filterModal.modalValue"
    :modalValue="filterModal.modalValue"
    :closeModalOverlay="filterModal.closeModalOverlay"
    :closeModal="filterModal.closeModal"
  />
</template>
<script setup>
import CButton from '@/components/Base/CButton.vue'

import { useModal } from '@/composables/useModal'

import StudenstTable from './components/StudenstTable.vue'
import FilterModal from './components/FilterModal.vue'

const { modal } = useModal()

const filterModal = modal()
</script>
@/stores
