class App {
  /**
   * elements
   */
  get heading () { return $('h1') }
  get navLogin () { return $('#nav-login') }
  get navLogout () { return $('#nav-logout') }
  get navCreateAccount () { return $('#nav-create-account') }
  get navUser () { return $('#nav-user') }
  get navDashboard () { return $('#nav-dashboard') }
  get wbcloudIntro () { return $('#wbcloud-intro') }
  get featuredWiki1 () { return $('#featured-wiki-1') }
  get featuredWiki2 () { return $('#featured-wiki-2') }
  get featuredWiki3 () { return $('#featured-wiki-3') }

  /**
   * methods
   */
  open (path = '/') {
    browser.url(path)
  }
}

module.exports = new App()
