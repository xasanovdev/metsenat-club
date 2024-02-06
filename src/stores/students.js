import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get, post } = useFetch()

export const useStudents = defineStore('students', () => {
  let studentsList = ref([])
  let studentsCurrentPage = ref(1)
  let paginationCountStudents = ref(10)
  let studentDetails = ref({})

  const getStudentsList = async (page, page_size, force) => {
    if (studentsList.value.length === 0 || studentsCurrentPage.value !== page || force) {
      try {
        studentsCurrentPage.value = page
        paginationCountStudents.value = page_size
        studentsList.value = []

        const response = await get('student-list/', { page: page, page_size: page_size })

        studentsList.value = response

        router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const postNewStudent = async (user, instituteList) => {
    console.log(user, instituteList)
    try {
      const response = await post(`student-create/`, {
        institute: instituteList.value.find((item) => item.name === user?.value?.institute)?.id,
        full_name: user.value.full_name,
        phone: user.value.phone,
        type: user.value.type?.name === 'Bakalavr' ? 1 : 2,
        contract: user.value.contract
      })

      user.value = {
        full_name: '',
        phone: '',
        institute: '',
        type: '',
        contract: ''
      }

      router.push({ name: 'Student', params: { id: response.id } })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    studentDetails,
    postNewStudent,
    studentsCurrentPage,
    studentsList,
    paginationCountStudents,
    getStudentsList
  }
})
