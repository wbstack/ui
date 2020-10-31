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
    return new Promise((resolve, reject) => {
      commit('wikis_request')
      api.myWikis()
        .then(wikiList => {
          commit('wikis_success', wikiList)
          resolve()
        })
        .catch(err => {
          commit('wikis_error')
          reject(err)
        })
    })
  },
  deleteWiki ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.deleteWiki(payload)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      commit('wikis_resetState')
    })
  },
  updateLogo ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.updateLogo(payload)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateSkin ({ commit }, payload) {
    // TODO remove updateSkin and just use updateSetting...
    // TODO the API should deduce this from the route...
    payload.setting = 'skin'
    return new Promise((resolve, reject) => {
      api.updateSkin(payload)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateSetting ({ commit }, payload) {
    // payload needs 'wiki', 'setting' and 'value' keys
    return new Promise((resolve, reject) => {
      // TODO the api should get the setting from the path (so it isn't needed in the payload)
      api.updateSetting(payload.setting, payload)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
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
