<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <div class="flex flex-col items-start gap-4">
        <span class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide"
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
        <span class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide"
          >Ariza holati</span
        >
        {{ filterSponsor.money }}
        <CSelect v-model="filterSponsor.money"></CSelect>
      </div>
    </template>

    <template #footer>
      <CButton variant="primary">
        <span class="flex items-center justify-center gap-[10px]">
          Tozalash <img src="/clear.svg" alt="white plus icon" />
        </span>
      </CButton>
      <CButton @click="filterData" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Natijalarni ko‘rish <img src="/eyeWhite.svg" alt="eye icon" />
        </span>
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
import { optionsStatus } from '@/utils/lists'

const store = useDataStore()

const filterSponsor = ref({
  status: '',
  money: ''
})

const filterData = () => {
  if (filterSponsor.value.status == 'Barchasi' || filterSponsor.value.money == 'all') {
    return
  }

  store.sponsorsList.results = store?.sponsorsList?.results.filter((item) => {
    if (
      item.sum <= filterSponsor.value.money ||
      item.get_status_display === filterSponsor.value.status
    ) {
      return item
    }
  })

  // closeModal()
}
</script>
