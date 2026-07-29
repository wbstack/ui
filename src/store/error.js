const getDefaultState = () => {
  return {
    latestError: null,
    latestErrorMessage: null,
    latestErrorDismissible: true,
  }
}

const state = getDefaultState()

const getters = {
  hasLatestError: state => !!state.latestError,
  latestError: state => state.latestError,
  latestErrorMessage: state => state.latestErrorMessage,
  latestErrorDismissible: state => state.latestErrorDismissible,
}

const mutations = {
  setLatestError (state, { error = null, message = null, dismissible = true }) {
    state.latestError = error
    state.latestErrorMessage = message
    state.latestErrorDismissible = dismissible
  },
}

const actions = {
  latestError ({ commit }, { error, message, dismissible = true }) {
    console.error(error)
    commit('setLatestError', { error, message, dismissible })
  },
  clearLatestError ({ commit }) {
    commit('setLatestError', {})
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
