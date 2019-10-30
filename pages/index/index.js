//index.js
import request from "../../utils/request.js"
Page({
  data:{
    swiper:[],
    menus:[],
  },
  onLoad(options){
    //请求轮播图数据
    request({
      url:"/api/public/v1/home/swiperdata",     
    }).then(res=>{
        const {message} = res.data
        this.setData({
          swiper: message
        })

    }),
    //请求导航栏数据
      request({
      url: "/api/public/v1/home/catitems",
      }).then(res => {
        console.log(res)
        const { message } = res.data
        this.setData({
          menus: message
        })

      })
  },

})
