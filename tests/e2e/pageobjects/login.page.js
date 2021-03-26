class Login {
  /**
   * elements
   */
  get header () { return $('.container header') }

  get email () { return $('#inputEmail') }

  get password () { return $('#inputPassword') }

  get submit () { return $('.container button') }

  /**
   * methods
   */
  open (path = '/login') {
    browser.url(path)
  }
}

module.exports = new Login()
