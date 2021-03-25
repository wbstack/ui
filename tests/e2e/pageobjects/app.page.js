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

  /**
   * methods
   */
  open (path = '/') {
    browser.url(path)
  }
}

module.exports = new App()
