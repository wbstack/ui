/* global localStorage */

import axios from './../backend/vue-axios/axios.js'

const getDefaultState = () => {
  return {
    status: '',
    // TODO maybe this should be called token not auth?
    token: localStorage.getItem('auth') || '',
    user: JSON.parse(localStorage.getItem('user')) || ''
  }
}

const state = getDefaultState()

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user
}

const mutations = {
  auth_resetState (state) {
    Object.assign(state, getDefaultState())
  },
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, {token, user}) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error (state) {
    state.status = 'error'
  }
}

const actions = {
  resetAuthState ({ commit }) {
    commit('auth_resetState')
  },
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post('/auth/login', user)
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('auth', token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('auth_success', {token, user})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('auth')
          localStorage.removeItem('user')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      // TODO have 1 thing to comit here reseting all state?
      commit('auth_resetState')
      commit('wikis_resetState')
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
