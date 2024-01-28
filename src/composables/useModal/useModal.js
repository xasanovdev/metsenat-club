import { ref } from 'vue';

import router from '@/router';

export function useModal() {
  const modalType = ref('')

  modalType.value = router.currentRoute.value.meta.modalType

  console.log('modalType:', modalType.value)

  const openModal = () => {
    console.log('opened')
    document.body.classList.add('overflow-hidden')

    if (modalType.value === 'InvoiceDetails') {
      router.push({ name: 'InvoiceEdit' })
    }

    if (modalType.value === 'HomePage') {
      router.push({ name: 'InvoiceCreate' })
    }
  }

  const closeModal = () => {
    document.body.classList.remove('overflow-hidden')

    if (modalType.value === 'SponsorsFilter') {
      router.push({ name: 'Sponsors' })
    }
  }

  const closeModalOverlay = (e) => {
    if (!e.target.classList.contains('modal-content')) {
      closeModal()
    }
  }

  return {
    modalType,
    openModal,
    closeModal,
    closeModalOverlay
  }
}
