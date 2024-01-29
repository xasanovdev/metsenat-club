<template>
  <CModal>
    <template v-slot:title>Tahrirlash</template>
    <template v-slot:body>
      <div class="flex flex-col items-start gap-4">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        <CDropdown></CDropdown>   
      </div>
      <div class="flex flex-col items-start gap-4 mt-7">
        <p class="text-[12px] text-[#1D1D1F] font-medium uppercase tracking-wide">Ariza holati</p>
        <CSelect></CSelect>  
      </div>
    </template>

    <template v-slot:footer>
      <CButton variant="primary" text="Tozalash">
          <img src="../../../../../public/clear.svg" alt="">
      </CButton>
      <CButton variant="secondary" text="Natijalarni ko‘rish">
          <img src="../../../../../public/eyeWhite.svg" alt="">
      </CButton>

    </template>
  </CModal>
</template>

<script setup>
import CButton from '@/components/CButton/CButton.vue';
import CModal from '@/components/CModal/CModal.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import CSelect from '@/components/CSelect/CSelect.vue';
</script>
