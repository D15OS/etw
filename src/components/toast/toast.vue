<template>
  <view
    class="toast position-top"
    :class="[isShow ? toastAnimation : '', 'type-' + config.type]"
    :style="{
      zIndex: zIndex,
      display: isShow ? 'flex' : 'none',
    }"
  >
    <text class="fa fa-lg" :class="iconName"></text>
    <text class="title-text">{{ config.title }}</text>
  </view>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      isShow: false,
      timer: null, // 定时器
      toastAnimation: "",
      toastAnimationEnd: "",
      config: {
        title: "", // 显示文本
        type: "", // 主题类型，success，error，warning
        duration: 2000, // 显示的时间，毫秒
        icon: true, //是否显示图标
      },
    };
  },
  computed: {
    iconName() {
      if (
        ["error", "warning", "success"].indexOf(this.config.type) >= 0 &&
        this.config.icon
      ) {
        let iconName = "";
        switch (this.config.type) {
          case "error":
            iconName = "fa-close";
            break;
          case "warning":
            iconName = "fa-warning";
            break;
          case "success":
            iconName = "fa-check-circle";
            break;
          default:
            break;
        }
        return iconName;
      }
    },
    zIndex() {
      return this.isShow ? "999999" : "-1";
    },
  },
  methods: {
    // 显示toast组件
    show(options) {
      if (Object.getOwnPropertyNames(options).length) {
        this.config = Object.assign(this.config, options);
      }
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.isShow = true;
      this.toastAnimation = "animate__animated animate__slideInRight";
      this.timer = setTimeout(() => {
        // 倒计时结束，清除定时器，隐藏toast组件
        this.toastAnimation = "animate__animated animate__fadeOut";
        clearTimeout(this.timer);
        this.timer = null;
        setTimeout(() => {
          this.isShow = false;
        }, 500);
      }, this.config.duration);
    },
    // 隐藏toast组件
    hide() {
      this.isShow = false;
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  z-index: -1;
  min-width: 30%;
  min-height: 100rpx;
  display: flex;
  gap: 10rpx;
  color: $uni-color-black;
  border-radius: 16rpx;
  background: $uni-color-white;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  pointer-events: none;
  padding: 18rpx 40rpx;
}
.title-text {
  @include ellipsis(2);
}

.position-top {
  right: 5%;
  top: 5%;
}

.type-primary {
  color: $uni-color-primary;
  background-color: $uni-color-primary-light;
  border: 1px solid rgb(215, 234, 254);
}

.type-success {
  color: $uni-color-success;
  background-color: $uni-color-success-light;
  border: 1px solid #bef5c8;
  border-left: 3px solid;
}

.type-error {
  color: $uni-color-error;
  background-color: $uni-color-error-light;
  border: 1px solid #fde2e2;
  border-left: 3px solid;
}

.type-warning {
  color: $uni-color-warning;
  background-color: $uni-color-warning-light;
  border: 1px solid #faecd8;
  border-left: 3px solid;
}

@keyframes slideInRight {
  from {
    -webkit-transform: translate3d(200%, 0, 0);
    transform: translate3d(200%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__slideInRight {
  -webkit-animation-name: slideInRight;
  animation-name: slideInRight;
}
</style>
