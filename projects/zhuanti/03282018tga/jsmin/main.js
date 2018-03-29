(function($){
    $(function(){
        srollbox('.memorabilia-part');
    });
    //轮播
    function srollbox(obj){
        var _num=0,_len=$(obj).length,_width=$(obj).outerWidth(true);
        $(obj).parent().css('width',''+(_width*_len)+'px');
        $('.memorabilia-nav li').mouseenter(function(){
            var _this = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $(obj).parent().stop(true,true).animate({'left':'-'+(_width*_this)+'px'},300);
        });
    }
    function gsTab(tar,nav,con) {
        var $nav = tar.find(nav),$con = tar.find(con),tabTimer;
        $nav.find('a').on({
            mouseover:function () {
                var $ts = $(this),idx = $ts.index();
                tabTimer = setTimeout(function () {
                    $nav.find('a').removeClass('cur').eq(idx).addClass('cur');
                    $con.find('.item').removeClass('cur').eq(idx).addClass('cur');
                },120);
            },
            mouseout:function () {
                clearTimeout(tabTimer);
            }
        });
    }
    gsTab($('.scheduleBox'),'.scheduleBoxNav','.scheduleBoxNavCon');
})(jQuery);