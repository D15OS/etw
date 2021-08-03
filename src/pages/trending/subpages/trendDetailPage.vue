<template>
  <view
    class="container"
    :style="{
      marginTop: `${containerMarginTop}px`,
      height: `${windowHeight - containerMarginTop}px`,
    }"
  >
    <navigationBar ref="navigationBar"></navigationBar>
    <view class="trend-box">
      <!-- 用户信息容器 -->
      <view class="author-box">
        <!-- 头像 -->
        <u-avatar></u-avatar>
        <view class="author-name-box">
          <!-- 用户名 -->
          <view class="author-name">{{ item.userInfo.username }}</view>
          <view class="author-description">{{
            item.createdTime | dateFilter("yy-mm-dd hh:mm:ss")
          }}</view>
        </view>
        <!-- 右侧按钮组 -->
        <view class="right-button-area">
          <text class="fa fa-ellipsis-v fa-lg"></text>
        </view>
      </view>
      <!-- 动态文本 -->
      <view class="trend-text">
        <u-read-more color="#808080" close-text="展开" :toggle="true">
          {{ item.content }}
        </u-read-more>
      </view>
      <!-- 动态图片组 -->
      <trendsImageGroup :imageDataList="item.dynamicImages"></trendsImageGroup>
    </view>

    <view class="bottom-button-area">
      <view class="left-area">
        <view @click="isShowCommentbox = true" class="comment-input-view"
          >写个评论吧</view
        >
      </view>
      <view class="right-area">
        <view>
          <text class="fa fa-star-o fa-lg"></text>
        </view>
        <view @click="likeTrend(item.id)">
          <text class="fa fa-heart-o fa-lg"></text>
        </view>
        <view>
          <text class="fa fa-share-square-o fa-lg"></text>
        </view>
      </view>
    </view>
    <view
      v-show="isShowCommentbox"
      class="comment-box"
      :style="'bottom:' + KeyboardHeight + 'px;'"
    >
      <textarea
        v-model="commentText"
        class="comment-textarea"
        :focus="isShowCommentbox"
        :auto-blur="true"
        :fixed="true"
        :adjust-position="false"
        placeholder="写个评论吧"
        @focus="focusTextarea"
        @blur="blurTextarea"
      />
      <view class="button-area">
        <view class="submit-button" @click="submitComment">发送</view>
      </view>
    </view>
    <toast ref="toast"></toast>
  </view>
</template>

<script>
import { postTrendComment, getTrendComment } from "@/common/js/api/models.js";
export default {
  data() {
    return {
      item: {},
      containerMarginTop: "",
      windowHeight: "",
      isShowCommentbox: false,
      KeyboardHeight: 0,
      commentText: "",
    };
  },
  onLoad() {
    this.containerMarginTop = this.$refs.navigationBar.getNavigationHeight();
    this.windowHeight = this.$refs.navigationBar.windowHeight;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      this.item = data;
    });
    this.loadTrendComment();
  },
  methods: {
    focusTextarea(e) {
      //键盘高度
      console.log("focus事件");
      this.KeyboardHeight = e.detail.height;
    },
    blurTextarea() {
      this.KeyboardHeight = 0;
      this.isShowCommentbox = false;
    },
    //提交评论
    submitComment() {
      this.utils.debounce(() => {
        if (this.commentText.replace(/\s+/g, "") === "") {
          this.$refs.toast.show({
            text: "内容不能为空",
            type: "warning",
            direction: "top",
          });
        } else {
          postTrendComment({
            urlParam: this.item.id,
            queryData: {
              content: this.commentText,
            },
          })
            .then((res) => {
              if (res.success) {
                this.loadTrendComment();
                this.$refs.toast.show({
                  text: "评论成功",
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
        }
      });
    },
    //获取评论
    loadTrendComment() {
      getTrendComment({
        urlParam: this.item.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.trend-box {
  padding: 6vw 4vw;
  margin-bottom: auto;
  .author-box {
    display: flex;
    justify-content: flex-start;
    height: 13vw;
    width: 87vw;
    .author-name-box {
      margin-left: 2vw;
      margin-right: auto;
      width: 55vw;
      .author-name {
        @include ellipsis(1);
        font-weight: bold;
        font-size: 30rpx;
        color: $uni-color-black;
      }
      .author-description {
        @include ellipsis(1);
        margin-top: 1vw;
        font-weight: lighter;
        font-size: 24rpx;
        color: $uni-text-color-placeholder;
      }
    }
    .right-button-area {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50rpx;
    }
  }
}
.trend-text {
  margin: 20rpx 0;
}
.bottom-button-area {
  height: 150rpx;
  border: 1rpx solid black;
  display: flex;
  align-items: center;
  width: 100%;
  .left-area {
    width: 100%;
    height: 100%;
    flex: 2;
    padding: 25rpx 20rpx 0 20rpx;
    .comment-input-view {
      background-color: $uni-color-grey;
      color: $uni-text-color-placeholder;
      padding-left: 25rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 30rpx;
    }
  }
  .right-area {
    padding-top: 25rpx;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    view {
      text-align: center;
    }
  }
}
.comment-box {
  width: 100%;
  height: 250rpx;
  background-color: white;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 20rpx 60rpx 0 60rpx;
  .comment-textarea {
    box-sizing: border-box;
    padding: 30rpx;
    border-radius: 30rpx;
    height: 150rpx;
    width: 100%;
    background-color: $uni-color-grey;
  }
  .button-area {
    width: 100%;
    .submit-button {
      color: $uni-color-primary;
      float: right;
    }
  }
}
</style>