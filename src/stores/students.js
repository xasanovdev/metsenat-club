import { reactive, ref } from 'vue'

import { useFetch } from '@/composables/useFetch'

import router from '@/router'

import { defineStore } from 'pinia'

import { useToast } from 'vue-toastification'

const { get, post, put, patch } = useFetch()

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
      const response = await get(`student-sponsor/${pageId}/`)

      students.sponsors = response.sponsors
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  const updateStudentDetails = async (studentData) => {
    try {
      console.log(studentData)
      await put(`student-update/${studentData.id}/`, studentData).then((response) =>
        console.log(response)
      )
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 1000
      })
    }
  }

  const addNewSponsorError = ref([])
  const addNewSponsor = async (newSponsorData) => {
    try {
      await post('sponsor-summa-create/', newSponsorData).then((response) => {
        if (!Number(response.summa)) {
          addNewSponsorError.value = response.summa
        } else {
          addNewSponsorError.value = ''
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateSponsorError = ref('')
  const updateStudentSponsor = async (sponsorData) => {
    try {
      updateSponsorError.value = ''
      await put(`sponsor-summa-update/${sponsorData?.id}/`, sponsorData).then((response) => {
        if (Array.isArray(response.summa)) {
          updateSponsorError.value = response.summa[0]
        } else if (!Number(response.summa)) {
          updateSponsorError.value = response.summa
        } else {
          updateSponsorError.value = ''
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSponsor = async (id) => {
    try {
      const url = import.meta.env.VITE_APP_BASE_URL + `/sponsor-summa-delete/${id}/`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (!response.ok) {
        throw new Error(`Failed to delete sponsor: ${response.status} ${response.statusText}`)
      }

    } catch (error) {
      console.error(error)
    }
  }

  return {
    students,
    deleteSponsor,
    updateSponsorError,
    updateStudentSponsor,
    addNewSponsorError,
    addNewSponsor,
    getStudentDetails,
    updateStudentDetails,
    getStudentSponsors,
    postNewStudent,
    getStudentsList
  }
})
