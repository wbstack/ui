/* global localStorage */

import User from '@/models/User'
import * as MutationTypes from '@/store/mutation-types'

const state = {
  user: User.fromLocalStorage()
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.fromLocalStorage()
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const actions = {
  login (context) {
    context.commit(MutationTypes.LOGIN)
  },

  logout (context) {
    context.commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
