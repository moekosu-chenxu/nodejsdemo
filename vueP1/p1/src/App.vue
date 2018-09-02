<template>
  <div id="app">
    <router-link to="/hello">Hello</router-link>
    <router-link to="/jd">JD</router-link>
    <router-link to="/taobao">Taobao</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
