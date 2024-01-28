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
  </header>

  <slot />
</template>

<script setup></script>
