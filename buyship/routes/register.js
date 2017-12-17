var express = require('express');
var http = require('http');
var User = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

/**
 * 提交注册
 */
router.post('/regSave', function (req, res) {
    var username = req.body['username'];
    var userpass = req.body['userpass'];
    var userpass_2 = req.body['userpass_2'];
    var phoneNum = req.body['phoneNum'];
    var md5 = req.body['checkNum'];

    console.log(username + '/' + userpass);

    var newUser = new User({
        name: username,
        password: userpass,
        age: 18,
        description: ''
    });

    newUser.save(function (err, result) {
        if(err){
            console.log('save error.');
            return;
        }

        console.log('save success.' + result);
    });

    res.render('reg', { title: 'Moekosu' });
});

// TODO 做一个类似ajax请求，发送请求到springboot的后台接口获取数据
var httpRequest = function(url, callback){
    var postMsg = {
        host: 'localhost',
        port: '8099',
        method: 'GET',
        path: url
    };
    var req = http.request(postMsg, function(res){
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if(callback){
                callback(null, JSON.parse(data));
            }
        });
        res.on('error', function (e) {
            if(callback){
                callback(e, null);
            }
        });
        req.end();
    });
};

module.exports = router;
