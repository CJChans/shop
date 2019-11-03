// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    goods:null
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
  },
  onShow(){
    const goods = wx.getStorageSync("goods") || null;
    this.setData({
      goods
    })
    // console.log(goods)
  },

  //数量减一
  handleReduce(event){
    const { id } = event.target.dataset
    const { goods } = this.data

    if (goods[id].number<=1){
      wx.showModal({
        title: '提示',
        content: '确定删除该商品？',
        success(res) {
          if (res.confirm) {
            //删除改商品
           delete goods[id]

            //修改data的值
            this.setData({
              goods
            })

            //保存到本地
            wx.setStorageSync("goods", goods)
          }
        }
      })
    }else{
      //数量减一
      goods[id].number -= 1;
      //修改data的值
      this.setData({
        goods
      })

      //保存到本地
      wx.setStorageSync("goods", goods)
    }  
  },

  //输入框输入数量
  bandChange(event){
    console.log(event,66)
    const value = +event.detail.value
    const { id } = event.target.dataset
    const { goods } = this.data

    // 判断是否有小数点
    goods[id].number = Math.floor(value);
    goods[id].number = value <= 0 ? 1 : value;
    // 修改data的值
    this.setData({
      goods
    });
    //保存到本地
    wx.setStorageSync("goods", goods)
  },


  

  //数量加一
  handleAdd(event){
    // console.log(event,3636)
    const {id} = event.target.dataset
    const {goods} = this.data

    //数量加一
    goods[id].number += 1;

    //修改data的值
    this.setData({
      goods
    })

    //保存到本地
    wx.setStorageSync("goods", goods)
  }
})