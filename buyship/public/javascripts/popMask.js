/**
 * 条件：
 * 1. 需要jquery
 * 2. 需要在ejs页面加载
 */
function maskPage(){
}
function loading() {
}
function popMsg() {
}
function inputMsg() {
}

/**
 * 遮罩层
 */
maskPage.prototype.show = function(){
    top.$("#maskPage").show();
};
maskPage.prototype.hide = function(){
    // 判断是否有多个弹框，此时不关闭遮罩层
    if(top.$(".maskElem:visible").length < 1){
        top.$("#maskPage").hide();
    }
};

/**
 * 加载关闭loading
 */
loading.prototype.startLoading = function(){
    // 展示遮罩层
    mask.show();
    top.$("#loadingImg").show();
};
loading.prototype.endLoading = function(){
    top.$("#loadingImg").hide();
    mask.hide();
};

/**
 * 加载关闭提示框
 * @param msg 提示信息
 */
popMsg.prototype.showMsg = function (msg) {
    top.$("#popMsg span").text(msg);
    mask.show();
    top.$("#popMsg").show();
    setTimeout(function(){
        this.popMsg1.closeMsg();
    }, 1000);
};
popMsg.prototype.closeMsg = function () {
    top.$("#popMsg").fadeOut('normal', function () {
        top.$("#popMsg span").text('');
        mask.hide();
    });
};

/**
 * 下载页面密保密码输入弹出框
 */
inputMsg.prototype.showMsg = function (callback) {
    mask.show();
    top.$("#pass").show();
    top.$("#pass #close").off('click').on('click', function () {
        pass.closeMsg();
    });
    top.$("#pass #pass_submit").off('click').on('click', function () {
        callback.call(this, top.$("#pass #password").val());
    });
};
inputMsg.prototype.closeMsg = function () {
    top.$("#pass").hide();
    mask.hide();
}

/**
 * 初始化
 */
var load = new loading();
var popMsg1 = new popMsg();
var pass = new inputMsg();
var mask = new maskPage();