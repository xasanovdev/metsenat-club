<template>
  <header class="w-full bg-[#FCFCFC]">
    <div class="w-full bg-white py-3">
      <nav class="max-w-[1200px] mx-auto flex px-6 justify-between items-center">
        <div class="logo">
          <img src="../../../public/logo.svg" alt="asfsa" />
        </div>
        <div class="flex items-center gap-4 md:gap-8 lg:gap-10">
          <div
            class="bg-[#F1F1F3] gap-6 p-1 max-w-[133px] rounded-md flex items-center justify-center"
          >
            <div class="text-slate-900 hidden sm:inline-block">Shohrux</div>
            <div class="bg-[#00AE69] w-8 h-8 flex items-center justify-center rounded-md">
              <img class="mt-2" src="../../../public/user.svg" alt="asfsa" />
            </div>
          </div>
          <div>
            <img class="" src="../../../public/logOut.svg" alt="asfsa" />
          </div>
        </div>
      </nav>
    </div>

    <div class="py-6 w-full flex items-center justify-center">
      <div
        class="max-w-[1200px] w-full mx-auto flex flex-col gap-4 md:flex-row px-6 justify-between items-center"
      >
        <div
          class="flex items-center text-center rounded-md overflow-hidden justify-center w-full md:max-w-[579px]"
        >
          <router-link class="flex-1 inline-block" to="/dashboard">
            <CButton path="/dashboard" buttonText="Dashboard" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/sponsors">
            <CButton path="/sponsors" buttonText="Homiylar" />
          </router-link>
          <router-link class="flex-1 inline-block" to="/students">
            <CButton path="/students" buttonText="Talabalar" />
          </router-link>
        </div>
        <div class="flex w-full items-center justify-end gap-4 md:gap-5">
          <CInput
            v-model="search"
            placeholder="Qidirish"
            class="md:max-w-[284px] py-[15px] w-full"
          />
          <router-link class="inline-block" to="students">
            <CButton path="/students" class="flex-1 px-8 w-full" buttonText="Filter">
              <img class="" src="../../../public/filter.svg" alt="asfsa" />
            </CButton>
          </router-link>
        </div>
      </div>
    </div>
  </header>

  <router-view> </router-view>
</template>

<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CInput from '@/components/CInput/CInput.vue';

const search = ref('')
</script>
