<template>
  <!-- 标签scroll -->
  <scroll-view scroll-x="true" class="tap-box-scroll">
      <view class="tag-box" v-for="(item, index) in tagArray" :key="index">
        <u-tag
          :text="item"
          :bg-color="bgcolor"
          :border-color="bgcolor"
          :color="textcolor"
          shape="circle"
          @click="chooseTag(item)"
        />
      </view>
    </transition>
  </scroll-view>
</template>

<script>
export default {
  name: "tagScroll",
  props: {
    bgcolor: String,// 背景和边框颜色
    textcolor: String,// 文本颜色
    tagArray: { //标签数组
      type: Array,
    },
  },
  methods: {
    //选中标签
    chooseTag(tag) {
      this.$emit("chooseTag", tag);
    },
  },
};
</script>

<style lang="scss" scope>
.tap-box-scroll {
  margin-top: 10rpx;
  white-space: nowrap;
  width: 100%;
  .tag-box {
    margin-right: 1vw;
    display: inline-block;
  }
}
</style>