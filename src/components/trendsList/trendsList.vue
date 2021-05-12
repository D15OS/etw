<template>
  <view class="trend-list-box">
    <view v-for="(item, index) in trendsList" :key="index" class="container">
      <!-- 作者头像 作者名 作者描述 -->
      <view class="author-box">
        <u-avatar></u-avatar>
        <view class="author-name-box">
          <view class="author-name">{{ item.authorName }}</view>
          <view class="author-description">{{ item.authorDescription }}</view>
        </view>
        <view class="button-group">
          <button class="moreButton">
            <u-icon name="more-dot-fill"></u-icon>
          </button>
        </view>
      </view>
      <!-- 动态文本 -->
      <view class="trendText">{{ item.trendText }}</view>
      <!-- 动态图片 -->
      <trendsImageGroup
        v-bind:imageList="item.trendImageList"
      ></trendsImageGroup>
    </view>
  </view>
</template>

<script>
import { getTrendsList } from "../../common/js/api/models.js";
export default {
  name: "trendsList",
  data() {
    return {
      trendsList: [],
    };
  },
  created() {
    let that = this;
    getTrendsList()
      .then((res) => {
        that.trendsList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.trend-list-box {
  margin: 5vw 0 2.5vw 2.5vw;
  width: 95vw;
  background-color: #ffffff;
  border-radius: 30rpx 30rpx 0 0;
}
.container {
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
      color: $uni-color-grey;
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
