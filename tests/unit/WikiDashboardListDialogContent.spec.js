import { shallowMount } from '@vue/test-utils'
import WikiDashboardListDialogContent from '@/components/Pages/Dashboard/Components/WikiDashboardListDialogContent.vue'
require('./boilerplate.js')

describe('WikiDashboardListDialogContent.vue', () => {
  const propsData = {
    formattedActiveFromDate: '11 November 2026',
    wikiDomain: 'mywayordatway.wikibase.cloud',
    wikiId: 1,
  }

  it('renders the expiry message when there is no pending review', () => {
    const wrapper = shallowMount(WikiDashboardListDialogContent, {
      propsData: {
        ...propsData,
        hasPendingReview: false,
      },
    })
    expect(wrapper.text()).toContain('submit it for review')
    expect(wrapper.text()).toContain('mywayordatway.wikibase.cloud')
  })

  it('renders the pending review message when a review is pending', () => {
    const wrapper = shallowMount(WikiDashboardListDialogContent, {
      propsData: {
        ...propsData,
        hasPendingReview: true,
      },
    })

    expect(wrapper.text()).toContain('is expecting a review')
    expect(wrapper.text()).toContain('mywayordatway.wikibase.cloud')
  })
})
