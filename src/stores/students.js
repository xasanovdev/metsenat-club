import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudents = defineStore('students', () => {
  const studentsList = ref([])
  const studentsCurrentPage = ref(1)
  const paginationCountStudents = ref(10)
  const studentDetails = ref({})

  const getStudentsList = () => {}

  return {
    studentDetails,
    studentsCurrentPage,
    studentsList,
    paginationCountStudents
  }
})
