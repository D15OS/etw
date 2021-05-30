<template>
  <!-- 不带标签item -->
  <view class="item-box">
    <view class="item-content">
      <!-- 左边标题内容 -->
      <view class="item-left">
        <u-icon v-if="iconName" :name="iconName"></u-icon>
        <text>{{ title }}</text>
      </view>
      <!-- 右边内容 -->
      <view class="item-right">
        <slot name="rightContent"></slot>
        <u-icon v-show="isArrow" name="arrow-right"></u-icon>
      </view>
    </view>
    <!-- 换行slot -->
    <slot name="rowContent"></slot>
  </view>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    title: String, //左侧标题
    iconName: String, //左侧图标名 为空则没有图标
    isArrow: {
      //是否展示右侧箭头
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 选中标签
    chooseTag(tag) {
      this.showTagBox = false;
      this.chosenTag = tag;
      console.log(this.chosenTag);
    },
    // 取消选中标签
    closeChosenTag() {
      this.showTagBox = true;
    },
  },
};
</script>

<style lang="scss">
.item-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25rpx 25rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f0f1f5;
  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .item-left {
      font-size: 30rpx;
      text {
        margin-left: 10rpx;
        text-align: center;
      }
    }
    .item-right {
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
