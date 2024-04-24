import Axios from 'axios'

const axios = Axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axios
