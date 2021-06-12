<template>
  <view class="tabs">
    <!-- tab的scroll-view -->
    <scroll-view
      ref="tabbar1"
      id="tab-bar"
      class="tab-bar"
      :scroll="false"
      :scroll-x="true"
      :show-scrollbar="false"
      :scroll-into-view="scrollInto"
    >
      <view style="flex-direction: column">
        <view style="flex-direction: row">
          <!-- tab -->
          <view
            class="uni-tab-item"
            v-for="(tab, index) in tabList"
            :key="tab.id"
            :id="tab.id"
            :ref="'tabitem' + index"
            :data-id="index"
            :data-current="index"
            @click="ontabtap"
          >
            <!-- tab名 -->
            <text
              class="uni-tab-item-title"
              :class="tabIndex == index ? 'uni-tab-item-title-active' : ''"
            >
              {{ tab.name }}
            </text>
          </view>
        </view>
        <!-- 所有underline的容器 -->
        <view class="scroll-view-indicator">
          <view
            ref="underline"
            class="scroll-view-underline"
            :class="isTapMoving ? 'scroll-view-animation' : ''"
            :style="{
              left: indicatorLineLeft + 'px',
              width: indicatorLineWidth + 'px',
            }"
          ></view>
        </view>
      </view>
    </scroll-view>
    <!-- tab下的线 -->
    <view class="tab-bar-line"></view>
    <!-- swiper -->
    <swiper
      class="tab-box"
      ref="swiper1"
      :class="isDisableSwiper ? 'disableTouch' : ''"
      :current="tabIndex"
      :duration="300"
      @change="onswiperchange"
      @transition="onswiperscroll"
      @animationfinish="animationfinish"
      @onAnimationEnd="animationfinish"
    >
      <swiper-item
        class="swiper-item"
        v-for="(page, index) in tabList"
        :key="index"
      >
        <news-page
          @stopSwiperMove="stopSwiperMove"
          class="page-item"
          nid="1"
          ref="page"
        ></news-page>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
// #ifdef APP-PLUS
const dom = weex.requireModule("dom");
// #endif
// 缓存每页最多
const MAX_CACHE_DATA = 6;
// 缓存页签数量
const MAX_CACHE_PAGE = 3;
//水平偏移距离大于此值时开始加载数据
const TAB_PRELOAD_OFFSET = 200;

export default {
  data() {
    return {
      tabList: [
        {
          id: "tab01",
          name: "推荐",
          newsid: 0,
        },
        {
          id: "tab02",
          name: "美食",
          newsid: 23,
        },
        {
          id: "tab03",
          name: "旅游",
          newsid: 223,
        },
        {
          id: "tab04",
          name: "玩乐",
          newsid: 221,
        },
        {
          id: "tab05",
          name: "玩乐",
          newsid: 225,
        },
        {
          id: "tab06",
          name: "玩乐",
          newsid: 208,
        },
        {
          id: "tab07",
          name: "玩乐",
          newsid: 209,
        },
        {
          id: "tab08",
          name: "玩乐",
          newsid: 210,
        },
        {
          id: "tab09",
          name: "玩乐",
          newsid: 211,
        },
      ], //标签列表
      tabIndex: 0, //当前tabIndex
      cacheTab: [],
      scrollInto: "",
      navigateFlag: false,
      indicatorLineLeft: 0,
      indicatorLineWidth: 0,
      isTapMoving: false, //标签移动的过程为true
      isDisableSwiper: false,
    };
  },
  onReady() {
    this._lastTabIndex = 0;
    this.swiperWidth = 0;
    this.tabbarWidth = 0;
    this.tabListSize = {};
    this._touchTabIndex = 0;
    this.pageList = this.$refs.page; //swiper-item内的组件实例数组
    this.switchTab(this.tabIndex);
    this.selectorQuery(); //初始化调用
  },
  methods: {
    catchTouchMove() {},
    stopSwiperMove(boolean) {
      this.isDisableSwiper = boolean;
      console.log("stopSwiperMove 是否禁止swiper滑动", this.isDisableSwiper);
    },
    /**
     *点击tap事件
     **/
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current; // 被点击tap的index
      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      this.isTapMoving = true; //标签移动的过程为true
      var currentSize = this.tabListSize[index]; //当前tap的节点信息和位置信息
      this.updateIndicator(currentSize.left, currentSize.width); //更新指示线位置
      this._touchTabIndex = index; // 点击过的tapindex
      // #endif
      this.switchTab(index);
    },
    /**
     *切换tab
     *@param {Number} index 即将跳转的index
     **/
    switchTab(index) {
      // 判断实体内的数据是否为空，为空时读取组件内数据
      if (this.pageList[index].dataList.length === 0) {
        this.loadTabData(index);
      }
      //当前tabIndex等于即将跳转index时不操作
      if (this.tabIndex === index) {
        return;
      }
      // swiper-item页面内数据大于MAX_CACHE_DATA时 缓存tabId
      if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
        // 判断缓存cacheTab数组内是否存在当前tabIndex
        let isExist = this.cacheTab.indexOf(this.tabIndex);
        if (isExist < 0) {
          // 把当前tabIndex存入缓存cacheTab数组
          this.cacheTab.push(this.tabIndex);
        }
      }
      // 把当前tabindex更新成即将跳转index
      this.tabIndex = index;

      // #ifdef APP-NVUE
      this.scrollTabTo(index);
      // #endif

      // #ifndef APP-NVUE
      this.scrollInto = this.tabList[index].id; // 让scroll-view滚动到即将跳转的tab的位置
      // #endif

      // 当数据比较多的页面大于MAX_CACHE_PAGE 释放第一个tabId 并清空这个tab对应的页面的数据
      if (this.cacheTab.length > MAX_CACHE_PAGE) {
        console.log("缓存tabId数组已经大于缓存页数量");
        let cacheIndex = this.cacheTab[0];
        console.log("清除tabID为" + cacheIndex + "的页");
        this.clearTabData(cacheIndex);
        this.cacheTab.splice(0, 1);
      }
    },
    onswiperchange(e) {
      // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      let index = e.target.current || e.detail.current;
      this.switchTab(index);
      // #endif
    },
    /**
     *swiper-item 的位置发生改变时会触发
     **/
    onswiperscroll(e) {
      console.log("swiper-item 的位置发生改变,禁止scrollview滑动");
      if (this.isTapMoving) {
        return;
      }
      var offsetX = e.detail.dx; // 水平偏移距离
      var preloadIndex = this._lastTabIndex; //上一个tabIndex
      if (offsetX > this.swiperWidth) {
        preloadIndex++;
      } else if (offsetX < -this.swiperWidth) {
        preloadIndex--;
      }
      if (
        preloadIndex === this._lastTabIndex ||
        preloadIndex < 0 ||
        preloadIndex > this.pageList.length - 1
      ) {
        return;
      }
      if (this.pageList[preloadIndex].dataList.length === 0) {
        this.loadTabData(preloadIndex);
      }

      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      var percentage = Math.abs(this.swiperWidth / offsetX);
      var currentSize = this.tabListSize[this._lastTabIndex]; //上一个tab的信息
      var preloadSize = this.tabListSize[preloadIndex]; //即将跳转tab的信息
      var lineL =
        currentSize.left + (preloadSize.left - currentSize.left) / percentage; //tab相对视图左边的距离
      var lineW =
        currentSize.width +
        (preloadSize.width - currentSize.width) / percentage; //tab下标识线的宽度
      this.updateIndicator(lineL, lineW);
      // #endif
    },
    animationfinish(e) {
      // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
      console.log("swiper-item 的位置改变结束,允许scrollview滑动");
      let index = e.detail.current; //即将跳转的index
      if (this._touchTabIndex === index) {
        this.isTapMoving = false;
      }
      this._lastTabIndex = index;
      this.switchTab(index);
      this.updateIndicator(
        this.tabListSize[index].left,
        this.tabListSize[index].width
      );
      // #endif
    },

    /**
     *记录swiper和所有tab的位置信息
     **/
    selectorQuery() {
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs.tabbar1, (res) => {
        this.tabbarWidth = res.size.width;
      });
      dom.getComponentRect(this.$refs["swiper1"], (res) => {
        this.swiperWidth = res.size.width;
      });
      // 因 nvue 暂不支持 class 查询
      var queryTabSize = uni.createSelectorQuery().in(this);
      for (var i = 0; i < this.tabList.length; i++) {
        queryTabSize.select("#" + this.tabList[i].id).boundingClientRect();
      }
      queryTabSize.exec((rects) => {
        rects.forEach((rect) => {
          this.tabListSize[rect.dataset.id] = rect;
        });
        this.updateIndicator(
          this.tabListSize[this.tabIndex].left,
          this.tabListSize[this.tabIndex].width
        );
        this.switchTab(this.tabIndex);
      });
      // #endif

      // #ifdef MP-WEIXIN || H5 || MP-QQ
      // 获取swiper节点的dataset以及尺寸大小信息
      uni
        .createSelectorQuery()
        .in(this)
        .select(".tab-box")
        .fields(
          {
            dataset: true,
            size: true,
          },
          (res) => {
            //swiper的宽度等于
            this.swiperWidth = res.width;
          }
        )
        .exec();
      //获取所有tab-item的相对于显示区域的位置信息，dataset和节点信息
      uni
        .createSelectorQuery()
        .in(this)
        .selectAll(".uni-tab-item")
        .boundingClientRect((rects) => {
          rects.forEach((rect) => {
            this.tabListSize[rect.dataset.id] = rect;
          });
          // 更新tab下的指示线位置
          this.updateIndicator(
            this.tabListSize[this.tabIndex].left,
            this.tabListSize[this.tabIndex].width
          );
        })
        .exec();
      // #endif
    },

    getElementSize(dom, ref, id) {
      dom.getComponentRect(ref, (res) => {
        this.tabListSize[id] = res.size;
      });
    },

    /**
     *更新tab下的指示线位置
     *@param {Number} left 当前选中tab相对视图左边的距离
     *@param {Number} width 当前选中tab的宽度
     **/
    updateIndicator(left, width) {
      this.indicatorLineLeft = left + 12;
      this.indicatorLineWidth = width - 24;
    },
    // #ifdef APP-NVUE
    scrollTabTo(index) {
      const el = this.$refs["tabitem" + index][0];
      let offset = 0;
      if (index > 0) {
        offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2;
        if (this.tabListSize[index].right < this.tabbarWidth / 2) {
          offset = this.tabListSize[0].width;
        }
      }
      dom.scrollToElement(el, {
        offset: -offset,
      });
    },
    // #endif
    loadTabData(index) {
      this.pageList[index].loadData();
    },
    clearTabData(index) {
      this.pageList[index].clear();
    },
  },
};
</script>

<style lang="scss" scope>
/* #ifndef APP-PLUS */
page {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */
.disableTouch {
  pointer-events: none;
}
.tabs {
  flex: 1;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ffffff;
  /* #ifdef MP-ALIPAY || MP-BAIDU */
  height: 100vh;
  /* #endif */
}

.tab-bar {
  /* #ifdef APP-PLUS */
  width: 750rpx;
  /* #endif */
  height: 67rpx;
  flex-direction: row;
  position: fixed;
  z-index: 999;
  background: white;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

/* #ifndef APP-NVUE */
.tab-bar ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

/* #endif */

.scroll-view-indicator {
  position: relative;
  height: 7rpx;
  background-color: transparent;
}

.scroll-view-underline {
  height: 7rpx;
  border-radius: 30rpx;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  background-color: $uni-color-success;
}

.scroll-view-animation {
  transition-duration: 0.2s;
  transition-property: left;
}

.tab-bar-line {
}

.tab-box {
  flex: 1;
  height: 100%;
  background-color: $uni-color-grey;
  padding-top: 67rpx;
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  width: 100rpx;
  padding: 0 20rpx;
}

.uni-tab-item-title {
  color: #555;
  font-size: 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.uni-tab-item-title-active {
  color: $uni-color-success;
  font-size: 32rpx;
  font-weight: 800;
}

.swiper-item {
  flex: 1;
  flex-direction: column;
}

.page-item {
  flex: 1;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
