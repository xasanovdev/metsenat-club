<template>
  <span class="text-[12px] p-1 font-semibold rounded-md" :class="statusObject[status]">{{
    status
  }}</span>
</template>

<script setup>
const props = defineProps(['status'])

const statusObject = {
  Yangi: 'text-blue-500 bg-blue-200',
  Moderatsiyada: 'text-orange-500 bg-orange-100',
  Tasdiqlangan: 'text-green-500 bg-green-100',
  'Bekor qilingan': 'text-gray-500 bg-gray-50'
}
</script>
