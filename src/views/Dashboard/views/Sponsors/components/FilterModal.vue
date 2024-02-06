<template>
  <CModal @childFunction="setChildFunction">
    <template #title>Tahrirlash</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide"
          >Ariza holati</span
        >
        {{ filterSponsor.status }}

        <CDropdown
          v-model="filterSponsor.status"
          property="name"
          :options="optionsStatus"
        ></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <span class="text-[12px] text-neutral-800 font-medium uppercase tracking-wide"
          >Ariza holati</span
        >
        {{ filterSponsor.money }}
        <CSelect v-model="filterSponsor.money"></CSelect>
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
import CModal from '@/components/Common/CModal.vue'
import CSelect from '@/components/Base/CSelect.vue'
import { useDataStore } from '@/stores'
import { optionsStatus } from '@/utils'

const store = useDataStore()

const filterSponsor = ref({
  status: '',
  money: ''
})
const childFunction = ref(null)

const setChildFunction = (func) => {
  childFunction.value = func
}
const filterSponsors = () => {
  childFunction.value()
}

const clear = () => {
  filterSponsor.value.status = ''
  filterSponsor.value.money = ''
}
</script>
