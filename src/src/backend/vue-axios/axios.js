/* global localStorage */

import axios from 'axios'

const ajax = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/*
 * The interceptor here ensures that we check for the token in local storage
 * every time an ajax request is made
 */
ajax.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('auth')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default ajax
