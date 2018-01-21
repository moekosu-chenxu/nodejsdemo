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
		url : '10.12.3.213:28085/dccp-platform/oss.ajax',
		type : "POST",
		data : {
			"version": "1.0",
			"portalType": "WAP",
			"portalId": "100",
			"reqTime": "2016-04-08 18:39:00",
			"transactionId": "20160408183900000001",
			"sign": "ETSZD4361xdryq",
			"funcCode": "getActivityDetail",
			"activityId": "ACT20171221317691980"
		},
		success : function(resp) {
			console.log('succ: '+ resp);
		},
		error : function(err) {
			console.log('err: '+ err);
		},
		complete: function () {
			console.log('comp');
		}
	}, http);

	// 跳转页面
	res.render('index', { title: 'Express', username: 'Chenxu' });
});

module.exports = router;
