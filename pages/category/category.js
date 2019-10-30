// pages/category/category.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    request({
      url:"/api/public/v1/categories",
    }).then(res=>{
      console.log(res)
      const {message} = res.data
      this.setData({
        list:message
      })
    })
  },

  handleChange(event){
    const {index} = event.target.dataset;
    this.setData({
      current:index
    })
  }

  
})