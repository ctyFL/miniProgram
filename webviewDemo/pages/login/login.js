// pages/login/login.js
const app = getApp();
var global = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 主动授权，获取用户信息
  getUserInfo: function (res) {
    global.userInfo = res.detail.userInfo;                                       // 用户信息
    global.nickName = res.detail.userInfo.nickName;                              // 昵称
    global.encryptedData = res.detail.encryptedData;                             // 用户敏感信息
    global.iv = res.detail.iv;                                                   // 解密算法的向量
  
    app.doLogin();
  }

})