import Vue from 'vue'
import Router from 'vue-router'

import Personal from 'view/personal/personal'
import Songlist from 'view/songlist/songlist'
import PlayDetail from 'view/playdetail/playdetail'

import ListDetail from 'components/listdetail/listdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/personal'
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
