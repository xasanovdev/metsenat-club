<template>
  <template v-if="loading">
    <article class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">loading...</div>
    </article>
  </template>

  <template v-else>
    <EditStudentModal
      :data="data"
      v-show="editStudentModal.modalValue"
      :modalValue="editStudentModal.modalValue"
      :closeModalOverlay="editStudentModal.closeModalOverlay"
      :closeModal="editStudentModal.closeModal"
      >Edit Modal</EditStudentModal
    >
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
      <div>
        <article class="max-w-[793px] w-full bg-white p-8 mx-auto rounded-xl">
          <div
            class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
          >
            <p class="text-[#28293D] text-2xl font-bold">Talaba haqida</p>
            <CButton
              @click="editStudentModal.openModal"
              text="Tahrirlash"
              class="px-8"
              variant="primary"
            >
              <img src="/pen.svg" alt="pen icon for editing" />
            </CButton>
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-[#E4E8F0]"></div>
            <p
              class="absolute bg-[#E5EBFF] py-[2px] px-[11px] rounded-md text-[#3366FF] font-medium text-[12px]"
            >
              Asosiy ma’lumotlar
            </p>
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
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-[#E4E8F0]"></div>
            <p
              class="absolute bg-[#E5EBFF] py-[2px] px-[11px] rounded-md text-[#3366FF] font-medium text-[12px]"
            >
              O‘qish joyi haqida ma’lumot
            </p>
          </div>

          <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6 mt-8">
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-[#B5B5C3] text-sm">OTM</p>
              <p class="text-[#212121] font-medium">{{ data?.institute.name }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-[#B5B5C3] text-sm">Talabalik turi</p>
              <p class="text-[#212121] font-medium">
                {{ data?.type === 1 ? 'Bakalavr' : 'Magistr' }}
              </p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-[#B5B5C3] text-sm">Ajratilingan summa</p>
              <p class="text-[#212121] font-medium">{{ data?.given }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-[#B5B5C3] text-sm">Kontrakt miqdori</p>
              <p class="text-[#212121] font-medium">{{ data?.contract }}</p>
            </div>
          </div>
        </article>

        <article class="max-w-[793px] bg-white p-8 mx-auto rounded-xl mt-10">
          <div
            class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
          >
            <p class="text-[#28293D] text-2xl font-bold">Talabaga homiylar</p>
            <CButton
              @click="editSponsorModal.openModal"
              text="Homiy qo‘shish"
              class="px-8"
              variant="primary"
            >
              <img src="/plus.svg" alt="default plus icon" />
            </CButton>
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-[#E4E8F0]"></div>
            <p
              class="absolute bg-[#E5EBFF] py-[2px] px-[11px] rounded-md text-[#3366FF] font-medium text-[12px]"
            >
              Asosiy ma’lumotlar
            </p>
          </div>

          <div>
            <table>
              <thead></thead>
            </table>
          </div>
        </article>
      </div>

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

import EditSponsorModal from './EditSponsorModal.vue';
import EditStudentModal from './EditStudentModal.vue';

const route = useRoute()
const pageId = ref(route.params.id)

const { modal } = useModal()

const editSponsorModal = modal()

const editStudentModal = modal()


const { get, loading } = useFetch()
const data = ref(null)
const sponsors = ref(null)

const fetchData = async () => {
  try {
    const response = await get(`${`student-detail/${pageId.value}`}`)
    const studentSponsors = await get(`${`student-sponsor/${pageId.value}`}`)
    sponsors.value = studentSponsors
    data.value = response

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
