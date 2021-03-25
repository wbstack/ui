import { api } from './../backend'

const getDefaultState = () => {
  return {
    status: '',
    wikis: [],
    currentWikiSettings: null
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
  },
  set_current_wiki_settings (state, details) {
    const entityMappingSetting = details.public_settings.find(setting => setting.name === 'wikibaseManifestEquivEntities')
    const entityMapping = entityMappingSetting ? JSON.parse(entityMappingSetting.value) : { properties: {}, items: {} }
    state.currentWikiSettings = { entityMapping }
  },
  set_item_mapping (state, mapping) {
    state.currentWikiSettings.entityMapping.items = mapping
  },
  set_property_mapping (state, mapping) {
    state.currentWikiSettings.entityMapping.properties = mapping
  }
}

const actions = {
  initializeSettings ({ commit }, wikiId) {
    api.wikiDetails({ wiki: wikiId })
      .then(details => commit('set_current_wiki_settings', details))
  },
  resetWikisState ({ commit }) {
    commit('wikis_resetState')
  },
  refreshWikis ({ commit, dispatch }) {
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
  },
  setItemMapping ({ commit }, mapping) {
    commit('set_item_mapping', mapping)
  },
  setPropertyMapping ({ commit }, mapping) {
    commit('set_property_mapping', mapping)
  },
  saveEntityMapping ({ state }, wikiId) {
    const setting = 'wikibaseManifestEquivEntities'
    return api.updateSetting(setting, {
      wiki: wikiId,
      setting,
      value: JSON.stringify(state.currentWikiSettings.entityMapping)
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
