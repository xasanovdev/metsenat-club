<template>
  <template v-if="isLoading">
    <div>Salom</div>
  </template>

  <template v-else>
    <div
      @click="closeModalOverlay"
      class="flex items-center justify-center top-0 left-0 fixed w-screen h-screen bg-black bg-opacity-60"
    >
      <div
        @click.stop
        class="modal-content bg-white w-[600px] p-7 max-h-[85vh] overflow-y-auto rounded-xl"
      >
        <div class="flex items-center justify-between">
          <div class="font-bold text-2xl">
            <slot name="title"></slot>
          </div>

          <div class="cursor-pointer" @click="closeModal">
            <img src="../../../public/close.svg" alt="close" />
          </div>
        </div>
        <hr class="my-7" />

        <div class="px-6 py-4">
          <slot name="body"></slot>
        </div>

        <hr class="my-7" />

        <div class="flex items-center justify-end px-6 py-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue';

import { useModal } from '@/composables/useModal/useModal';

const { closeModal, closeModalOverlay } = useModal()
const isLoading = ref(false)
</script>

<style>
.fade {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
