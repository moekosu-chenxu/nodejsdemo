//app.js
App({
  globalData: {
    userInfo: null,
    reqPath: "http://gd.dccp.liuliangjia.cn/dccp-portal"
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   *  广告查询
   *  @param adClmnId 广告栏id
   *  @param o page对象
   *  @param key 双向绑定变量名称
   *  @param max 数据最大显示数量
   **/
  queryAd: function(adClmnId, o, key, max) {
    wx.request({
      url: this.globalData.reqPath + "/ad/queryAd.ajax",
      dataType: "json",
      type: "post",
      cache: false,
      data: {
        "adClmnId": adClmnId
      },
      success: function (resp) {
        if (!resp.data.isSuccess) {
          return;
        }
        var json = JSON.parse(resp.data.data);
        if(json.retCode == 0) {
          var list = json.ads;
          var k;
          for (var i=0; i< list.length; i++) {
            if( i+1 > max) {
              break;
            }
            k = key;
            if (max > 1) {
              k = key + "["+i+"]";
            }
            o.setData({
              [k]: {
                id: list[i].adId,
                name: list[i].adName,
                pic: list[i].adPicUrl,
                link: list[i].adUrl
              }
            });
          }
        }
      }
    });
  }
})