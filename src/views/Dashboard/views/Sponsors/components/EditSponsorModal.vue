<template>
  <CModal>
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="flex items-center rounded-lg border-2 border-[3E0E7FF]">
          <CButton
            @click.prevent="personType = 'physical'"
            :class="[
              personType === 'physical' ? 'bg-[#3366FF] text-white' : 'text-[#3366FF] bg-white'
            ]"
            class="flex-1"
            text="Jismoniy shaxs"
          ></CButton>
          <CButton
            :class="[
              personType === 'legal' ? 'bg-[#3366FF] text-white' : 'text-[#3366FF] bg-white'
            ]"
            @click.prevent="personType = 'legal'"
            class="flex-1"
            text="Yuridik shaxs"
          ></CButton>
        </div>

        <div class="grid grid-cols-1 gap-y-7 mt-8">
          <div>
            <label>
              {{ sponsor?.full_name }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </span>
              <CInput v-model="sponsor.full_name" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div>
            <label>
              {{ sponsor?.phone }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium"
                >Telefon raqam</span
              >
              <CInput v-model="sponsor.phone" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
          <div class="col-span-1">
            <label>
              {{ sponsor?.get_status_display }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">Holati</span>
              <CDropdown
                v-model="sponsor.get_status_display"
                property="name"
                :options="optionsStatus"
              />
            </label>
          </div>

          <div v-if="personType === 'legal'">
            <label>
              {{ sponsor?.firm }}
              <span class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium">
                F.I.Sh. (Familiya Ism Sharif)
              </span>
              <CInput v-model="sponsor.firm" placeholder="Abdullayev Abdulla Abdulla o’g’li" />
            </label>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <CButton @click="updateSponsor" text="Saqlash" class="px-8" variant="secondary">
        <img src="/save.svg" alt="" />
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { ref } from 'vue';

import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CInput from '@/components/CInput/CInput.vue';
import CModal from '@/components/CModal/CModal.vue';
import { useFetch } from '@/composables/useFetch';
import router from '@/router';
import { useDataStore } from '@/stores/data';
import { optionsStatus } from '@/utils/lists';

const personType = ref('physical')

const store = useDataStore()

const sponsor = ref({
  full_name: store.updateSponsorData.full_name,
  phone: store.updateSponsorData.phone,
  get_status_display: store.updateSponsorData.get_status_display,
  given: store.updateSponsorData.given,
  firm: store.updateSponsorData.firm
})

const { put } = useFetch()
const updateSponsor = async () => {
  try {
    const response = await put(`sponsor-update/${store.updateSponsorData.id}/`, sponsor.value)

    router.push({ name: 'Sponsors', query: { page: store.sponsorsCurrentPage } })
    document.body.classList.remove('overflow-hidden')
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>
