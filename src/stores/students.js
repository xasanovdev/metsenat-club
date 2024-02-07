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
        await get('student-list/', { page: page, page_size: page_size }).then((response) => {
          students.currentPage = page
          students.count = page_size
          students.list = []
          students.studentCount = response.count
          students.list = response.results
        })
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 1000
        })
      }
    }
  }

  const postNewStudent = async (user) => {
    try {
      await post(`student-create/`, user).then((response) =>
        router.push({ name: 'Student', params: { id: response.id } })
      )
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  const getStudentDetails = async (pageId) => {
    try {
      const details = await get(`student-detail/${pageId}`)

      students.details = details
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }
  const getStudentSponsors = async (pageId) => {
    try {
      const sponsors = await get(`student-sponsor/${pageId}/`)

      students.sponsors = sponsors.sponsors
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  const updateStudentDetails = async (studentData) => {
    try {
      await put(`student-update/${studentData.value.id}/`, studentData)
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
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
