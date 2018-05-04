const app = getApp()


Page({
  data: {
    path: '../../public/images'
  },
  onLoad: function (options) {
    this.setData({
      path: options.src
    });
  }
})
