/**
 * Vue入口
 */
import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;

// 注册
Vue.use(VueRouter);
Vue.use(VueResource);

// 路由注册
import index from './component/index.vue'
import owner from './component/owner.vue'
import thx from './component/thx.vue'
import forms from './component/form/main.vue'

/**
 * 页面使用<router-link to="/f1" replace tag="li">test1</router-link>来做路由导航
 * @to 参数必须 指定路由走向
 * @replace 默认false 设成true则页面history不会留下记录
 * @tag 默认渲染成a标签 可以指定渲染成什么元素
 * @active-class 被选中时会添加class
 */
const router = new VueRouter({
  routes: [{
    path: '/',
    component: index
  },{
    path: '/index',
    component: index
  },
  {
    path: '/owner',
    component: owner
  },
  {
    path: '/thx',
    component: thx
  },
  {
    path: '/form',
    component: forms
  }]
});

/**
 * new Vue()初始化Vue实例
 * PS: 如果el内容在实例化时有作用，会进入编译过程，如果无作用或没有el，则需要显示调用编译new Vue({}).$mount('#app')
 */
const app = new Vue({
  el: '#app,#index',
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
