import axios from './axios'

// User endpoints
export const login = async user => (await axios.post('/auth/login', user)).data
export const register = async payload => {
  const resp = await axios.post('/user/register', payload).catch(ex => {
    const { errors = {} } = ex.response.data
    throw errors
  })

  return resp.data.success
}
export const forgottenPassword = async () => axios.post('/user/forgotPassword')
export const resetPassword = async payload => axios.post('/user/resetPassword', payload)
export const sendVerifyEmail = async () => (await axios.post('/user/sendVerifyEmail')).data.message
export const verifyEmail = async payload => {
  const resp = await axios.post('/user/verifyEmail', payload).catch(error => {
    const expired = error.response.status === 422
    throw expired
  })

  return resp.data.message
}

// Wiki endpoints
export const countWikis = async () => (await axios.get('/wiki/count')).data.data
export const myWikis = async () => (await axios.post('/wiki/mine')).data
export const createWiki = async payload => {
  return (await axios.post('/wiki/create', payload).catch(({ response: { data: { message, errors = {} } } }) => {
    errors.message = message
    errors.dbNotReady = message === 'No databases ready'
    throw errors
  })).data.data
}
export const deleteWiki = async payload => axios.post('/wiki/delete', payload)
export const updateLogo = async ({ file, fileName, wikiId }) => {
  const form = new FormData()
  form.append('logo', file, fileName)
  form.append('wiki', wikiId)
  return axios.post('/wiki/logo/update', form)
}
// TODO the api should get the setting from the path (so it isn't needed in the payload)
// payload needs 'wiki', 'setting' and 'value' keys
export const updateSetting = async (setting, payload) => axios.post(`/wiki/setting/${setting}/update`, { ...payload, setting })
export const updateSkin = async payload => updateSetting('skin', payload)
export const wikiDetails = async payload => (await axios.post('/wiki/details', payload)).data

// Admin endpoints
export const listInterests = async () => (await axios.post('/admin/interest/list')).data.data
export const registerInterest = async payload => {
  const { success, message } = (await axios.post('/interest/register', payload).catch(ex => {
    let error = 'Something went wrong, please try again.'

    if (ex.response.data.email) {
      error = ex.response.data.email[0]
    }

    throw error
  })).data

  if (!success) {
    throw message
  }
}
export const listInvitations = async () => (await axios.post('/admin/invitation/list')).data.data
export const createInvitation = async payload => {
  return (await axios.post('/admin/invitation/create', payload).catch(ex => {
    throw ex.response.data.code
  })).data.code
}
export const deleteInvitation = async payload => (await axios.post('/admin/invitation/delete', payload)).data.code
