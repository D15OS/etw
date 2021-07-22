import { apiResquest } from "./request.js";
//#ifdef H5
let baseUrl = "/api"
//#endif
//#ifdef MP-WEIXIN
let baseUrl = "http://us-or-cera-1.natfrp.cloud:21671"
//#endif
// 获取作品列表
export const getWorkList = (query) =>
  apiResquest("mockApi/test", { method: "GET", query });
// 获取常看作者
export const getAuthorList = (query) =>
  apiResquest("mockApi/authorList", { method: "GET", query });
// 获取动态列表
export const getTrendList = (query) =>
  apiResquest("mockApi/trendsList", { method: "GET", query });
//登录
export const loginTest = (query) =>
  apiResquest(`${baseUrl}/login`, { method: "POST", query });
//注册
export const registerTest = (query) =>
  apiResquest(`${baseUrl}/user/register`, { method: "POST", query });
//获取验证码
export const getEmailCode = (query) =>
  apiResquest(`${baseUrl}/user/email/verification`, { method: "GET", query });
//获取用户
export const getUser = (query) =>
  apiResquest(`${baseUrl}/getUser`, { method: "GET", query });
//登出
export const logout = (query) =>
  apiResquest(`${baseUrl}/logout`, { method: "GET", query });
