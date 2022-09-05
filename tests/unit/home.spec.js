import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Pages/Home/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Make your structured data available in our cloud'
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch(msg)
  })
})
