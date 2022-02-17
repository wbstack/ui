// keep in sync with src/config.template.js
export default {
  RECAPTCHA_SITE_KEY: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
  API_URL: process.env.VUE_APP_API_URL,
  SUBDOMAIN_SUFFIX: process.env.VUE_APP_SUBDOMAIN_SUFFIX,
  CNAME_RECORD: process.env.VUE_APP_CNAME_RECORD,
  API_MOCK: process.env.VUE_APP_API_MOCK
}
