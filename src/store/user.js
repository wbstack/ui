import { api } from './../backend'

const getDefaultState = () => {
  return {
    forgottenPasswordSubmitSuccess: null,
    resetPasswordSubmitSuccess: null
  }
}

const state = getDefaultState()

const getters = {
  wasLastForgottenPasswordSubmitASuccess: state => state.forgottenPasswordSubmitSuccess,
  wasLastResetPasswordSubmitASuccess: state => state.resetPasswordSubmitSuccess
}

const mutations = {
  user_setForgottenPasswordSubmitSuccessTrue (state) {
    state.forgottenPasswordSubmitSuccess = true
  },
  user_setForgottenPasswordSubmitSuccessFalse (state) {
    state.forgottenPasswordSubmitSuccess = false
  },
  user_setResetPasswordSubmitSuccessTrue (state) {
    state.resetPasswordSubmitSuccess = true
  },
  user_setResetPasswordSubmitSuccessFalse (state) {
    state.resetPasswordSubmitSuccess = false
  }
}

const actions = {
  forgottenPassword ({ commit }) {
    return api.forgottenPassword()
      .then(() => commit('user_setForgottenPasswordSubmitSuccessTrue'))
      .catch(() => commit('user_setForgottenPasswordSubmitSuccessFalse'))
  },
  resetPassword ({ commit }, payload) {
    return api.resetPassword(payload)
      .then(() => commit('user_setResetPasswordSubmitSuccessTrue'))
      .catch(() => commit('user_setResetPasswordSubmitSuccessFalse'))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
