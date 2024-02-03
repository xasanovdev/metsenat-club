import { ref } from 'vue'

export const useFetch = () => {
  const baseUrl = 'https://metsenatclub.xn--h28h.uz/api/v1'
  const loading = ref(false)

  const axios = (url, options) => {
    loading.value = true
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/${url}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        ...options
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const get = (url, params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    const fullUrl = queryParams ? `${url}?${queryParams}` : url
    return axios(fullUrl)
  }

  const post = (url, body) => {
    return axios(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  const put = (url, body) => {
    return axios(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  const remove = (url, body) => {
    return axios(url, {
      method: 'DELETE',
      body: JSON.stringify(body)
    })
  }

  return {
    get,
    post,
    put,
    remove,
    loading
  }
}
