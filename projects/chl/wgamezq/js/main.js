(function ($) {
    var $start = $('.startGameBtn'),$href = $start.data('href');
    $.ajax({
        type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
        success: function (responseJson) {
            if (responseJson.status === "ok") {
                $start.addClass('cur');
            }
        }
    });
    $start.on('click',function () {
        $.ajax({
            type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
            success: function (responseJson) {
                if (responseJson.status === "ok") {
                    //如已登录跳转直接开始游戏
                    window.location.href = $href;
                }else{
                    $('.gsZpPopLoginClose,.gs_zp_pop_login').show();
                    $(document).on('click','.gsZpPopLoginClose',function () {
                        $('.gsZpPop').hide();
                    })
                }
            }
        });
    });
})(jQuery);