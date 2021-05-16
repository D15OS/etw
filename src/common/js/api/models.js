/* model�*/
import {
	apiResquest
} from "./request.js"

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

//��¼
export const loginWechat = (query) => {
	return apiResquest({
		url: '###',
		method: 'POST',
		query: {
			...query
		},
	})
}
