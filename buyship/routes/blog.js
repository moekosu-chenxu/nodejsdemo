/**
 * Created by moekosu on 2018/1/21.
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	// ajax调用
	remoteAjax.postTo({
		url : 'localhost:8012/moekosu/blog/list',
		type : "POST",
		data : {
		},
		success : function(jsonData) {
			console.log(jsonData);
			// 跳转页面
			res.render('blog/blog', { blogs: jsonData });
		},
		error : function(err) {
			console.log(err);
			// 获取不到
			var newJson = [{ createDate: 1516544322000,
				id: 1,
				title: '学习资料1',
				content: 'test1',
                groupName: '默认',
				status: '1',
				url: '/root/a.zip' },{ createDate: 1516544322000,
				id: 2,
                title: '学习资料2',
                content: 'test2',
                groupName: '默认',
				status: '1',
				url: '/root/a.zip' }];
			res.render('blog/blog', { blogs: newJson });
		},
		complete: function () {

		}
	}, http);
});

module.exports = router;
