const Discovery = require('../pageobjects/discovery.page')

describe('Discovery page', () => {
  beforeEach(async () => {
    Discovery.open()
    await browser.setWindowSize(1360, 973)
  })

  it('should allow filtering out empty instances', async () => {
    const excludeEmptyToggle = await Discovery.excludeEmptyToggle
    await excludeEmptyToggle.waitForDisplayed({ timeout: 5000 })
    await excludeEmptyToggle.click()

    const emptySeededSite = await Discovery.emptySeededSite
    await emptySeededSite.waitForDisplayed({ timeout: 5000 })
    expect(await emptySeededSite.isDisplayed()).toBe(true)
  })
})
