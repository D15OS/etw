<template>
  <view class="container-box">
    <view class="main-image-box">
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
        <view
          slot="addBtn"
          class="slot-btn"
          hover-class="slot-btn__hover"
          hover-stay-time="150"
          ><u-icon
            name="photo"
            size="60"
            :color="$u.color['lightColor']"
          ></u-icon
        ></view>
      </u-upload>
    </view>
    <RichTextEditor></RichTextEditor>
  </view>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.container-box {
  background-color: white;
  height: 100vh;
  .main-image-section {
    padding: 24rpx 30rpx 8rpx 30rpx;
    font-size: 36rpx;
  }
  .main-image-box {
    padding: 24rpx 30rpx 24rpx 30rpx;
    border-bottom: 1rpx solid $uni-color-grey;
    display: flex;
  }
}
.slot-btn {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(244, 245, 246);
  border-radius: 20rpx;
  margin: 8rpx;
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
  margin: 8rpx;
}
</style>
