/**
 *封装请求
 *@param {Object} url 接口的地址
 *@param {Object} pramsObject 各个请求参数
 *@return {Promise} 请求结果
 **/
export const apiResquest = (url, pramsObject) => {
  //方法
  let method = pramsObject.method
  //header,cookies,query等参数
  let requestConfig = pramsObject.requestConfig
  //请求头
  let headerData = {};
  //请求query数据
  let queryData = requestConfig.queryData;
  // 判断请求类型
  switch (method) {
    case "GET":
      headerData = { "Content-type": "application/json" };
      break;
    case "POST":
      headerData = { "Content-type": "application/x-www-form-urlencoded" };
      break;
    case "PUT":
      headerData = {};
      break;
    case "DELETE":
      headerData = {};
      break;
    default:
      break;
  }
  //判断有无cookie
  if (uni.getStorageSync("cookie") != undefined) {
    let cookie = uni.getStorageSync("cookie");
    headerData["cookie"] = cookie;
  }
  return new Promise((resolve, reject) => {
    return uni.request({
      url: url,
      data: queryData,
      method: method,
      header: headerData,
      success: (res) => {
        console.log("【apiResquest】请求响应：", res);
        if (res.data.errorCode !== 200) {
          resolve(res.data);
          return;
        } else if (res.data.errorCode === 200) {
          if (res.header["Set-Cookie"] != undefined) {
            uni.setStorageSync('cookie', res.header["Set-Cookie"])
          }
          resolve(res.data);
        }
        // 延时请求
        // setTimeout(function () {
        //   resolve(res.data);
        // }, 1000);
      },
      fail: (err) => {
        console.log("【apiResquest】请求失败：", err);
        reject(err);

      },
      complete: () => {
        console.log("【apiResquest】请求完成");
      },
    });
  });
};
