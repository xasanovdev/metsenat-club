<template>
  <div class="py-6 w-full flex items-center bg-gray-50 justify-center">
    <div
      class="container w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
    >
      <div
        class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
      >
        <RouterLink class="flex-1 inline-block" :to="{ name: 'Dashboard' }">
          <CTabButton path="/dashboard" buttonText="Dashboard" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Sponsors',
            query: {
              page: sponsors.sponsorsCurrentPage,
              page_size: sponsors.paginationCountSponsors
            }
          }"
        >
          <CTabButton path="/sponsors" buttonText="Homiylar" />
        </RouterLink>
        <RouterLink
          class="flex-1 inline-block"
          :to="{
            name: 'Students',
            query: {
              page: students.studentsCurrentPage,
              page_size: students.paginationCountStudents
            }
          }"
        >
          <CTabButton path="/students" buttonText="Talabalar" />
        </RouterLink>
      </div>

      <div
        v-if="currentPath !== 'Dashboard'"
        class="flex w-full items-center justify-end gap-4 md:gap-5"
      >
        <CInput v-model="search" placeholder="Qidirish" class="md:max-w-[284px] py-[15px] w-full" />
        <CButton @click="emit('openModal')" variant="primary" class="px-8">
          <span class="flex items-center justify-center gap-[10px]">
            Filter
            <img src="/filter.svg" alt="filter icon" />
          </span>
        </CButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSponsors } from '@/stores/sponsors.js'
import { useStudents } from '@/stores/students.js'
import CTabButton from '@/components/Base/CTabButton.vue'
import CButton from '@/components/Base/CButton.vue'
import CInput from '@/components/Base/CInput.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const emit = defineEmits(['openModal'])

const router = useRouter()

const currentPath = ref(router.currentRoute.value.name)

console.log(emit)

const sponsors = useSponsors()
const students = useStudents()
</script>
