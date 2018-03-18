function RemoteAjax()
{
}

/**
 * 拼装传输必备参数，默认参数
 * @type {{method: string, host: string, port: number, path: string}}
 */
RemoteAjax.prototype.cConfig = {
    method: '', //POST GET
    host: '10.12.3.213',
    port: 80,
    path: '/dccp-platform/oss.ajax',
    headers:{
        "Content-Type": 'application/json'
    }
};

/**
 * 开始异步/同步调用 使用http模块
 * @param obj 传参
 * @param http 模块
 */
RemoteAjax.prototype.postTo = function (obj, http) {

    // TODO obj必要字段校验
    if(!obj['url'] || !obj['type'])
    {
        console.log('请求错误：缺少必备参数(url或type)');
        return;
    }

    // TODO 处理传输参数
    var currData = "";
    if(obj.url)
    {
        var paramUrl = obj.url;
        // 是否包含/
        var num = paramUrl.indexOf('/');
        // 分解请求路径与请求具体地址
        var urlAport = paramUrl.substr(0, num);
        var urlApath = paramUrl.substr(num, paramUrl.length);

        // 分解 请求地址ip 端口port
        if(urlAport.indexOf(":") > 0){
            var param = urlAport.split(":");
            this.cConfig.host = param[0];
            this.cConfig.port = param.length == 2? Number(param[1]) : this.cConfig.port;
        }
        else
        {
            // 如果不包含端口，则使用默认的80端口
            this.cConfig.host = urlAport;
        }

        // 请求路径 请求类型
        this.cConfig.path = urlApath;
        this.cConfig.method = obj['type'];
    }

    // TODO 调用
    var reqq = http.request(this.cConfig, function (msgRes) {
        // Console
        console.log('ajax request come back data');
        // 处理返回数据
        msgRes.on('data', function (data) {
            // 返回Buffer类型数据，使用toString()能转化成JSON格式的字符串
            // TODO 容易json解析报错
            var jsonData = data != null? JSON.parse(data.toString()) : '';
            if(jsonData){
                console.log('调用成功，返回参数：' + jsonData);
            }
            else{
                console.log('调用成功，无返回参数');
            }
            console.log('开始调用success回调函数');
            if(obj.success && typeof obj.success == 'function')
            {
                obj.success.call(this, jsonData);
            }
        });
        // 结束请求
        msgRes.on('end', function () {
            console.log('结束调用，开始调用complete回调函数：');
            if(obj.complete && typeof obj.complete == 'function')
            {
                obj.complete.call(this);
            }
        })
    });
    // 请求错误
    reqq.on('error', function (err) {
        console.log('调用失败：' + err);
        if(obj.error && typeof obj.error == 'function')
        {
            obj.error.call(this, err);
        }
    });
    console.log('配置列表：' + JSON.stringify(this.cConfig));
    console.log('请求参数列表：' + JSON.stringify(obj.data));
    reqq.write(JSON.stringify(obj.data), 'UTF-8');// 请求带参数
    reqq.end();// 必须写，结束请求
}


var remoteAjax = new RemoteAjax();
module.exports = remoteAjax;
