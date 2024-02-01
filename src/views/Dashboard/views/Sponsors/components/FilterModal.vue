<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        {{ filterSponsor.status }}
        <CDropdown v-model="filterSponsor.status" property="name" :options="options"></CDropdown>
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        {{ filterSponsor.money }}
        <CSelect v-model="filterSponsor.money"></CSelect>
      </div>
    </template>

    <template #footer>
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
import { ref } from 'vue'

import CButton from '@/components/CButton/CButton.vue'
import CDropdown from '@/components/CDropdown/CDropdown.vue'
import CModal from '@/components/CModal/CModal.vue'
import CSelect from '@/components/CSelect/CSelect.vue'
import { useDataStore } from '@/stores/data'

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
  if (filterSponsor.value.status == 'Barchasi' || filterSponsor.value.money == 'All') {
    return
  }

  store.sponsorsList.results = store?.sponsorsList?.results.filter((item) => {
    // Check if item.sum is greater than or equal to filterSponsor.value.money
    // and item.get_status_display is not equal to filterSponsor.value.status
    if (
      item.sum <= filterSponsor.value.money ||
      item.get_status_display === filterSponsor.value.status
    ) {
      console.log('Item', item, 'filterSponsor', filterSponsor.value)

      return item
    }
  })

  // closeModal()
}
</script>
