$(function () {
    initRegListener();
})

function initRegListener() {
    // 提交注册按钮可否点击
    $("#agreement").on('change', function () {
       if($(this).is(':checked')){
           $('#submitReg').addClass('canSubmit');
       }
       else{
           $('#submitReg').removeClass('canSubmit');
       }
    });
}