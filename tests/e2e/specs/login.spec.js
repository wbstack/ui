const Login = require('../pageobjects/login.page')

describe('Login page', () => {
  it('should open and render login header', () => {
    Login.open()
    expect(Login.header).toHaveTextContaining('Log in to your account')
  })

  it('should allow you to login', () => {
    Login.email.setValue('a@a.a')
    Login.password.setValue('a')
    Login.submit.click()

    // $("*=Welcome to WBStack").waitForDisplayed();
    browser.pause(10 * 1000)

    console.log($('*=Welcome to WBStack').getText())
  })
})
