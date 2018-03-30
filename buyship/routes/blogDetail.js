/**
 * Created by moekosu on 2018/3/27.
 */
var express = require('express');
var http = require('http');
var URL = require('url');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');
var forwardUrl = "blog/detail";

/**
 * 根路径get请求
 */
router.get('/', function(req, res, next) {
    console.log('-----------------开始请求博客文章详情----------------------');
    // 获取当前路径url
    var params = URL.parse(req.url, true).query;
    // ajax调用
    remoteAjax.postTo({
        url : 'localhost:8012/moekosu/blog/detail',
        type : "POST",
        data : {
            id: params.id
        },
        success : function(jsonData) {
            console.log('调用ajax成功，返回数据：' + jsonData);
            // 跳转页面
            if(jsonData.isSuccess){
                res.render(forwardUrl, { blog: jsonData.data[0] });
            }
        },
        error : function(err) {
            console.log('调用ajax失败，错误信息：' + err);
            // 获取不到
            var newJson = [{ createDate: 1516544322000,
                id: 1,
                title: '学习资料1',
                content: 'test1',
                groupName: '默认',
                status: '1',
                url: '/root/a.zip' }];
            res.render(forwardUrl, { blog: newJson[0] });
        },
        complete: function () {

        }
    }, http);
});

module.exports = router;
