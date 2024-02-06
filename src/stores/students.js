import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { get, post } = useFetch()

export const useStudents = defineStore('students', () => {
  const studentsList = ref([])
  const studentsCurrentPage = ref(1)
  const paginationCountStudents = ref(10)
  const studentDetails = ref({})

  const getStudentsList = async (page, page_size, force) => {
    if (students.studentsList.length === 0 || students.studentsCurrentPage !== page || force) {
      try {
        students.studentsCurrentPage = page
        students.paginationCountStudents = page_size
        students.studentsList = []

        const response = await get('student-list/', { page: page, page_size: page_size })

        students.studentsList = response

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
