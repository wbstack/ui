class Discovery {
  get pagination () { return $('.pagination') }
  get sortDropdown () { return $('.options .v-select') }
  get sortValue () { return $('.options .v-select__selection') }
  get excludeEmptyCheckbox () { return $('.options .v-input--checkbox input') }
  get firstCard () { return $('.card:first-child') }
  get lastCard () { return $('.card:last-child') }
  get footer () { return $('.footer') }
  get header () { return $('.intro .text-h4.title') }

  async getCardDetails (card) {
    await card.waitForDisplayed({ timeout: 5000 })
    return {
      name: await (await card.$('.text-h5')).getText(),
      pages: await (await card.$('.pages')).getText()
    }
  }

  async getFirstCard () {
    return await this.getCardDetails(await this.firstCard)
  }

  async getLastCard () {
    return await this.getCardDetails(await this.lastCard)
  }

  getCardByPageCount (count) {
    return $('//div[contains(text(), "No. of pages: ' + count + '")]')
  }

  async waitForCards () {
    const sortDropdown = await this.sortDropdown
    // Inputs on the discovery page are disabled until the results are loaded
    await sortDropdown.waitForClickable({ timeout: 5000 })
  }

  async setSortValue (value) {
    const sortDropdown = await this.sortDropdown
    await sortDropdown.waitForClickable({ timeout: 5000 })
    await sortDropdown.click()

    const dropdownOption = await $(
      '//div[contains(@class, "v-list-item__title") and contains(text(), "' + value + '")]'
    )
    await dropdownOption.waitForDisplayed({ timeout: 5000 })
    await dropdownOption.click()
    await this.waitForCards()
  }

  async open (path = '/discovery') {
    await browser.url(path)
  }
}

module.exports = new Discovery()
