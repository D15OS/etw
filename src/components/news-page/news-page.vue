<template>
  <view class="page-news">
    <!-- 刷新与加载组件 -->
    <loadRefresh
      ref="loadRefresh"
      :isRefresh="isLoading"
      refreshType="halfCircle"
      color="#6cd4ff"
      backgroundCover="#f4f5f6"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @loadMore="loadData(false)"
      @refresh="loadData(true)"
    >
      <!-- 瀑布流容器 -->
      <workWater
        slot="content-list"
        ref="workWater"
        :flowList="dataList"
      ></workWater>
    </loadRefresh>
  </view>
</template>

<script>
import { getWorkList } from "../../common/js/api/models.js";

export default {
  props: {
    nid: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      dataList: [], //请求到的数据
      isLoading: false, //是否正在请求
      currentPage: 0, //当前页
      totalPages: 0, //总页数
      isFirst: true, //是否第一次访问
    };
  },
  created() {},
  methods: {
    //获取页面数据
    loadData(refresh) {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      //刷新
      if (refresh) {
        this.currentPage = 1;
        this.$emit("stopSwiperMove", true);
        getWorkList({ page: this.currentPage })
          .then((res) => {
            const data = res.data;
            this.totalPages = data[0].total;
            this.$refs.workWater.refresh();
            this.dataList = this.dataList.splice(0, this.dataList.length);
            this.dataList = Object.assign([], data);
            // console.table(this.dataList);
            this.$refs.loadRefresh.completed();
            this.$emit("stopSwiperMove", false);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.$emit("stopSwiperMove", false);
            this.isLoading = false;
          });
        // 加载
      } else {
        //是否第一次访问
        if (this.isFirst) {
          this.isLoading = false;
          this.isFirst = false;
          this.$refs.loadRefresh.runRefresh();
        } else {
          // 请求下一页内容
          this.currentPage += 1;
          getWorkList({ page: this.currentPage })
            .then((res) => {
              const data = res.data;
              this.totalPages = data[0].total; //获取总页数
              this.dataList = this.dataList.concat(data); //衔接上一页的内容
              this.$refs.loadRefresh.completed(); //结束加载过程
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      }
    },
    //用于清理当前页面的数据
    clear() {
      console.log("clear");
      this.dataList.length = 0;
      this.$refs.workWater.refresh(); //清空瀑布流内部的数据
      this.isFirst = true;
      this.currentPage = 1; //如果想被清除之后衔接上之前的页数，注释此行
    },
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.page-news {
  background-color: $uni-color-grey;
  flex: 1;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.listview {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
}

.refresh {
  justify-content: center;
}

.refresh-view {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  width: 750rpx;
  height: 64px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.refresh-icon {
  width: 32px;
  height: 32px;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: rotate(0deg);
  transform-origin: 15px 15px;
}

.refresh-icon-active {
  transform: rotate(180deg);
}

.loading-icon {
  width: 28px;
  height: 28px;
  margin-right: 5px;
  color: gray;
}

.loading-text {
  margin-left: 2px;
  font-size: 16px;
  color: #999999;
}

.loading-more {
  align-items: center;
  justify-content: center;
  padding-top: 14px;
  padding-bottom: 14px;
  text-align: center;
}

.loading-more-text {
  font-size: 28upx;
  color: #999;
}
</style>
