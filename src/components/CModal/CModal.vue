<template>
  <template v-if="isLoading">
    <div>Salom</div>
  </template>

  <template v-else>
    <div
      @click="closeModalOverlay"
      class="flex items-center z-50 justify-center top-0 left-0 fixed w-screen h-screen bg-black bg-opacity-60"
    >
      <div
        @click.stop
        class="modal-content bg-white w-[640px] p-7 max-h-[85vh] overflow-y-auto rounded-xl"
      >
        <div class="flex items-center justify-between">
          <div class="font-bold text-2xl">
            <slot name="title"></slot>
          </div>

          <div class="cursor-pointer" @click="closeModal">
            <img src="/close.svg" alt="close icon" />
          </div>
        </div>
        <hr class="my-7" />

        <div class="">
          <slot name="body"></slot>
        </div>

        <hr class="my-7" />

        <div class="flex items-center justify-end gap-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['modalValue', 'closeModal', 'closeModalOverlay'])

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
