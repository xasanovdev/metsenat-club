import { reactive, ref } from 'vue'

import { useFetch } from '@/composables/useFetch'

import router from '@/router'

import { defineStore } from 'pinia'

import { useToast } from 'vue-toastification'

const { get, post, put } = useFetch()

export const useStudents = defineStore('students', () => {
  const toast = useToast()
  const students = reactive({
    list: [],
    currentPage: 1,
    count: 10,
    studentCount: 0,
    details: {},
    sponsors: []
  })

  const getStudentsList = async (page, page_size, force) => {
    if (students.list.length === 0 || force) {
      try {
        const response = await get('student-list/', { page: page, page_size: page_size })
        students.currentPage = page
        students.count = page_size
        students.list = []
        students.studentCount = response.count
        students.list = response.results

        router.push({ path: `?page=`, query: { page: page, page_size: page_size } })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const postNewStudent = async (user, instituteList) => {
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

  const getStudentDetails = async (pageId) => {
    try {
      const details = await get(`student-detail/${pageId}`)

      students.details = details
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const getStudentSponsors = async (pageId) => {
    try {
      const sponsors = await get(`student-sponsor/${pageId}/`)

      students.sponsors = sponsors.sponsors
    } catch (error) {
      console.error(error)
    }
  }

  const updateStudentDetails = async (studentData, selectedInstitute, close, errors) => {
    try {
      const response = await put(`student-update/${studentData.value.id}/`, {
        id: studentData.value.id,
        institute: selectedInstitute.value?.id,
        full_name: studentData.value.full_name,
        phone: studentData.value.phone,
        type: studentData.value.type?.name === 'Bakalavr' ? 1 : 2,
        contract: studentData.value.contract
      })

      if (
        Array.isArray(response.full_name) ||
        Array.isArray(response.contract) ||
        Array.isArray(response.phone) ||
        Array.isArray(response.institute)
      ) {
        errors.value = response
      } else {
        close.value()

        errors.value = null
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return {
    students,
    getStudentDetails,
    updateStudentDetails,
    getStudentSponsors,
    postNewStudent,
    getStudentsList
  }
})
