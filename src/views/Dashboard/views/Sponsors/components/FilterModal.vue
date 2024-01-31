<template>
  <CModal>
    <template v-slot:title>Tahrirlash</template>
    <template v-slot:body>
      <div class="flex flex-col items-start gap-4">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        {{ filterData.status }}
        <CDropdown v-model="filterData.status" property="name" :options="options"></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        {{ filterData.money }}
        <CSelect v-model="filterData.money"></CSelect>
      </div>
    </template>

    <template v-slot:footer>
      <CButton variant="primary" text="Tozalash">
        <img src="/clear.svg" alt="default clear icon" />
      </CButton>
      <CButton @click="filterData" variant="secondary" text="Natijalarni ko‘rish">
        <img src="/eyeWhite.svg" alt="eye icon" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CModal from '@/components/CModal/CModal.vue';
import CSelect from '@/components/CSelect/CSelect.vue';
import { useDataStore } from '@/stores/data';

const store = useDataStore()

const options = [
  { id: 'Barchasi', name: 'Barchasi' },
  { id: 'Yangi', name: 'Yangi' },
  { id: 'Moderatsiyada', name: 'Moderatsiyada' },
  { id: 'Tasdiqlangan', name: 'Tasdiqlangan' },
  { id: 'Bekor qilingan', name: 'Bekor qilingan' }
]

const filterSponsor = ref({
  status: 'Barchasi',
  money: 'Barchasi'
})


const filterData = () => {
  if (filterSponsor.value.status == 'Barchasi' && filterSponsor.value.money == 'all') {
    return
  }
  store.data.results = store.data.results.filter((item) => {
    if (
      item.sum < filterSponsor.value.money ||
      item.get_status_display == filterSponsor.value.status.name
    ) {
      return item
    }
  })

  // closeModal()
}
</script>
