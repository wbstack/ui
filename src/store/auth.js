/* global localStorage */

import { api } from './../backend'

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
  },
  auth_isVerified (state) {
    state.user.verified = true
  }
}

const actions = {
  resetAuthState ({ commit }) {
    commit('auth_resetState')
  },
  login ({ commit }, user) {
    commit('auth_request')
    return api.login(user)
      .then(({token, user}) => {
        localStorage.setItem('auth', token)
        localStorage.setItem('user', JSON.stringify(user))
        commit('auth_success', {token, user})
      })
      .catch(() => {
        commit('auth_error')
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
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
  },
  markAsVerified ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('auth_isVerified')
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
