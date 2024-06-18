const App = require('../pageobjects/app.page')

describe('Vue.js app', () => {
  beforeEach(async () => {
    App.open()
    await browser.setWindowSize(1360, 973)
  })

  it('should render mainpage with all elements', async () => {
    // Logo
    expect(App.logo).toExist()

    // Footer
    expect(App.footer).toExist()

    // WBCloud introduction
    expect(App.wbcloudIntro).toExist()

    // featured wikis
    expect(App.featuredWiki1).toExist()
    expect(App.featuredWiki2).toExist()
    expect(App.featuredWiki3).toExist()
  })

  it('should open and render with Login button', async () => {
    const navLogin = await App.navLogin
    await navLogin.waitForDisplayed({ timeout: 5000 })

    expect(await navLogin.isClickable()).toBe(true)
    await navLogin.click()

    await expect(browser).toHaveUrlContaining('/login', { wait: 5000 })
  })

  it('should open and render with Signup button', async () => {
    const navCreateAccount = await App.navCreateAccount
    await navCreateAccount.waitForDisplayed({ timeout: 5000 })

    expect(await navCreateAccount.isClickable()).toBe(true)
    await navCreateAccount.click()

    await expect(browser).toHaveUrlContaining('/create-account', { wait: 5000 })
  })

  it('should collapse Login and Signup buttons into a dots-button icon when screen width < 600px', async () => {
    await browser.setWindowSize(599, 800)
    const dotsButton = await App.dotsButton
    await dotsButton.waitForDisplayed({ timeout: 5000 })

    expect(await dotsButton.isDisplayed()).toBe(true)
  })

  it('should have a button linking to Discovery page', async () => {
    const discoveryButton = await App.discoveryButton
    await discoveryButton.waitForDisplayed({ timeout: 5000 })

    expect(await discoveryButton.isClickable()).toBe(true)
    await discoveryButton.click()

    await expect(browser).toHaveUrlContaining('/discovery', { wait: 5000 })
  })

  it('should prompt users to sign up for open Beta', async () => {
    const openBetaButton = await App.openBetaButton
    await openBetaButton.waitForDisplayed({ timeout: 5000 })

    expect(await openBetaButton.isClickable()).toBe(true)
    await openBetaButton.click()

    await expect(browser).toHaveUrlContaining('/create-account', { wait: 5000 })
  })
})
