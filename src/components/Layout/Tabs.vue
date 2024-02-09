<template>
  <div class="py-6 w-full flex items-center bg-gray-50 justify-center">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <!-- Todo: use v-for -->

        <Tab
          v-for="(item, index) in tabList"
          :key="index"
          :rounded="index === 0 ? 'left' : index === tabList.length - 1 ? 'right' : ''"
          :title="item.title"
          :path="item.path"
        />
      </div>

      <div class="relative flex w-full items-center justify-end gap-4 md:gap-5">
        <CInput
          @input="getSearchResults(search)"
          v-model="search"
          placeholder="Qidirish"
          class="md:max-w-[284px] py-[15px] w-full"
        />
        <div
          v-if="search.length !== 0"
          class="absolute md:max-w-[434px] rounded-md p-4 shadow-xl w-full bg-white top-16"
        >
          {{ searchResults.length === 0 ? 'Bunday malumot mavjud emas :(' : searchResults }}
        </div>

        <CButton @click="filterModal.openModal" variant="primary" class="px-8 max-w-32">
          <span class="flex items-center justify-center gap-[10px]">
            Filter
            <img src="/filter.svg" alt="filter icon" />
          </span>
        </CButton>
      </div>
    </div>
  </div>

  <FilterModal v-show="filterModal.modalValue" @closeModal="filterModal.closeModal" />
</template>

<script setup>
import { ref } from 'vue'

import Tab from '@/components/Base/Tab.vue'
import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import FilterModal from '@/components/Base/FilterModal.vue'

import { useModal } from '@/composables/useModal'
import { useDataStore } from '@/stores'

defineProps(['variant'])

const { modal } = useModal()

const filterModal = modal()

const tabList = [
  {
    path: 'Statistics',
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
