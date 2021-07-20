<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="demo">
				<block v-if="imageSrc">
					<image :src="imageSrc" class="image" mode="widthFix"></image>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @click="chooseImage">+ 选择图片</view>
				</block>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'uploadFile',
				imageSrc: ''
			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			chooseImage: function() {
				// 文件选择
				uni.chooseImage({
					// 单文件
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (chooseRes) => {
						// 选择到该图片
						console.log('chooseImage success, temp path is', chooseRes.tempFilePaths[0])
						// 图片虚拟路径
						let imageSrc = chooseRes.tempFilePaths[0]
						// 文件后缀名
						let fileSuffix = chooseRes.tempFiles[0].name
						fileSuffix = fileSuffix.substr(fileSuffix.lastIndexOf("."))
						// 目标目录
						let dir = "user-avatar"
						uni.request({
							// 重点1 user-avatar是文件的dir  获取签名
							url: "/api/signature-oss/" + dir,
							success: (signRes) => {
								console.log(signRes);
								// 记录阿里云oss主机路径
								let imgNetPath = signRes.data.data.host
								// 拿到后端返回数
								let signData = signRes.data.data
								// 组合保存到云的文件路径
								let key = signData.dir + signData.uuid + fileSuffix
								if (signRes.data.success) {
									// 开始js到阿里云oss直传
									uni.uploadFile({
										url: signData.host,
										filePath: imageSrc,
										fileType: 'image',
										name: 'file',
										formData: {
											'key': key,
											'policy': signData.policy,
											'OSSAccessKeyId': signData.accessId,
											'success_action_status': '200', //让服务端返回200,不然，默认会返回204
											'signature': signData.signature,
										},
										success: (res) => {
											// 删除成功后干的事情
											console.log(
												'uploadImage success, res is:',
												res)

											uni.showToast({
												title: '上传成功',
												icon: 'success',
												duration: 1000
											})

											// 访问路径
											let finalSrc = signData.host + "/" +
												key
											console.log(finalSrc)

											this.imageSrc = imageSrc
										},
										fail: (err) => {
											console.log('uploadImage fail', err);
											uni.showModal({
												content: err.errMsg,
												showCancel: false
											});
										}
									});
								} else {
									console.log("获取签名失败！");
									console.log(res);
								}
							}
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	.image {
		width: 100%;
	}

	.demo {
		background: #FFF;
		padding: 50rpx;
	}
</style>
