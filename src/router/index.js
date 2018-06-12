import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Peoplepf from '@/components/People/Peoplepf'
import CreatePeoplepf from '@/components/People/create_peoplepf'
import Peoplepj from '@/components/Peoplepj/Peoplepj'
import CreatePeoplepj from '@/components/Peoplepj/create_peoplepj'
import Account from '@/components/Accounts/Account'
import AccountCreate from '@/components/Accounts/AccountCreate'
import Transaction from '@/components/Transaction/Transaction'

Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/peoplepf',
      name: 'Peoplepf',
      component: Peoplepf
    },
    {
      path: '/peoplepfs/create',
      name: 'create_peoplepf',
      component: CreatePeoplepf
    },
    {
      path: '/peoplepj',
      name: 'Peoplepj',
      component: Peoplepj
    },
    {
      path: '/peoplepjs/create',
      name: 'create_peoplepj',
      component: CreatePeoplepj
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/account/create',
      name: 'AccountCreate',
      component: AccountCreate
    },
    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction
    }
  ]
})
