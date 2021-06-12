<template>
  <view class="container">
    <!-- 编辑器标题 -->
    <input class="editor-title" type="text" placeholder="请输入标题" />
    <!-- 编辑器按钮 -->
    <view class="editor-group">
      <view @tap="format" class="editor-button-group">
        <text class="fa fa-image fa-lg" @click="insertImageTest"></text>
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
      formats: {}, // 编辑器内样式列表
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
    insertImageTest() {
      let chooseImage = () => {
        return new Promise((resolve, reject) => {
          // 选择图片
          uni.chooseImage({
            count: 4,
            success: (res) => {
              if (
                res.tempFilePaths === undefined ||
                res.tempFilePaths.length == 0
              ) {
                console.log("请选择图片");
              } else {
                return resolve(res.tempFilePaths);
              }
            },
            fail: (err) => {
              return reject(err);
            },
          });
        });
      };
      //获取签名
      let checkSign = (tempFilePaths) => {
        return new Promise((resolve, reject) => {
          uni.request({
            url: "/api/signature-oss/dynamic-image",
            success: (res) => {
              tempFilePaths.map((imgPath) => {
                let signData = res;
                if (signData.statusCode === 200) {
                  let signData = signData.data.data;
                  return resolve({ imgPath, signData });
                } else {
                  return reject("请求签名错误");
                }
              });
            },
            fail: (err) => {
              return reject(err);
            },
          });
        });
      };
      // 上传图片
      let uploadImage = (updateData) => {
        return new Promise((resolve, reject) => {
          let signData = updateData.signData;
          let imgPath = updateData.imgPath;
          let _this = this;
          const uploadTask = uni.uploadFile({
            url: signData.host,
            filePath: imgPath,
            fileType: "image",
            name: "file",
            formData: {
              // 随机生成一个键，这个将是数据库存储的关键，访问需要通过他
              key:
                signData.dir +
                new String(new Date().getTime()).split("").reverse().join("") +
                Math.floor(Math.random() * 10000000),
              policy: signData.policy,
              OSSAccessKeyId: signData.accessId,
              success_action_status: "200", //让服务端返回200,不然，默认会返回204
              signature: signData.signature,
            },
            success: (res) => {
              console.log("uploadImage success, res is:", res);
              uni.showToast({
                title: "上传成功",
                icon: "success",
                duration: 1000,
              });
              //插入富文本编辑器
              this_.editorCtx.insertImage({
                src: imgPath,
              });
            },
            fail: (err) => {
              console.log("uploadImage fail", err);
              uni.showModal({
                content: err.errMsg,
                showCancel: false,
              });
              return reject(err);
            },
          });
          //监听上传进度变化事件
          uploadTask.onProgressUpdate(function (res) {
            _this.percent = res.progress;
            console.log("上传进度" + res.progress);
            console.log("已经上传的数据长度" + res.totalBytesSent);
            console.log(
              "预期需要上传的数据总长度" + res.totalBytesExpectedToSend
            );
          });
        });
      };
      chooseImage()
        .then((tempFilePaths) => {
          return checkSign(tempFilePaths);
        })
        .then((updateData) => {
          return uploadImage(updateData);
        })
        .catch((err) => {
          console.log("上传图片错误", err);
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
