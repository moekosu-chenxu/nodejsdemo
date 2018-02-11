var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    // 获取module列表
    remoteAjax.postTo({
        url: 'localhost:8012/moekosu/modules/list',
        type: 'POST',
        data: {

        },
        success: function(jsonData){
            console.log(jsonData);
            // 跳转页面
            res.render('index', { title: 'Express', modules: jsonData });
        },
        error: function(err){
            console.log(err);
        },
        complete: function(){

        }
    }, http);
});

module.exports = router;
