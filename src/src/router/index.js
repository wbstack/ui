import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateAccount from '@/components/CreateAccount'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import WikiList from '@/components/Wikis/List'
import SingleWiki from '@/components/Wikis/Single'
import CreateWiki from '@/components/CreateWiki'

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
      path: '/wikis/create',
      name: 'CreateWiki',
      component: CreateWiki
    },
    {
      path: '/wikis/list',
      name: 'Wikis',
      component: WikiList
    },
    {
      path: '/wikis/:id',
      name: 'Wiki',
      component: SingleWiki
    }
  ]
})
