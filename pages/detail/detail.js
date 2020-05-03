Page({
  data:{
    data:{},
    isPlay:false,
    comments:[]
  },
  onLoad:function(options){
    var id=options.id;//获取首页传过来的id
    //从后台获取数据，tv的相关数据
    wx.request({
      url:"http://api.com/tv/"+id,
      success:(res)=>{
        // console.log(res.data.data);
        var data=res.data.data;
        this.setData({
          data:data
        })
      }
    }),
      // 获取评论的相关数据
      wx.request({
        url: "http://api.com/comments/"+id,
        method: 'get',
        success:(res)=>{
          this.setData({
            comments:res.data.data
          })
        }
      })
  },
   // 音乐播放部分
  playMusic: function (event) {
     this.setData({
       isPlay:!this.data.isPlay
     })
    //  console.log(this.data.isPlay);
    var music=wx.getBackgroundAudioManager();
    if(this.data.isPlay){
       music.title = this.data.data.music.title;
       music.epname = this.data.data.music.epname;
       music.singer = this.data.data.music.singer;
       music.coverImgUrl = this.data.data.music.coverImgUrl;
       music.src = this.data.data.music.src;
    }else{
      music.pause();
    }
  },

  // 发表评论
sendComment:function(event){
  var token=wx.getStorageSync('token');
  var comment=event.detail.value;//获取评论信息
  var tvid=event.target.dataset.id;//获取tvid
  if(!token){
    wx.showToast({
      title: '未登录',
      icon:'success',
      duration:2000
    })
  }
  wx.request({
    url:"http://api.com/comments",
    header:{
      'token':token
    },
    method:"post",
    data:{
      content:comment,
      tvid:tvid
    },
    success:function(res){
      if(res.data.status==1){
        wx.showToast({
          title: '评论添加成功',
          icon:'success',
          duration:2000
        })
      }
    }
  })
  // console.log(token);
}

})