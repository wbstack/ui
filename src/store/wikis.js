/* global localStorage */

import { api } from './../backend'

const getDefaultState = () => {
  return {
    status: '',
    wikis: []
  }
}

const state = getDefaultState()

const getters = {
  // TODO should add getter for a single wiki by id?
  wikisStatus: state => state.status,
  wikis: state => state.wikis,
  wikiCount: state => state.wikis.length,
  hasLoaded: state => state.wikis.status !== ''
}

const mutations = {
  wikis_resetState (state) {
    Object.assign(state, getDefaultState())
  },
  wikis_request (state) {
    state.status = 'loading'
  },
  wikis_success (state, wikiList) {
    state.status = 'success'
    state.wikis = wikiList
  },
  wikis_error (state) {
    state.status = 'error'
  }
}

const actions = {
  resetWikisState ({ commit }) {
    commit('wikis_resetState')
  },
  refreshWikis ({ commit }) {
    commit('wikis_request')
    return api.myWikis()
      .then(wikiList => {
        commit('wikis_success', wikiList)
      })
      .catch(() => {
        commit('wikis_error')
      })
  },
  deleteWiki ({ commit }, payload) {
    return api.deleteWiki(payload).finally(() => commit('wikis_resetState'))
  },
  updateLogo ({ commit }, payload) {
    return api.updateLogo(payload)
  },
  updateSkin ({ commit }, payload) {
    return api.updateSkin(payload)
  },
  updateSetting ({ commit }, payload) {
    return api.updateSetting(payload.setting, payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
