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
  services: ['geckodriver'],
  capabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      },
    }
  ]
}
