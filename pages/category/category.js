// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleChange(event){
    const {index} = event.target.dataset;
    this.setData({
      current:index
    })
  }

  
})