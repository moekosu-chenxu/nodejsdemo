/*
 * 1：必须先引入jquery插件
 * 2：$.postUnifiedAuth(backUrl,targetId)方式调用
 * 3:backUrl 第三方地址，不带http前缀
 * 4：targetId 第三方目标ID
 * 5：iframeName iframe的name属性值，非iframe跳转则为空
 * 6:ctx 为全局工程名
 */
$.extend({
    postUnifiedAuth:function(backUrl,targetId,iframeName,loginTypeApp){
    	$.ajax({
    		url :ctx+'/gd/auth/queryAuth.ajax',
    		type : "POST",
    		cache : false,
    		data: {"backUrl":backUrl,"targetId":targetId,"oldTime":(new Date()).getTime()},  
    	    dataType:"json",
    		success : function(resp) {
    			if(!resp.isSuccess){
    				if(loginTypeApp != null && loginTypeApp == "4"){
	    				var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"0|appLogin|'+backUrl+'"}}';
	    				gmccapp(repData); 
	    				return;
    				}else{
    					window.location.href=backUrl;
						return;
    				}    
				}
    			var oldTime = resp.oldTime;
    			var form;
    			//掌厅登录标志
    			if(loginTypeApp != null && loginTypeApp == "4"){
    				$.ajax({
    					url :"http://gd.dccp.liuliangjia.cn/acc.html?"+resp.data,
    					type : "post"
    				});
    				var newTime = (new Date()).getTime();
    				if(iframeName == undefined || iframeName == null || iframeName == "" || $("iframe[name='" + iframeName + "']").length != 1){
        				if(newTime-oldTime>20000){
        					var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"0|appLogin|'+backUrl+'"}}';
        					$.ajax({
        						url :"http://gd.dccp.liuliangjia.cn/acc.html?"+repData,
        						type : "post"
        					});
	        				gmccapp(repData);
        				}else{
	        				var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"0|appLogin|'+resp.data+'"}}';
	        				gmccapp(repData);
        				}
        			}else{
        				if(newTime-oldTime>20000){
        					form = $("<form method=\"post\" action='" + backUrl + "' target='" + iframeName + "'></form>");
            				$(document.body).append(form);
            				form.submit();
        				}else{
        					form = $("<form method=\"post\" action='" + resp.data + "' target='" + iframeName + "'></form>");
	        				$(document.body).append(form);
	        				form.submit();
        				}
        			}
    			}
    			else{
    				var newTime = (new Date()).getTime();
    				if(newTime-oldTime>20000){
	    				if(iframeName == undefined || iframeName == null || iframeName == "" || $("iframe[name='" + iframeName + "']").length != 1){
	        				form = $("<form method=\"post\" action="+backUrl+"></form>");
	        			}else{
	        				form = $("<form method=\"post\" action='" + backUrl + "' target='" + iframeName + "'></form>");
	        			}
    				}else{
    					if(iframeName == undefined || iframeName == null || iframeName == "" || $("iframe[name='" + iframeName + "']").length != 1){
	        				form = $("<form method=\"post\" action="+resp.data+"></form>");
	        			}else{
	        				form = $("<form method=\"post\" action='" + resp.data + "' target='" + iframeName + "'></form>");
	        			}
    				}
        			$(document.body).append(form);
        			form.submit();
    			}
    		}
    	});
    }
});