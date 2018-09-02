<template>
  <div id="jd">
    <div id="top_right_navi">
      <div id="top_right_navi_div">
        <div id="top_right_navi_div_location">
          <ul class="location">
            <li>广东</li>
          </ul>
          <ul class="loginMsg">
            <li>京东会员</li>
            <li>我的京东</li>
            <li>我的订单</li>
            <li>你好，请登录 <span style="color: red;">免费注册</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div id="box">
      <!-- 顶部导航 -->
      <div id="top">
        <div id="top_left">
          <div id="top_left_logo"></div>
          <div id="top_left_navi">
            <ul>
                <li>电器</li>
                <li>手机</li>
              </ul>
          </div>
        </div>
        <div id="top_right">
          <div id="top_right_search">
            <div id="search_div">
              <input id="search_text" type="text" placeholder="查询商品" />
              <div id="search_btn"></div>
              <div id="search_ad">
                <ul>
                  <li>开学季特惠</li>
                  <li>海鲜水产</li>
                  <li>游戏手机</li>
                </ul>
              </div>
            </div>
            <div id="buyCar"></div>
          </div>
          <div id="top_right_classify"></div>
          <div id="top_right_ad">
            <div id="top_right_ad_bigAd"></div>
            <div id="top_right_ad_fixedAd"></div>
            <div id="top_right_ad_hello"></div>
          </div>
        </div>
        </div>
        <!-- 秒杀 -->
        <div id="miaosha">
          <div id="miaosha_logo"></div>
          <div id="miaosha_list"></div>
          <div id="miaosha_ad"></div>
        </div>
        <!-- 特别广告 -->
        <div id="specialList">
          <div id="rank" class="specialList"></div>
          <div id="album" class="specialList"></div>
          <div id="voucher" class="specialList"></div>
          <div id="me" class="specialList"></div>
          <div id="found" class="specialList"></div>
          <div id="guang" class="specialList"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jd'
}
</script>

<style scoped>
  /*common*/
  body,html{
    margin: 0;padding: 0;
  }
  ul{
    padding: 0;
  }
  li{
    list-style: none;
  }
  /*页面框架*/
  #box {
    width: 1190px;height:auto;
    min-width: 1190px;
    margin: 0 auto;
  }
  #top {
  }
  #top_left{
    width: 190px;float: left;
  }
  #top_left_logo{
    width: 190px;height: 170px;
    background: url("../../images/jd_head.png");
    border: 1px solid #ccc;
    box-shadow: 0 -12px 10px rgba(0,0,0,.2);
  }
  #top_left_navi{
    width: 190px;height: 480px;
  }
  #top_left_navi li{
    height: 27px;line-height: 27px;
    padding-left: 20px;
    text-align: left;
  }
  #top_right{
    width: 77%;float: right;
  }
  #top_right_navi{
    width: 100%;height: 30px;
    background-color: #e3e4e5;
    z-index: -1;
  }
  #top_right_navi_div{
    height: 30px;width: 1190px;
    margin: auto;
    line-height: 30px;
  }
  #top_right_navi_div_location{
    width: 1000px;
    margin-left: 200px;
  }
  #top_right_navi_div_location .location li{
    float: left;
    font-size: 12px;
    color: #737373;
  }
  #top_right_navi_div_location .loginMsg li{
    float: right;
    padding: 0 20px;
    border-left: 1px solid #ccc;
    height: 20px;
    margin-top: 5px;
    line-height: 22px;
    font-size: 12px;
    color: #737373;
  }
  #top_right_search{
    height: 80px;width: 100%;
  }
  #top_right_classify{
    width: 100%;height: 40px;
  }
  #top_right_ad{
    width: 100%;height: 480px;
  }
  #top_right_ad_bigAd{
    height: 100%;width: 50%;
  }
  #top_right_ad_fixedAd{
    height: 100%;width: 20%;
  }
  #top_right_ad_hello{
    height: 100%;width: 20%;
  }
</style>
