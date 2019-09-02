/* global localStorage */

import axios from 'axios'

const state = {
  status: '',
  // TODO maybe this should be called token not auth?
  token: localStorage.getItem('auth') || '',
  user: JSON.parse(localStorage.getItem('user')) || {}
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user
}

const mutations = {
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
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = {}
  }
}

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://localhost:8082/auth/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          // TODO eventually use the model returned?
          const user = {
            email: resp.data.email,
            isAdmin: resp.data.isAdmin
          }
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
      commit('logout')
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      resolve()
    })
  }
}

// TODO maybe add namespaced: true, ?
// https://vuex.vuejs.org/guide/modules.html#namespacing

export default {
  state,
  mutations,
  getters,
  actions
}
