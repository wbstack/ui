const App = require('../pageobjects/app.page')

describe('Vue.js app', () => {
  it('should open and render with Login and Sign Up buttons', () => {
    App.open()
    expect(App.navLogin).toExist()
    expect(App.navCreateAccount).toExist()
  })
  it('should open and render with some buttons', () => {
    App.open()
    App.navLogin.click()
  })
  it('should open and render some text to introduce WBCloud', () => {
    App.open()
    expect(App.wbcloudIntro).toExist()
  })
  it('should open and show 3 featured wikis', () => {
    App.open()
    expect(App.featuredWiki1).toExist()
    expect(App.featuredWiki2).toExist()
    expect(App.featuredWiki3).toExist()
  })
})
