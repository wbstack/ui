import { shallowMount } from '@vue/test-utils'
import WikiDashboardListElement from '@/components/Pages/Dashboard/Components/WikiDashboardListElement.vue'
require('./boilerplate.js')

describe('WikiDashboardListElement.vue', () => {
  it('renders a Wiki List Element with expiry notice', () => {
    const today = new Date()
    const suspensionDay = today.getDate() + 1
    const suspensionActiveFromDate = new Date()
    suspensionActiveFromDate.setDate(suspensionDay)

    const wrapper = shallowMount(WikiDashboardListElement, {
      propsData: {
        wikiTitle: 'Foobar',
        wikiDomain: 'foobar.wikibase.cloud',
        wikiId: 1,
        suspensionActiveFrom: suspensionActiveFromDate.toString(),
        hasPendingReview: false,
      },
    })

    expect(wrapper.text()).toMatch('Expiring soon')
  })
})
