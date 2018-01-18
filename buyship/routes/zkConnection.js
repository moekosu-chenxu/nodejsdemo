var express = require('express');
var zk = require('node-zookeeper-client');
//var httpProxy = require('http-proxy'); //构造代理服务器

var CONNECT_URL = '-:2181';
var REGISTER_ROOT = '/dubbo';

// 连接zk
var zook = zk.createClient(CONNECT_URL);
zook.connect();

// 创建代理服务器
//var proxy = httpProxy.createProxyServer();

function zookConnection()
{
};

zookConnection.prototype.getService = function (serviceName) {

    var servicePath = REGISTER_ROOT +'/'+ serviceName;
    console.log('req dubbo service path: '+ servicePath);

    zook.getChildren(servicePath, function (err, addressNodes) {

        console.log('into zk children node');
        // 错误
        if (err)
        {
            console.log(err.stack);
            return;
        }
        // 判断zk地址节点
        var len = addressNodes.length;
        if(len == 0){
            console.log('address node not exist');
            return;
        }

        // 获取zk地址路径
        var addressPath = servicePath + '/';
        if (len == 1)
        {
            // 如果只有一个地址(单机zk
            addressPath += addressNodes[0];
        }
        else
        {
            // 如果存在多个地址,则随机获取一个地址(集群zk
            addressPath += addressNodes[parseInt(Math.random() * size)];
        }

        // 获取服务地址
        zook.getData(addressPath, function (err, serviceAddress) {
            if (err)
            {
                console.log(err.stack);
                return;
            }
            //
            // proxy.web(req,res,{
            //     target:'http://'+serviceAddress//目标地址
            // })
        })

    })

}

var zkConnect = new zookConnection();
module.exports = zkConnect;