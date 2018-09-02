import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Taobao from '@/components/taobao/taobao'
import JD from '@/components/jd/jd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/taobao',
      name: 'Taobao',
      component: Taobao
    },
    {
      path: '/jd',
      name: 'jd',
      component: JD
    }
  ]
})
