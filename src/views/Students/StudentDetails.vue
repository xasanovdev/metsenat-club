<template>
  <template v-if="loading">
    <article class="w-full py-[30px] bg-slate-50">
      <div class="container mx-auto px-6">loading...</div>
    </article>
  </template>

  <template v-else>
    <header class="w-full py-[30px] bg-slate-50">
      <div class="container mx-auto px-6">
        <div class="w-full flex items-center gap-4">
          <RouterLink :to="{ name: 'Students' }" class="cursor-pointer">
            <img src="/back.svg" alt="arrow left" />
          </RouterLink>
          <p class="text-slate-900 text-2xl font-bold">{{ studentDetails?.full_name }}</p>
          <CBadge :status="studentDetails?.get_status_display"></CBadge>
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
            <CButton class="sm:max-w-[166px]" @click="editStudentModal.openModal" variant="primary">
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
            <p class="text-zinc-800 max-w-[163px] font-bold">{{ studentDetails?.full_name }}</p>
          </div>
          <div class="flex w-full flex-col gap-8 sm:flex-row sm:gap-0 mt-6 justify-between">
            <div class="flex flex-col items-start gap-3">
              <p class="uppercase text-slate-400 text-sm">telefon raqam</p>
              <p class="text-zinc-800 font-medium">
                <a :href="`tel:${studentDetails?.phone}`">
                  {{ studentDetails?.phone }}
                </a>
              </p>
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
              <p class="uppercase text-slate-400 text-sm">OTM</p>
              <p class="text-zinc-800 font-medium">{{ studentDetails?.institute?.name }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-slate-400 text-sm">Talabalik turi</p>
              <p class="text-zinc-800 font-medium">
                {{ studentDetails?.type === 1 ? 'Bakalavr' : 'Magistr' }}
              </p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-slate-400 text-sm">Ajratilingan summa</p>
              <p class="text-zinc-800 font-medium">{{ formatNumber(studentDetails?.given) }}</p>
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="uppercase text-slate-400 text-sm">Kontrakt miqdori</p>
              <p class="text-zinc-800 font-medium">{{ formatNumber(studentDetails?.contract) }}</p>
            </div>
          </div>
        </article>

        <article class="max-w-[793px] bg-white p-8 mx-auto rounded-xl mt-10">
          <div
            class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
          >
            <p class="text-slate-900 text-2xl font-bold">Talabaga homiylar</p>
            <CButton
              @click="openAddSponsorModal"
              class="sm:max-w-52 whitespace-nowrap"
              variant="primary"
            >
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

          <div class="mt-8 overflow-hidden overflow-x-scroll">
            <ul class="w-full list-none p-0 min-w-[726px]">
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
              <div v-if="sponsorsList.length === 0" class="px-[14px] py-[22px]">
                <span class="w-full">Hamkorlar mavjud emas.</span>
              </div>

              <li class="mb-2" v-for="(sponsor, index) in sponsorsList" :key="sponsor.id">
                <div
                  class="flex bg-gray-50 items-center justify-center border border-slate-300 rounded-lg px-[14px] py-[22px]"
                >
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

    <EditStudentModal
      v-if="studentDetails.contract"
      :studentDetails="studentDetails"
      @getStudentDetails="getStudentDetails"
      v-show="editStudentModal.modalValue"
      @closeModal="editStudentModal.closeModal"
    />

    <!-- <EditSponsorModal
      :studentSponsorData="studentSponsorData"
      @getStudentDetails="getStudentDetails"
      v-show="editSponsorModal.modalValue"
      @closeModal="editSponsorModal.closeModal"
    />
    <AddSponsorModal
      @getStudentDetails="getStudentDetails"
      v-show="addSponsorModal.modalValue"
      @closeModal="addSponsorModal.closeModal"
    /> -->
    <ActionsSponsorModal
      v-if="studentSponsorData"
      :isEdit="isEdit"
      :studentSponsorData="studentSponsorData"
      @getStudentDetails="getStudentDetails"
      v-show="actionsSponsorModal.modalValue"
      @closeModal="actionsSponsorModal.closeModal"
    />
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CButton from '@/components/Base/CButton.vue'
import EditStudentModal from './components/EditStudentModal.vue'

import ActionsSponsorModal from './components/ActionsSponsorModal.vue'

import { useModal } from '@/composables/useModal'

import { useStudents } from '@/stores/students'

import { formatNumber } from '@/utils'

import { useRoute } from 'vue-router'

const route = useRoute()

const studentDetailsId = ref(route.params.id)

const studentDetails = ref({})
const sponsorsList = ref([])

const studentSponsorData = ref({})

const getEditSponsorModalData = (sponsor) => {
  studentSponsorData.value = sponsor
  actionsSponsorModal.openModal()
  isEdit.value = true
}
const openAddSponsorModal = () => {
  actionsSponsorModal.openModal()
  isEdit.value = false
}

const loading = ref(false)

const students = useStudents()

const { modal } = useModal()

const editStudentModal = modal()

const actionsSponsorModal = modal()

const isEdit = ref(false)

const getStudentDetails = async () => {
  loading.value = true

  studentDetails.value = await students.getStudentDetails(studentDetailsId.value)
  await students.getStudentSponsors(studentDetailsId.value)

  sponsorsList.value = students.students.sponsors

  console.log(studentDetails.value)

  loading.value = false
}

onMounted(async () => {
  await getStudentDetails()
})
</script>
