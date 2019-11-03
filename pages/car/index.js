// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleAddress(){
    wx.chooseAddress({
      success:(res)=> {
        // 设置收货地址
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  }

})