import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Logo from '@/components/Pages/ManageWiki/Cards/Logo.vue'

Vue.use(Vuetify)

describe('Logo uploads', () => {
  let wrapper
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn().mockResolvedValue()
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    wrapper = shallowMount(Logo, {
      propsData: { wikiId: 1 },
      mocks: {
        $store: {
          dispatch,
          state: { wikis: { currentWikiSettings: { wgLogo: 'logo.png' } } },
        },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.restoreAllMocks()
  })

  it('accepts SVG and PNG and explains the recommended format and limits', () => {
    const input = wrapper.findComponent({ name: 'v-file-input' })
    expect(input.attributes('accept')).toBe('image/png,image/svg+xml,.png,.svg')
    expect(input.attributes('hint')).toContain('SVG (recommended)')
    expect(input.attributes('hint')).toContain('135x135')
    expect(input.attributes('hint')).toContain('2 MiB')
  })

  it('uploads the selected SVG without changing its filename or contents', async () => {
    const file = new File(['<svg/>'], 'logo.svg', { type: 'image/svg+xml' })
    wrapper.vm.onLogoFileChanged(file)
    wrapper.vm.doLogoUpload()
    await Promise.resolve()
    expect(dispatch).toHaveBeenCalledWith('updateLogo', { wikiId: 1, file, fileName: 'logo.svg' })
    expect(window.alert).toHaveBeenCalledWith('Upload success!')
  })

  it('shows API validation errors without discarding the selected file', async () => {
    const file = new File(['invalid'], 'logo.svg', { type: 'image/svg+xml' })
    dispatch.mockRejectedValue({ response: { data: { errors: { logo: ['Invalid SVG logo.'] } } } })
    wrapper.vm.onLogoFileChanged(file)
    wrapper.vm.doLogoUpload()
    await Promise.resolve()
    await Promise.resolve()
    expect(window.alert).toHaveBeenCalledWith('Invalid SVG logo.')
    expect(wrapper.vm.selectedLogoFile).toBe(file)
  })

  it('shows an error when the network request fails', async () => {
    dispatch.mockRejectedValue(new Error('Network error'))
    wrapper.vm.onLogoFileChanged(new File(['data'], 'logo.png'))
    wrapper.vm.doLogoUpload()
    await Promise.resolve()
    await Promise.resolve()
    expect(window.alert).toHaveBeenCalledWith('The logo could not be uploaded. Please try again.')
  })
})
