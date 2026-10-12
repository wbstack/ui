import { shallowMount } from '@vue/test-utils'
import EmailVerification from '@/components/Pages/EmailVerification.vue'

const flushPromises = () => new Promise(resolve => setTimeout(resolve))

const mountEmailVerification = ({ isLoggedIn = false, verifyEmail, checkVerified } = {}) => {
  return shallowMount(EmailVerification, {
    mocks: {
      $api: {
        verifyEmail: verifyEmail || jest.fn().mockResolvedValue(),
        checkVerified: checkVerified || jest.fn().mockResolvedValue(true),
      },
      $route: {
        params: {
          token: 'email-verification-token',
        },
      },
      $store: {
        getters: {
          isLoggedIn,
        },
        dispatch: jest.fn(),
      },
    },
    stubs: {
      'v-main': true,
      'v-card': true,
      'v-toolbar': true,
      'v-toolbar-title': true,
      'v-card-text': true,
      'router-link': {
        props: ['to'],
        template: '<a :href="to"><slot /></a>',
      },
    },
  })
}

describe('EmailVerification.vue', () => {
  it('verifies a token without a login and offers a login link', async () => {
    const verifyEmail = jest.fn().mockResolvedValue()
    const wrapper = mountEmailVerification({ verifyEmail })

    await flushPromises()

    expect(verifyEmail).toHaveBeenCalledWith({ token: 'email-verification-token' })
    expect(wrapper.text()).toContain('Email verified!')
    expect(wrapper.find('a').attributes('href')).toBe('/login')
  })

  it('does not offer a login link to an existing authenticated session', async () => {
    const checkVerified = jest.fn().mockResolvedValue(false)
    const wrapper = mountEmailVerification({ isLoggedIn: true, checkVerified })

    await flushPromises()

    expect(wrapper.text()).toContain('Email verified!')
    expect(wrapper.find('a').exists()).toBe(false)
    expect(checkVerified).toHaveBeenCalled()
    expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
  })

  it('does not offer a login link when the token cannot be verified', async () => {
    const wrapper = mountEmailVerification({
      verifyEmail: jest.fn().mockRejectedValue(true),
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Verification token expired, or you are already verified!')
    expect(wrapper.find('a').exists()).toBe(false)
  })
})
