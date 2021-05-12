const Mock = require('better-mock/dist/mock.mp.js')

Mock.mock('api/test', {
	'code': '200',
	'error_msg': '',
	'data|10': [{
		'id|+1': 1,
		'avatarImage': "@image()",
		'image': "@image()",
		'title': '@ctitle(10, 35)',
		'author': '@ctitle(3,5)',
		'time': '@now()',
	}]
})

Mock.mock('api/authorList', {
	'code': "200",
	'error_msg': '',
	'data|8': [{
		'id|+1': 1,
		'authorImage': "@image()",
		'authorName': "@ctitle(3,8)",
	}]
})

Mock.mock('api/trendsList', {
	'code': "200",
	'error_msg': '',
	'data|8': [{
		'id|+1': 1,
		'authorName': "@ctitle(5,10)",
		'authorDescription': "@ctitle(8,28)",
		'trendImageList|1-9': [
			"@image()"
		],
		'trendText': "@ctitle(15,140)",
	}]
})
