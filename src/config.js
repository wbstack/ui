// keep in sync with src/config.template.js
export default {
  RECAPTCHA_SITE_KEY: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
  API_URL: process.env.VUE_APP_API_URL,
  SUBDOMAIN_SUFFIX: process.env.VUE_APP_SUBDOMAIN_SUFFIX,
  MOCK_API: process.env.VUE_APP_MOCK_API,
  NAME: process.env.VUE_APP_NAME,
  URL: process.env.VUE_APP_URL,
  DOMAIN: process.env.VUE_APP_DOMAIN,
  CNAME_RECORD: process.env.VUE_APP_CNAME_RECORD,
  SOURCE: process.env.VUE_APP_SOURCE,
  DOCUMENTATION: process.env.VUE_APP_DOCUMENTATION
}
