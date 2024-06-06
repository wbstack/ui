const App = require('../pageobjects/app.page')

describe('Vue.js app', () => {
  it('should render the WBC logo', async () => {
    App.open()
    expect(App.logo).toExist()
  })

  it('should open and render with Login button', async () => {
    const navLogin = await $('#nav-login')
    // await navLogin.waitForDisplayed()

    // Assert that the element is clickable
    expect(await navLogin.isClickable()).toBe(true)
    await navLogin.click()
  })

  it('should open and render with Signup button', async () => {
    const navCreateAccount = await $('#nav-create-account')
    // await navCreateAccount.waitForDisplayed()

    // Assert that the element is clickable
    expect(await navCreateAccount.isClickable()).toBe(true)
    await navCreateAccount.click()
  })

  it('should collapse Login and Signup buttons into a dots-button icon when screen width < 600px', async () => {
    await browser.setWindowSize(599, 800)
    const dotsButton = await $('#dots-button')
    await dotsButton.waitForDisplayed()

    // Assert that the element is displayed
    expect(await dotsButton.isDisplayed()).toBe(true)
  })

  it('should have a button linking to Discovery page', async () => {
    App.open()
    const discoveryButton = await $('#discovery-button')
    await discoveryButton.waitForDisplayed()

    // Assert that the element is clickable
    expect(await discoveryButton.isClickable()).toBe(true)
    // CLick the button
    await discoveryButton.click()
    // Wait for the URL to change to the discovery URL
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/discovery'),
      {
        timeout: 5000,
        timeoutMsg: 'expected to be redirected to /discovery within 5s'
      }
    )

    // Assert the new URL
    const discoveryUrl = await browser.getUrl()
    expect(discoveryUrl).toContain('/discovery')
  })

  it('should prompt users to sign up for open Beta', async () => {
    App.open()
    const openBetaButton = await $('#open-beta-button')
    await openBetaButton.waitForDisplayed()

    // Assert that the element is clickable
    expect(await openBetaButton.isClickable()).toBe(true)
    // CLick the button
    await openBetaButton.click()
    // Wait for the URL to change to the signup URL
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/create-account'),
      {
        timeout: 10000,
        timeoutMsg: 'expected to be redirected to /create-account within 5s'
      }
    )

    // Assert the new URL
    const signupUrl = await browser.getUrl()
    expect(signupUrl).toContain('/create-account')
  })

  it('should open and render some text to introduce WBCloud', () => {
    App.open()
    expect(App.wbcloudIntro).toExist()
  })

  it('should open and render a footer element', () => {
    expect(App.footer).toExist()
  })

  it('should open and show 3 featured wikis', () => {
    expect(App.featuredWiki1).toExist()
    expect(App.featuredWiki2).toExist()
    expect(App.featuredWiki3).toExist()
  })
})
