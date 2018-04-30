(function ($) {
    var $iframe = $('.gamesIframe'),gameUrl = $iframe.data('game');
    var yygame = {
        checklogin:function () {
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status === "ok") {
                        //如已登录跳转直接开始游戏
                        $iframe.attr('src',gameUrl).show();
                    }else{
                        $(".gsZpPopLoginClose").show();
                        $(".gs_zp_pop_login").show();
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