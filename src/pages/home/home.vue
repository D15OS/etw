<template>
  <view>
    <!-- 骨架屏组件 -->
    <worksSkeleton v-if="loading"></worksSkeleton>
    <!-- 作品瀑布流组件 -->
    <worksList :flowList="workList"></worksList>
    <!-- 加载更多组件 -->
    <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"></u-loadmore>
  </view>
</template>

<script>
import { getList } from "../../common/js/api/models.js";
export default {
  data() {
    return {
      loadStatus: "loadmore", //加载更多加载状态
      loading: true, //骨架屏加载状态
      workList: [], //作品列表
    };
  },
  onLoad() {
    let that = this;
    getList()
      .then((res) => {
        that.workList = res.data;
        that.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  onReachBottom() {
    this.loadStatus = "loading";
    this.loadWorkList();
  },
  methods: {
    // 模拟数据加载
    // addRandomData() {
    // 	for (let i = 0; i < 10; i++) {
    // 		let index = this.$u.random(0, this.workList.length - 1);
    // 		// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
    // 		let item = JSON.parse(JSON.stringify(this.workList[index]));
    // 		this.flowList.push(item);
    // 	}
    // },
    //加载作品列表
    loadWorkList() {
      setTimeout(() => {
        let that = this;
        getList()
          .then((res) => {
            that.workList.push.apply(that.workList, res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.loadStatus = "loadmore";
      }, 1000);
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
