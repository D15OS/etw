<template>
  <view class="container">
    <view class="work-warter loading">
      <view class="work-image"></view>
      <view class="work-title"></view>
      <view class="work-author-box">
        <view class="work-avatar"></view>
        <view class="work-author"></view>
      </view>
    </view>
    <view class="work-warter loading">
      <view class="work-image"></view>
      <view class="work-title"></view>
      <view class="work-author-box">
        <view class="work-avatar"></view>
        <view class="work-author"></view>
      </view>
    </view>
    <view class="work-warter loading">
      <view class="work-image"></view>
      <view class="work-title"></view>
      <view class="work-author-box">
        <view class="work-avatar"></view>
        <view class="work-author"></view>
      </view>
    </view>
    <view class="work-warter loading">
      <view class="work-image"></view>
      <view class="work-title"></view>
      <view class="work-author-box">
        <view class="work-avatar"></view>
        <view class="work-author"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "worksSkeleton",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .work-warter {
    width: 48vw;
    border-radius: 15rpx 15rpx;
    margin: 10rpx 5rpx;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
  }
  .work-image {
    height: 400rpx;
    width: 100%;
    border-radius: 15rpx 15rpx 0 0;
  }
  .work-title {
    margin: 25rpx 25rpx 20rpx 25rpx;
    height: 40rpx;
    font-size: 32rpx;
    color: $u-main-color;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .work-author-box {
    display: inline-block;
    padding: 0 25rpx;
    margin-bottom: 20rpx;
    .work-avatar {
      margin-right: 10rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      float: left;
    }
    .work-author {
      width: 20vw;
      height: 45rpx;
      font-size: 25rpx;
      font-weight: lighter;
      float: left;
    }
  }
}

.loading .work-image,
.loading .work-title,
.loading .work-author-box .work-author,
.loading .work-author-box .work-avatar {
  background-color: $uni-text-color-grey;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    $uni-text-color-grey;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading .work-title {
  border-radius: 4px;
  animation-delay: 0.05s;
}

.loading .work-author {
  border-radius: 4px;
  animation-delay: 0.06s;
}
</style>
