import config from '../../src/config'
import { getRecaptchaToken } from '../../src/backend/recaptcha'

describe('getRecaptchaToken', () => {
  const recaptchaEnabled = config.RECAPTCHA_ENABLED

  afterEach(() => {
    config.RECAPTCHA_ENABLED = recaptchaEnabled
  })

  it('returns a local token without contacting reCAPTCHA when disabled', async () => {
    config.RECAPTCHA_ENABLED = false
    const app = { $recaptcha: jest.fn() }

    await expect(getRecaptchaToken(app, 'login')).resolves.toBe('local-development')
    expect(app.$recaptcha).not.toHaveBeenCalled()
  })

  it('requests a reCAPTCHA token when enabled', async () => {
    config.RECAPTCHA_ENABLED = true
    const app = { $recaptcha: jest.fn().mockResolvedValue('captcha-token') }

    await expect(getRecaptchaToken(app, 'login')).resolves.toBe('captcha-token')
    expect(app.$recaptcha).toHaveBeenCalledWith('login')
  })
})
