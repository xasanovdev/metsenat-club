

<template>
  <div class="py-6 w-full flex items-center justify-center">
      <div
        class="max-w-[1200px] w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
      >
      
        <div
          class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
        >
          <router-link class="flex-1 inline-block" to="/dashboard">
            <CTabButton path="/dashboard" buttonText="Dashboard" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/sponsors">
            <CTabButton path="/sponsors" buttonText="Homiylar" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/students">
            <CTabButton path="/students" buttonText="Talabalar" />
          </router-link>
        </div>
        <div class="flex w-full items-center justify-end gap-4 md:gap-5">
          <CInput
            v-model="search"
            placeholder="Qidirish"
            class="md:max-w-[284px] py-[15px] w-full"
          />

          <router-link class="inline-block" to="/sponsors/filter">
            <CTabButton path="/sponsors/filter" class="flex-1 px-8 w-full" buttonText="Filter">
              <img class="/sponsors/filter" src="../../../../../public/filter.svg" alt="asfsa" />
            </CTabButton>
          </router-link>
        </div>
      </div>
    </div>

  <div>
    salom
  </div>
</template>


<script setup>

import CTabButton from '@/components/CTabButton/CTabButton.vue';
import CInput from '@/components/CInput/CInput.vue';

import { ref } from 'vue';

const search = ref('')
</script>
