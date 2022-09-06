import { api } from './../backend'

const getDefaultState = () => {
  return {
    forgottenPasswordSubmitSuccess: null,
    resetPasswordSubmitSuccess: null,
    forgottenPasswordSubmitError: null
  }
}

const state = getDefaultState()

const getters = {
  wasLastForgottenPasswordSubmitASuccess: state => state.forgottenPasswordSubmitSuccess,
  wasLastResetPasswordSubmitASuccess: state => state.resetPasswordSubmitSuccess,
  lastForgottenPasswordError: state => state.forgottenPasswordSubmitError
}

const mutations = {
  user_setForgottenPasswordSubmitSuccessTrue (state) {
    state.forgottenPasswordSubmitSuccess = true
  },
  user_setForgottenPasswordSubmitSuccessFalse (state) {
    state.forgottenPasswordSubmitSuccess = false
  },
  user_setForgottenPasswordSubmitSuccessNull (state) {
    state.forgottenPasswordSubmitSuccess = null
  },
  user_setResetPasswordSubmitSuccessTrue (state) {
    state.resetPasswordSubmitSuccess = true
  },
  user_setResetPasswordSubmitSuccessFalse (state) {
    state.resetPasswordSubmitSuccess = false
  },
  user_setForgottenPasswordError (state, payload) {
    state.forgottenPasswordSubmitError = payload
  }
}

const actions = {
  forgottenPassword ({ commit }, email) {
    return api.forgottenPassword(email)
      .then(() => commit('user_setForgottenPasswordSubmitSuccessTrue'))
      .catch((err) => {
        commit('user_setForgottenPasswordSubmitSuccessFalse')
        commit('user_setForgottenPasswordError', err)
      } )
  },
  resetPassword ({ commit }, payload) {
    return api.resetPassword(payload)
      .then(() => commit('user_setResetPasswordSubmitSuccessTrue'))
      .catch(() => commit('user_setResetPasswordSubmitSuccessFalse'))
  },
  clearForgottenPasswordState ( { commit } ) {
    commit('user_setForgottenPasswordSubmitSuccessNull')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
