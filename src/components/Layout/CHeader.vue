<template>
  <header class="w-full bg-gray-50">
    <div class="w-full bg-white py-3">
      <nav class="container mx-auto flex px-6 justify-between items-center">
        <RouterLink :to="{ name: 'Statistics' }">
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

  <LogOutModal v-show="logOutModal.modalValue" @closeModal="logOutModal.closeModal" />
</template>

<script setup>
import { ref } from 'vue'

import Tab from '@/components/Base/Tab.vue'
import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import FilterModal from '@/components/Base/FilterModal.vue'

import LogOutModal from '@/components/LogOutModal.vue'
import { useModal } from '@/composables/useModal'
import { useDataStore } from '@/stores'

defineProps(['variant'])

const { modal } = useModal()

const logOutModal = modal()

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

const store = useDataStore()

const search = ref('')

const searchResults = ref('')

const loading = ref(false)
const getSearchResults = async (text) => {
  loading.value = true

  store.getSearchResults(text)

  searchResults.value = store?.searchResults

  loading.value = false
}
</script>
