layer.config({
	type: 1, 
	area: '100%',
	title: false,
	anim: 5,
	isOutAnim: false,
	shade: [0.9, '#000'],
	offset:0,
	shadeClose:true,
});

function favorite(){
	layer.open({
		type: 1, 
		area: '100%',
		content: $('#favorite'),
	});
};
$(document).ready(function(){
  $("#favorite").click(function(){
	layer.closeAll();
  });
});
