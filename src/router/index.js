import Vue from 'vue'
import Router from 'vue-router'
import Store from './../store'

import Home from '@/components/Pages/Home/Home'
import Dashboard from '@/components/Pages/Dashboard'
import About from '@/components/Pages/About'
import Contact from '@/components/Pages/Contact'
import CreateAccount from '@/components/Pages/CreateAccount'
import Login from '@/components/Pages/Login'
import Logout from '@/components/Pages/Logout'
import ForgottenPassword from '@/components/Pages/ForgottenPassword'
import ResetPassword from '@/components/Pages/ResetPassword'
import EmailVerification from '@/components/Pages/EmailVerification'
import CreateWiki from '@/components/Pages/CreateWiki'
import TabSettings from '@/components/Pages/ManageWiki/TabSettings'
import TermsOfUse from '@/components/Pages/TermsOfUse'
import Privacy from '@/components/Pages/Privacy/Privacy'
import User from '@/components/Pages/User'
import Discovery from '@/components/Pages/Discovery/Discovery'

Vue.use(Router)

const router = new Router({
  mode: 'history', // <=
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        customLayout: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/create-account',
      name: 'CreateAccount',
      component: CreateAccount
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgotten-password',
      name: 'ForgottenPassword',
      component: ForgottenPassword
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/terms-of-use',
      name: 'TermsOfUse',
      component: TermsOfUse
    },
    {
      path: '/privacy-policy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/emailVerification/:token',
      name: 'EmailVerification',
      component: EmailVerification,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wikis/create',
      name: 'CreateWiki',
      component: CreateWiki,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wikis/manage/:id',
      name: 'TabSettings',
      component: TabSettings,
      meta: {
        requiresAuth: true,
        customLayout: true
      }
    },
    {
      path: '/discovery',
      name: 'Discovery',
      component: Discovery,
      meta: {
        customLayout: true
      }
    }
  ]
})

// Require some routes to be logged in only.
// From https://pusher.com/tutorials/authentication-vue-vuex
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await Store.getters.initialized
    if (Store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.afterEach(({ title, name }) => {
  if (typeof title === 'undefined') {
    // split pascal-case into separate words
    title = [...name.matchAll(/([A-Z]+[^A-Z]*)/g)]
      .map(m => m[0])
      .join(' ')
  }

  document.title = `wikibase.cloud ${title.length ? ' - ' + title : ''}`
})

export default router
