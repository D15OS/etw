<template>
	<view class="wrap">
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view class="work-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 图片 -->
					<u-lazy-load threshold="-450" :loading-img="loadingImg" :image="item.image" :index="index"></u-lazy-load>
					<!-- 标题 -->
					<view class="work-title">{{ item.title }}</view>
					<!-- 作者盒子 -->
					<view class="work-author-box">
						<image class="work-avatar" :src="item.avatarImage" mode=""></image>
						<view class="work-author">{{ item.author }}</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view class="work-warter" v-for="(item, index) in rightList" :key="index">
					<!-- 图片 -->
					<u-lazy-load threshold="-450" :loading-img="loadingImg" :image="item.image" :index="index"></u-lazy-load>
					<!-- 标题 -->
					<view class="work-title">{{ item.title }}</view>
					<!-- 作者盒子 -->
					<view class="work-author-box">
						<image class="work-avatar" :src="item.avatarImage" mode=""></image>
						<view class="work-author">{{ item.author }}</view>
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script>
import { getList } from '../../common/js/api/models.js';
export default {
	name: 'worksList',
	props:{
		flowList:Array
	},
	data() {
		return {
			loadStatus: 'loadmore',
			loadingImg: '../../static/images/loading.gif',
			loading: true,
			list: []
		};
	},
	methods: {
		addRandomData() {
			for (let i = 0; i < 10; i++) {
				let index = this.$u.random(0, this.list.length - 1);
				// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
				let item = JSON.parse(JSON.stringify(this.list[index]));
				this.flowList.push(item);
			}
		},
		remove(id) {
			this.$refs.uWaterfall.remove(id);
		},
		clear() {
			this.$refs.uWaterfall.clear();
		}
	},
};
</script>

<style lang="scss" scoped>
.work-warter {
	border-radius: 15rpx 15rpx;
	margin: 10rpx 5rpx;
	background-color: #ffffff;
	overflow: hidden;
	position: relative;
}

.work-image {
	width: 100%;
	border-radius: 15rpx 15rpx 0 0;
}

.work-title {
	font-size: 28rpx;
	padding: 25rpx 25rpx 0 25rpx;
	margin-bottom: 20rpx;
	color: $u-main-color;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.work-author {
	font-size: 25rpx;
	line-height: 40rpx;
	font-weight: lighter;
	
}
.work-avatar {
	margin-right: 10rpx;
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	
}
.work-author-box {
	width: 100%;
	padding: 0 25rpx;
	display: flex;
	margin-bottom: 20rpx;
}
</style>
