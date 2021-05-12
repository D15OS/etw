<template>
	<view>
		<!-- 骨架屏组件 -->
		<worksSkeleton v-if="loading"></worksSkeleton>
		<!-- 作品瀑布流组件 -->
		<worksList v-bind:flowList="flowList"></worksList>
		<!-- 加载更多组件 -->
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
import { getList } from '../../common/js/api/models.js';
export default {
	data() {
		return {
			loadStatus: 'loadmore',
			loadingImg: '../../static/images/loading.gif',
			loading: true,
			flowList: [],
			list: []
		};
	},
	onLoad() {
		let that = this;
		getList()
			.then(res => {
				console.log(res.data);
				that.list = res.data;
				that.addRandomData();
				that.loading = false;
			})
			.catch(err => {
				console.log(err);
			});
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		// 模拟数据加载
		setTimeout(() => {
			this.addRandomData();
			this.loadStatus = 'loadmore';
		}, 1000);
	},
	methods: {
		// 模拟数据加载
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
	}
};
</script>

<style>
page {
	background-color: rgb(240, 240, 240);
}
</style>
<style lang="scss" scoped></style>
