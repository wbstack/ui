class App {
  /**
   * elements
   */
  get heading () { return $('h1') }
  get logo () { return $('#logo') }
  get wbcloudIntro () { return $('#wbcloud-intro') }
  get featuredWiki1 () { return $('#featured-wiki-1') }
  get featuredWiki2 () { return $('#featured-wiki-2') }
  get featuredWiki3 () { return $('#featured-wiki-3') }
  get footer () { return $('#footer') }
  get navLogin () { return $('#nav-login') }
  get navCreateAccount () { return $('#nav-create-account') }
  get dotsButton () { return $('#dots-button') }
  get discoveryButton () { return $('#discovery-button') }
  get openBetaButton () { return $('#open-beta-button') }
  /**
   * methods
   */
  open (path = '/') {
    browser.url(path)
  }
}

module.exports = new App()
