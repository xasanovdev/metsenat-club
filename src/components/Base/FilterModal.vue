<template>
  <CModal @closeModal="emit('closeModal')">
    <template #title>Tahrirlashasfsaf</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide"
          >Ariza holati</span
        >

        <CDropdown
          v-model="filterSponsor.status"
          property="name"
          placeholder="Shaxsni holatingi kiriting."
          :options="optionsStatus"
        ></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide"
          >Ariza holati</span
        >

        <CSelect v-model="filterSponsor.money" :filterOptions="filterOptions"></CSelect>
      </div>
    </template>

    <template #footer>
      <CButton @click="clear" variant="primary">
        <span class="flex items-center justify-center gap-[10px]">
          Tozalash <img src="/clear.svg" alt="white plus icon" />
        </span>
      </CButton>
      <CButton @click="filterSponsors" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Natijalarni ko‘rish <img src="/eyeWhite.svg" alt="eye icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Base/CModal.vue'
import CSelect from '@/components/Base/CSelect.vue'

import { optionsStatus, filterOptions } from '@/utils'

const emit = defineEmits(['closeModal'])

const filterSponsor = ref({
  status: '',
  money: ''
})

const filterSponsors = () => {
  // filter codes
  emit('closeModal')
}

const clear = () => {
  filterSponsor.value.status = ''
  filterSponsor.value.money = ''
}
</script>
