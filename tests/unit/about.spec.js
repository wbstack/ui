import { shallowMount } from '@vue/test-utils'
import About from '@/components/Pages/About.vue'
require('./boilerplate.js')

describe('About.vue', () => {
  it('renders some text', () => {
    const msg = 'About'
    const wrapper = shallowMount(About)
    expect(wrapper.text()).toMatch(msg)
  })
})
