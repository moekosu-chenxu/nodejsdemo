var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// 获取module列表
	remoteAjax.postTo({
		url: 'localhost:8012/moekosu/tools/list',
		type: 'POST',
		data: {

		},
		success: function(jsonData){
			console.log(jsonData);
			// 跳转页面
			res.render('toolsList', { tools: jsonData });
		},
		error: function(err){
			console.log(err);
			// 获取不到
			var newJson = [{ createDate: 1516544322000,
				id: 1,
				name: '学习资料1',
				status: '1',
				url: '/root/a.zip' },{ createDate: 1516544322000,
                id: 1,
                name: '学习资料2',
                status: '1',
                url: '/root/a.zip' }];
			res.render('toolsList', { tools: newJson });
		},
		complete: function(){

		}
	}, http);
});

module.exports = router;
