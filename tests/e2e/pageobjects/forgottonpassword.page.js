const { Store } = require('vuex')

class ForgottenPassword {
  /**
     * elements
     */
  get inputEmail () { return $('#inputEmail') }
  get sendEmailButton () { return $('#resetButton') }
  get store () { return Store.ForgottenPassword }

  /**
     *methods
     */
  open (path = '/forgotten-password') {
    browser.url(path)
  }
}

module.exports = new ForgottenPassword()
