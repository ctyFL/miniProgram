// pages/payhistory/payhistory.js
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
    //wx.setStorageSync('onShow', true);
    if (options.customerid) {
      this.setData({
        webUrl: global.baseUrl + '/bpm/mobile/community_wx/charge/paymentdetailListByYear.jsp?mini_openID=' + global.openid + '&unionID=' + global.unionid + '&avatarUrl=' + global.avatarUrl + '&nickName=' + encodeURI(encodeURI(global.nickName)) + '&customerid=' + options.customerid
      })
    }
    console.log(this.data.webUrl);
  },

})