<template>
	<view>
		<button class="postButton" @click="toTrendFromPage"><text>发布</text></button>
		<!-- 常访问博主列表 -->
		<authorList></authorList>
		<!-- 动态列表 -->
		<trendsList></trendsList>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	onReachBottom() {},
	methods: {
		toTrendFromPage() {
			uni.navigateTo({
				url: './subpages/trendPostPage'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f6f8fa;
}
</style>
<style lang="scss" scoped></style>
