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
    console.log(options);
    var contexturl = global.baseUrl + '/bpm/mobile/community_wx/';
    var params = 'mini_openID=' + global.openid + '&unionID=' + global.unionid + '&avatarUrl=' + global.avatarUrl + '&nickName=' + encodeURI(encodeURI(global.nickName));
    if (options.url) {
      this.setData({
        detailWebUrl: contexturl + options.url + '?' + params
      })
    }
    if (options.type) {
      if (options.type == "infoDetail") {
        this.setData({
          detailWebUrl: contexturl + options.url + '?' + params + "&id=" + options.id
        })
      }
    }
    console.log(this.data.detailWebUrl);
  },
    
})