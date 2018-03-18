var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');

var suitName = "蘑菇树❤";

/* GET home page. */
router.get('/', function(req, res, next) {
    // 获取module列表
    remoteAjax.postTo({
        url: 'localhost:8012 /moekosu/modules/list',
        type: 'POST',
        data: {

        },
        success: function(jsonData){
            console.log(jsonData);
            // 跳转页面
            res.render('index', { title: suitName, modules: jsonData });
        },
        error: function(err){
            console.log(err);
            // 获取不到
            var newJson = [{ createDate: 1516544322000,
                mid: 1,
                name: '测试模块',
                status: '1',
                url: '/blog' }];
            res.render('index', { title: suitName, modules: newJson });
        },
        complete: function(){

        }
    }, http);
});

module.exports = router;
