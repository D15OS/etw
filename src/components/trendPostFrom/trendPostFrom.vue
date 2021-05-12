<template>
	<view class="trendFrom">
		<u-field v-model="trendText" label-width="0" :border-bottom="false" placeholder="最近有什么有意思的事情想和大家分享？" type="textarea"></u-field>
		<u-upload
			ref="uUpload"
			:action="action"
			:auto-upload="false"
			:file-list="fileList"
			:max-size="5 * 1024 * 1024"
			max-count="9"
			:show-tips="false"
			upload-text=" "
			del-bg-color="rgb(0, 0, 0,0)"
			:custom-btn="true"
		>
			<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150"><u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon></view>
		</u-upload>
		<view class="sectionList">
			<sectionItem title="话题" iconName="chat-fill" @click.native="toPage"></sectionItem>
			<sectionItem title="地点" iconName="map-fill" :showTag="true"></sectionItem>
		</view>
	</view>
</template>
<script>
export default {
	name: 'trendPostFrom',
	data() {
		action: '';
		return {
			trendText: '',
			trendImageList: [],
			showUploadList: false,
			// 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
			// 这里直接获取内部的lists变量即可
			lists: []
		};
	},
	methods: {
		submit() {
			this.$refs.uUpload.upload();
		},
		onRemove(index, lists) {
			console.log('图片已被移除');
		},
		toPage() {
			console.log(111);
			uni.navigateTo({
				url: '/pages/home/home'
			});
		}
	},
	onReady() {
		this.lists = this.$refs.uUpload.lists;
	}
};
</script>

<style lang="scss" scoped>
.slot-btn {
	width: 200rpx;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
	border-radius: 20rpx;
}
.slot-btn__hover {
	background-color: rgb(235, 236, 238);
}
.upload-btn {
	width: 200rpx;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
}
.trendFrom {
	width: 100vw;
	background-color: #ffffff;
	border-radius: 0 0 30rpx 30rpx;
	margin-bottom: 30rpx;
	padding: 0 5vw;
}
.sectionList {
	margin-top: 45rpx;
}
</style>
