// pages/detail/detail.js

//获取应用实例
const app = getApp()
var global = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailWebUrl: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url) {
      this.setData({
        detailWebUrl: global.baseUrl + '/bpm/mobile/community_wx/' + options.url + '?mini_openID=' + global.openid + '&unionID=' + global.unionid + '&avatarUrl=' + global.avatarUrl + '&nickName=' + encodeURI(encodeURI(global.nickName))
      })
    }
    console.log(this.data.detailWebUrl);
  },
    
})