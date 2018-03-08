(function ($) {
    $.extend({
        componentLoginPop:function (baseRem) {
            if(typeof JSON2 === 'undefined'){
                $.getScript('http://j.gamersky.com/g/lib/jquerys/jquery.json2.js');
            }
            var comCss = 'http://j.gamersky.com/wap/component/loginpop/login.wap.pop.r720.css',
                comLink = '<link rel="stylesheet" href="'+comCss+'" >';
            if(baseRem === 640){
                comLink += '<link rel="stylesheet" href="http://j.gamersky.com/wap/component/loginpop/login.wap.pop.r640.css" >';
            }
            $('head').append(comLink);
            var isTrim = function (s) { return !s.replace(/(^\s*)|(\s*$)/g, ""); }; //清除空格
            var getUrlParam = function (name, values) {
                var hash = window.location.hash;
                if (!isTrim(hash)) {
                    hash = hash.replace("#", "");
                    if (!isTrim(hash)) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                        var r = hash.match(reg);
                        if (r != null) return unescape(r[2]); return values;
                    }
                }
                return values;
            };
            var QZbgHtm='<div class="gs_zp_pop_msk gsZpPop gsZpPopLoginClose" style="display: none;"></div>';
            QZbgHtm+='<div class="gs_zp_pop gs_zp_pop_login gsZpPop" style="display: none;">';
            QZbgHtm+='<div class="gs_head">登录后参与互动</div>';
            QZbgHtm+='<div class="gs_body">';
            QZbgHtm+='<div class="User-login">';
            QZbgHtm+='<div class="Ul-bd">';
            QZbgHtm+='<form class="Ul-form" method="post">';
            QZbgHtm+='<div class="Ul-input Ul-input-t">';
            QZbgHtm+='<span class="Ul-user"></span>';
            QZbgHtm+='<input name="userName" type="text" class="Ul-userName ui-passport-userName" maxlength="35" placeholder="用户名" oninput="" />';
            QZbgHtm+='<a href="javascript:;" class="UI-ipt-btn-clear"></a>';
            QZbgHtm+='</div>';
            QZbgHtm+='<div class="Ul-input Ul-input-b">';
            QZbgHtm+='<span class="Ul-pwd"></span>';
            QZbgHtm+='<input id="pswdd" name="password" type="password" class="Ul-password ui-passport-password" maxlength="35" placeholder="密码" />';
            QZbgHtm+='<a href="javascript:;" class="UI-ipt-btn-showpsw">显示密码</a>';<!--onclick="if($('#pswdd').attr('type') == 'password'){$('#pswdd')[0].type = 'text'}else{$('#pswdd')[0].type = 'password'}"-->
            QZbgHtm+='</div>';
            QZbgHtm+='<div class="Ul-btn"><a class="Ul-button ui-passport-login-button" href="javascript:;">登 录</a></div>';
            QZbgHtm+='<div class="Ul-chk">';
            QZbgHtm+='<a href="http://i.gamersky.com/user/register" target="_blank" class="Ul-link Ul-link-b">新用户注册</a>';
            QZbgHtm+='<a href="http://i.gamersky.com/user/getpassword" target="_blank" class="Ul-link">忘记密码</a>';
            QZbgHtm+='</div>';
            QZbgHtm+='<div class="UI-st">';
            QZbgHtm+='<div class="UI-st-line"></div>';
            QZbgHtm+='<span>使用第三方登录</span>';
            QZbgHtm+='<div class="UI-st-line"></div>';
            QZbgHtm+='</div>';
            QZbgHtm+='<div class="Ul-st-btn">';
            QZbgHtm+='<a class="Ul-qq" href="javascript:;"><i title="qq登录" id="qqLogin"></i></a>';
            QZbgHtm+='<a class="Ul-wx" href="javascript:;"><i title="微信登录" id="wxLogin"></i></a>';
            QZbgHtm+='<a class="Ul-sina" href="javascript:;"><i title="新浪账户登录" id="sinaLogin"></i></a>';
            QZbgHtm+='</div>';
            QZbgHtm+='</form>';
            QZbgHtm+='</div>';
            QZbgHtm+='</div>';
            QZbgHtm+='</div>';
            QZbgHtm+='</div>';

            var QZbgHtm1 = '<div class="gs_zp_pop_msk gsZpPop gsZpPopDelClose" style="display: none;"></div>';
            QZbgHtm1 += '<div class="gs_zp_pop gs_zp_pop_del gsZpPop" style="display: none;">';
            QZbgHtm1+='<div class="gs_head">提示</div>';
            QZbgHtm1+='<div class="gs_body">';
            QZbgHtm1+='<div class="gs_txt">是否确认删除本条评论？</div>';
            QZbgHtm1+='<div class="gs_btns">';
            QZbgHtm1+=' <a class="cancel">取消</a>';
            QZbgHtm1+=' <a class="confirm">确认</a>';
            QZbgHtm1+='</div>';
            QZbgHtm1+='</div>';
            QZbgHtm1+='</div>';

            if($('.gsZpPop').length < 1 ){
                $('body').append(QZbgHtm + QZbgHtm1);
            }
            $.ajax({
                dataType:'Script',
                url:'http://j.gamersky.com/wap/js/new/QZnav_Wap_Login.js',
                cache:true
            });
        }
    });
})(jQuery);