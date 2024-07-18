class Discovery {
  get pagination () { return $('.pagination') }
  get sortDropdown () { return $('.options .v-select') }
  get sortValue () { return $('.options .v-select__selection') }
  get excludeEmptyCheckbox () { return $('.options .v-input--checkbox input') }
  get cards () { return $('.grid.cards') }
  get firstCard () { return $('.card:first-child .text-h5') }
  get lastCard () { return $('.card:last-child .text-h5') }

  getCardByWikiName (name) {
    return $('//div[contains(text(), "' + name + '")]')
  }

  getCardByPageCount (count) {
    return $('//div[contains(text(), "No. of pages: ' + count + '")]')
  }

  async setSortValue (value) {
    const sortDropdown = await this.sortDropdown
    await sortDropdown.click()

    const dropdownOption = await $(
      '//div[contains(@class, "v-list-item__title") and contains(text(), "' + value + '")]'
    )
    await dropdownOption.waitForDisplayed({ timeout: 5000 })
    await dropdownOption.click()
  }

  open (path = '/discovery') {
    browser.url(path)
  }
}

module.exports = new Discovery()
