'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL),
  RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY || '6LeHzbMUAAAAABjNp0vILaWr5ZeYHmteF7rGuZNV') // replace with test key
}
