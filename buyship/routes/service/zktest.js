/**
 *
 * @Create chenxu
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var zkk = require('../zkConnection.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    //
    var blog = zkk.getService('blogService', req, res);
    var blogList = blog.getEssayList();
    console.log(blogList);

});

module.exports = router;
