/**
 * Created by Administrator on 2018/2/12.
 */

/**
 * 跳转页面(模块内局部刷新显示)
 * @param url
 */
function goPartPage(url)
{
	// 以当前URL新建iframe
	var iframe = $("<iframe>");
	iframe.attr('src', url).attr('width', '100%').attr('height', '100%').attr('frameborder', 0);
	// 隐藏旧模块列表，显示内容
	$("#modules").hide();
	$("#pageContent").append(iframe);
	$("#pageContent").show();
	// 返回按钮监听
	$("#pageContent #pageBack").off('click').on('click', function(){
		$("#pageContent").children().not("#pageBack").remove();
		$("#pageContent").hide();
		$("#modules").show();
	});
}

/**
 * 跳转新页面
 * @param url
 */
function goNewPage(url)
{
	window.location.href = url;
}