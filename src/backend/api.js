import axios from './axios'

// User endpoints
export const login = async user => (await axios.post('/auth/login', user)).data
export const register = async payload => axios.post('/user/register', payload)
export const forgottenPassword = async () => axios.post('/user/forgotPassword')
export const resetPassword = async payload => axios.post('/user/resetPassword', payload)
export const sendVerifyEmail = async () => axios.post('/user/sendVerifyEmail')
export const verifyEmail = async payload => axios.post('/user/verifyEmail', payload)

// Wiki endpoints
export const countWikis = async () => (await axios.get('/wiki/count')).data.data
export const myWikis = async () => (await axios.post('/wiki/mine')).data
export const createWiki = async payload => axios.post('/wiki/create', payload)
export const deleteWiki = async payload => axios.post('/wiki/delete', payload)
export const updateLogo = async ({ file, fileName, wikiId }) => {
  const form = new FormData()
  form.append('logo', file, fileName)
  form.append('wiki', wikiId)
  return axios.post('/wiki/logo/update', form)
}
export const updateSetting = async (setting, payload) => axios.post(`/wiki/setting/${setting}/update`, payload)
export const updateSkin = async payload => updateSetting('skin', payload)
export const wikiDetails = async payload => (await axios.post('/wiki/details', payload)).data.data

// Admin endpoints
export const listInterests = async () => axios.post('/admin/interest/list')
export const registerInterest = async payload => axios.post('/interest/register', payload)
export const listInvitations = async () => axios.post('/admin/invitation/list')
export const createInvitation = async payload => axios.post('/admin/invitation/create', payload)
export const deleteInvitation = async payload => axios.post('/admin/invitation/delete', payload)
