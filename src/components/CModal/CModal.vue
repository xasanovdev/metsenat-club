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
            <img src="../../../public/close.svg" alt="close" />
          </div>
        </div>
        <hr class="my-7" />

        <div class="">
          <slot name="body"></slot>
        </div>

        <hr class="my-7" />

        <div class="flex items-center justify-end gap-4">
          <slot name="footer"></slot>
          <CButton @click="filterData" variant="secondary" text="Natijalarni ko‘rish">
            <img src="../../../../../public/eyeWhite.svg" alt="">
        </CButton>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { useDataStore } from '@/stores/data';
import { computed, ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps(['modalValue', 'closeModal','closeModalOverlay','filterData','filterStudent'])

const isLoading = ref(false)

const dataList = ref([])

const store = useDataStore()



const filterData = () => {

  console.log(route.meta);
  console.log(dataList.value);
  if(route.meta.title === 'Sponsors'){
    if(props.filterData.status == 'Barchasi' && props.filterData.money == 'all'){
    return
  }
  store.data.results = store.data.results.filter((item) => {
    if(item.sum < props.filterData.money || item.get_status_display == props.filterData.status.name){
       return item
    }
  })
  } else if (route.meta.title === 'Students'){

    const filterStudentType = computed(() => {
      return props?.filterStudent?.type.name === 'Bakalavr' ? '1' : '2'
    })

    store.data.results = store.data.results.filter((item) => {
    console.log(props.filterStudent);
      if(item.type == filterStudentType.value || item.institute.id == props.filterStudent.institute.id){
         return item
      }
    })
  }

  props.closeModal()
}
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
