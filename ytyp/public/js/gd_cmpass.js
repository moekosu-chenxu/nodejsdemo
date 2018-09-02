/**
 * gd_cmpass.js
 * @description 广东统一登录js
 * @author chenxu 005027
 * @premise RAS.js(加密), timer.js(计时), jffx.js(订购)
 * @createDate 2017-12-06
 */

var lastSecond = 10; // 轮询时间
var loginType = 6; // 登录类型：短信验证码
var phoneNumber="";
var ctx = "";// 根目录
var oneKeyLoginVariable = {};

$(function(){
	ctx = window.ctxPaths || window.ctx;
	
	oneKeyLoginVariable.messageNew = $("#messageNew").val();// 唯一标志符
	oneKeyLoginVariable.msgId = $("#msgId").val();
	oneKeyLoginVariable.msgTime = $("#msgTime").val();
});

// 一键登录获取token
function getAccessToken(type, phoneHandler)
{
	clearCache();
	
	$.ajax ({
		url: ctx + "/my/getAccessToken.ajax",
	    type: "POST",
	    data: {},
	    dataType: "json",
	    success : function(resp) {
	    	var data = eval('(' + resp.data + ')');
	    	if (resp.isSuccess && data && data.retCode == "0") {
	    		// 获取token成功，调用获取手机号码的方法
	    		var accessToken = data.accessToken;
	    		var appId = data.appId;
	    		var cmpassUrl = data.cmpassUrl;
	    		smartGetMssidn(accessToken, appId, cmpassUrl, type, phoneHandler);
	    	} 
	    	else {
		    	// 获取token失败，跳转短信验证码窗口
		  		if(type==0){
					showPopBoxNew(0);
				}
		  		else if(type==1){
					showPopBoxNew(3);
				}
	        }
	    },
	    error : function(resp) {
			// 获取token失败，跳转短信验证码窗口
		  	if(type==0){
				showPopBoxNew(0);
			}
		  	else if(type==1){
				showPopBoxNew(3);
			}
		}
	});
}

//智能取号判断
function smartGetMssidn(_accessToken, _appId, _cmpassUrl, type, phoneHandler){
	/* var url = "http://121.15.167.251:30030/umcopenapi/getMobile?ver=1.0&appId=100001&msgId=15047497309518745&timestamp=20170907163411951&accessToken=d681b356bd9a7ef2a109b081a3d5c5ef&openType=0&message=1234567&expandParams=phoneNum%3D13510230899"; */ 
	// 拼接URL
    var url = _cmpassUrl + "?ver=1.0&" + "appId=" + _appId + "&msgId=" + oneKeyLoginVariable.msgId + "&timestamp=" + oneKeyLoginVariable.msgTime
		+ "&accessToken=" + _accessToken + "&openType=0&message=" + oneKeyLoginVariable.messageNew + "&expandParams=phoneNum%3D13510329835";
    
    // 智能取号
    $("#accessToken").remove();
    var display = $("<div id='accessToken' style='display:none;'></div>");
    var display_img = $("<img id='img' src='"+url+"'>");
    display.append(display_img);
	$(document.body).append(display);
	
	// 监听器
	$("#img").on('load', function(){
		//取号成功
		loopCountDown(type, phoneHandler);
	});
	$("#img").on('error', function(){
		if(type==0){
			showPopBoxNew(0);
		}
		else if(type==1){
			showPopBoxNew(3);
		}
	}); 
}

// 一键登录轮询获取手机号
function loopCountDown(type, phoneHandler){
	var time_distance = lastSecond--; 
	if(time_distance > 0){
		$.ajax ({
			url: ctx + "/my/getMobileNumber.ajax",
			type: "POST",
			data: {"message" : oneKeyLoginVariable.messageNew}, 
			dataType: "json",
	        success : function(resp) 
	        {
	        	var data = eval('(' + resp.data + ')');
	            if (resp.isSuccess && data && data.retCode == "0")
	            {
	        	    if(data && data.phoneNumber>=11)
	        	    {
	        	    	// 获取手机号成功
	        	    	phoneNumber = data.phoneNumber;
	        	    	lastSecond = 0;
	        	    }
	            } 
	        }
	  	});
		setTimeout(function(){loopCountDown(type, phoneHandler);}, 500);
	}
	else{
		//结束轮询.取到手机号就跳转，取不到就跳转到短信验证码登录string.replace(/(^s*)|(s*$)/g, "").length ==0
		if(phoneNumber && phoneNumber != ""){
			// 成功一键获取手机号的自定义处理方法
			if(phoneHandler != undefined && phoneHandler != null 
					&& phoneHandler != '' && typeof phoneHandler == "function")
			{
				phoneHandler.call();
			}
			else
			{
				if(type==0){
					$("#phoneNumber_0").val(phoneNumber);
					showPopBoxNew(1);
				}
				else if(type==1){
					$("#phoneNumber_1").val(phoneNumber);
					showPopBoxNew(4);
				}
			}
			// 修改登录类型为一键登录
			loginType = 5;
		}
		else {
			if(type==0){
				showPopBoxNew(0);
			}
			else if(type==1){
				showPopBoxNew(3);
			}
		}
	}
}

// 登录和订购 
function loginAndOrder(type){
	var loginTel ="";
	
	// 已经登录
	if(loginStatus != 1){
		if(type == "redbagrain"){
			// 红包雨直接开始游戏
			if(refereeGetUrl != "" && refereeGetUrl != null && refereeGetUrl != undefined && refereeGetUrl != "null"){
				RedBagRainCommon.getUserLotteryChance(activityId,refereeGetUrl);
			}
		}
		else{
			// jffx直接订购
			oneKeyOrder();
		}
	} 
	else{
		if(loginType==5){
			loginTel = $("#phoneNumber_1").val();
		}
		else if(loginType==6){
			loginTel = $("#loginTel_1").val();
		}
		
		if (loginTel == "") {
			telShowTips(messageUtil.getMessage("MSG_000002"));
			return;
		}
		
		phoneNumber = loginTel;
		telHideTips();
		
		var password="";
		if(loginType == 6){
			password = $("#password2").val();
			if(password == ""){
				var msg = messageUtil.getMessage("MSG_PAGE_00003");
				msgShowTips(msg);
				return;
			}
		}
		
		msgHideTips();
		loginTel = encryptedString(key, loginTel);
		password = encryptedString(key, password);
		
		
		// 重写登录成功回调函数
		var callback = function(){};
		if(type == "redbagrain"){
			callback = function(){
				loginStatus = "0";// 登录成功后，将状态改为已登录
				if(refereeGetUrl != "" && refereeGetUrl != null && refereeGetUrl != undefined && refereeGetUrl != "null"){
					RedBagRainCommon.getUserLotteryChance(activityId,refereeGetUrl);
				}
				closePopBox();
			};
		}
		else{
			callback = function(){
				msgHideTips();
				closePopBox();
				//订购
				oneKeyOrder();
			};
		}
		login.userLogin(loginTel, loginType, password, oneKeyLoginVariable.messageNew, callback);
	}
}

// 
function showPopBoxNew(index){
	if(index==0 || index==3){
		loginType = 6; 
	}
	var box = $('.pop_inner_new');
	var popClose = $('.pop_close');
	box.hide().eq(index).show();
	$('#popShowNew').popupOpen();
	popClose.on('click', function(){
		$('#popShowNew').hide();
		$('#popShowNew').popupClose();
	});
}

// 
function closePopBoxNew(index){
	$('#popShowNew').hide();
	$('#popShowNew').popupClose();
	
	telHideTips();
	msgHideTips();
	
	//清空浏览器表单缓存
	clearCache();
}

function userLogin(type, callback){
	var loginTel ="";
	
	//如果已经登录了直接返回
	if(loginStatus != 1){ // 全局登录状态
		return;
	}
	
	// 一键登录
	if(loginType == 5){
		if(type == 0){
			loginTel = $("#phoneNumber_0").val();
		}
		else if(type == 1){
			loginTel = $("#phoneNumber_1").val();
		}
	}
	// 验证码登录
	else if(loginType == 6){
		if(type == 0){
			loginTel = $("#loginTel_0").val();
		}
		else if(type == 1){
			loginTel = $("#loginTel_1").val();
		}
	}
	
	if (loginTel == "") {
		telShowTips(messageUtil.getMessage("MSG_000002"));
		return;
	}
	
	if(!loginTel.match(mobileReg)){
		telShowTips(messageUtil.getMessage("MSG_PAGE_00001"));
		return;
	}
	
	phoneNumber = loginTel;
	telHideTips();
	
	var password="";
	if(loginType == 6){
		password = type == 0? $("#password1").val(): $("#password2").val();
		if(password == ""){
			var msg = messageUtil.getMessage("MSG_PAGE_00002");
			msgShowTips(msg);
			return;
		}
	}
	
	msgHideTips();
	loginTel = encryptedString(key, loginTel);
	password = encryptedString(key, password);
	
	login.userLogin(loginTel, loginType, password, oneKeyLoginVariable.messageNew, callback);
	
}

/**
 * 清空浏览器表单缓存
 */
function clearCache(){
	$("#loginTel_0").val("");
	$("#password1").val("");
	$("#loginTel_1").val("");
	$("#password2").val("");
}

/**
 * 输入电话号码错误提示
 * @param msg null无提示
 */ 
function telShowTips(msg){
	$("#telShowTip").empty();
	$("#telShowTip").html(msg);
	$("#telShowTip").show();
	
	$("#telShowTip2").empty();
	$("#telShowTip2").html(msg);
	$("#telShowTip2").show();
}

/**
 *  去除输入电话号码错误提示
 */ 
function telHideTips(){
	$("#telShowTip").empty();
	$("#telShowTip").hide();
	
	$("#telShowTip2").empty();
	$("#telShowTip2").hide();
}

/**
 * 输入验证码错误提示
 * @param msg null无提示
 */
function msgShowTips(msg){
	$("#msgShowTip").empty();
	$("#msgShowTip").html(msg);
	$("#msgShowTip").show();
	
	$("#msgShowTip2").empty();
	$("#msgShowTip2").html(msg);
	$("#msgShowTip2").show();
	
	//一键登录提示
	$("#oneKeyMsgShowTip_0").empty();
	$("#oneKeyMsgShowTip_0").html(msg);
	$("#oneKeyMsgShowTip_0").show();
	
	$("#oneKeyMsgShowTip_1").empty();
	$("#oneKeyMsgShowTip_1").html(msg);
	$("#oneKeyMsgShowTip_1").show();
	
}

/**
 * 去除验证码错误提示
 */
function msgHideTips(){
	$("#msgShowTip").empty();
	$("#msgShowTip").hide();
	
	$("#msgShowTip2").empty();
	$("#msgShowTip2").hide();
	

	$("#oneKeyMsgShowTip_0").empty();
	$("#oneKeyMsgShowTip_0").hide();
	
	$("#oneKeyMsgShowTip_1").empty();
	$("#oneKeyMsgShowTip_1").hide();
}

// 发送验证码
function sendMsg(type){
	
	if(sendFlag){
		return;
	}
	
	// 获取填写的手机号码
	var loginTel = "";
	if(type==0){
	 	loginTel = $("#loginTel_0").val();	
	}
	else if(type==1){
		loginTel = $("#loginTel_1").val();
	}
	
	// 手机号为空
	if (loginTel == "") {
		telShowTips(messageUtil.getMessage("MSG_000002"));
		return;
	}
	
	// 不匹配手机号码规则
	if(!loginTel.match(mobileReg)){
		telShowTips(messageUtil.getMessage("MSG_PAGE_00001"));
		return;
	}
	
	wait=60;
	if(type==1){
		time("#sendMsg1");
	}
	
	// 如果校验成功，发送验证码短信
	telHideTips();
	loginTel = encryptedString(key, loginTel);
	login.sendSmsCode(loginTel, "LOGIN");
}

// 
function showPopBoxLogin(index){
	var box = $('.pop_inner');
	box.hide().eq(index).show();
	$('#popShow').popupOpen();
	
	$('.pop_close').on('click', function(){
		$('#popShow').hide();
		$('#popShow').popupClose();
	});
}

// 
function closePopBox(index){
	$('#popShow').hide();
	$('#popShow').popupClose();
	if(index=="0"){
		telHideTips();
		msgHideTips();
		$("#loginTel").val("");
		$("#password2").val("");
	}
}

// 
function msgBoxShow(msg) {
	$("#msgBoxInfo").html(msg);
	showPopBoxLogin("1");
}

// 登录
function SSOLogin(orderType){
	loginType = 5;
	userLogin(orderType == null || orderType == undefined? 0: orderType);
}




