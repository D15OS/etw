import { apiResquest } from "./request.js"

// 获取作品列表
export const getWorkList = (query) => apiResquest('mockApi/test', { method: 'GET', query })
// 获取常看作者
export const getAuthorList = (query) => apiResquest('mockApi/authorList', { method: 'GET', query })
// 获取动态列表
export const getTrendList = (query) => apiResquest('mockApi/trendsList', { method: 'GET', query })
//登录
export const loginWechat = (query) => apiResquest('/api/login', { method: 'POST', query })
//获取用户
export const getUser = (query) => apiResquest("/api/getUser", { method: 'GET', query })
//登出
export const logout = (query) => apiResquest("/api/logout", { method: 'GET', query })


