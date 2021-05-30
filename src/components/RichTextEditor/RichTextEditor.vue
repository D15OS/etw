<template>
  <view class="container">
    <!-- 编辑器标题 -->
    <input class="editor-title" type="text" placeholder="请输入标题" />
    <!-- 编辑器按钮 -->
    <view class="editor-group">
      <view @tap="format" class="editor-button-group">
        <text class="fa fa-image fa-lg" @click="insertImage"></text>
        <text
          :class="formats.italic ? 'ql-active' : ''"
          data-name="italic"
          class="fa fa-italic fa-lg"
        ></text>
        <text
          :class="formats.bold ? 'ql-active' : ''"
          data-name="bold"
          class="fa fa-bold fa-lg"
        ></text>
        <text
          :class="formats.header === 3 ? 'ql-active' : ''"
          data-name="header"
          :data-value="3"
          class="fa fa-header fa-lg"
        ></text>
        <text
          :class="formats.list === 'bullet' ? 'ql-active' : ''"
          data-name="list"
          data-value="bullet"
          class="fa fa-list fa-lg"
        ></text>
        <text
          :class="formats.list === 'ordered' ? 'ql-active' : ''"
          data-name="list"
          data-value="ordered"
          class="fa fa-list-ol fa-lg"
        ></text>
        <text
          :class="formats.align === 'center' ? 'ql-active' : ''"
          data-name="align"
          data-value="center"
          class="fa fa-align-center fa-lg"
        ></text>
      </view>
    </view>
    <!-- 编辑器本体 -->
    <editor
      id="editor"
      class="editor-container"
      :placeholder="placeholder"
      @statuschange="onStatusChange"
      @ready="onEditorReady"
    ></editor>
  </view>
</template>

<script>
export default {
  name: "richTextEditor",
  data() {
    return {
      placeholder: "请输入正文",
      formats: {},// 编辑器内样式列表
    };
  },
  methods: {
    //编辑器初始化
    onEditorReady() {
      this.createSelectorQuery()
        .select("#editor")
        .context((res) => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    // 改变编辑器内文本样式
    format(e) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      // console.log("format", name, value);
      this.editorCtx.format(name, value);
    },
    // 样式被更改时调用
    onStatusChange(e) {
      const formats = e.detail;
      // console.log(e.detail);
      this.formats = formats;
    },
    // 添加图片
    insertImage() {
      let that = this;
      // 选择图片
      uni.chooseImage({
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        count: 1,
        success: (res) => {
          // 上传图片
          // uni.uploadFile({
          //   url: "",
          //   fileType: "image",
          //   filePath: res.tempFilePaths[0],
          //   name: "file",

          //   success: (data) => {
          //     console.log(data);
          //     that.editorCtx.insertImage({
          //       src: data,
          //       alt: "图像",
          //       success: function () {
          //         console.log("添加图片成功");
          //       },
          //     });
          //   },
          //   fail: (error) => {
          //     console.log("上传错误：" + error);
          //   },
          // });
          that.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            alt: "图像",
            success: function () {
              console.log("添加图片成功");
            },
          });
        },
        fail: (error) => {
          console.log("选择图片错误：" + error);
        },
      });
    },
    // 获取编辑器内容
    getEditorContent() {
      this.editorCtx.getContents({
        success: (res) => {
          console.log(res.delta);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
}
.editor-title {
  padding: 24rpx 30rpx;
  font-size: 48rpx;
  height: 48rpx;
}
.editor-container {
  box-sizing: border-box;
  padding: 24rpx 30rpx;
  width: 100%;
  min-height: 30vh;
  font-size: 32rpx;
  line-height: 1.5;
}
.editor-group {
  background-color: white;
  padding: 15rpx;
  border-top: 1rpx solid $uni-color-grey;
  border-bottom: 1rpx solid $uni-color-grey;
}
.editor-button-group {
  display: flex;
  justify-content: flex-start;
  text {
    margin: 0 4rpx;
    width: 60rpx;
    height: 60rpx;
    border-radius: 8rpx;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  text.ql-active {
    color: white;
    background: black;
  }
}
</style>
