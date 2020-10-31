/* global localStorage */

import axios from './../backend/vue-axios/axios.js'

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
  forgottenPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/user/forgotPassword', payload)
        .then(resp => {
          if (resp.status !== 200) {
            commit('user_setForgottenPasswordSubmitSuccessFalse')
          } else {
            commit('user_setForgottenPasswordSubmitSuccessTrue')
          }
          resolve(resp)
        })
        .catch(err => {
          commit('user_setForgottenPasswordSubmitSuccessFalse')
          reject(err)
        })
    })
  },
  resetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/user/resetPassword', payload)
        .then(resp => {
          if (resp.status !== 200) {
            commit('user_setResetPasswordSubmitSuccessFalse')
          } else {
            commit('user_setResetPasswordSubmitSuccessTrue')
          }
          resolve(resp)
        })
        .catch(err => {
          commit('user_setResetPasswordSubmitSuccessFalse')
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
