$(function(){
	// 获取文章分组列表
	getGroup();
});

/**
 * 获取文章分组列表
 */
function getGroup()
{
	$.ajax({
		url: 'localhost:8012/moekosu/blog/groupList',
		async: false,
		type: 'POST',
		data: {

		},
		success: function(jsonData){
			var resp = eval ("(" + jsonData + ")");
			if(resp.isSuccess){
				set2Group(resp.data);
			}
			else{
				set2Group(null);
			}
		},
		error: function(err){
			set2Group(null);
		},
		complete: function(){
			// 结束loading动画
			load.endLoading();
		}
	});
}
/**
 * 设置文章分组列表
 * @param data 分组数据
 */
function set2Group(data)
{
	if(data == null){
		console.log('getGroup() error');
		return;
	}
	if(data.length > 0){
		var html = "";
		$.each(data, function(index, o){
			html = "<option groupId='"+ o.groupId +"'>"+ o.groupName +"</option>";
		});
		$("#groupList").append(html);
	}
}

/**
 * 打开文章详情页面
 * @param obj
 * @param essayId
 */
function openDetail(obj, essayId)
{

}