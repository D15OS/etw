<template>
  <view class="trendFrom">
    <!-- 文本框 -->
    <u-field
      v-model="trendText"
      label-width="0"
      :border-bottom="false"
      placeholder="最近有什么有意思的事情想和大家分享？"
      type="textarea"
    ></u-field>
    <!-- 图片上传 -->
    <uploadGroup ref="uploadGroup" :uploadUrl="trendImageUrl"></uploadGroup>
  </view>
</template>
<script>
export default {
  name: "trendPostFrom",
  data() {
    return {
      trendText: "", //动态文本
      trendImageUrl: "", //动态图片URL
      trendImageList: [], //默认显示的图片列表
      // 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
      // 这里直接获取内部的lists变量即可
      lists: [],
    };
  },
  methods: {
    // 手动上传图片
    getImageList() {
      this.$refs.uploadGroup.submit();
    },
  },
  onReady() {
    // 得到整个组件对象，内部图片列表变量为"lists"
    // this.lists = this.$refs.uUpload.lists;
  },
};
</script>

<style lang="scss" scoped>
.slot-btn {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $uni-color-grey;
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
  background: $uni-color-grey;
  margin: 8rpx;
}
.trendFrom {
  width: 100vw;
  background-color: #ffffff;
  border-radius: 0 0 30rpx 30rpx;
  margin-bottom: 30rpx;
}
.menuList {
  margin-top: 45rpx;
}
</style>
