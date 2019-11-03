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

  // 添加到本地的购物车
  handleAddCar() {
    // 从本地获取购物车列表
    const goods = wx.getStorageSync("goods") || {};
    const { goods_id, goods_name, goods_small_logo, goods_price } = this.data.goodsInfo;

    // 判断商品是否已经在购物车中

    // 前面四个属性是商品详情提供的（需要在购物车页面中渲染）
    // number和selected属性是自己定义给购物车页面使用的
    // 使用对象的方式存储是方便快速查找属性，如果使用的数组，需要循环浪费性能
    goods[goods_id] = {
      goods_id,
      goods_name,
      goods_small_logo,
      goods_price,

      number:1,
      selected:true
    }
    //保存到本地
    wx.setStorageSync("goods", goods)
  }
})