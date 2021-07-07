<template>
  <view>
    <input v-model="username" type="text" name="" id="" placeholder="邮箱" />
    <input
      v-model="password"
      type="password"
      name=""
      id=""
      placeholder="密码"
    />
    <input
      v-model="emailCode"
      type="emailCode"
      name=""
      id=""
      placeholder="邮箱验证码"
    />
    <button @click="login()" type="default">登录</button>
    <button @click="register()" type="default">注册</button>
    <button @click="emailCheck()" type="default">获取邮箱验证码</button>
    <button @click="getUser()" type="default">获取用户信息</button>
    <button @click="logout()" tyoe="default">登出</button>
  </view>
</template>

<script>
import {
  loginTest,
  registerTest,
  getEmailCode,
  getUser,
  logout,
} from "../../common/js/api/models.js";
import { apiResquest } from "../../common/js/api/request.js";
import { Validator } from "../../common/js/validate/validate.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      emailCode: "",
    };
  },
  onLoad() {},
  methods: {
    login() {
      // 验证数据
      let data = {
        username: this.username,
        password: this.password,
      };
      // 验证规则
      let rules = [
        {
          key: "username",
          required: true,
          regExp: ["email", "phone"],
        },
        {
          key: "password",
        },
      ];
      let validator = new Validator();
      let isValidated = validator.validate(data, rules);
      if (isValidated === true) {
        loginTest({ username: this.username, password: this.password })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("验证错误", isValidated);
      }
    },
    register() {
      registerTest({
        email: this.username,
        password: this.password,
        code: "16wg9",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    emailCheck() {
      getEmailCode({ email: this.username })
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

<style lang="scss">
input {
  background-color: white;
  padding: 15rpx;
}
</style>
