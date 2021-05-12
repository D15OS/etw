<template>
	<view v-if="showTag" :class="showTagBox? 'tag-section-box':'section-box'">
		<view class="section-contont">
			<view class="title-box">
				<u-icon :name="iconName"></u-icon>
				<text>{{ title }}</text>
			</view>
			<u-icon v-show="showTagBox" name="arrow-right"></u-icon>
		</view>
		<u-tag v-show="!showTagBox" :text="chosenTag" bg-color="#f4756b" border-color="#f4756b" color="#f7fafd" shape="circle" :closeable="true" @close="closeTag" />
		<scroll-view v-show="showTagBox" scroll-x="true" class="tap-box-list">
			<view class="tag-box" v-for="(item, index) in tagArray" :key="index">
				<u-tag :text="item" bg-color="#f4756b" border-color="#f4756b" color="#f7fafd" shape="circle" @click="chooseTag(item)" />
			</view>
		</scroll-view>
	</view>

	<view v-else class="section-box">
		<view class="section-contont">
			<u-icon :name="iconName"></u-icon>
			<text>{{ title }}</text>
		</view>
		<u-icon name="arrow-right"></u-icon>
	</view>
</template>

<script>
export default {
	name: 'section',
	props: {
		title: String,
		iconName: String,
		showTag: {
			type: Boolean,
			default: false
		},
		tagArray: {
			type: Array,
			default() {
				return ['广州软件学院', '广州软件学院（南门）', '太平地铁站', '百德广场'];
			}
		}
	},
	data() {
		return {
			showTagBox: true,
			chosenTag: ''
		};
	},
	methods: {
		chooseTag(tag) {
			this.showTagBox = false;
			this.chosenTag=tag
			console.log(this.chosenTag)
		},
		closeTag(){
			this.showTagBox = true;
		}
	}
};
</script>

<style lang="scss">
.tag-section-box {
	height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 30rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #f0f1f5;
	.section-contont {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		line-height: 1.6em;
		.title-box {
			text {
				margin-right: 10rpx;
				text-align: center;
			}
		}
	}
	.tap-box-list {
		margin-top: 10rpx;
		white-space: nowrap;
		width: 100%;
		.tag-box {
			margin-right: 1vw;
			display: inline-block;
		}
	}
}
.section-box {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	padding: 0 30rpx;
	min-height: 100rpx;
	background-color: #ffffff;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f0f1f5;
	.section-contont {
		font-size: 30rpx;
		line-height: 1.6em;
		flex: 1;
		text {
			margin-right: 10rpx;
			text-align: center;
		}
	}
}
</style>
