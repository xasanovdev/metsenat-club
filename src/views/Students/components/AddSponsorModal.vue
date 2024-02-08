<template>
  <CModal @close="setClose">
    <template #title>Homiy qo‘shish</template>
    <template #body>
      <div class="col-span-2 flex flex-col justify-between gap-2 w-full">
        <label class="flex flex-col gap-2">
          <span class="cursor-pointer text-sm uppercase font-semibold text-gray-600">OTM</span>
          {{ filterSponsor.sponsor }}

          <CDropdown
            :validation="$v.sponsor.$error"
            v-model="filterSponsor.sponsor"
            property="full_name"
            :options="sponsorsData"
          />
          <span v-if="data?.sponsor" class="text-red-500">{{ data?.sponsor[0] }}</span>
        </label>
        <Validation :validation="$v.sponsor.$error" validationText="Institute" />
      </div>

      {{ filterSponsor.summa }}
      <FormGroup
        class="mt-7"
        label="Ajratilingan summa"
        id="given"
        type="number"
        placeholder="Ajratilingan summangizni kiritng..."
        validationText="Given amount of money"
        :validation="$v.summa.$error"
        v-model="filterSponsor.summa"
      />

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
import { computed, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import FormGroup from '@/components/Base/FormGroup.vue'
import CModal from '@/components/Base/CModal.vue'

import { useFetch } from '@/composables/useFetch'

import { maxValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import { useSponsors } from '@/stores/sponsors'
import Validation from '@/components/Base/Validation.vue'

const route = useRoute()

const emit = defineEmits(['getStudentDetails'])

const filterSponsor = ref({
  sponsor: '',
  summa: ''
})

const data = ref(null)

const error = ref('')

const sponsors = useSponsors()

const sponsorsData = ref([])

const getSponsorId = () => {
  const sponsor = sponsorsData.value?.find((item) => {
    if (item.full_name == filterSponsor.value.sponsor) {
      return item
    }
  })
  return sponsor?.id
}

const { get, post } = useFetch()

const rules = {
  summa: { required, maxValue: maxValue(2147483647) },
  sponsor: { required }
}

const $v = useVuelidate(rules, filterSponsor)

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

const postSponsorOptions = computed(() => [
  { sponsor: getSponsorId(), summa: filterSponsor.value.summa, student: route.params.id }
])

const addSponsor = async () => {
  const result = await $v.value.$validate()
  console.log('validation result', $v.value)

  if (!result) {
    return $v
  }

  try {
    const response = await post('sponsor-summa-create/', postSponsorOptions.value[0])

    if (Array.isArray(response.summa)) {
      data.value = response
      console.log(response)
    } else if (!Number(response.summa)) {
      error.value = response.summa
      data.value = ''
    } else {
      error.value = ''
      filterSponsor.value.summa = ''
      filterSponsor.value.sponsor = ''
      data.value = ''

      close.value()

      emit('getStudentDetails')
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await sponsors.getSponsorsList(sponsors.sponsors.currentPage, sponsors.sponsors.count, 'force')
  sponsorsData.value = sponsors?.sponsors?.list

  console.log(data.value)
})
</script>
