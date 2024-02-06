<template>
  <template v-if="loading">
    <article class="w-full py-[30px] bg-slate-50">
      <div class="container mx-auto px-6">loading...</div>
    </article>
  </template>

  <template v-else>
    <EditStudentModal
      v-show="editStudentModal.modalValue"
      :modalValue="editStudentModal.modalValue"
      :closeModalOverlay="editStudentModal.closeModalOverlay"
      :closeModal="editStudentModal.closeModal"
    ></EditStudentModal>

    <EditSponsorModal
      v-show="editSponsorModal.modalValue"
      :modalValue="editSponsorModal.modalValue"
      :closeModalOverlay="editSponsorModal.closeModalOverlay"
      :closeModal="editSponsorModal.closeModal"
    ></EditSponsorModal>

    <AddSponsorModal
      v-show="addSponsorModal.modalValue"
      :modalValue="addSponsorModal.modalValue"
      :closeModalOverlay="addSponsorModal.closeModalOverlay"
      :closeModal="addSponsorModal.closeModal"
    ></AddSponsorModal>

    <header class="w-full py-[30px] bg-slate-50">
      <div class="container mx-auto px-6">
        <div class="w-full flex items-center gap-4">
          <RouterLink :to="{ name: 'Students' }" class="cursor-pointer">
            <img src="/back.svg" alt="arrow left" />
          </RouterLink>
          <p class="text-slate-900 text-2xl font-bold">{{ data?.full_name }}</p>
          <CBadge :status="data?.get_status_display"></CBadge>
        </div>
      </div>
    </header>
    <div class="w-full h-full p-[32px] bg-gray-50 flex flex-col justify-between">
      <div>
        <article class="max-w-[793px] w-full bg-white p-8 mx-auto rounded-xl">
          <div
            class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
          >
            <p class="text-slate-900 text-2xl font-bold">Talaba haqida</p>
            <CButton @click="editStudentModal.openModal" class="px-8" variant="primary">
              <span class="flex items-center justify-center gap-[10px]">
                Tahrirlash <img src="/pen.svg" alt="pen icon for editing" />
              </span>
            </CButton>
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-blue-50"></div>
            <p
              class="absolute bg-] py-[2px] px-[11px] rounded-md text-blue-700 font-medium text-[12px]"
            >
              Asosiy ma’lumotlar
            </p>
          </div>

          <div class="flex items-center gap-5 mt-8">
            <div class="bg-slate-50 w-16 h-16 flex items-center justify-center rounded-md">
              <img class="p-4" src="/person.svg" alt="default person image" />
            </div>
            <p class="text-zinc-800 max-w-[163px] font-bold">{{ data?.full_name }}</p>
          </div>
          <div class="flex w-full flex-col gap-8 sm:flex-row sm:gap-0 mt-6 justify-between">
            <div class="flex flex-col items-start gap-3">
              <p class="uppercase text-indigo-100 text-sm">telefon raqam</p>
              <p class="text-zinc-800 font-medium">{{ data?.phone }}</p>
            </div>
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-blue-50"></div>
            <p
              class="absolute bg-blue-100 py-[2px] px-[11px] rounded-md text-blue-700 font-medium text-[12px]"
            >
              O‘qish joyi haqida ma’lumot
            </p>
          </div>

          <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6 mt-8">
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-indigo-100 text-sm">OTM</p>
              <p class="text-zinc-800 font-medium">{{ data?.institute.name }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-indigo-100 text-sm">Talabalik turi</p>
              <p class="text-zinc-800 font-medium">
                {{ data?.type === 1 ? 'Bakalavr' : 'Magistr' }}
              </p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-indigo-100 text-sm">Ajratilingan summa</p>
              <p class="text-zinc-800 font-medium">{{ data?.given }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-indigo-100 text-sm">Kontrakt miqdori</p>
              <p class="text-zinc-800 font-medium">{{ data?.contract }}</p>
            </div>
          </div>
        </article>

        <article class="max-w-[793px] bg-white p-8 mx-auto rounded-xl mt-10">
          <div
            class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
          >
            <p class="text-slate-900 text-2xl font-bold">Talabaga homiylar</p>
            <CButton @click="addSponsorModal.openModal" class="px-8" variant="primary">
              <span class="flex items-center justify-center gap-[10px]">
                Homiy qo‘shish
                <img src="/plus.svg" alt="default plus icon" />
              </span>
            </CButton>
          </div>
          <!-- Divider -->
          <div class="w-full flex items-center justify-start mt-6">
            <div class="absoulte w-full h-[1px] bg-blue-50"></div>
            <p
              class="absolute bg-blue-100 py-[2px] px-[11px] rounded-md text-blue-700 font-medium text-[12px]"
            >
              Asosiy ma’lumotlar
            </p>
          </div>

          <div class="mt-8">
            <ul class="w-full list-none p-0">
              <!-- Table Header -->
              <li>
                <div class="flex bg-white p-4">
                  <span class="w-1/12 font-bold">#</span>
                  <span class="w-6/12 text-left pl-4">f.i.sh</span>
                  <span class="w-4/12 text-center">Ajratilingan summa</span>
                  <span class="w-1/12">Amallar</span>
                </div>
              </li>

              <!-- Table Rows -->
              <li class="mb-2" v-for="(sponsor, index) in sponsors?.sponsors" :key="sponsor.id">
                <div class="flex bg-gray-50 border border-slate-300 rounded-lg px-[14px] py-[22px]">
                  <span class="w-1/12 font-bold">{{ index + 1 }}</span>
                  <span class="w-6/12 text-left pl-4">{{ sponsor?.sponsor?.full_name }}</span>
                  <span class="w-4/12 text-center"
                    >{{ formatNumber(sponsor?.summa) }}
                    <span class="text-slate-300">UZS</span></span
                  >
                  <span class="w-1/12 flex items-center justify-center">
                    <button @click="getEditSponsorModalData(sponsor)">
                      <img src="/pen.svg" alt="pen icon for editing" />
                    </button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <img class="mx-auto -mb-10" src="/bgImage.svg" alt="details background image on the bottom" />
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import CBadge from '@/components/Base/CBadge.vue'
import CButton from '@/components/Base/CButton.vue'
import { useFetch } from '@/composables/useFetch'
import { useModal } from '@/composables/useModal'
import { useDataStore } from '@/stores'
import { formatNumber } from '@/utils'

import AddSponsorModal from './components/addSponsorModal.vue'
import EditSponsorModal from './components/EditSponsorModal.vue'
import EditStudentModal from './components/EditStudentModal.vue'

const route = useRoute()
const pageId = ref(route.params.id)

const { modal } = useModal()

const editSponsorModal = modal()

const editStudentModal = modal()

const addSponsorModal = modal()

const { get, loading } = useFetch()

const store = useDataStore()

const getEditSponsorModalData = (sponsor) => {
  editSponsorModal.openModal()

  store.editSponsorData = { ...sponsor }
}

const data = ref({})
const sponsors = ref([])

const fetchData = async () => {
  try {
    const response = await get(`${`student-detail/${pageId.value}`}`)
    const studentSponsors = await get(`${`student-sponsor/${pageId.value}`}`)
    sponsors.value = studentSponsors
    store.studentDetails = response

    // data.value = store.
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
@/stores
