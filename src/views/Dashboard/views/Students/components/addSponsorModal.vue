<template>
  <CModal @childFunction="setChildFunction">
    <template #title>Homiy qo‘shish</template>
    <template #body>
      <div>
        <label>
          <span class="text-[12px] text-neutral-800 mb-2 uppercase font-medium">OTM</span>
          {{ filterSponsor.sponsor }}

          <CDropdown
            v-model="filterSponsor.sponsor"
            property="full_name"
            :options="sponsorsData?.results"
          />
          <span v-if="data?.sponsor" class="text-red-500">{{ data?.sponsor[0] }}</span>
        </label>
      </div>

      <div class="mt-7">
        <label>
          <span class="text-[12px] text-neutral-800 mb-2 uppercase font-medium"
            >Ajratilingan summa</span
          >
          {{ filterSponsor.summa }}
          <CInput
            v-model="filterSponsor.summa"
            type="string"
            placeholder="Abdullayev Abdulla Abdulla o’g’li"
          />
          <span v-if="data?.summa" class="text-red-500">{{ data?.summa[0] }}</span>
        </label>
      </div>

      <p v-if="error" class="mt-2 bg-red-50 p-2 text-red-500 rounded-md">{{ error }}</p>
    </template>

    <template #footer>
      <CButton @click="addSponsor" class="px-8" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]">
          Qo‘shish
          <img src="/plusWhite.svg" alt="filter icon" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CInput from '@/components/Base/CInput.vue'
import CModal from '@/components/Common/CModal.vue'
import { useFetch } from '@/composables/useFetch'

const route = useRoute()

const filterSponsor = ref({
  sponsor: '',
  summa: ''
})

const data = ref(null)

const error = ref('')

const sponsorsData = ref([])

const getSponsorId = () => {
  const sponsor = sponsorsData.value.results?.find((item) => {
    if (item.full_name == filterSponsor.value.sponsor) {
      return item
    }
  })
  return sponsor?.id
}

const { get, post } = useFetch()

const childFunction = ref(null)

const setChildFunction = (func) => {
  childFunction.value = func
}

const fetchData = async () => {
  try {
    const response = await get('sponsor-list/')
    console.log(response)
    sponsorsData.value = response
  } catch (error) {
    console.log(error)
  }
}

const addSponsor = async () => {
  try {
    const response = await post('sponsor-summa-create/', {
      sponsor: getSponsorId(),
      summa: filterSponsor.value.summa,
      student: route.params.id
    })
    console.log(response)

    if (Array.isArray(response.summa)) {
      data.value = response
      console.log(response)
    } else if (!Number(response.summa)) {
      error.value = response.summa
      data.value = ''
    } else {
      error.value = ''
      filterSponsor.value.summa = ''
      data.value = ''
      console.log(response)

      childFunction.value()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
