<template>
  <view>
    <button @click="WxLogin()" type="default">登录</button>
    <button @click="getUser()" type="default">获取用户信息</button>
    <button @click="logout()" tyoe="default">登出</button>
  </view>
</template>

<script>
import { loginWechat, getUser, logout } from "../../common/js/api/models.js";
import { apiResquest } from "../../common/js/api/request.js";
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    WxLogin() {
      var self = this;
      //   uni.login({
      //     provider: "weixin",
      //     success: function (res) {
      //       if (res.code) {
      //       } else {
      //         console.log("登录失败！" + res.errMsg);
      //       }
      //     },
      //     fail(e) {
      //       console.log(e);
      //     },
      //     complete(e) {
      //       console.log(e);
      //     },
      //   });
      loginWechat({ username: "Agitator", password: "1" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
      getUser();
    },
    logout() {
      logout();
    },
  },
  onReady() {},
};
</script>

<style lang="scss"></style>
