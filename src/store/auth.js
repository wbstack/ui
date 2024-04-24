import { api } from './../backend'

const getDefaultState = () => {
  return {
    status: 'initializing',
    user: null
  }
}

const state = getDefaultState()

const getters = {
  isLoggedIn: state => state.status === 'success' && !!state.user,
  isInitializing: state => state.status === 'initializing',
  authStatus: state => state.status,
  currentUser: state => state.user
}

const mutations = {
  auth_resetState (state) {
    Object.assign(state, getDefaultState(), { status: 'success' })
  },
  auth_success (state, { user }) {
    state.status = 'success'
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
    return api.login(user)
      .then(({ user }) => {
        commit('auth_success', { user })
      })
      .catch((error) => {
        commit('auth_error')
        throw error
      })
  },
  logout ({ commit }) {
    return api.logout()
      .then(() => {
        commit('auth_resetState')
        commit('wikis_resetState')
      })
      .catch((err) => {
        commit('auth_error')
        throw err
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
