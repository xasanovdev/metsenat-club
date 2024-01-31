<template>
  <CModal>
    <template v-slot:title>Homiy qo‘shish</template>
    <template v-slot:body>
      <div>
        <label>
          <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">OTM</p>
          {{ filterSponsor.sponsor }}
          <CDropdown
            v-model="filterSponsor.sponsor"
            property="full_name"
            :options="store?.sponsorsList?.results"
          />
          <span class=" text-red-500">{{ data?.sponsor[0] }}</span>
        </label>
      </div>
      <div class="mt-7">
        <label>
          <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Ajratilingan summa</p>
          {{ filterSponsor.summa }}
          <CInput
            v-model="filterSponsor.summa"
            type="string"
            placeholder="Abdullayev Abdulla Abdulla o’g’li"
          />

          <span class=" text-red-500">{{ data?.summa[0] }}</span>
        </label>
      </div>
    </template>

    <template v-slot:footer>
      <span>{{ data }}</span>
      <CButton @click="addSponsor" text="Qo‘shish" class="px-8" variant="secondary">
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
import { useFetch } from '@/composables/useFetch';
import { useDataStore } from '@/stores/data';

const route = useRoute()

const filterSponsor = ref({
  sponsor: '',
  summa: ''
})

const store = useDataStore()
const data = ref(null)

console.log(store?.sponsorsList)

const { post } = useFetch()

const addSponsor = async () => {
  try {
    const response = await post('sponsor-summa-create/', {
      sponsor: filterSponsor.value.sponsor.id,
      summa: filterSponsor.value.summa,
      student: route.params.id
    })
    data.value = response
    filterSponsor.value.sponsor = ''
    filterSponsor.value.summa = ''
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>
