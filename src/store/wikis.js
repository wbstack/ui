import { api } from './../backend'

const getDefaultState = () => {
  return {
    status: '',
    wikis: [],
    currentWikiSettings: null
  }
}

const state = getDefaultState()

const MAPPING_SUGGESTION_PLACEHOLDER = 'No Mapping'

function filterOutPlaceholderMapping (mapping) {
  const filteredMapping = {}
  Object.keys(mapping).forEach((wikidataId) => {
    if (mapping[wikidataId] === MAPPING_SUGGESTION_PLACEHOLDER) {
      return
    }

    filteredMapping[wikidataId] = mapping[wikidataId]
  })

  return filteredMapping
}

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
    const defaultMapping = { properties: { P31: MAPPING_SUGGESTION_PLACEHOLDER, P279: MAPPING_SUGGESTION_PLACEHOLDER }, items: {} }
    const entityMapping = entityMappingSetting ? JSON.parse(entityMappingSetting.value) : defaultMapping
    state.currentWikiSettings = { entityMapping }
  },
  clear_current_wiki_settings (state) {
    state.currentWikiSettings = null
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
    commit('clear_current_wiki_settings')
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
    const mapping = state.currentWikiSettings.entityMapping
    return api.updateSetting(setting, {
      wiki: wikiId,
      setting,
      value: JSON.stringify({
        properties: filterOutPlaceholderMapping(mapping.properties),
        items: filterOutPlaceholderMapping(mapping.items)
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
