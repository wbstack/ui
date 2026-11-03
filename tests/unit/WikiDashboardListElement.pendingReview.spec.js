import { shallowMount } from '@vue/test-utils'
import WikiDashboardListElement from '@/components/Pages/Dashboard/Components/WikiDashboardListElement.vue'
require('./boilerplate.js')

describe('WikiDashboardListElement.vue', () => {
  it('renders a Wiki List Element with expiry notice', () => {
    const wrapper = shallowMount(WikiDashboardListElement, {
      propsData: {
        wikiTitle: 'Foobar',
        wikiDomain: 'foobar.wikibase.cloud',
        wikiId: 1,
        suspensionActiveFrom: '2027-02-02T08:58:11.000000Z',
        hasPendingReview: true,
      },
    })

    expect(wrapper.text()).toMatch('Pending review')
  })
})
