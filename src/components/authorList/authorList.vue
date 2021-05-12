<template>
	<view>
		<scroll-view class="author-list-box" scroll-x="true" scroll-left="120">
			<view class="author-item-box" v-for="(item, index) in authorlist" :key="index">
				<image class="author-avatar" :src="item.authorImage" mode="aspectFill"></image>
				<view class="author-name">{{ item.authorName }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getAuthorList } from '../../common/js/api/models.js';
export default {
	name: 'authorList',
	data() {
		return {
			authorlist: [],
		};
	},
	created() {
		let that = this;
		getAuthorList()
			.then(res => {
				that.authorlist = res.data;
			})
			.catch(err => {
				console.log(err);
			});
	},
	methods: {
		upper: function(e) {
			console.log(e);
		},
		lower: function(e) {
			console.log(e);
		},
		// scroll: function(e) {
		// 	console.log(e);
		// 	this.old.scrollTop = e.detail.scrollTop;
		// },
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
			uni.showToast({
				icon: 'none',
				title: '纵向滚动 scrollTop 值已被修改为 0'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.author-list-box {
	white-space: nowrap;
	width: 100%;
}
.author-item-box {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	width: 22vw;
}
.author-name {
	@include ellipsis(1);
	text-align: center;
	margin-top: 10rpx;
	width: 22vw;
	padding: 0 2vw;
	font-size: 25rpx;
	color: $uni-color-grey;
}
.author-avatar {
	width: 110rpx;
	height: 110rpx;
	border-radius: 32%;
}
</style>
