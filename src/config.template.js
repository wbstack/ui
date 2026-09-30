/* eslint-disable no-template-curly-in-string */

// keep in sync with src/config.js
window.config = {
  RECAPTCHA_SITE_KEY: '${RECAPTCHA_SITE_KEY}',
  RECAPTCHA_ENABLED: '${RECAPTCHA_ENABLED}' !== '0',
  SUBDOMAIN_SUFFIX: '${SUBDOMAIN_SUFFIX}',
  CNAME_RECORD: '${CNAME_RECORD}',
  API_MOCK: '${API_MOCK}',
}
