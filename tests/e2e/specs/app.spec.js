const App = require('../pageobjects/app.page')

describe('Vue.js app', () => {
  it('should open and render with some buttons', () => {
    App.open()
    expect(App.heading).toHaveText('Welcome to wikibase.cloud')
    expect(App.navLogin).toExist()
    expect(App.navCreateAccount).toExist()
  })
  it('should open and render with some buttons', () => {
    App.open()
    App.navLogin.click()
  })
})
