<template>
  <view>
    <!-- 一张图片 -->
    <view v-if="getLength === 1" class="one-image-box">
      <image :src="imageList[0]" mode="aspectFill" />
    </view>
    <!-- 两张或四张图片 -->
    <view
      v-else-if="getLength == 2 || getLength == 4"
      class="two-four-image-box"
    >
      <image
        v-for="(item, index) in imageList"
        :key="index"
        :src="item"
        mode="aspectFill"
      ></image>
    </view>
    <!-- 其他张数 -->
    <view v-else class="other-image-box"
      ><image
        v-for="(item, index) in imageList"
        :key="index"
        :src="item"
        mode="aspectFill"
      ></image
    ></view>
  </view>
</template>

<script>
export default {
  name: "trendsImageGroup",
  props: {
    imageList: Array,
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.imageList);
  },
  computed: {
	// 获取图片列表长度
    getLength: function () {
      return this.imageList.length;
    },
  },
};
</script>

<style lang="scss" scoped>
$box-length: 87vw;
$image-margin: 0.5vw;
$image-border-radius: 20rpx;

.one-image-box {
  width: $box-length;
  image {
    border-radius: $image-border-radius;
  }
}
.two-four-image-box {
  display: flex;
  flex-wrap: wrap;
  image {
    border-radius: $image-border-radius;
    margin: $image-margin;
    width: ($box-length - $image-margin * 4)/2;
    height: ($box-length - $image-margin * 4)/2;
  }
}
.other-image-box {
  display: flex;
  flex-wrap: wrap;
  image {
    border-radius: $image-border-radius;
    margin: $image-margin;
    width: ($box-length - $image-margin * 6)/3;
    height: ($box-length - $image-margin * 6)/3;
  }
}
</style>
