import axios from './axios'

/* User endpoints */
export const login = async user => (await axios.post('/auth/login', user)).data
export const register = async payload => {
  const resp = await axios.post('/user/register', payload).catch(ex => {
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
export const checkVerified = async () => (await axios.post('/user/self')).data.data.verified

/* Wiki endpoints */
export const countWikis = async () => (await axios.get('/wiki/count')).data.data
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
  return axios.post('/wiki/logo/update', form)
}
// TODO the api should get the setting from the path (so it isn't needed in the payload)
// payload needs 'wiki', 'setting' and 'value' keys
export const updateSetting = async (setting, payload) => axios.post(`/wiki/setting/${setting}/update`, { ...payload, setting })
export const updateSkin = async payload => updateSetting('wgDefaultSkin', payload)
export const wikiDetails = async payload => (await axios.post('/wiki/details', payload)).data.data
