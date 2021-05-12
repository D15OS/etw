/* model层 */
import {
	apiResquest
} from "./request.js"

export const getList = (query) => {
	return apiResquest({
		url: 'api/test',
		method: 'GET',
		query: {
			...query
		}
	})
}
export const getAuthorList = (query) => {
	return apiResquest({
		url: 'api/authorList',
		method: 'GET',
		query: {
			...query
		}
	})
}
export const getTrendsList = (query) => {
	return apiResquest({
		url: 'api/trendsList',
		method: 'GET',
		query: {
			...query
		}
	})
}
