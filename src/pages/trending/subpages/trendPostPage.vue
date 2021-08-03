<template>
  <view class="container">
    <!-- 导航栏 -->
    <navigationBar ref="navigationBar"></navigationBar>
    <!-- 文本框 -->
    <u-field
      v-model="trendContent"
      label-width="0"
      :border-bottom="false"
      placeholder="最近有什么有意思的事情想和大家分享？"
      type="textarea"
    ></u-field>
    <!-- 图片上传 -->
    <uploadGroup ref="uploadGroup" @onImageUploaded="submitTrend"></uploadGroup>
    <!-- 菜单列表 -->
    <view class="menuList">
      <menuItem title="话题" iconName="chat-fill"></menuItem>
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
    <!-- 发布按钮 -->
    <view class="button-area">
      <button
        :disabled="isShowLoading"
        @click="submitTrendImage"
        class="submit-button"
        :class="isShowLoading ? 'disabled-button' : ''"
      >
        <i v-show="isShowLoading" class="fa fa-spinner fa-spin"></i>
        发布动态
      </button>
    </view>
    <toast ref="toast" />
  </view>
</template>

<script>
import { postTrend } from "@/common/js/api/models.js";
export default {
  data() {
    return {
      //动态发布
      trendImageList: "",
      trendContent: "",
      isShowLoading: false,
      //菜单列表
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
    //发布动态
    submitTrendImage() {
      this.utils.debounce(() => {
        if (this.trendContent.replace(/\s+/g, "") === "") {
          this.$refs.toast.show({
            text: "内容不能为空",
            type: "warning",
            direction: "top",
          });
        } else {
          this.isShowLoading = true;
          this.$refs.uploadGroup.$refs.upload.upload();
        }
      });
    },
    submitTrend() {
      postTrend({
        queryData: {
          content: this.trendContent,
          imageJson: this.trendImageList,
        },
      })
        .then((res) => {
          if (res.success) {
            this.$refs.toast.show({
              text: "动态发布成功",
              type: "success",
              direction: "top",
            });
          } else {
            this.$refs.toast.show({
              text: "发生错误",
              type: "error",
              direction: "top",
            });
          }
        })
        .catch((err) => {
          this.$refs.toast.show({
            text: err,
            type: "error",
            direction: "top",
          });
        });
    },
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
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}
.container {
  height: 89vh;
  margin-top: 11vh;
  padding: 0 20rpx;
  display: flex;
  flex-direction: column;
}
.disabled-button {
  color: rgba(255, 255, 255, 0.842) !important;
  background-color: #ffd6d3 !important;
}
.submit-button {
  width: 100%;
  height: 90rpx;
  text-align: center;
  font-size: rpx(35);
  font-weight: bold;
  line-height: 90rpx;
  color: $uni-text-color-inverse;
  background-color: $uni-color-primary;
  border-radius: 14rpx;
  .fa {
    margin-right: 10rpx;
  }
}
.button-area {
  width: 100%;
  padding: 10vw;
  margin-top: auto;
}
</style>
