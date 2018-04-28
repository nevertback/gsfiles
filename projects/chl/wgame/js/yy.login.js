(function ($) {
    var $iframe = $('.gamesIframe'),gameUrl = $iframe.data('game');
    var yygame = {
        setBodySize:function () {
            var wh = $(window).height() - 36;
            if(wh<800){
                $('body').css({'overflow-y':'auto','height':'800px'});
            }else{
                $('body').css({'overflow-y':'','height':''});
            }
        },
        setGameSize:function () {
            var $gamearea = $('.gameArea'),
                wh = $(window).height() - 36,
                ww = $(window).width(),$iframe = $('.gamesIframe');
            $gamearea.css({'height':wh,'width':'100%'});

            if(ww<1280){
                $('.gameAreaInfos').removeClass('cur');
                $('html').css('overflow-x','auto');
            }else{
                $('.gameAreaInfos').addClass('cur');
                $('html').css('overflow-x','');
            }
            wh = $(window).height() - 36;
            $gamearea.css({'top':'','height':wh});
            $iframe.css({
                width:wh/5*3+'px',
                height:wh+'px'
            });
        },
        checklogin:function () {
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status === "ok") {
                        //如已登录跳转直接开始游戏
                        $('.QZlogin').removeClass('show');
                        $iframe.attr('src',gameUrl).show();
                        $('.Bot').hide();
                        yygame.setGameSize();
                        $(window).resize(function () {
                            yygame.setGameSize();
                        });
                    }else{
                        $('.QZlogin').addClass('show');
                        yygame.setBodySize();
                        $(window).resize(function () {
                            yygame.setBodySize();
                        });
                    }
                }
            });
        },
        init:function () {
            this.checklogin();
        }
    };
    yygame.init();
})(jQuery);