var selfAccessToken = "76f62748-0c05-4a5b-a29a-170596f2d881";
var Api = require('../../utils/api.js');
Page({
  data:{
    loginToast:{
      state:true,
      msg:''
    },
    isLogin:false,
    inputValue:'',
    userData:{}
  },
  onLoad:function(options){
    var loginData = wx.getStorageSync('userInfo');
    this.setData({
      isLogin:loginData.success||false,
      userData:loginData
    });

  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //隐藏Toast
  hideToast:function(){
    this.setData({ loginToast:{state:true,msg:'登陆成功'} })
  },
  //登陆
  doLogin: function(){
    var intoken = this.data.inputValue||selfAccessToken;
    var self = this;
      wx.request({
          url:Api.login(),
          method:'POST',
          data:{accesstoken:intoken},
          success:function(res){
            var data = res.data;
            if(res.data.success == true){
              self.setData({
                loginToast:{state:false,msg:'登陆成功'},
                isLogin:true
              });
              wx.setStorage({
                key:'userInfo',
                data:data
              });
            }else{
              self.setData({
                loginToast:{state:false,msg:res.data.error_msg}
              })
            }
          }
      });
  },
  //注销
  logout: function(){
    wx.setStorageSync('userInfo',{});
    this.setData({
      isLogin:false
    })
  }
})