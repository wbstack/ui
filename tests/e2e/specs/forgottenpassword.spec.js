const ForgottenPassword = require('../pageobjects/forgottonpassword.page')

describe('Vue.js app', () => {
  let mock

  before(() => {
    mock = browser.mock('https://example.com')

    mock.respond([{
      title: 'Injected (non) completed Todo',
      order: null,
      completed: false
    }, {
      title: 'Injected completed Todo',
      order: null,
      completed: true
    }])
  })
  it('should open and render with some buttons', () => {
    browser.url('https://example.com')
    browser.setupInterceptor()
    browser.expectRequest('POST', '/user/forgotPassword', 200)

    ForgottenPassword.open()
    ForgottenPassword.inputEmail.setValue('a@a.a')
    ForgottenPassword.sendEmailButton.click()

    browser.pause(1000) // maybe wait a bit until request is finished
    browser.assertRequests()
    // expect(request.method).toEqual('POST');
    // assert.equal(request.response.headers['content-length'], '42');
  })
})
