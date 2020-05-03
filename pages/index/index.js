Page({
  data:{
    focus:[
      {'id':1,'pic':'/pages/images/lunbo1.png'},
      { 'id': 2, 'pic': '/pages/images/lunbo2.png' },
      { 'id': 3, 'pic': '/pages/images/lunbo3.png' },
      { 'id': 4, 'pic': '/pages/images/lunbo4.png' }
    ],
    tvs:[]
  },
  onLoad:function(options){
    wx.request({
      url:"http://api.com/tvs",
      success:(res)=>{
        // console.log(res);
        // return;
        var tvs=res.data.data;
        this.setData({
          tvs:tvs
        })
      }
    });
  },
  show:function(event){
    var id=event.target.dataset.id
    wx.navigateTo({
      url:"/pages/detail/detail?id="+id
    })
  }

})