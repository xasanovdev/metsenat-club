<template>

  <template v-if="loading">
    <article class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">
        loading...
      </div>

    </article>
  </template> 

  <template v-else>

    <header class="w-full py-[30px] bg-[#FDFDFD]">
      <div class="max-w-[1200px] mx-auto px-6">
        <div class="w-full flex items-center gap-4">
          <div class="cursor-pointer" @click="$router.go(-1)">
            <img src="../../../../../public/back.svg" alt="">
          </div>
          <p class="text-[#28293D] text-2xl font-bold ">Talaba qo‘shish</p>
        </div>
      </div>
    </header>

    <div class="w-full h-full p-[32px] bg-[#F5F5F7] flex flex-col justify-between">
      <form class="max-w-[793px] w-full bg-white p-7 mx-auto rounded-xl">
        <div class="grid grid-cols-2 gap-x-7 gap-y-[50px]">
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium ">F.I.Sh. (Familiya Ism Sharif)</p>
              <CInput placeholder="Abdullayev Abdulla Abdulla o’g’li"/>
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium ">Telefon raqam</p>
              <CInput placeholder="Abdullayev Abdulla Abdulla o’g’li"/>
            </label>
          </div>
          <div class=" col-span-2">
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium ">OTM</p>
              <CDropdown :options="data"></CDropdown> 
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium ">Talabalik turi</p>
              <CInput placeholder="Abdullayev Abdulla Abdulla o’g’li"/>
            </label>
          </div>
          <div>
            <label>
              <p class="text-[12px] text-[#1D1D1F] mb-2 uppercase font-medium ">Kontrakt summa</p>
              <CInput placeholder="Abdullayev Abdulla Abdulla o’g’li"/>
            </label>
          </div>
        </div>

        <hr class="my-7" />
        <CButton class="w-full" type="submit" variant="secondary" text="Qo‘shish">
          <img src="/plusWhite.svg" alt="">
        </CButton>
      </form> 
    </div>
  </template>

</template>

<script setup>
import CButton from '@/components/CButton/CButton.vue';
import CDropdown from '@/components/CDropdown/CDropdown.vue';
import { useFetch } from '@/composables/useFetch/useFetch';
import CInput from '@/components/CInput/CInput.vue';
import {  ref } from 'vue';

const data = ref(null);

const {get,loading} = useFetch()

const fetchData = async () => {
  try {
    const response = await get(`institute-list/`);
    data.value = response;
    console.log(data.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();

</script>
