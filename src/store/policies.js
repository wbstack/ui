import { api } from './../backend'

const getDefaultState = () => {
  return {
    missingPolicies: null,
    failedToGetMissingPolicies: false,
  }
}

const state = getDefaultState()

const getters = {
  missingPolicies: state => state.missingPolicies,
  failedToGetMissingPolicies: state => state.failedToGetMissingPolicies,
}

const mutations = {
  setMissingPolicies (state, policies) {
    state.missingPolicies = policies
  },
  failedToGetMissingPolicies (state, failed) {
    state.failedToGetMissingPolicies = failed
  },
}

const actions = {
  async missingPolicies ({ dispatch, commit }) {
    try {
      commit('setMissingPolicies', await api.getMissingPolicies())
    } catch (error) {
      commit('failedToGetMissingPolicies', true)
      dispatch('latestError', {
        error: error,
        message: 'Failed to get policies. Please try reloading the page.',
        dismissible: false,
      })
    }
  },
  async acceptPolicies ({ dispatch }, policyIds) {
    try {
      await api.acceptPolicies(policyIds)
      await dispatch('missingPolicies')
    } catch (error) {
      dispatch('latestError', {
        error: error,
        message: 'Failed to save policy acceptances. Please try again.',
      })
    }
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
