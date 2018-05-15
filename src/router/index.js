import Vue from 'vue'
import Router from 'vue-router'

import Personal from 'components/personal/personal'
import Songlist from 'components/songlist/songlist'
import PlayDetail from 'components/playdetail/playdetail'

import ListDetail from 'components/listdetail/listdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/songlist'
    },
    {
      path: '/personal',

      component: Personal
    },
    {
      path: '/songlist',
      component: Songlist,
      children: [
        {
          path: '/songlist/:id',
          component: ListDetail
        }
      ]
    },
    {
      path: '/playdetail',
      component: PlayDetail
    }
  ]
})
