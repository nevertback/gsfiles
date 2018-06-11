(function($){
    var h5Fnc = {
        login:function(){
            var $headLogin = $('.h5HeadLogin'),btnDom = '';
            btnDom += '<a class="h5-btn h5-btn-login h5Login">登录</a><a class="h5-btn h5-btn-register" href="http://i.gamersky.com/user/register/">注册</a>';
            $headLogin.html(btnDom);
            $(document).on('click','.h5Login',function () {
                $(".gsZpPopLoginClose").show();
                $(".gs_zp_pop_login").show();
                $('.gsZpPopLoginClose').on('click', function () {
                    $(".gs_zp_pop_login").hide();
                    $(".gsZpPopLoginClose").hide();
                })
            })
        },
        isLogin:function(){
            var _this = this;
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status === "ok") {
                        var backName = responseJson.username,
                            backFace = responseJson.userface.replace(/http:\/\//g,'//'),
                            $headLogin = $('.h5HeadLogin'),
                            btnDom = '';
                        btnDom += '<img class="h5-head-face" src="'+backFace+'" alt="backName">';
                        btnDom += '<div class="h5-head-name">'+backName+'</div>';
                        btnDom += '<a class="h5-btn h5-btn-login-out h5LoginOut">退出</a>';
                        $headLogin.html(btnDom);
                    }else{
                        _this.login();
                    }
                }
            });
        },
        swp:function(){
            var $swp = $('.h5Swp'),$page = $swp.find('.swiper-pagination');
            var swp = new Swiper($swp,{
                loop: !0,
                pagination: $page,
                autoplay: 3e3,
                autoplayDisableOnInteraction: !1
            });
        },
        announce:function(){
            var $announce = $('.h5Announce');
            var swpList = new Swiper($announce,{
                direction : 'vertical',
                loop: !0,
                autoplay: 2e3,
                autoplayDisableOnInteraction: !1
            });
        },
        init:function () {
            var _this = this,$main = $('.h5Main'),pos = $main.data('pos');
            $('.h5Nav-'+pos).addClass('cur');
            _this.isLogin();
            if(pos === 'index'){
                _this.swp();
                _this.announce();
            }
        }
    };
    h5Fnc.init();
})(jQuery);