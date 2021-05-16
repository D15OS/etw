<template>
	<view><button @click="xcxWxLogin()" type="default">登录</button></view>
</template>

<script>
import { loginWechat } from '../../common/js/api/models.js';
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		xcxWxLogin() {
			var self = this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					if (res.code) {
						loginWechat({ code: res.code })
							.then(res => {
								// uni.setStorage({
								// 	key: 'openid_key',
								// 	data: res.data.openid
								// });
								if (res.data) {
									self.isFirstWXLogin = false;
								}
							})
							.catch(err => {
								console.log(err);
							});
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				},
				fail(e) {
					console.log(e);
				},
				complete(e) {
					console.log(e);
				}
			});
		},
		test() {}
	},
	onReady() {}
};
</script>

<style lang="scss"></style>
