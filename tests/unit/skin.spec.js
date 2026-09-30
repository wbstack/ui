import Skin from '@/components/Pages/ManageWiki/Cards/Skin.vue'

const getSkinValues = (defaultSkin) => Skin.data.call({
  $store: {
    state: {
      wikis: {
        currentWikiSettings: { wgDefaultSkin: defaultSkin },
      },
    },
  },
}).skins.map(skin => skin.value)

describe('Skin.vue', () => {
  it('does not offer Modern for other default skins', () => {
    expect(getSkinValues('vector')).toEqual(['vector', 'timeless'])
  })

  it('retains Modern for wikis that already use it as their default', () => {
    expect(getSkinValues('modern')).toEqual(['vector', 'modern', 'timeless'])
  })
})
