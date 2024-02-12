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
    dataCount: 0,
    sponsors: []
  })

  const getStudentsList = async (page, page_size, force) => {
    if (students.list.length === 0 || force) {
      await get('student-list/', { page: page, page_size: page_size })
        .then((response) => {
          students.currentPage = page
          students.count = page_size
          students.list = []
          students.dataCount = response.count
          students.list = response.results
        })
        .catch((error) =>
          toast.error(`${error}`, {
            autoClose: 1000
          })
        )
    }
  }

  const postNewStudent = async (user) => {
    await post(`student-create/`, user)
      .then((response) => router.push({ name: 'Student', params: { id: response.id } }))
      .catch((error) =>
        toast.error(`${error}`, {
          autoClose: 1000
        })
      )
  }

  const getStudentDetails = async (pageId) => {
    return await get(`student-detail/${pageId}`)
      .then((details) => {
        return details
      })
      .catch((error) => {
        toast.error(`${error}`, {
          autoClose: 1000
        })
      })
  }

  const getStudentSponsors = async (pageId) => {
    await get(`student-sponsor/${pageId}/`)
      .then((response) => {
        students.sponsors = response.sponsors
      })
      .catch((error) =>
        toast.error(`${error}`, {
          autoClose: 1000
        })
      )
  }

  const updateStudentDetails = async (studentData) => {
    await put(`student-update/${studentData.id}/`, studentData)
      .then((response) => console.log(response))
      .catch((error) =>
        toast.error(`${error}`, {
          autoClose: 1000
        })
      )
  }

  const actionsSponsorError = ref([])
  const addNewSponsor = async (newSponsorData) => {
    actionsSponsorError.value = ''
    await post('sponsor-summa-create/', newSponsorData)
      .then((response) => {
        if (!Number(response.summa)) {
          actionsSponsorError.value = response.summa
        } else {
          actionsSponsorError.value = ''
        }
      })
      .catch((error) =>
        toast.error(`${error}`, {
          autoClose: 1000
        })
      )
  }

  const updateStudentSponsor = async (sponsorData) => {
    actionsSponsorError.value = ''
    await put(`sponsor-summa-update/${sponsorData?.id}/`, sponsorData)
      .then((response) => {
        if (Array.isArray(response.summa)) {
          actionsSponsorError.value = response.summa[0]
        } else if (!Number(response.summa)) {
          actionsSponsorError.value = response.summa
        } else {
          actionsSponsorError.value = ''
        }
      })
      .catch((error) =>
        toast.error(`${error}`, {
          autoClose: 1000
        })
      )
  }

  const deleteSponsor = async (id) => {
    const url = import.meta.env.VITE_APP_BASE_URL + `/sponsor-summa-delete/${id}/`

    return await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete sponsor: ${response.status} ${response.statusText}`)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    students,
    deleteSponsor,
    actionsSponsorError,
    updateStudentSponsor,
    addNewSponsor,
    getStudentDetails,
    updateStudentDetails,
    getStudentSponsors,
    postNewStudent,
    getStudentsList
  }
})
