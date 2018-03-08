(function($){
    var dnf = {
        verifIpt:function (iptcon,cate) {
            var bValidate;
            if(cate === 'qq'){
                bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
            }else if(cate === 'telephone'){
                bValidate = RegExp(/^1\d{10}$/).test(iptcon);
            }else if(cate === 'email'){
                bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
            }
            return bValidate;
        },
        lyFunc:function () {
            var conId = $('#dnfTxt'),
                iptId = $('#dnfQQ'),
                conPl = conId.data('placeholder'),
                colorTxt = '#707070',colorTxtF = '#222';
            conId.val(conPl).css('color',colorTxt);
            conId.on({
                'focus':function () {
                    if(conId.val() === conPl){
                        conId.removeClass('errorClass');
                        conId.val('').css('color',colorTxtF);
                    }
                },
                'blur':function () {
                    if(conId.val() === '' || $.trim(conId.val()) === '' || conId.val() === conPl){
                        conId.addClass('errorClass');
                        conId.val(conPl).css('color',colorTxt);
                    }
                }
            });
            $('#dnfBtn').on('click', function() {
                var Ml = 'dnff1',Folder = 'match/'+Ml+'/',fname = 'infos',
                    cookiefname = cookie(Ml),
                    userCon = conId.val(),
                    userNum = iptId.val(),isuser = false;
                if (cookiefname !== null && cookiefname === userNum) {
                    alert("您已经提交过了！");
                    return;
                }
                $('.insertIpt').each(function () {
                    var $this = $(this),pla = $this.data('placeholder');
                    if ($this.val() === pla) {
                        $this.addClass('errorClass');
                        isuser = true;
                    }
                });
                if(isuser === true){
                    alert("说出你的期望和愿景吧");
                    return;
                }
                if (dnf.verifIpt(userNum,'qq') === false) {
                    alert("请输入有效的qq！");
                    return;
                }
                var content = "---qq：" + userNum + "---愿望：" + userCon + "---";
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
                cookie(Ml, userNum, {
                    path: '/'
                });
                alert("提交完成！");
                conId.val(conId.data('placeholder')).css('color',colorTxt);
                iptId.val('');
            });
        },
        init:function () {
            this.lyFunc();
        }
    };
    dnf.init();
})(jQuery);