// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    goods:null,
    // 总价格
    allPrice: 0,
    allSelected:true
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
    // 计算总价格
    this.handleAllPrice();
    // console.log(goods)
    // 判断全选状态
    this.handleAllSelected();
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
            // 计算总价格
            this.handleAllPrice();
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
      // 计算总价格
      this.handleAllPrice();
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
    // 计算总价格
    this.handleAllPrice();
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
    // 计算总价格
    this.handleAllPrice();
  },

// 选中状态取反
  handleSelected(event){
    console.log(event)
    const { id } = event.target.dataset;
    const { goods } = this.data;

    // 把选中状态取反
    goods[id].selected = !goods[id].selected;

    this.setData({
      goods
    });

    // 保存到本地
    wx.setStorageSync("goods", goods);
    // 计算总价格
    this.handleAllPrice();
    // 判断全选状态
    this.handleAllSelected();
  },

  // 注意小程序没有computed属性，所以需要封装计算总价格的函数
  handleAllPrice() {
    const { goods } = this.data;
    let price = 0;

    // 开始计算, v就是key，也就是商品id
    Object.keys(goods).forEach(v => {
      // 当前商品必须是选中的
      if (goods[v].selected) {
        // 单价乘以数量
        price += (goods[v].goods_price * goods[v].number)
      }
    })

    this.setData({
      allPrice: price
    })
  },

  // 全选状态
  handleAllSelected() {
    const { goods } = this.data;
    let isSelect = true;

    // 判断是否有一个是没选中
    Object.keys(goods).forEach(v => {
      if (!goods[v].selected) {
        isSelect = false;
      }
    })

    this.setData({
      allSelected: isSelect
    })
  },
  // 点击全选按钮的事件
  handleAllSelectedEvent() {
    const { goods, allSelected } = this.data;

    // 循环取反选中状态，取反是根据allSelected
    Object.keys(goods).forEach(v => {
      goods[v].selected = !allSelected
    })

    this.setData({
      goods,
      // 判断全选状态
      allSelected: !allSelected
    });
    // 保存到本地
    wx.setStorageSync("goods", goods);
    // 计算总价格
    this.handleAllPrice();
  }
})