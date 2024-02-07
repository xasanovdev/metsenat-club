<template>
  <header class="w-full bg-gray-50">
    <div class="w-full bg-white py-3">
      <nav class="container mx-auto flex px-6 justify-between items-center">
        <RouterLink :to="{ name: 'Dashboard' }">
          <img src="/logo.svg" alt="page logo image" />
        </RouterLink>
        <div class="flex items-center gap-4 md:gap-8 lg:gap-10">
          <div class="bg-neutral-100 gap-4 p-1 rounded-md flex items-center justify-center">
            <div class="text-slate-900 hidden font-bold sm:inline-block">Ibrohim</div>
            <div class="bg-green-400 w-8 h-8 flex items-center justify-center rounded-md">
              <img class="mt-2" src="/user.svg" alt="User image" />
            </div>
          </div>
          <button class="cursor-pointer" @click="logOutModal.openModal">
            <img class="" src="/logOut.svg" alt="Log out icon" />
          </button>
        </div>
      </nav>
    </div>
  </header>

  <div v-if="variant === 'default'" class="py-6 w-full flex items-center bg-gray-50 justify-center">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <!-- Todo: use v-for -->
        <Tab v-for="(item, index) in tabList" :key="index" :title="item.title" :path="item.path" />
      </div>

      <div class="flex w-full items-center justify-end gap-4 md:gap-5">
        <CInput v-model="search" placeholder="Qidirish" class="md:max-w-[284px] py-[15px] w-full" />
        <CButton @click="filterModal.openModal" variant="primary" class="px-8 max-w-32">
          <span class="flex items-center justify-center gap-[10px]">
            Filter
            <img src="/filter.svg" alt="filter icon" />
          </span>
        </CButton>
      </div>
    </div>
  </div>

  <LogOutModal
    v-show="logOutModal.modalValue"
    :modalValue="logOutModal.modalValue"
    :closeModalOverlay="logOutModal.closeModalOverlay"
    :closeModal="logOutModal.closeModal"
  />
  <FilterModal
    v-show="filterModal.modalValue"
    :modalValue="filterModal.modalValue"
    :closeModalOverlay="filterModal.closeModalOverlay"
    :closeModal="filterModal.closeModal"
  />
</template>

<script setup>
import Tab from '@/components/Base/Tab.vue'
import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import FilterModal from '@/components/Base/FilterModal.vue'

import LogOutModal from '@/components/LogOutModal.vue'
import { useModal } from '@/composables/useModal'

const { modal, modals } = useModal()

console.log('Modals::::::::::::::', modals.value)
const logOutModal = modal()
const filterModal = modal()

defineProps(['variant'])

const tabList = [
  {
    path: 'Dashboard',
    title: 'Dashboard'
  },
  {
    path: 'Sponsors',
    title: 'Homiylar'
  },
  {
    path: 'Students',
    title: 'Talabalar'
  }
]
</script>
