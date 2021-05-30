<template>
  <view>
    <button class="postButton" @click="toTrendFromPage">
      <text>发布</text>
    </button>
    <!-- 常访问博主列表 -->
    <avatarScroll :infoList="authorlist"></avatarScroll>
    <!-- 动态列表 -->
    <trendList :trendList="trendList"></trendList>
  </view>
</template>

<script>
import { getAuthorList, getTrendList } from "../../common/js/api/models.js";

export default {
  data() {
    return {
      authorlist: [], //常访问作者
      trendList: [], // 动态列表
    };
  },
  onLoad() {
    let that = this;
    // 获取常访问作者列表
    getAuthorList()
      .then((res) => {
        that.authorlist = res.data;
      })
      .catch((err) => {
        console.log("获取常访问作者列表" + err);
      });
    // 获取动态列表
    getTrendList()
      .then((res) => {
        that.trendList = res.data;
      })
      .catch((err) => {
        console.log("获取动态列表" + err);
      });
  },
  onReachBottom() {
    let that = this;
    // 更新动态列表
    getTrendList()
      .then((res) => {
        that.trendList.push.apply(that.trendList, res.data);
      })
      .catch((err) => {
        console.log("获取动态列表" + err);
      });
  },
  methods: {
    //前往动态发布页面
    toTrendFromPage() {
      uni.navigateTo({
        url: "./subpages/trendPostPage",
      });
    },
  },
};
</script>

<style>
page {
  background-color: #f6f8fa;
}
</style>
<style lang="scss" scoped></style>
