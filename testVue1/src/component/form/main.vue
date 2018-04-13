<template>
  <div id="forms">
    <div>
      <input type="text" v-model="userName"/>
      <input type="text" v-model="password"/>
      <input type="text" v-model="password2"/>
      <input type="text" v-model="age"/>
    </div>
    <!-- @click 是v-on:click的缩写，绑定监听函数 -->
    <div @click="submit">Submit</div>
  </div>
</template>

<script>
export default {
  name: 'forms', //起名form会导致Vue在解析成<Form></Form>标签的时候，与Vue本身的一些关键字重复
  data() {
    return {
      userName: '',
      password: '',
      password2: '',
      age: ''
    }
  },
  methods: {
    submit: function () {
      alert(this.userName);
    }
  }
}
</script>

<style>

</style>
