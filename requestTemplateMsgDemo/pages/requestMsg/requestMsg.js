// pages/requestMsg/requestMsg.js

const app = getApp()
var global = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  requestMsg: function () {
    wx.getSetting({ //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
      withSubscriptions: true, //是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
      complete: (res) => {
        console.log('res：' + res);
        console.log('res.subscriptionsSetting：' + res.subscriptionsSetting);
        if (res.subscriptionsSetting.mainSwitch) {
          var settingJson = res.subscriptionsSetting.itemSettings; //获取所有的模板id列表
          console.log('subscriptionsSetting.itemSettings：' + res.settingJson);
          if (settingJson) {
            console.log(settingJson);
            if (settingJson.hasOwnProperty(global.msgTemplateId)) {
              var status = settingJson[global.msgTemplateId];
              if (status == "accept") {
                console.log(status);
                wx.showToast({
                  title: '您已开启消息通知，无需再次开启',
                  icon: 'none',
                })
              }else {
                wx.requestSubscribeMessage({  
                  tmplIds: [global.msgTemplateId],
                  success (res) {
                    console.log(res);
                  }
                })
              }
            }else {
              wx.showToast({
                title: '开启失败，该应用尚未开通消息服务',
                icon: 'none',
              })
            }
          }else {
            wx.requestSubscribeMessage({  
              tmplIds: [global.msgTemplateId],
              success (res) {
                console.log(res);
              }
            })
          }
        }else {
          wx.showToast({
            title: '请先设置中打开"接收订阅消息"总开关',
            icon: 'none',
          })
        }   
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})