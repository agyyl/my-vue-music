import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MyList from 'components/my-list/my-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyList',
      component: MyList
    }
  ]
})
