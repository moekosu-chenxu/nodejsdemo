
/**
 * 监听器
 */
function initListener()
{
	// 视频开始播放
	$("#video1").on('play', function(){
		// 新增视频日志
		if(isNewVideoLog && myVideo.currentSrc != "" && currSelectdVideoId != undefined){
			Common.pageVisitLog("VIDEO", currSelectdVideoId, myVideo.currentSrc, new Date(), channelId, "", "YTYP", "A", "", function(jsonData){
				if(jsonData != null && jsonData.retCode == 0){
					currVideoLogId = jsonData.visitLogId; 
				}
			}, 0, 0);
			isNewVideoLog = false;
		}
		// 切换码率播放
		if(isReloadKbps){
			// 延迟0.3秒，获取被浏览器截留的上次播放时间
			setTimeout(function(){
				lastVideoLen = lastVideoLen + getVideoPlayLen();
			}, 300);
			isReloadKbps = false;
		}
	});
	// 暂停或播放完成
	$("#video1").on('pause ended', function(){
		// 计算播放时长
		var playLen = getVideoPlayLen();
		playLen = Math.ceil(playLen);
		// 记录日志
		if(currVideoLogId != "" && playLen > 0){
			Common.pageVisitLog("VIDEO", currSelectdVideoId, myVideo.currentSrc, null, channelId, "", "YTYP", "U", currVideoLogId, null, 0, playLen);
		}
	});
	// 关闭页面记录视频播放时长
	$(window).on('beforeunload', function(event){
		// 更新特定页面日志
		if(currSpecialId != ""){
			Common.pageVisitLog("SPECIAL", contentId, location.href, null, channelId, "", "YTYP", "U", currSpecialId, null, "", visitLen);
		}
	});
}

/**
 * 查询广告
 * @param adClmnId
 * @param succCallBack
 */
function queryAdClmnAd(adClmnId, succCallBack) {
	wx.request({
    url: ctx + "/ad/queryAd.ajax" ,
		dataType : "json",
		method : "POST",
		data:{
      // "version": "1.0",
      // "portalType": "WAP",
      // "portalId": "100",
      // "reqTime": "2016-04-08 18:39:00",
      // "transactionId": "20160408183900000001",
      // "sign": "ETSZD4361xdryq",
      // "funcCode": "getActivityDetail",
      // "activityId": "ACT20171221317691980"
      "adClmnId": adClmnId
		},
		success:function(resp){
			if (!resp.isSuccess) {
				return;
			}
			var jsonData = eval('(' + resp.data + ')');
			succCallBack.call(this,jsonData, adClmnId);
		}
	});
};

/**
 * 视频下方广告
 * @param jsonData 广告列表
 * @param adClmnId 广告栏id
 */
function cctvCallback(jsonData, adClmnId)
{
	// 获取数据成功
	if(jsonData != null && jsonData.retCode == 0){
		// 广告列表
		var ads = jsonData.ads;
		if(ads != null && ads.length >0 && ads[0] != null){
			// 只取一个广告
			var ad = ads[0];
			var adId = ad.adId;
			var name = ad.adName;
			var link = ad.adUrl;
			// 配置cctv广告位
			$("#videoAd").empty().text(name);
			$("#videoAd").off('click').on('click', function(){
				goUrl(link, "ADVERT", adId, "", adClmnId, "YTYP", true);
			});
		}
	}
}
/**
 * 精选推荐广告
 * @param jsonData 广告列表
 * @param adClmnId 广告栏id
 */
function selectedCallback(jsonData, adClmnId)
{
	// 获取数据成功
	if(jsonData != null && jsonData.retCode == 0){
		var ads = jsonData.ads;
		// 遍历广告列表
		if(ads != null && ads.length >0){
			var html = '';
			for(var i=0; i< ads.length; i++){
				// 广告参数
				var ad = ads[i];
				var adId = ad.adId;
				var pic = ad.adPicUrl;
				var title = ad.adName;
				var link = ad.adUrl;
				// 拼接多个广告
				html += '<div class="swiper-slide">';
				html += '<img src="'+pic+'" onClick="goUrl(\''+link+'\', \'ADVERT\', \''+adId+'\', \'\', \''+adClmnId+'\', \'YTYP\', \'true\')" />';
				html += '<p>'+title+'</p>';
				html += '</div>';
			}
			$("#selectedAd").html(html);
			$("#selectedDiv").show();
			// 广告轮播
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 5000,//可选选项，自动滑动
				autoHeight: true,
				pagination : '.swiper-pagination',
			});
		}
	}
}
/**
 * 流量特惠广告
 * @param jsonData 广告列表
 * @param adClmnId 广告栏id
 */
function flowCallback(jsonData, adClmnId)
{
	// 获取数据成功
	if(jsonData != null && jsonData.retCode == 0){
		var ads = jsonData.ads;
		if(ads != null && ads.length >0){
			var html = "";
			// 遍历广告列表
			for(var i=0; i< ads.length; i++){
				var ad = ads[i];
				var adId = ad.adId;
				var pic = ad.adPicUrl;
				var title = ad.adName;
				var link = ad.adUrl;
				// 拼接多个广告
				html += '<div class="benefit-item">';
				html += '<img src="'+pic+'" onClick="goUrl(\''+link+'\', \'ADVERT\', \''+adId+'\', \'\', \''+adClmnId+'\', \'YTYP\', \'true\')" />';
				html += '<p>'+title+'</p>';
				html += '</div>';
			}
			$("#flowAd").html(html);
			$("#flowDiv").show();
		}
	}
}
/**
 * 底部下载广告
 * @param jsonData 广告列表
 * @param adClmnId 广告栏id
 */
function downloadCallback(jsonData, adClmnId)
{
	// 获取数据成功
	if(jsonData != null && jsonData.retCode == 0){
		var ads = jsonData.ads;
		if(ads != null && ads.length >0){
			// 获取广告
			var ad = ads[0];
			var adId = ad.adId;
			var pic = ad.adPicUrl;
			var link = ad.adUrl;
			// 拼接
			var html = '<img src="'+pic+'"/>';
			$("#downloadAd").html(html);
			$("#downloadAd").show();
			$("#downloadAd").off('click').on('click', function(){
				goUrl(link, "ADVERT", adId, "", adClmnId, "YTYP", true);
			});
		}
	}
}

/**
 * 获取视频内容
 */
function queryVideoContent()
{
	$.ajax({
		url : ctx + "/content/queryDayContentList.ajax",
		dataType : "json",
		type : "post",
		cache : false,
		data:{
		},
		success: function(resp){
			if (!resp.isSuccess) {
				return;
			}
			var jsonData = eval('(' + resp.data + ')');
			setVideoContent(jsonData);
		},
		complete: function(){
			
		}
	});
}

/**
 * 设置视频内容
 * @param content
 */
function setVideoContent(content)
{
	if(content != null && content.retCode == 0){
		var video = content.videoDetail;
		// 视频
		contentId = content.contentId;
		$("#videoTitle").empty().text(content.contentTitle);
		$("#videoDesc").empty().text(content.contentDesc);
		$("#video1").attr('poster', content.videoPicPath);
		// 明日预告
		$("#tomorrowTitle").empty().text(content.nextContentTitle);
		$("#tomorrowView").off('click').on('click', function(){
			goUrl(content.nextContentLink, "", "", "", "", "", false);
		});
		// 分辨率
		var option = "";
		for(var i=0; i< video.length; i++){
			if(video[i].videoLinkType == 0){
				option += "<option value='0' vid='"+video[i].videoId+"' link='"+video[i].videoLink+"'>标清</option>"; 
			}
			if(video[i].videoLinkType == 1){
				option += "<option value='1' vid='"+video[i].videoId+"' link='"+video[i].videoLink+"'>高清</option>"; 
			}
		}
		$("#videoDefinition").html(option);
		// 默认选中第一个
		$("#videoDefinition option").eq(0).attr('selected', 'selected');
		currSelectdVideoId = $("#videoDefinition option").eq(0).attr('vid');
		// 加载视频
		reloadVideo();
		// 视频切换清晰度
		$("#videoDefinition").off('change').on('change', function(){
			reloadVideo();
			isReloadKbps = true;
		});
		// 加载完成，记录一条日志
		Common.pageVisitLog("SPECIAL", contentId, location.href, new Date(), channelId, "", "YTYP", "A", "", function(jsonData){
			if(jsonData != null && jsonData.retCode == 0){
				currSpecialId = jsonData.visitLogId;
			}
		}, "");
	}
}

/**
 * 重新加载视频
 */
function reloadVideo()
{
	if(myVideo.readyState != 0){
		myVideo.pause();
	}
	$("#video1").attr('src', $("#videoDefinition").find('option:selected').attr('link'));
	currSelectdVideoId = $("#videoDefinition").find('option:selected').attr('vid');
	try{
		myVideo.load();
	}catch(err){
		$("#loadVideoFail").show();
	}
	isNewVideoLog = true;
}

/**
 * 跳转链接（包含日志）
 * @param url 跳转链接
 * @param pageType 日志类型
 * @param pageId 日志id
 * @param clmnId 栏目id
 * @param reserver1 额外字段1
 * @param reserver2 额外字段2
 */
function goUrl(url, pageType, pageId, clmnId, reserver1, reserver2, isLog)
{
	// 处理无效链接
	if(url == '' || url == null || url == 'http://'){
		return;
	}
	// 记录日志
	if(isLog){
		if(pageType == "ADVERT"){
			reserver2 = "YTYP_" + contentId;
		}
		Common.pageVisitLog(pageType, pageId, url, new Date(), channelId, clmnId, reserver1, "A", "", null, reserver2);
	}
	// 视频还在播放
	if(!myVideo.paused){
		myVideo.pause();
	}
	// 更新特定页面日志
	if(currSpecialId != ""){
		Common.pageVisitLog("SPECIAL", contentId, location.href, null, channelId, "", "YTYP", "U", currSpecialId, null, "", visitLen);
	}
	
	// 跳转
	skipAppAdUrl(url, "");
}


/**
 * 跳转新窗口，匹配掌厅APP、独立链接、iframe被嵌入链接
 * @param longUrl
 * @param ssoTagetId
 */
function skipAppAdUrl(longUrl, ssoTagetId){
	// 保存滚动位置
    sessionStorage.setItem("offsetTop", $(window).scrollTop());
    // 如果是广东掌厅app登录
    if(loginTypeStatus && loginTypeStatus=="4")
    {
    	if(top.location != location){
    		parent.skipAdUrlSun(longUrl, ssoTagetId);
    		return;
    	}
    	else{
    		if(loginStatus!="1" &&  "wap" == ssoTagetId){
    			var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"2|wap|'+longUrl+'"}}';
    			gmccapp(repData);
    		}else if(loginStatus!="1" && "gmccapp" == ssoTagetId){
    			var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"2|gmccapp|'+longUrl+'"}}';
    			gmccapp(repData);
    		}else if(loginStatus!="1"&& ssoTagetId!=null && ssoTagetId!="" && ssoTagetId!="undefined"){
    			$.postUnifiedAuth(longUrl, ssoTagetId, null, "4");
    		}else{
    			var repData = '{"servicename":"GMCCJS_000_000_000_001","reqData":{"code":"GMCCAPP_003_004","id":"0|appLogin|'+longUrl+'"}}';
    			gmccapp(repData);
    		}
    		return;
    	}
	}
    // 非掌厅登录
	if(loginStatus!="1" && ssoTagetId!=null && ssoTagetId!="" && ssoTagetId!="undefined" && ssoTagetId != "wap" && ssoTagetId != "gmccapp"){
		$.postUnifiedAuth(longUrl, ssoTagetId);
	}
	else{
		top.location.href = longUrl;
	}
}

/**
 * 获取视频实际播放时长
 * @returns {Number}
 */
function getVideoPlayLen()
{
	var playLen = 0;
	for(var i=0; i< myVideo.played.length; i++){
		playLen += Number(myVideo.played.end(i)) - Number(myVideo.played.start(i));
	}
	playLen = playLen - lastVideoLen;
	return playLen;
}

/**
 * 微信分享
 * @param activityName
 * @param activitySlogan
 * @param link
 */
function shareWx(title, content, link, sharePicPath){
	weixinShare.errPopBox=function(msg){
//		msgBoxShow(msg);
	};
	var succCallback=function(res){};
	var failCallback=function(res){};
	var triggerCallback=function(res){};
	var cancelCallback=function(res){};
	weixinShare.init();
	var config={
		title : title,
		desc : content,
		link : link,
		imgUrl : sharePicPath,
		type : "",
		dataUrl : ""
	};
	weixinShare.ready(config,succCallback,failCallback,triggerCallback,cancelCallback);	
}

/**
 * 重写弹框方法覆盖，防止弹框
 */
function showPopBoxNew()
{
}



module.exports = {
  initListener : initListener,
  queryAdClmnAd : queryAdClmnAd,
  cctvCallback :cctvCallback,
  selectedCallback : selectedCallback,
  flowCallback : flowCallback,
  downloadCallback : downloadCallback
}