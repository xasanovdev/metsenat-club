<template>
  <CModal @close="setClose">
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="flex items-center rounded-lg border-2 border-[3E0E7FF]">
          <!-- Todo: refactor this component. user v-for fr physical and legal. -->
          <CButton
            @click.prevent="personType = 'physical'"
            :class="[
              personType === 'physical' ? 'bg-blue-700 text-white' : 'text-blue-700 bg-white'
            ]"
            class="flex-1"
            >Jismoniy shaxs</CButton
          >
          <CButton
            :class="[personType === 'legal' ? 'bg-blue-700 text-white' : 'text-blue-700 bg-white']"
            @click.prevent="personType = 'legal'"
            class="flex-1"
          >
            Yuridik shaxs
          </CButton>
        </div>

        <div class="grid grid-cols-1 gap-y-7 mt-8">
          <FormGroup
            label="F.I.Sh. (Familiya Ism Sharif)"
            id="full_name"
            type="text"
            placeholder="Ism familyangizni kiriting..."
            :validation="$v.full_name.$error"
            validationText="Full name"
            v-model="sponsor.full_name"
          />

          <FormGroup
            label="Telefon raqam"
            id="phone"
            type="text"
            placeholder="Telelefon raqamingizni kiriting..."
            :validation="$v.phone.$error"
            validationText="Phone"
            v-model="sponsor.phone"
          />

          <div class="col-span-1">
            <label>
              {{ sponsor?.get_status_display }}
              <span class="text-[12px] text-neutral-800 mb-2 uppercase font-medium">Holati</span>
              <CDropdown
                v-model="sponsor.get_status_display"
                property="name"
                :options="optionsStatus"
              />
            </label>
          </div>

          <FormGroup
            v-if="personType === 'legal'"
            label="T"
            id="phone"
            type="text"
            placeholder="Firmangizni kiriting..."
            :validation="$v.firm.$error"
            validationText="Firm"
            v-model="sponsor.firm"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <CButton @click="updateSponsor" class="px-8" variant="secondary">
        <span class="flex items-center justify-center gap-[10px]"
          >Saqlash
          <img src="/save.svg" alt="" />
        </span>
      </CButton>
    </template>
  </CModal>
</template>

<script setup>
import { ref, reactive } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Base/CModal.vue'
import { useFetch } from '@/composables/useFetch'

import { optionsStatus } from '@/utils'
import FormGroup from '@/components/Base/FormGroup.vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useSponsors } from '@/stores/sponsors'

const personType = ref('physical')

const props = defineProps('data')

const emit = defineEmits(['fetchData'])

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

console.log(props.data)

const sponsors = useSponsors()

const sponsor = ref({
  full_name: sponsors?.sponsors.details?.full_name,
  phone: sponsors?.sponsors.details?.phone,
  get_status_display: sponsors?.sponsors.details?.get_status_display,
  firm: sponsors?.sponsors.details?.firm
})

const rules = {
  full_name: { required },
  phone: { required },
  firm: { required }
}

const $v = useVuelidate(rules, sponsor)

const { put } = useFetch()
const updateSponsor = async () => {
  const result = await $v.value.$validate()

  if (!result) {
    return $v
  }

  try {
    const response = await put(`sponsor-update/${sponsors.sponsors?.details?.id}/`, sponsor.value)

    emit('fetchData')
    close.value()

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>
