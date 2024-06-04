const { config } = require('./wdio.shared.conf')

exports.config = {
  /**
   * base config
   */
  ...config,
  /**
   * config for local testing
   */
  maxInstances: 1,
  hostname: 'selenium-firefox',
  port: 4444,
  path: '/wd/hub',
  capabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      },
      'alwaysMatch': {
        'moz:debuggerAddress': true
      }
    }
  ]
}
