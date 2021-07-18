/**
 *封装请求
 *@param {Object} url 接口API的地址
 *@param {Object} prams 接口API的请求参数
 *@return {Promise} 请求结果
 **/
export const apiResquest = (url, prams) => {
  //请求头
  let headerData = {};
  //请求参数
  let dataObj = null;
  // 判断请求类型
  switch (prams.method) {
    case "GET":
      headerData = { "Content-type": "application/json" };
      dataObj = prams.query;
      break;
    case "POST":
      headerData = { "Content-type": "application/x-www-form-urlencoded" };
      dataObj = prams.query;
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
  return new Promise((resolve, reject) => {
    console.log(url);
    return uni.request({
      url: url,
      data: dataObj,
      method: prams.method,
      header: headerData,
      success: (res) => {
        uni.hideLoading();
        if (res.data.errorCode !== 200) {
          uni.showToast({
            title: "获取数据失败:" + res.errorMsg,
            duration: 1000,
            icon: "none",
          });
          return;
        }
        // 延时请求
        setTimeout(function() {
          resolve(res.data);
        }, 1000);
        // resolve(res.data);
      },
      fail: (err) => {
        reject(err);
        uni.hideLoading();
      },
      complete: () => {
        console.log("请求完成");
        uni.hideLoading();
      },
    });
  });
};
