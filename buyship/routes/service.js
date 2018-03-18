/**
 * Service接口，调用后台dubbo开放接口
 * Created by moekosu on 2018/03/11
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');

/* blog接口-groupList获取群组列表 */
router.post('/blog/groupList', function(req, res, next) {
	// ajax调用
	remoteAjax.postTo({
		url : 'localhost:8012/moekosu/blog/list',
		type : "POST",
		data : {
			groupId: 1
		},
		success : function(jsonData) {
			res.send(jsonData);
		},
		error : function(err) {
			res.send('no data');
		}
	}, http);
});

/* blog接口-add新增文章 */
router.post('/blog/add', function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	var groupId = req.body.groupId;
	console.log(title + '/' + content + '/' + groupId);
	// ajax调用
	remoteAjax.postTo({
		url : 'localhost:8012/moekosu/blog/add',
		type : "POST",
		dataType: 'json',
		data : {
			"title": title,
			"content": content,
			"groupId": groupId
		},
		success : function(jsonData) {
			console.log('add success');
			res.send(jsonData);
		},
		error : function(err) {
			console.log(err);
			res.send('no data');
		}
	}, http);
});

module.exports = router;
