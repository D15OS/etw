<template>
  <view
    class="u-mask"
    hover-stop-propagation
    @tap.stop="click"
    @touchmove.stop.prevent="() => {}"
    :class="[maskShowClass, isShow ? maskAnimationStart : maskAnimationEnd]"
    :style="{ animationDuration: `${duration}ms` }"
  >
    <slot />
  </view>
</template>

<script>
export default {
  name: "mask",
  props: {
    // 是否显示遮罩
    isShow: {
      type: Boolean,
      default: false,
    },
    // 遮罩的过渡时间
    duration: {
      type: [Number, String],
      default: 500,
    },
    // 是否可以通过点击遮罩进行关闭
    maskClickAble: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      maskShowClass: "", //遮罩显示
      maskAnimationStart: "", //遮罩过渡动画开始
      maskAnimationEnd: "", //遮罩过渡动画结束
    };
  },
  watch: {
    isShow(n) {
      if (n) {
        this.maskAnimationStart = "animate__animated animate__fadeIn";
        this.maskShowClass = "u-mask-show";
      } else {
        this.maskAnimationEnd = "animate__animated animate__fadeOut";
        setTimeout(() => {
          this.maskShowClass = "mask-diable-show";
        }, this.duration);
      }
    },
  },
  methods: {
    click() {
      if (!this.maskClickAble) {
        return;
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.u-mask {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: transform 0.3s;
}

.u-mask-show {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
.mask-diable-show {
  display: none;
}
</style>
