<template>
  <!-- template下只能有一个div -->
  <div id="app">
    <div id="header">
      <!-- v-for="代称 in 列表" 列表可以是list[]，可以是{}对象，可以是10整数 -->
      <!-- :to 是v-bind:to的缩写 绑定参数 -->
      <router-link v-for="h in header" :to="h.path" tag="div" class="item">{{h.name}}</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      header: [{
        name: '首页',
        path: '/index',
        items: []
      },{
        name: '表单',
        path: '/form',
        items: []
      },{
        name: '3',
        path: '/',
        items: []
      },{
        name: '4',
        path: '/',
        items: []
      },{
        name: '5',
        path: '/',
        items: []
      }]
    }
  }
}
</script>

<style>
  #app {
    margin: 0;padding: 0;
    font-family: Consolas, 微软雅黑;
    font-size: 16px;
  }
  #header{
    height: 80px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }
  .item{
    height: 80px;
    width: 200px;
    float: left;
    line-height: 120px;
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    cursor: pointer;
    color: #5d5959;
  }
  .item:hover{
    background-color: #ccc;
    color: #fff;
  }

</style>
