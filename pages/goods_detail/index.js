// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {detail_id} = options
    request({
      url:"/api/public/v1/goods/detail",
      data:{
        goods_id:detail_id
      }
    }).then(res=>{
      console.log(res,666)
      const {message} = res.data
      this.setData({
        goodsInfo:message
      })
    })
  },

})