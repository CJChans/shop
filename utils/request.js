//request = axios这样运行
//基础功能
// wx.request({
//   url: '',
// })
//指定基准路径
// $axios.defaults.baseURL = "xxx"
//拦截器
// $axios.onError(res=>{
  //根据res拦截错误
// })

/**
 * @desc
 * @param 请求对象 | object
 * @return Promise
 */
const request = (config)=>{
  //判断config是否是一个对象
  if(config && typeof config ==="object" && !Array.isArray(config)){
    //参数中必须包含url
    if(!config.url){
      console.error("URL不能为空！");
      return;
    }
    //判断url前面是否带有http，如果有不加上基准路径，反之就加上
    const reg = /^http/

    //http开头的
    if(!reg.test(config.url)){
      config.url = request.defaults.baseURL + config.url;
    }
    //返回promise
    return new Promise((resolve,reject) => {
      //wx.request发起请求
      wx.request({
        ...config,
        success(res){
          //请求成功后执行resolve，并且返回成功的结果
          resolve(res)
        },
        fail(res){
          reject(res)
        },
        //不管成功或者失败都会执行
        complete(res){
          request.errors(res)
        }
      })
    })
  }else{
    console.error("参数不是对象!");
    return
  }
}
// 指定request默认配置
request.defaults = {
  baseURL: "" // "https://api.github.com"
};
// 用来缓存拦截器的函数
request.errors = null;

// request拦截函数
request.onError = (callback) => {
  request.errors = callback;
}
export default request;