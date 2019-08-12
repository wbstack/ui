import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateAccount from '@/components/CreateAccount'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import CreateWiki from '@/components/CreateWiki'
import NotYetImplemented from '@/components/NotYetImplemented'
import User from '@/components/User'

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
      path: '/terms-of-service',
      name: 'TermsOfService',
      component: NotYetImplemented
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
      component: NotYetImplemented
    },
    {
      path: '/not-yet-implemented',
      name: 'NotYetImplemented',
      component: NotYetImplemented
    }
  ]
})
