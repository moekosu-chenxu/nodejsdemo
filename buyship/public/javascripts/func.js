/**
 * Created by Administrator on 2018/2/12.
 */

/**
 * 跳转页面(模块内局部刷新显示)
 * @param url
 */
function goPartPage(o, url, backUrl)
{
	// 加载loading动画
	load.startLoading();
	// 切入iframe
	openNewFrame(url, backUrl);
}

/**
 * 跳转新页面
 * @param url
 */
function goNewPage(url)
{
	window.location.href = url;
}

/**
 * 打开新iframe
 */
function openNewFrame(url, backUrl)
{
	// 以当前URL新建iframe
	var iframe = $("<iframe>");
	iframe.attr('src', url).attr('width', '100%').attr('height', '100%').attr('frameborder', 0);
	// 如果已经存在iframe，则先删除
	if($("#pageContent iframe").length > 0){
		$("#pageContent iframe").remove();
	}
	// 隐藏旧模块列表，显示内容
	$("#modules").hide();
	$("#pageContent").append(iframe);
	$("#pageContent").show();
	// 返回按钮事件
	goBack(backUrl, "/");
}

/**
 * 返回按钮
 * @param url 返回链接
 * @param backUrl
 */
function goBack(url, backUrl)
{
	// 返回按钮监听
	$("#pageContent #pageBack").off('click').on('click', function(){
		if(url == "/"){
			$("#pageContent").children().not("#pageBack").remove();
			$("#pageContent").hide();
			$("#modules").show();
		}
		else{
			openNewFrame(url, backUrl);
		}
	});
}


