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
          <RouterLink :to="{ name: 'Sponsors' }" class="cursor-pointer">
            <img src="/back.svg" alt="arrow left" />
          </RouterLink>
          <p class="text-slate-900 text-2xl font-bold">{{ data?.full_name }}</p>
          <CBadge :status="data?.get_status_display"></CBadge>
        </div>
      </div>
    </header>

    <div class="w-full h-full p-[32px] bg-gray-50 flex flex-col justify-between">
      <article class="max-w-[793px] w-full bg-white p-8 mx-auto rounded-xl">
        <div
          class="flex items-start sm:items-center flex-col gap-8 sm:flex-row sm:gap-0 justify-between"
        >
          <p class="text-slate-900 text-2xl font-bold">Homiy haqida</p>
          <CButton @click="editSponsorModal.openModal" class="sm:max-w-[166px]" variant="primary">
            <span class="flex items-center justify-center gap-[10px]">
              Tahrirlash <img src="/pen.svg" alt="pen icon for editing" />
            </span>
          </CButton>
        </div>
        <div class="flex items-center gap-5 mt-8">
          <div class="bg-slate-50 w-16 h-16 flex items-center justify-center rounded-md">
            <img class="p-4" src="/person.svg" alt="default person image" />
          </div>
          <p class="text-zinc-800 md:max-w-[163px] font-bold">{{ data?.full_name }}</p>
        </div>
        <div class="flex w-full flex-col gap-8 sm:flex-row sm:gap-0 mt-6 justify-between">
          <div class="flex flex-col items-start gap-3">
            <p class="uppercase text-slate-400 text-sm">telefon raqam</p>
            <p class="text-zinc-800 font-medium">{{ data?.phone }}</p>
          </div>
          <div class="flex flex-col items-start gap-3">
            <p class="uppercase text-slate-400 text-sm">Homiylik summasi</p>
            <p class="text-zinc-800 font-medium">{{ data?.sum }} UZS</p>
          </div>
        </div>
      </article>
      <img class="mx-auto -mb-10" src="/bgImage.svg" alt="details background image on the bottom" />
    </div>

    <EditSponsorModal
      @getSponsorDetails="getSponsorDetails(route.params.id)"
      v-show="editSponsorModal.modalValue"
      :modalValue="editSponsorModal.modalValue"
      :closeModalOverlay="editSponsorModal.closeModalOverlay"
      :closeModal="editSponsorModal.closeModal"
    />
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import CBadge from '@/components/Base/CBadge.vue'
import CButton from '@/components/Base/CButton.vue'
import EditSponsorModal from './components/EditSponsorModal.vue'

import { useModal } from '@/composables/useModal'

import { useSponsors } from '@/stores/sponsors'

import { useRoute } from 'vue-router'

const { modal } = useModal()
const sponsors = useSponsors()

const editSponsorModal = modal()

const route = useRoute()

let data = ref(null)

let loading = ref(false)

const getSponsorDetails = async () => {
  loading.value = true
  await sponsors.getSponsorDetails(route.params.id)
  loading.value = false
  data.value = sponsors.sponsors?.details
}

onMounted(async () => {
  loading.value = true
  await getSponsorDetails()
  loading.value = false

  data.value = sponsors.sponsors?.details
})
</script>
