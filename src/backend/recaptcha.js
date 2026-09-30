import config from '../config'

export const getRecaptchaToken = (app, action) => {
  if (!config.RECAPTCHA_ENABLED) {
    return Promise.resolve('local-development')
  }

  return app.$recaptcha(action)
}
