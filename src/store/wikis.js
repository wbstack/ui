import { api } from './../backend'

const getDefaultState = () => {
  return {
    status: '',
    wikis: [],
    count: 0,
    limit: 0,
    currentWikiEntityImports: [],
    currentWikiEntityImportError: null,
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
  wikiCount: state => state.count,
  wikiLimit: state => state.limit,
  currentWikiEntityImports: state => state.currentWikiEntityImports,
  currentWikiEntityImportError: state => state.currentWikiEntityImportError,
  hasLoaded: state => state.wikis.status !== ''
}

const mutations = {
  wikis_resetState (state) {
    Object.assign(state, getDefaultState())
  },
  wikis_request (state) {
    state.status = 'loading'
  },
  wikis_success (state, myWikisResponse) {
    state.status = 'success'
    state.wikis = myWikisResponse.wikis
    state.limit = myWikisResponse.limit
    state.count = myWikisResponse.count
  },
  wikis_error (state) {
    state.status = 'error'
  },
  set_current_wiki_settings (state, details) {
    const wgDefaultSkinSetting = details.public_settings.find(setting => setting.name === 'wgDefaultSkin')
    const wgDefaultSkin = wgDefaultSkinSetting ? wgDefaultSkinSetting.value : 'Vector'

    const entityMappingSetting = details.public_settings.find(setting => setting.name === 'wikibaseManifestEquivEntities')
    const defaultMapping = { properties: { P31: MAPPING_SUGGESTION_PLACEHOLDER, P279: MAPPING_SUGGESTION_PLACEHOLDER }, items: {} }
    const wikibaseManifestEquivEntities = entityMappingSetting ? JSON.parse(entityMappingSetting.value) : defaultMapping

    const wwUseQuestyCaptchaSetting = details.public_settings.find(setting => setting.name === 'wwUseQuestyCaptcha')
    const wwUseQuestyCaptcha = wwUseQuestyCaptchaSetting ? parseInt(wwUseQuestyCaptchaSetting.value) === 1 : false

    const captchaQuestionsSetting = details.public_settings.find(setting => setting.name === 'wwCaptchaQuestions')
    const defaultQuestions = [
      { question: 'How many vowels are in this question?', answers: ['12', 'twelve'] },
      { question: 'What is the chemical formula of water?', answers: ['H2O'] },
      { question: '2 + 4 = ?', answers: ['6', 'six'] }
    ]
    const captchaQuestions = captchaQuestionsSetting
      ? Object.entries(JSON.parse(captchaQuestionsSetting.value)).map(([key, value]) => {
        return { question: key, answers: value }
      })
      : undefined

    const federatedPropertiesSetting = details.public_settings.find(setting => setting.name === 'wikibaseFedPropsEnable')
    const wikibaseFedPropsEnable = federatedPropertiesSetting ? parseInt(federatedPropertiesSetting.value) === 1 : false

    const lexemeSetting = details.public_settings.find(setting => setting.name === 'wwExtEnableWikibaseLexeme')
    const wwExtEnableWikibaseLexeme = lexemeSetting ? parseInt(lexemeSetting.value) === 1 : false

    const logoSetting = details.public_settings.find(setting => setting.name === 'wgLogo')
    const wgLogo = logoSetting ? logoSetting.value : null

    const wwWikibaseStringLengthStringSetting = details.public_settings.find(setting => setting.name === 'wwWikibaseStringLengthString')
    const wwWikibaseStringLengthString = wwWikibaseStringLengthStringSetting ? parseInt(wwWikibaseStringLengthStringSetting.value) : 400

    const wwWikibaseStringLengthMonolingualTextSetting = details.public_settings.find(setting => setting.name === 'wwWikibaseStringLengthMonolingualText')
    const wwWikibaseStringLengthMonolingualText = wwWikibaseStringLengthMonolingualTextSetting ? parseInt(wwWikibaseStringLengthMonolingualTextSetting.value) : 400

    const wwWikibaseStringLengthMultilangSetting = details.public_settings.find(setting => setting.name === 'wwWikibaseStringLengthMultilang')
    const wwWikibaseStringLengthMultilang = wwWikibaseStringLengthMultilangSetting ? parseInt(wwWikibaseStringLengthMultilangSetting.value) : 250

    const wwExtEnableConfirmAccountSetting = details.public_settings.find(setting => setting.name === 'wwExtEnableConfirmAccount')
    const wwExtEnableConfirmAccount = wwExtEnableConfirmAccountSetting ? parseInt(wwExtEnableConfirmAccountSetting.value) === 1 : false

    state.currentWikiSettings = {
      wikibaseManifestEquivEntities,
      wikibaseFedPropsEnable,
      wwExtEnableWikibaseLexeme,
      wgLogo,
      wgDefaultSkin,
      wwWikibaseStringLengthString,
      wwWikibaseStringLengthMonolingualText,
      wwWikibaseStringLengthMultilang,
      wwExtEnableConfirmAccount,
      wwUseQuestyCaptcha,
      captchaQuestions,
      defaultQuestions
    }
  },
  clear_current_wiki_settings (state) {
    state.currentWikiSettings = null
  },
  set_item_mapping (state, mapping) {
    state.currentWikiSettings.wikibaseManifestEquivEntities.items = mapping
  },
  set_property_mapping (state, mapping) {
    state.currentWikiSettings.wikibaseManifestEquivEntities.properties = mapping
  },
  set_federated_properties_enabled (state, enabled) {
    state.currentWikiSettings.wikibaseFedPropsEnable = enabled
  },
  set_lexeme_enabled (state, enabled) {
    state.currentWikiSettings.wwExtEnableWikibaseLexeme = enabled
  },
  set_logo (state, url) {
    state.currentWikiSettings.wgLogo = url
  },
  set_skin (state, skin) {
    state.currentWikiSettings.wgDefaultSkin = skin
  },
  set_wikibase_string_lengths (state, { variableName, value }) {
    state.currentWikiSettings[variableName] = value
  },
  set_enable_confirm_account (state, { value }) {
    state.currentWikiSettings.wwExtEnableConfirmAccount = value
  },
  set_enable_questy_captcha (state, { value }) {
    state.currentWikiSettings.wwUseQuestyCaptcha = value
  },
  set_questy_captcha_questions (state, value) {
    state.currentWikiSettings.captchaQuestions = value
  },
  set_current_wiki_entityImports (state, response) {
    state.currentWikiEntityImports = response
  },
  set_current_wiki_entityImportError (state, error) {
    state.currentWikiEntityImportError = error
  }
}

const actions = {
  initializeSettings ({ commit }, wikiId) {
    commit('clear_current_wiki_settings')
    api.getEntityImports({ wikiId })
      .then(res => {
        commit('set_current_wiki_entityImports', res)
        commit('set_current_wiki_entityImportError', null)
      })
      .catch(err => commit('set_current_wiki_entityImportError', err))
    api.wikiDetails({ wiki: wikiId })
      .then(details => commit('set_current_wiki_settings', details))
  },
  resetWikisState ({ commit }) {
    commit('wikis_resetState')
  },
  refreshWikis ({ commit, dispatch }) {
    commit('wikis_request')
    return api.myWikis()
      .then(myWikisResponse => {
        commit('wikis_success', myWikisResponse)
      })
      .catch(() => {
        commit('wikis_error')
      })
  },
  deleteWiki ({ commit }, payload) {
    return api.deleteWiki(payload).finally(() => commit('wikis_resetState'))
  },
  updateLogo ({ commit }, payload) {
    return api.updateLogo(payload).then((response) => {
      commit('set_logo', response.data.url)
    })
  },
  updateSkin ({ commit }, payload) {
    return api.updateSkin(payload).then(() => {
      commit('set_skin', payload.value)
    })
  },
  updateSetting ({ commit }, payload) {
    return api.updateSetting(payload.setting, payload)
  },
  updateProfile ({ commit }, payload) {
    return api.updateProfile(payload)
  },
  triggerEntityImport ({ commit }, wikiId) {
    return api.importEntities({ wikiId })
      .then(() => {
        return api.getEntityImports({ wikiId })
      })
      .then(res => {
        commit('set_current_wiki_entityImports', res)
        commit('set_current_wiki_entityImportError', null)
      })
      .catch(err => commit('set_current_wiki_entityImportError', err))
  },
  updateEntityImports ({ commit }, wikiId) {
    return api.getEntityImports({ wikiId })
      .then(res => commit('set_current_wiki_entityImports', res))
  },
  setItemMapping ({ commit }, mapping) {
    commit('set_item_mapping', mapping)
  },
  setPropertyMapping ({ commit }, mapping) {
    commit('set_property_mapping', mapping)
  },
  setFederatedPropertiesEnabled ({ commit }, enabled) {
    commit('set_federated_properties_enabled', enabled)
  },
  setLexemeEnabled ({ commit }, enabled) {
    commit('set_lexeme_enabled', enabled)
  },
  setWikibaseStringLengths ({ commit }, { setting, value }) {
    commit('set_wikibase_string_lengths', setting, value)
  },
  setEnableConfirmAccount ({ commit }, value) {
    commit('set_enable_confirm_account', value)
  },
  saveEntityMapping ({ state }, wikiId) {
    const setting = 'wikibaseManifestEquivEntities'
    const mapping = state.currentWikiSettings.wikibaseManifestEquivEntities
    return api.updateSetting(setting, {
      wiki: wikiId,
      setting,
      value: JSON.stringify({
        properties: filterOutPlaceholderMapping(mapping.properties),
        items: filterOutPlaceholderMapping(mapping.items)
      })
    })
  },
  setEnabledQuestyCaptcha ({ commit }, enabled) {
    commit('set_enable_questy_captcha', enabled)
  },
  setQuestyCaptchaQuestions ({ commit }, value) {
    commit('set_questy_captcha_questions', value)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
