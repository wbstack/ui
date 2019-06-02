/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:2001/api/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.auth
  }
})
