import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  return {
    studentDetails,
    studentsCurrentPage,
    studentsList,
    paginationCountStudents,
    getStudentsList
  }
})
