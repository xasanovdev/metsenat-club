<template>
  <CModal>
    <template v-slot:title>Homiy qo‘shish</template>
    <template v-slot:body>
      <div>
        <label>
          <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</p>
          {{ filterSponsor.sponsor }}
          <CDropdown v-model="filterSponsor.sponsor" :options="store?.sponsorsList?.results" />
        </label>
      </div>
      <div>
        <label>
          <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Telefon raqam</p>
          {{ filterSponsor.student }}
          <CInput
            v-model="filterSponsor.student"
            type="string"
            placeholder="Abdullayev Abdulla Abdulla o’g’li"
          />
        </label>
      </div>
    </template>

    <template v-slot:footer>
      <CButton text="Qo‘shish" class="px-8" variant="secondary">
        <img src="/plusWhite.svg" alt="" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { ref } from 'vue';

import { useRoute } from 'vue-router';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CInput from '@/components/CInput/CInput.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useDataStore } from '@/stores/data';

const route = useRoute()

const filterSponsor = ref({
  sponsor: '',
  student: ''
})

const store = useDataStore()

console.log(store.sponsorsList)
</script>
