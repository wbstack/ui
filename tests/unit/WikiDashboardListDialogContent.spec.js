import { shallowMount } from '@vue/test-utils'
import WikiDashboardListDialogContent from '@/components/Pages/Dashboard/Components/WikiDashboardListDialogContent.vue'
require('./boilerplate.js')

describe('WikiDashboardListDialogContent.vue', () => {
  const today = new Date()
  const suspensionDay = today.getDate() + 1
  const suspensionActiveFromDate = new Date()
  suspensionActiveFromDate.setDate(suspensionDay)
  const formattedActiveFromDate = suspensionActiveFromDate.toLocaleDateString(
    'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
  )
  const propsData = {
    formattedActiveFromDate,
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

    expect(wrapper.text()).toContain(`will be taken offline on ${formattedActiveFromDate}`)
    expect(wrapper.text()).not.toContain('is expecting a review')
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
    expect(wrapper.text()).not.toContain('will be taken offline')
    expect(wrapper.text()).toContain('mywayordatway.wikibase.cloud')
  })
})
