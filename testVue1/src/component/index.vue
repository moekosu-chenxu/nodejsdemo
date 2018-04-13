<template>
  <div id="index">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <ul>
      <li><owner></owner></li>
    </ul>
    <ul>
      <li><thx></thx></li>
    </ul>
    <ul>
      <router-link to="/owner" tag="li">test1</router-link>
      <router-link to="/thx" tag="li">test2</router-link>
    </ul>
    <ul>
      <li><router-view></router-view></li>
    </ul>
  </div>
</template>

<script>
  import owner from '../component/owner.vue'
  import thx from '../component/thx.vue'
  export default {
    name: 'index',
    data () {
      return {
        msg: 'Welcome to Moekosu Vue.js App'
      }
    },
    components: { owner, thx }
  }
</script>

<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
