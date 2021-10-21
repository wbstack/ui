/* global localStorage */

import Axios from 'axios'
import config from '~/config'

const axios = Axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/*
 * The interceptor here ensures that we check for the token in local storage
 * every time an ajax request is made
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default axios
