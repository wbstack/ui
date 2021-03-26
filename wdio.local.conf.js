const { config } = require('./wdio.shared.conf')
const saveScreenshot = require( 'wdio-mediawiki' ).saveScreenshot;

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
  ],

	// Setting this enables automatic screenshots
	screenshotPath: process.env.LOG_DIR || __dirname + '/tests/e2e/logs',

  /**
   * Function to be executed after a test (in Mocha/Jasmine) ends.
   */
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    const filePath = saveScreenshot( test.title.replace(/ /g, '_') );
    console.log( '\n\tScreenshot: ' + filePath + '\n' );
  },

}
