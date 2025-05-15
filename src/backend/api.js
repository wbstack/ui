import axios from './axios'

/* User endpoints */
export const login = async (user) => {
  let call
  if (user) {
    call = axios.post('/auth/login', user)
  } else {
    call = axios.get('/auth/login')
  }
  const { data } = await call
  return data
}

export const logout = async (user) => {
  return await axios.delete('/auth/login', user)
}

export const register = async payload => {
  const resp = await axios.post('/user/register', payload).catch(ex => {
    const { errors = {} } = ex.response.data
    throw errors
  })

  return resp.data.success
}
export const contact = async payload => {
  const resp = await axios.post('/contact/sendMessage', payload).catch(ex => {
    const { errors = {} } = ex.response.data
    throw errors
  })

  return resp.data.success
}
export const forgottenPassword = async email => axios.post('/user/forgotPassword', email)
export const resetPassword = async payload => axios.post('/user/resetPassword', payload)
export const sendVerifyEmail = async () => (await axios.post('/user/sendVerifyEmail')).data.message === 'Already verified!'
export const verifyEmail = async payload => {
  await axios.post('/user/verifyEmail', payload).catch(error => {
    const expired = error.response.status === 422
    throw expired
  })
}
export const checkVerified = async () => {
  const { data } = await axios.get('/auth/login')
  return data.verified
}

/* Wiki endpoints */
export const countWikis = async () => (await axios.get('/wiki/count')).data.data // TODO This doesn't seem to exist and not used?
export const myWikis = async () => (await axios.post('/wiki/mine')).data
export const createWiki = async payload => {
  return (await axios.post('/wiki/create', payload).catch(({ response: { data: { message, errors = {} } } }) => {
    errors.message = message
    errors.dbNotReady = message === 'No databases ready'
    errors.tooManyWikis = message !== null && message.includes('Too many wikis.')
    throw errors
  })).data.data
}
export const deleteWiki = async payload => axios.post('/wiki/delete', payload)
export const updateLogo = async ({ file, fileName, wikiId }) => {
  const form = new FormData()
  form.append('logo', file, fileName)
  form.append('wiki', wikiId)
  return axios.post(
    '/wiki/logo/update',
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
// TODO the api should get the setting from the path (so it isn't needed in the payload)
// payload needs 'wiki', 'setting' and 'value' keys
export const updateSetting = async (setting, payload) => axios.post(`/wiki/setting/${setting}/update`, { ...payload, setting })
export const updateSkin = async payload => updateSetting('wgDefaultSkin', payload)
export const wikiDetails = async payload => (await axios.post('/wiki/details', payload)).data.data
export const updateProfile = async payload => axios.post('/wiki/profile', payload)
export const wikiDiscovery = async ({ sort, direction, active, currentPage, resultsPerPage }) => {
  return (await axios.get('/wiki', {
    params: {
      sort: sort,
      direction: direction,
      is_active: active,
      page: currentPage,
      per_page: resultsPerPage
    }
  })).data
}

export const importEntities = async ({
  wikiId,
  entityIds = [
    'P22@2199351820',
    'P25@2142619520',
    'P40@2211223166',
    'P18@2207212164',
    'P31@2214227295',
    'P279@2217210867',
    'Q1@2216755517',
    'Q2@2216196627',
    'Q5@2212749099',
    'Q64@2215506799',
    'Q42@2213635313',
    'Q3107329@2211072210'
  ],
  sourceWikiUrl = 'https://www.wikidata.org'
}) => {
  const { data: { data } } = await axios.post('/wiki/entityImport', {
    wiki: wikiId,
    entity_ids: entityIds.join(','),
    source_wiki_url: sourceWikiUrl
  })
  return data
}

export const getEntityImports = async ({ wikiId }) => {
  const { data: { data } } = await axios.get(`/wiki/entityImport?wiki=${wikiId}`)
  return data
}
