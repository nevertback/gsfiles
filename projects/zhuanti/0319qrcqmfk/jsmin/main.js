(function($){
    function popClose() {
        $('.yyPop').removeClass('cur');
    }
    $('.yyBtn').on('click',function () {
        $('.yyPop').addClass('cur');
    });
    $('.yyPopClose').on('click',function () {
        popClose();
    });
    function verifIpt(iptcon,cate) {
        var bValidate;
        if(cate === 'qq'){
            bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
        }else if(cate === 'telephone'){
            bValidate = RegExp(/^1\d{10}$/).test(iptcon);
        }else if(cate === 'email'){
            bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
        }
        return bValidate;
    }
    $('.yys-btn').on('click',function () {
        $('.yys-btn').removeClass('cur');
        $(this).addClass('cur');
    });
    $('#yySmt').on('click',function () {
        var $ipt = $('#yyIpt'),ztDir = 'qrcqmfk';
        var Folder = 'zhuanti/'+ztDir+'/',fname = 'infos',
            cookiefname = cookie(ztDir),
            userCon = $('.yys-btn.cur').attr('data-type'),
            userNum = $ipt.val();
        if(typeof userCon === 'undefined'){
            alert("请选择您的手机系统！");
            return;

        }
        if (cookiefname !== null && cookiefname === userNum) {
            alert("您已经提交过了！");
            return;
        }
        if (verifIpt(userNum,'telephone') === false) {
            alert("请输入有效的手机号码！");
            return;
        }
        var content = "---手机号码：" + userNum + "---系统：" + userCon + "---";
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://www3.gamersky.com:81/cfile.asp",
            data: {
                Submit: "Submit",
                Folder:Folder,
                Fname: fname,
                Content: content
            },
            success: function(Jsons) {}
        });
        cookie(ztDir, userNum, {
            path: '/'
        });
        alert("提交完成！");
        popClose();
        $ipt.val('');
    });
})(jQuery);