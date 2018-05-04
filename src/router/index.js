import Vue from 'vue'
import Router from 'vue-router'

import MyList from 'components/my-list/my-list'
import Songlist from 'components/songlist/songlist'
import Lrc from 'components/lrc/lrc'

import ListDetail from 'components/listdetail/listdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mylist'
    },
    {
      path: '/mylist',
      component: MyList
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
      path: '/lir',
      component: Lrc
    }
  ]
})
