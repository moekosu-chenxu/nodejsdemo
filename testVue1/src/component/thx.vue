<template>
    <div id="thx">
      <h2>thank for many guide's advice.@moekosu</h2>
      <ul>
        <li v-for="a in aList">
          {{ a.title }}
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "thx",
      data(){
        return{
          aList: []
        }
      },
      mounted: function () {
        // http ajax请求 跨域 请求的是豆瓣公用接口
        this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
          headers: {

          },
          emulateJSON: true
        }).then(function (response) {
          // 处理调用成功
          this.aList = response.data.subjects;
        }, function (err) {
          // 处理调用失败
          console.log(err);
        })
      }
    }
</script>

<style scoped>

</style>
