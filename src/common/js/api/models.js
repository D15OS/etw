/* model�*/
import { apiResquest } from "./request.js"

// ��ȡ�û��б�
export const getList = (query) => {
	return apiResquest({
		url: 'api/test',
		method: 'GET',
		query: {
			...query
		}
	})
}
// ��ȡ�������û�
export const getAuthorList = (query) => {
	return apiResquest({
		url: 'api/authorList',
		method: 'GET',
		query: {
			...query
		}
	})
}
// ��ȡ��̬�б�
export const getTrendsList = (query) => {
	return apiResquest({
		url: 'api/trendsList',
		method: 'GET',
		query: {
			...query
		}
	})
}

//登录
export const loginWechat = (query) => apiResquest('/api/login', { method: 'POST', query })
//获取用户
export const getUser = (query) => apiResquest("/api/getUser", { method: 'GET', query })
//登出
export const logout = (query) => apiResquest("/api/logout", { method: 'GET', query })


