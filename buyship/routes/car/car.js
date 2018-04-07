/**
 * Created by moekosu on 2018/4/6.
 */
var express = require('express');
var http = require('http');
var URL = require('url');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');
var page = "car/car";

/* GET home page. */
router.get('/', function(req, res, next) {

	// 获取当前路径url
	var params = URL.parse(req.url, true).query;
	// ajax调用
	remoteAjax.postTo({
		url : 'localhost:8012/moekosu/car/carList',
		type : "POST",
		data : {
			userId: params.id
		},
		success : function(jsonData) {
			console.log(jsonData);
			// 跳转页面
			if(jsonData.isSuccess){
				res.render(page, { cars: jsonData.data });
			}
		},
		error : function(err) {
			console.log(err);
			// 获取不到
			var newJson = [{ userId: "1",
				goodsId: "1",
				goodsName: '学习资料1',
				goodsDesc: 'test1',
				pic_path: '/pic/a',
				buyCount: '2',
				url: '/root/a.zip' }];
			res.render(page, { cars: newJson });
		},
		complete: function () {

		}
	}, http);
});

module.exports = router;