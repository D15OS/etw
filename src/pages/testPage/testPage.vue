<template>
  <view class="editor-wrapper">
    <editor
      id="editor"
      class="ql-container"
      :placeholder="placeholder"
      @statuschange="onStatusChange"
      :read-only="readOnly"
      @ready="onEditorReady"
    ></editor>
    <!-- 编辑器按钮 -->
    <div class="editor-button-group">
      <u-icon name="photo" size="50" @click="insertImage"></u-icon>
      <u-icon name="list" size="50" @click="insertImage"></u-icon>
      <u-icon name="list-dot" size="50" @click="insertImage"></u-icon>
      <span class="fa fa-camera-retro fa-lg"></span>
    </div>
    <button @click="insertImage">图片</button>
    <button @click="getEditorContent">获取表单内容</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "开始输入...",
      readOnly: false,
      formats: {},
    };
  },
  methods: {
    readOnlyChange() {
      this.readOnly = !this.readOnly;
    },
    onEditorReady() {
      uni
        .createSelectorQuery()
        .select("#editor")
        .context((res) => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    format(e) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      // console.log('format', name, value)
      this.editorCtx.format(name, value);
    },
    onStatusChange(e) {
      const formats = e.detail;
      this.formats = formats;
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log("insert divider success");
        },
      });
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log("clear success");
        },
      });
    },
    removeFormat() {
      this.editorCtx.removeFormat();
    },
    insertDate() {
      const date = new Date();
      const formatDate = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.editorCtx.insertText({
        text: formatDate,
      });
    },
    insertImage() {
      let that = this;

      // 选择图片
      uni.chooseImage({
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        count: 1,
        success: (res) => {
          // 上传图片
          uni.uploadFile({
            url: "",
            fileType: "image",
            filePath: res.tempFilePaths[0],
            name: "file",

            success: (data) => {
              console.log(data);
              that.editorCtx.insertImage({
                src: data,
                alt: "图像",
                success: function () {
                  console.log("insert image success");
                },
              });
            },
            fail: (error) => {
              console.log("上传错误：" + error);
            },
          });
        },
        fail: (error) => {
          console.log("选择图片错误：" + error);
        },
      });
    },
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

<style>
page {
  background-color: rgb(245, 245, 245);
}
.editor-wrapper {
  margin-top: 30rpx;
  border-radius: 45rpx 45rpx 0 0;
  height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
  background-color: white;
}
.ql-container {
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  min-height: 30vh;
  height: 100%;
  font-size: 16px;
  line-height: 1.5;
}
.editor-button-group{
  padding: 15rpx;
}
</style>
