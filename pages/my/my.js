Page({
  data:{
    userInfo:null
  },
  onLoad:function(options){
    
  },
  //实现登录功能
  userInfo:function(event){
    this.setData({
      userInfo:event.detail.userInfo
    })
    //缓存用户信息
    var userInfo=event.detail.userInfo;
    wx.setStorageSync('userInfo',userInfo); 
    wx.login({
      success:function(res){
        var code=res.code;//获取临时校验码code
        var nickName=event.detail.userInfo.nickName;//获取用户昵称
        var avatarUrl=event.detail.userInfo.avatarUrl;//获取用户头像
        wx.request({
          url:"http://api.com/token",
          method:"post",
          data:{
            code:code,
            nickName:nickName,
            avatarUrl:avatarUrl
          },
          success:function(res){
            var token=res.data.token;
            wx.setStorageSync('token', token);
            // 登录成功提示信息
            if(wx.getStorageSync('token')){
              wx.showToast({
                title:'登录成功',
                icon:'success',
                duration:2000
              })
            }
           
          }
        })
      }
    })
  },
  exit:function(event){
    wx.removeStorageSync('token');  //清除token
    wx.removeStorageSync('userInfo');//清除usrInfo
    this.setData({
      userInfo:null
    })
    // 退出登录提示信息
    if(!wx.getStorageSync('token')){
      wx.showToast({
        'title':'退出登录',
        icon:'success',
        duration:2000
      })
    }

  }
})