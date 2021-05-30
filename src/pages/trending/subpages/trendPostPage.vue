<template>
  <view class="container">
    <!-- 发布表单 -->
    <trendPostFrom></trendPostFrom>
    <!-- 菜单列表 -->
    <view class="menuList">
      <menuItem
        title="话题"
        iconName="chat-fill"
        @click.native="toPage"
      ></menuItem>
      <menuItem title="地点" iconName="map-fill" :isArrow="isArrowByMap">
        <!-- 标签scroll -->
        <tagScroll
          slot="rowContent"
          v-show="showTagBox"
          :tagArray="tagArray"
          textcolor="#f7fafd"
          bgcolor="#f4756b"
          @chooseTag="chooseTag"
        ></tagScroll>
        <!-- 选中tag -->
        <u-tag
          slot="rightContent"
          v-show="!showTagBox"
          :text="chosenTag"
          bg-color="#f4756b"
          border-color="#f4756b"
          color="#f7fafd"
          shape="circle"
          :closeable="true"
          @close="closeChosenTag"
        />
      </menuItem>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isArrowByMap: true,
      showTagBox: true,
      chosenTag: "",
      tagArray: [
        "广州软件学院",
        "广州软件学院（南门）",
        "太平地铁站",
        "百德广场",
      ],
    };
  },
  methods: {
    // 选中标签
    chooseTag(tag) {
      this.showTagBox = false;
      this.chosenTag = tag;
      this.isArrowByMap = false;
      console.log("选中的标签:" + this.chosenTag);
    },
    // 取消选中标签
    closeChosenTag() {
      this.showTagBox = true;
      this.isArrowByMap = true;
    }
  },
};
</script>

<style lang="scss" scope>
.container {
  padding: 0 5vw;
}
</style>
