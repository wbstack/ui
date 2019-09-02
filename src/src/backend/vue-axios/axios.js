/* global localStorage */

import axios from 'axios'

/* TODO for some reason this env var is not being correctly loaded? :( */
const API_URL = process.env.API_URL || 'http://localhost:8082/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.auth
  }
})
