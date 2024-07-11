class Discovery {
  get excludeEmptyToggle () { return $('//label[contains(text(), "exclude empty Wikibases")]') }
  get emptySeededSite () { return $('//div[contains(text(), "seededSite")]') }

  open (path = '/discovery') {
    browser.url(path)
  }
}

module.exports = new Discovery()
