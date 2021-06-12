<template>
  <view>
    <!-- <tabs
      :list="list"
      :is-scroll="false"
      :current="current"
      @change="change"
    ></tabs> -->

    <!-- 骨架屏组件 -->
    <!-- <workSkeleton v-if="loading"></workSkeleton> -->
    <!-- 作品瀑布流组件 -->
    <loadRefresh
      ref="loadRefresh"
      :isRefresh="true"
      refreshType="halfCircle"
      color="#6cd4ff"
      backgroundCover="#f4f5f6"
      :currentPage="1"
      :totalPages="2"
      @loadMore="loadWorkList()"
      @refresh="loadWorkList()"
    >
      <!-- 瀑布流容器 -->
      <workWater
        slot="content-list"
        ref="workWater"
        :flowList="workList"
      ></workWater>
    </loadRefresh>
  </view>
</template>

<script>
import { getWorkList } from "../../common/js/api/models.js";
export default {
  data() {
    return {
      list: [
        {
          name: "选项1",
        },
        {
          name: "选项2",
        },
        {
          name: "选项3",
        },
      ],
      current: 0,
      loadStatus: "loadmore", //加载更多加载状态
      loading: true, //骨架屏加载状态
      workList: [], //作品列表
    };
  },
  onLoad() {
    let that = this;
    getWorkList({ page: 1 })
      .then((res) => {
        that.workList = res.data;
        that.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // onReachBottom() {
  //   this.loadStatus = "loading";
  //   this.loadWorkList();
  // },
  methods: {
    //加载作品列表
    loadWorkList() {
      let that = this;
      getWorkList({ page: 1 })
        .then((res) => {
          that.workList.push.apply(that.workList, res.data);
          this.$refs.loadRefresh.completed(); //结束加载过程
        })
        .catch((err) => {
          console.log(err);
        });
      this.loadStatus = "loadmore";
    },
    change(index) {
      this.current = index;
      console.log(this.current);
    },
  },
};
</script>

<style>
page {
  background-color: rgb(240, 240, 240);
}
</style>
<style lang="scss" scoped></style>
