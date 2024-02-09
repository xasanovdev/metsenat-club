import { ref } from 'vue'

export function useModal() {
  const modals = ref([])

  const modal = () => {
    const modalValue = ref(false)

    const openModal = () => {
      document.body.classList.add('overflow-hidden')
      modalValue.value = true
    }

    const closeModal = () => {
      document.body.classList.remove('overflow-hidden')
      console.log('salom')
      modalValue.value = false
    }

    modals.value.push({
      modalValue,
      openModal,
      closeModal
    })

    return modals.value[modals.value.length - 1]
  }

  return {
    modals,
    modal
  }
}
