<template>
  <view class="container">
    <!-- 动态容器 -->
    <view v-for="(item, index) in trendList" :key="index" class="trend-box">
      <!-- 用户信息容器 -->
      <view class="author-box">
        <!-- 头像 -->
        <u-avatar></u-avatar>
        <view class="author-name-box">
          <!-- 用户名 -->
          <view class="author-name">{{ item.authorName }}</view>
          <view class="author-description">{{ item.authorDescription }}</view>
        </view>
        <!-- 右侧按钮组 -->
        <view class="button-group">
          <button class="moreButton">
            <u-icon name="more-dot-fill"></u-icon>
          </button>
        </view>
      </view>
      <!-- 动态文本 -->
      <view class="trendText">
        <u-read-more color="#808080" close-text="展开" :toggle="true">
          {{ item.trendText }}
        </u-read-more>
      </view>

      <!-- 动态图片 -->
      <trendsImageGroup
        v-bind:imageList="item.trendImageList"
      ></trendsImageGroup>
    </view>
  </view>
</template>

<script>
export default {
  name: "trendList",
  props: {
    trendList: Array,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.container {
  margin: 5vw 0 2.5vw 2.5vw;
  width: 95vw;
  background-color: #ffffff;
  border-radius: 30rpx 30rpx 0 0;
}
.trend-box {
  padding: 6vw 4vw;
}
.author-box {
  display: flex;
  justify-content: flex-start;
  height: 13vw;
  width: 87vw;
  .author-name-box {
    margin-left: 2vw;
    margin-right: auto;
    width: 55vw;
    .author-name {
      @include ellipsis(1);
      font-weight: bold;
      font-size: 30rpx;
      color: $uni-color-black;
    }
    .author-description {
      @include ellipsis(1);
      margin-top: 1vw;
      font-weight: lighter;
      font-size: 24rpx;
      color: $uni-text-color-placeholder;
    }
  }
  .button-group {
    display: flex;
    align-items: center;
    button::after {
      border: none;
    }
    .moreButton {
      background-color: #ffffff;
    }
  }
}
.trendText {
  margin: 2vw 0;
  padding: 0 1vw;
}
</style>
