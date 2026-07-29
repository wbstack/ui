import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import policies from './policies'
import user from './user'
import wikis from './wikis'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    error,
    policies,
    user,
    wikis,
  },
})
