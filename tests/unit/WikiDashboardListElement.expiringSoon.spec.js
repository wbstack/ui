import { shallowMount } from '@vue/test-utils'
import WikiDashboardListElement from '@/components/Pages/Dashboard/Components/WikiDashboardListElement.vue'
require('./boilerplate.js')

describe('WikiDashboardListElement.vue', () => {
  it('renders a Wiki List Element with expiry notice', () => {
    let today = new Date();
    let suspensionDay = today.getDate() + 1;
    let suspensionActiveFromDate = new Date();
    suspensionActiveFromDate.setDate(suspensionDay);

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
