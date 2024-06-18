class App {
  /**
   * elements
   */
  get heading () { return $('h1') }
  get logo () { return $('[data-test-id="logo"]') }
  get wbcloudIntro () { return $('[data-test-id="wbcloud-intro"]') }
  get featuredWiki1 () { return $('[data-test-id="featured-wiki-1"]') }
  get featuredWiki2 () { return $('[data-test-id="featured-wiki-2"]') }
  get featuredWiki3 () { return $('[data-test-id="featured-wiki-3"]') }
  get footer () { return $('[data-test-id="footer"]') }
  get navLogin () { return $('[data-test-id="nav-login"]') }
  get navCreateAccount () { return $('[data-test-id="nav-create-account"]') }
  get dotsButton () { return $('[data-test-id="dots-button"]') }
  get discoveryButton () { return $('[data-test-id="discovery-button"]') }
  get openBetaButton () { return $('[data-test-id="open-beta-button"]') }
  /**
   * methods
   */
  open (path = '/') {
    browser.url(path)
  }
}

module.exports = new App()
