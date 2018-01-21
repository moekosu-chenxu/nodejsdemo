var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    // 跳转页面
    res.render('index', { title: 'Express', username: 'Chenxu' });
});

module.exports = router;
