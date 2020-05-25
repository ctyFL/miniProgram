// pages/wxpay/wxpay.js
const app = getApp()
var global = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pkg = options.package.replace("%3D", "=");
    var sign = options.paySign.replace(/%3D/g, "=");
    wx.setStorageSync('onShow', true);

    var param = {
      timeStamp: options.timeStamp,
      nonceStr: options.nonceStr,
      package: pkg,
      signType: options.signType,
      paySign: sign,
      customerid: options.customerid,
      recordId: options.recordId
    };
    console.log('调起收银台参数：' + 'timeStamp：' + options.timeStamp + '，nonceStr：' + options.nonceStr + '，package：' + pkg + '，signType：' + options.signType + '，paySign：' + sign + '，customerid：' + options.customerid + '，recordId：' + options.recordId);

    this.wxPay(param);
  },

  wxPay: function(param) {
    var recordId = param.recordId;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,

      success: res => {
        console.log(res);
      },

      fail: res => {
        console.log("fail" + res);
        wx.request({
          url: global.baseUrl + '/bpm/WeixinCore',
          data: {
            action: 'rollBack',
            recordId: recordId
          }
        })
      },

      complete: res => {
        wx.redirectTo({
          url: '/pages/paymentdetail/paymentdetail?customerid=' + param.customerid,
          //url: '/pages/account/account'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log('onShow');
    // var onShow = wx.getStorageSync('onShow');
    // if (onShow) {
    //   wx.navigateBack({
    //     url: '/pages/account/account'
    //   })
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // console.log('onUnload');
    // wx.setStorageSync('onShow', false);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})