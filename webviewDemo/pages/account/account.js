// pages/account/account.js

//获取应用实例
const app = getApp()
var global = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (global.unionid) {
      this.setData({
        webUrl: global.baseUrl + '/bpm/mobile/community_wx/enroll/account.jsp?mini_openID=' + global.openid + '&unionID=' + global.unionid + '&avatarUrl=' + global.avatarUrl + '&nickName=' + encodeURI(encodeURI(global.nickName))
        })
    } else {
      wx.showToast({
        title: '页面加载错误，重新登录',
        icon: 'none',
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    console.log(this.data.webUrl);
  },

})