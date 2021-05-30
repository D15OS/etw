<template>
  <view>
    <scroll-view class="author-list-box" scroll-x="true" scroll-left="120">
      <view
        class="author-item-box"
        v-for="(item, index) in infoList"
        :key="index"
      >
        <image
          class="author-avatar"
          :src="item.authorImage"
          mode="aspectFill"
        ></image>
        <view class="author-name">{{ item.authorName }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "authorList",
  props: {
    infoList: Array,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.author-list-box {
  white-space: nowrap;
  width: 100%;
  .author-item-box {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 22vw;
    .author-name {
      @include ellipsis(1);
      text-align: center;
      margin-top: 10rpx;
      width: 22vw;
      padding: 0 2vw;
      font-size: 25rpx;
      color: $uni-text-color-placeholder;
    }
    .author-avatar {
      width: 110rpx;
      height: 110rpx;
      border-radius: 32%;
    }
  }
}
</style>
