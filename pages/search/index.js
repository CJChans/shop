// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    searchValue:"",
    keywords:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow() {
    // 每次显示页面都从本地获取数据
    this.setData({
      keywords: wx.getStorageSync("search") || []
    })
  },

  handleInput(event){
  // console.log(event,123)
  const {value} = event.detail
    let isShow;
    isShow = value.trim() ? true : false
    this.setData({
      searchValue:value,
      isShow
    })
    
  },
  handleClick(){
    this.setData({
      isShow:false,
      searchValue:""
    })
  },
  handleConfirm(){
    // 先从本地存储拿出来数组，没有的等于空的数组
    const arr = wx.getStorageSync('search') || [];

    // 判断本地是否有数据，有的话就追加unshift
    arr.unshift(this.data.searchValue);

    // 保存到本地
    wx.setStorageSync('search', arr);
    // 跳转到搜索列表页
    wx.navigateTo({
      url: "/pages/list/list?query=" + this.data.searchValue
    })
  },
  handleClear(){
    wx.removeStorageSync("search");
    this.setData({
      keywords:[]
    })
  }
})