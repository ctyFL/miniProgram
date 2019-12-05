// pages/index/index.js

//获取应用实例
const app = getApp()
var global = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: "",
    firstLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查用户授权设置
    wx.getSetting({
      success: res => {
        // 已授权
        if (res.authSetting['scope.userInfo']) {
          // 检查登录态(以本地缓存session_key为标识)
          if (wx.getStorageSync('session_key')) {

            // 检查session_key 是否过期
            wx.checkSession({
              // session_key 有效
              success: res => {
                console.log('session_key未过期-------------');
                // 获取已授权的用户数据并解密出 unionid、openid
                app.getApprovedUserInfo();
              },

              // session_key 过期，重新登录
              fail: res => {
                console.log('session_key过期，重新登录-------');
                app.doLogin();
              }
            });

          } else {
            console.log('session_key为null，重新登录-------');
            app.doLogin();
          }

        } else {
          // 用户未授权，以游客登录
          this.setData({
            webUrl: global.baseUrl + '/bpm/mobile/community_wx/enroll/account.jsp?firstLogin=firstLogin'
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!global.firstLogin) {
      this.setData({
        firstLogin: false
      })
    }
    if (!this.data.firstLogin) {
      wx.redirectTo({
        url: '/pages/account/account',
      })
    }
  },
})