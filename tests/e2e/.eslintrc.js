module.exports = {
  plugins: ['wdio'],
  extends: 'plugin:wdio/recommended',
  env: {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended"
  ],
  rules: {
    strict: 'off'
  }
}
