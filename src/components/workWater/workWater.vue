<template>
  <view class="container">
    <waterFall v-model="dataList" ref="uWaterfall">
      <!-- 左边瀑布 -->
      <template v-slot:left="{ leftList }">
        <view
          class="work-box-left"
          v-for="(item, index) in leftList"
          :key="index"
        >
          <!-- 图片 -->
          <u-lazy-load
            threshold="-250"
            :loading-img="loadingImage"
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
        <view
          class="work-box-right"
          v-for="(item, index) in rightList"
          :key="index"
        >
          <!-- 图片 -->
          <u-lazy-load
            threshold="-150"
            :image="item.image"
            :loading-img="loadingImage"
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
    </waterFall>
  </view>
</template>

<script>
export default {
  name: "workWater",
  props: {
    flowList: Array,
  },
  data() {
    return {
      dataList: [],
      loadingImage: "../../static/images/lazyLoding.jpg",
    };
  },
  methods: {
    //清除瀑布流内的数据
    refresh() {
      this.$refs.uWaterfall.clear();
    },
  },
  watch: {
    flowList: function () {
      this.dataList = this.flowList;
      // console.log("workwater获取到的数据:");
      // console.table(this.dataList);
    },
  },
};
</script>

<style lang="scss" scoped>
$marginX: 5rpx;
$marginY: 5rpx;
$borderRadius: 10rpx;
.container {
  background-color: $uni-color-grey;
}
.work-box-left {
  margin: 5rpx $marginX $marginY 0;
}
.work-box-right {
  margin: 5rpx 0 $marginY $marginX;
}
.work-box-left,
.work-box-right {
  border-radius: $borderRadius $borderRadius;
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
