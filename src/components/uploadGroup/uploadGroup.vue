<template>
  <view class="container">
    <u-upload
      ref="uUpload"
      :action="uploadUrl"
      :file-list="uploadList"
      :auto-upload="false"
      :max-size="5 * 1024 * 1024"
      max-count="9"
      :show-tips="false"
      upload-text=" "
      del-bg-color="rgb(0, 0, 0,0)"
      :custom-btn="true"
    >
      <view
        slot="addBtn"
        class="slot-btn"
        hover-class="slot-btn__hover"
        hover-stay-time="150"
      >
        <u-icon name="photo" size="60" :color="$u.color['lightColor']" />
      </view>
    </u-upload>
  </view>
</template>

<script>
export default {
  name: "uploadGroup",
  props: {
    uploadUrl: String,
  },
  data() {
    return {
      lists: [],
      uploadList: [],
    };
  },
  methods: {
    submit() {
      console.log(this.$refs.uUpload.lists);
      //   this.$refs.uUpload.upload();
      //   let files = [];
      //   // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
      //   files = this.$refs.uUpload.lists.filter((val) => {
      //     return val.progress == 100;
      //   });
      //   console.log(files);
    },
  },
  onReady() {
    // 得到整个组件对象，内部图片列表变量为"lists"
    this.lists = this.$refs.uUpload.lists;
  },
};
</script>

<style lang="scss" scoped>
.slot-btn {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $uni-color-grey;
  border-radius: 20rpx;
  margin: 8rpx;
}
.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}
.upload-btn {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $uni-color-grey;
  margin: 8rpx;
}
</style>