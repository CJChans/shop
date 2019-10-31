// pages/list/list.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:'',
    //请求回来的商品列表
    goods:[],
    // 函数节流，判断上次请求是否成功，成功之后再允许请求下一页数据
    loading: false,
    //当前页数
    pagenum:1,
    // 是否有更多
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {query} = options
    this.setData({
      query
    });
    // 请求列表数据 
    this.getList();
    // console.log(newGoods,22222)
  },
//封装请求列表数据
  getList(){
    //如果页面正在加载，停止请求后台数据
    if(this.data.loading===true){
      return
    }
    request({
      url: "/api/public/v1/goods/search",
      data: {
        query:this.data.query,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      console.log(res, 666)
      const { goods } = res.data.message
      //判断是否最后一页
      if (goods.length < 10) {
        console.log(123)
        this.setData({
          hasMore: false
        })
      }
      // 循环给每个商品价格保留两位小数点
      const newGoods = goods.map(v=>{
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v
      })

      //合并数组
      this.setData({
        goods:[...this.data.goods,...newGoods],
        //页数加一
        pagenum:this.data.pagenum + 1,
        // 请求成功之后把loading改为false
        loading: false
      })
      
      
    })
  },
  // 触底事件
  onReachBottom() {

    // 有更多数据时候才请求下一页的数据
    if (this.data.hasMore) {
      setTimeout(() => {
        this.getList();
     }, 1000)

    }
  }

  
})