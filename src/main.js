// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import router from './router'
import store from './store'
import { api, axios } from './backend'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'typeface-roboto/index.css'
import 'vuetify/dist/vuetify.min.css'
import config from '~/config'

if (process.env.NODE_ENV !== 'production' && config.API_MOCK === '1') {
  const { worker } = require('./backend/mocks/browser')
  worker.start()
}

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.use(VueReCaptcha, {
  siteKey: config.RECAPTCHA_SITE_KEY,
  loaderOptions: { useRecaptchaNet: true }
})

// allow components to access api without importing it
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  }),
  components: { App },
  template: '<App/>',
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        // Unauthenticated. is the exact error message returned by the API for the auth middle ware
        // which is why we check for that message here...
        if (err.response.config && !err.response.config.__isRetryRequest && err.response.data && err.response.data.error && err.response.data.error === 'Unauthenticated.') {
          // TODO this IF should also have a condition for is logged in....
          console.log('Detected logged out state, so logging out...')
          store
            .dispatch('logout')
            .then(() => router.push('/login'))
            .catch(err => {
              console.log(err)
            })
        }
        reject(err)
      })
    })
  }
})
