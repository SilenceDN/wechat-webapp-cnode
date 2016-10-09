var Api = require('../../utils/api.js');

Page({
  //页面使用数据
  data:{
    title:"首页列表",
    hidden:false,
    currentTag:'all',
    topicList:[]
  },
  onLoad:function(options){
    console.log("toppics is onload");
    this.fetchDate();
  },
  //标签点击
  onTapTag : function(e){
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      currentTag: tab
    });
    if(tab !== 'all'){
      self.fetchDate({'tab':tab});
    }else{
      self.fetchDate();
    }
  },
  //获取数据
  fetchDate:function(data){
      var that = this;
      if(!data) data = {};
      if(!data.page) data.page = 1;
      wx.request({
          url:Api.getTopics(data),
          success:function(res){
              console.log(res);
              that.setData({
                  hidden:true,
                  topicList:res.data.data
              });
          }
      })
  },
  //跳转至详情页
  redictDetail : function(e){
    var toPicid = e.currentTarget.id;
    var url = "../detail/detail?id="+toPicid;
    wx.navigateTo({
      url:url
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  //获取下一页数据
  loadMore:function(e){
    console.log('load more');
  }

})