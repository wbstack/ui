const { config } = require('./wdio.shared.conf')

exports.config = {
  /**
   * base config
   */
  ...config,
  /**
   * config for local testing
   */
  logLevel: 'debug',
  outputDir: '',
  maxInstances: 1,
  port: 4444,
  path: '/wd/hub',
  capabilities: [
    {
      browserName: 'firefox',
      hostname: 'selenium-firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      },
      alwaysMatch: {
        'moz:debuggerAddress': true
      }
    },
    {
      browserName: 'chrome',
      hostname: 'selenium-chrome',
      'goog:chromeOptions': {
        args: ['--headless']
      }
    }
  ]
}
