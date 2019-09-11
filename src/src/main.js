// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import router from './router'
import axios from './backend/vue-axios'
import store from './store'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Must be loaded before vuetify css
import 'typeface-roboto/index.css'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})

// TODO inject this key...
Vue.use(VueReCaptcha, { siteKey: '6LeHzbMUAAAAABjNp0vILaWr5ZeYHmteF7rGuZNV' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>',
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
          console.log('Detected logged out state, so logging out...')
          store
            .dispatch('logout')
            .then(() => router.push('/login'))
            .catch(err => {
              console.log(err)
            })
        }
        throw err
      })
    })
  }
})
