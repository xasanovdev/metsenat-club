<template>
  <CModal @close="setClose">
    <template #title>Tahrirlash</template>
    <template #body>
      <form class="max-w-[793px] w-full bg-white rounded-xl">
        <div class="flex items-center rounded-lg border-2 border-[3E0E7FF]">
          <TabButton
            @click.prevent="isLegal = false"
            rounded="left"
            class="flex-1"
            :isLegal="!isLegal"
            >Jismoniy shaxs</TabButton
          >
          <TabButton
            @click.prevent="isLegal = true"
            rounded="right"
            :isLegal="isLegal"
            class="flex-1"
          >
            Yuridik shaxs
          </TabButton>
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
              <span class="text-[12px] text-gray-600 mb-2 uppercase font-semibold">Holati</span>
              <CDropdown
                v-model="sponsor.get_status_display"
                property="name"
                :options="optionsStatus"
              />
            </label>
          </div>

          <FormGroup
            v-if="isLegal"
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
import { ref } from 'vue'

import CButton from '@/components/Base/CButton.vue'
import CDropdown from '@/components/Base/CDropdown.vue'
import CModal from '@/components/Base/CModal.vue'
import FormGroup from '@/components/Base/FormGroup.vue'
import TabButton from '@/components/Base/TabButton.vue'

import { useFetch } from '@/composables/useFetch'

import { useSponsors } from '@/stores/sponsors'

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

import { optionsStatus } from '@/utils'

const props = defineProps('data')

const emit = defineEmits(['getSponsorDetails'])

const close = ref(null)

const setClose = (func) => {
  close.value = func
}

const sponsors = useSponsors()

const isLegal = ref(sponsors.sponsors?.details?.is_legal)

const sponsor = ref({
  full_name: sponsors?.sponsors.details?.full_name,
  phone: sponsors?.sponsors.details?.phone,
  get_status_display: sponsors?.sponsors.details?.get_status_display,
  firm: sponsors?.sponsors.details?.firm
})

const rules = {
  full_name: { required, minLength: minLength(5), maxLength: maxLength(255) },
  phone: { required, minLength: minLength(1), maxLength: maxLength(255) },
  firm: { required, minLength: minLength(5), maxLength: maxLength(255) }
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

    emit('getSponsorDetails')
    close.value()

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>
