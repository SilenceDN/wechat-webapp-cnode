var Api = require('../../utils/api.js');

Page({
  data:{
    hidden:false,
    topicDetail:''
  },
  onLoad:function(options){
    //加载详细
    var topicid = options.id;
    var that = this;
    wx.request({
          url:Api.getTopicByID(topicid,{}),
          success:function(res){
              console.log(res);
              that.setData({
                  hidden:true,
                  topicDetail:res.data.data.content
              });
          }
      })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var animation = wx.createAnimation({
        opacity:0.5,
      duration: 1000,
        timingFunction: 'ease',
    })

    this.animation = animation
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})