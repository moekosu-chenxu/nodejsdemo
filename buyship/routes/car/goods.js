/**
 * Created by moekosu on 2018/4/6.
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');
var page = "car/goods";

/* GET home page. */
router.get('/', function(req, res, next) {

	// ajax调用
	remoteAjax.postTo({
		url : 'localhost:8012/moekosu/car/goodsList',
		type : "POST",
		data : {
		},
		success : function(jsonData) {
			console.log(jsonData);
			// 跳转页面
			if(jsonData.isSuccess){
				res.render(page, { goods: jsonData.data });
			}
		},
		error : function(err) {
			console.log(err);
			// 获取不到
			var newJson = [{ createDate: 1516544322000,
				goodsId: 1,
				goodsName: '学习资料1',
				goodsDesc: 'test1',
				pic_path: '默认',
				status: '1',
				url: '/root/a.zip' }];
			res.render(page, { goods: newJson });
		},
		complete: function () {

		}
	}, http);
});

module.exports = router;