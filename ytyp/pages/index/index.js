//index.js
//获取应用实例
const app = getApp();


Page({
  data: {
    filePath: '../../public/images',
    ad_cctv: {},
    ad_selected: [],
    ad_flow: [],
    ad_download: {},
  },
  onLoad: function () {
    // 视频下方广告
    app.queryAd("GD_DAY_CCTV", this, "ad_cctv", 1);
    // 精选推荐广告
    app.queryAd("GD_DAY_SELECTED", this, "ad_selected", 10);
    // 流量特惠广告
    app.queryAd("GD_DAY_FLOW", this, "ad_flow", 2);
    // 底部广告
    app.queryAd("GD_DAY_DOWNLOAD", this, "ad_download", 1);

  },
  
  goPage: function(event) {
    console.log(event.currentTarget.dataset.src);
    wx.redirectTo({
      url: '../ad/ad?src=www.baidu.com',
    })
  }
})
