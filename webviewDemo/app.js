//app.js
App({

  onLaunch: function () {

  },


  // 登录动作
doLogin: function () {
  wx.login({
    success: res => {
      if (res.code) {
        // 后台请求 获取openId, session_key
        wx.request({
          url: this.globalData.baseUrl + '/bpm/WeixinCore',
          data: {
            action: 'getToken',
            js_code: res.code
          },
          success: res => {
            console.log(res);
            this.globalData.session_key = res.data.session_key;                         // session_key
            // 把session_key在本地缓存
            wx.setStorageSync('session_key', res.data.session_key);  
            console.log('-----------[app.js]session_key:' + res.data.session_key);

            // 获取已授权的用户数据并解密出 unionid、openid
            this.getApprovedUserInfo();
          }
        })
      }
    }
  });
},


  // 获取已授权的用户数据并解密出 unionid、openid
  getApprovedUserInfo: function () {
    // 已经授权，可以直接调用 getUserInfo 获取用户信息去后台解密，不会弹框
    console.log('-----------[app.js]获取已授权的用户数据并解密');  
      wx.getUserInfo({
        success: res => {
          this.globalData.userInfo = res.userInfo;                     // 用户信息
          this.globalData.nickName = res.userInfo.nickName;            // 昵称
          this.globalData.encryptedData = res.encryptedData;           // 用户敏感信息
          this.globalData.iv = res.iv;                                 // 解密算法的向量

          // 后台解密unionid
          this.toGetUnionId();
        }
      })
  },


  // 后台解密得unionid
  toGetUnionId: function () {
    wx.request({
      url: this.globalData.baseUrl + '/bpm/WeixinCore',
      data: {
        action: 'getUnionId',
        encryptedData: this.globalData.encryptedData,
        iv: this.globalData.iv,
        session_key: wx.getStorageSync('session_key')
      },
      
      success: res => {
        // console.log('[app.js]解密所需数据：');
        // console.log('-----------[app.js]userInfo:' + this.globalData.userInfo);
        // console.log('-----------[app.js]encryptedData:' + this.globalData.encryptedData);
        // console.log('-----------[app.js]iv:' + this.globalData.iv);
        // console.log('-----------[app.js]nickName:' + this.globalData.nickName);
        // console.log('-----------[app.js]session_key:' + wx.getStorageSync('session_key'));
        // console.log('[app.js]解密数据：' + res.data);

        // 解密出unionid、openid
        if (res.data.unionId) {
          this.globalData.unionid = res.data.unionId;                                    // unionid
          console.log('[app.js]解密unionid：' + this.globalData.unionid);

          this.globalData.openid = res.data.openId;                                      // openid
          console.log('[app.js]解密openid：' + this.globalData.openid);

          this.globalData.avatarUrl = res.data.avatarUrl;                                // 用户头像链接

          this.globalData.firstLogin = false;

          // 跳转到首页
          wx.redirectTo({
            url: '/pages/account/account',
          })
        } else {
          wx.showToast({
            title: '登录已过期，重新登录',
            icon: 'none',
          })
          this.doLogin();
        }
      },
    })
  },


  globalData: {
    firstLogin: true,
    baseUrl: 'https://13977.chinacloudpms.com',
    getTokenUrl: 'https://api.weixin.qq.com/sns/jscode2session',
    userInfo: null,
    encryptedData: null,
    iv: null,
    session_key: null,
    openid: null,
    unionid: null,
    avatarUrl: null,
    nickName: null,
  }
})