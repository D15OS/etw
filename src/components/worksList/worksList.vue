<template>
  <view>
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <!-- 左边瀑布 -->
      <template v-slot:left="{ leftList }">
        <view class="work-box" v-for="(item, index) in leftList" :key="index">
          <!-- 图片 -->
          <u-lazy-load
            threshold="-250"
            loading-img=""
            error-img=""
            :image="item.image"
            :index="index"
          ></u-lazy-load>
          <!-- 标题 -->
          <view class="work-title">{{ item.title }}</view>
          <!-- 作者盒子 -->
          <view class="work-author-box">
            <image class="work-avatar" :src="item.avatarImage" mode=""></image>
            <view class="work-author">{{ item.author }}</view>
          </view>
        </view>
      </template>
      <!-- 右边瀑布 -->
      <template v-slot:right="{ rightList }">
        <view class="work-box" v-for="(item, index) in rightList" :key="index">
          <!-- 图片 -->
          <u-lazy-load
            threshold="-250"
            :image="item.image"
            loading-img=""
            error-img=""
            :index="index"
          ></u-lazy-load>
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
import { getList } from "../../common/js/api/models.js";
export default {
  name: "worksList",
  props: {
    flowList: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.work-box {
  border-radius: 15rpx 15rpx;
  margin: 10rpx 5rpx;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  .work-title {
    font-size: 28rpx;
    padding: 25rpx 25rpx 0 25rpx;
    margin-bottom: 20rpx;
    color: $u-main-color;
    @include ellipsis(2);
  }
  .work-author-box {
    width: 100%;
    padding: 0 25rpx;
    display: flex;
    margin-bottom: 20rpx;
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
  }
}
</style>
