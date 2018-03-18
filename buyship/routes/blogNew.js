/**
 * Created by moekosu on 2018/1/21.
 */
var express = require('express');
var http = require('http');
var router = express.Router();
var remoteAjax = require('../public/javascripts/remoteReq.js');
var targetPage = "blog/new";

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render(targetPage, { blogs: [] });
});

module.exports = router;
