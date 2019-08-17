import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Pages/Home/Home'
import About from '@/components/Pages/About'
import CreateAccount from '@/components/Pages/CreateAccount'
import Login from '@/components/Pages/Login'
import Logout from '@/components/Pages/Logout'
import CreateWiki from '@/components/Pages/CreateWiki'
import ManageWiki from '@/components/Pages/ManageWiki'
import TermsOfUse from '@/components/Pages/TermsOfUse'
import Privacy from '@/components/Pages/Privacy'
import User from '@/components/Pages/User'
import Admin from '@/components/Pages/Admin/Admin'

import NotYetImplemented from '@/components/NotYetImplemented'

Vue.use(Router)

export default new Router({
  mode: 'history', // <=
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
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
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/user',
      name: 'User',
      component: User
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
      path: '/wikis/create',
      name: 'CreateWiki',
      component: CreateWiki
    },
    {
      path: '/wikis/create/success',
      name: 'CreateWikiSuccess',
      component: NotYetImplemented
    },
    {
      path: '/wikis/manage/:id',
      name: 'ManageWiki',
      component: ManageWiki
    },
    {
      path: '/not-yet-implemented',
      name: 'NotYetImplemented',
      component: NotYetImplemented
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
