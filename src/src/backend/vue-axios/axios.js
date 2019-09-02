/* global localStorage */

import axios from 'axios'

/* TODO for some reason this env var is not being correctly loaded? :( */
const API_URL = process.env.API_URL || 'http://localhost:8082/'

const ajax = axios.create({
  baseURL: API_URL,
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
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default ajax;
