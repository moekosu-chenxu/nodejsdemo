function showPopBox(index){
	var box = $('.pop_inner');
	var popClose = $('.pop_close');
	box.hide().eq(index).show();
	$('#popShow').popupOpen();
	popClose.click(function(){
		$('#popShow').hide();
		$('#popShow').popupClose();
	});
}
		
function closePopBox(index){
	$('#popShow').hide();
	$('#popShow').popupClose();
}
		
function showShare(index){
	$('.fenxianflow').show();
	$('#popShow').hide();
	$('#popShow').popupClose();
}
		
$(document).ready(function() {
	$('.fenxianflow').click(function(){
		$(this).hide();
	});
})

function go(){
        	$(".btn1").addClass("btn_ani");
			setTimeout('randompop()',1000);
			setTimeout('$(".btn1").removeClass("btn_ani")',2000);
		}  


function randompop(){
	var poprandom = showPopBox; //引用showPopBox函数
	var popnum = Math.round(Math.random());
	poprandom(popnum);
}

