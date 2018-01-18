import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;

// 注册
Vue.use(VueRouter);
Vue.use(VueResource);

import owner from './component/owner.vue'
import thx from './component/thx.vue'

/**
 * 页面使用<router-link to="/f1" replace tag="li">test1</router-link>来做路由导航
 * @to 参数必须 指定路由走向
 * @replace 默认false 设成true则页面history不会留下记录
 * @tag 默认渲染成a标签 可以指定渲染成什么元素
 * @active-class 被选中时会添加class
 */
const router = new VueRouter({
  // mode: 'history',
  // base: _dirname,
  router: [
    {
      path: '/f1',
      component: owner
    },
    {
      path: 'f2',
      component: thx
    }
  ]
});

const app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

/**
 * router-view组件 渲染匹配路由 <router-view></router-view>
 * 教程：http://hyuhan.com/2016/12/08/vue-transition/
 */
// <transition>
//   <keep-alive>
//     <router-view></router-view>
//   </keep-alive>
// </transition>
