<template>
  <template v-if="loading">
    <article class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">loading...</div>
    </article>
  </template>

  <template v-else>
    <EditSponsorModal
      v-show="editSponsorModal.modalValue"
      :modalValue="editSponsorModal.modalValue"
      :closeModalOverlay="editSponsorModal.closeModalOverlay"
      :closeModal="editSponsorModal.closeModal"
      >Edit Modal</EditSponsorModal
    >

    <header class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">
        <div class="w-full flex items-center gap-4">
          <div class="cursor-pointer" @click="$router.go(-1)">
            <img src="/back.svg" alt="arrow left" />
          </div>
          <p class="text-[#28293D] text-2xl font-bold">{{ data?.full_name }}</p>
          <CBadge :status="data?.get_status_display"></CBadge>
        </div>
      </div>
    </header>

    <div class="w-full h-full p-[32px] bg-[#F5F5F7] flex flex-col justify-between">
      <article class="max-w-[793px] w-full bg-white p-8 mx-auto rounded-xl">
        <div
          class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
        >
          <p class="text-[#28293D] text-2xl font-bold">Homiy haqida</p>
          <CButton
            @click="editSponsorModal.openModal"
            text="Tahrirlash"
            class="px-8"
            variant="primary"
          >
            <img src="/pen.svg" alt="pen icon for editing" />
          </CButton>
        </div>
        <div class="flex items-center gap-5 mt-8">
          <div class="bg-[#EAECF0] w-16 h-16 flex items-center justify-center rounded-md">
            <img class="p-4" src="/person.svg" alt="default person image" />
          </div>
          <p class="text-[#212121] max-w-[163px] font-bold">{{ data?.full_name }}</p>
        </div>
        <div class="flex w-full flex-col gap-8 sm:flex-row sm:gap-0 mt-6 justify-between">
          <div class="flex flex-col items-start gap-3">
            <p class="uppercase text-[#B5B5C3] text-sm">telefon raqam</p>
            <p class="text-[#212121] font-medium">{{ data?.phone }}</p>
          </div>
          <div class="flex flex-col items-start gap-3">
            <p class="uppercase text-[#B5B5C3] text-sm">Homiylik summasi</p>
            <p class="text-[#212121] font-medium">{{ data?.sum }} UZS</p>
          </div>
        </div>
      </article>
      <img class="mx-auto -mb-10" src="/bgImage.svg" alt="details background image on the bottom" />
    </div>
  </template>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import { useRoute } from 'vue-router';

import CBadge from '@/components/CBadge/CBadge.vue';
import CButton from '@/components/CButton/CButton.vue';
import { useFetch } from '@/composables/useFetch/useFetch';
import { useModal } from '@/composables/useModal/useModal';

import EditSponsorModal from './components/EditSponsorModal.vue';

const { modal } = useModal()

const editSponsorModal = modal()


const route = useRoute()
const pageId = ref(route.params.id)

const { get, loading } = useFetch()
const data = ref(null)

const fetchData = async () => {
  try {
    const response = await get(`${`sponsor-detail/${pageId.value}`}`)
    data.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
