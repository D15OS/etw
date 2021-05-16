/**
*封装请求
*@param {Object} 接口API的参数
*@return {Promise} 请求到的数据
**/
export const apiResquest = (prams) => {
	// 判断请求类型
	let headerData = {
		'content-type': 'application/json'
	}

	let dataObj = null

	if (prams.method === "GET") {
		headerData = {
			'content-type': 'application/json'
		}
	} else {
		dataObj = {
			'data': prams.query
		}
	}
	return new Promise((resolve, reject) => {
		let url = prams.url;
		return uni.request({
			url: url,
			data: dataObj,
			method: prams.method,
			header: headerData,
			success: (res) => {
				uni.hideLoading()
				//返回码
				if (res.data.code !== '200') {
					uni.showToast({
						title: '获取数据失败:' + res.data.msg,
						duration: 1000,
						icon: "none"
					})
					return;
				}
				// setTimeout(function() {
				// 	resolve(res.data);
				// }, 2000)
				resolve(res.data);
				console.log(res.data)
			},
			fail: (err) => {
				reject(err);
				uni.hideLoading()
			},
			complete: () => {
				console.log('请求完成')
				uni.hideLoading()
			}
		});
	})
}
