import { shallowMount } from '@vue/test-utils'
import TermsOfUseRenderer from '@/components/Pages/TermsOfUse/TermsOfUseRenderer.vue'
require('./boilerplate.js')

describe('About.vue', () => {
  it('renders some error text if the api call fails or there is no api', () => {
    const mockRoute = {
        params: {
            activeFrom: '0001-01-01'
        }
    }
    const mockApi = jest.fn()
    const msg = 'An error occurred'
    const wrapper = shallowMount(TermsOfUseRenderer, {
            mocks: {
                $route: mockRoute,
                $api: mockApi
            }
        }
    )
    expect(wrapper.text()).toMatch(msg)
  })
})
