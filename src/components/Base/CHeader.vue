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
    </div>
  </div>
</template>

<script setup>
import { useSponsors } from '@/stores/sponsors.js'
import { useStudents } from '@/stores/students.js'
import CTabButton from './CTabButton.vue'

const sponsors = useSponsors()
const students = useStudents()
</script>
