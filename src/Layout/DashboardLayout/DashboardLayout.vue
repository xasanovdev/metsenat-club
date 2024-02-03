<template>
  <header class="w-full bg-[#FCFCFC]">
    <div class="w-full bg-white py-3">
      <nav class="container mx-auto flex px-6 justify-between items-center">
        <RouterLink :to="{ name: 'Dashboard' }">
          <img src="/logo.svg" alt="page logo image" />
        </RouterLink>
        <div class="flex items-center gap-4 md:gap-8 lg:gap-10">
          <div
            class="bg-[#F1F1F3] gap-4 p-1 max-w-[133px] rounded-md flex items-center justify-center"
          >
            <div class="text-slate-900 hidden font-bold sm:inline-block">Ibrohim</div>
            <div class="bg-[#00AE69] w-8 h-8 flex items-center justify-center rounded-md">
              <img class="mt-2" src="/user.svg" alt="asfsa" />
            </div>
          </div>
          <div class="cursor-pointer" @click="logout">
            <img class="" src="/logOut.svg" alt="page logo image" />
          </div>
        </div>
      </nav>
    </div>
  </header>

  <slot />
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const { clearToken } = useAuthStore()

const logout = () => {
  clearToken()

  router.push({ name: 'Auth' })
}
</script>
