(function ($) {
    $.fn.addLinkCount = function (cid) {
        this.attr('data-itemid',cid).addClass('countHit countHitSql');
    };
    //判断是否是首页
    if($('#adscontainer_banner_new_top_index_1060_1').length>0){
        //1041964#a链接点击统计-幻灯下三图
        $('.Mid1L_img').find('a').each(function () {
            $(this).addLinkCount(1041964);
        });
        //1041971#a链接点击统计-最新单机游戏
        $('.Mid1R_down,.down_img').find('a').each(function () {
            $(this).addLinkCount(1041971);
        });
        //1041973#a链接点击统计-独家策划
        $('.Mid1R_txt,.Mid1Rpic').find('a').each(function () {
            $(this).addLinkCount(1041973);
        });
        //1041974#a链接点击统计-未来期待大作 加入INC：新——未来期待大作
        //1041975#a链接点击统计-8图1
        var $batuDiv = $('.Mid2Rpic');
        $batuDiv.eq(0).find('a').each(function () {
            $(this).addLinkCount(1041975);
        });
        //1041976#a链接点击统计-8图2
        $batuDiv.eq(1).find('a').each(function () {
            $(this).addLinkCount(1041976);
        });
        //1041977#a链接点击统计-8图3
        $batuDiv.eq(2).find('a').each(function () {
            $(this).addLinkCount(1041977);
        });
    }
    //判断内容页
    if($('.Mid2L_con').length>0){
        //1041978#a链接点击统计-休闲娱乐
        $('.MidRImgTxt').find('a').each(function () {
            $(this).addLinkCount(1041978);
        });
        //1041979#a链接点击统计-热点资讯
        $('.MidRtxt').eq(0).find('a').each(function () {
            $(this).addLinkCount(1041979);
        });
        //1041980#a链接点击统计-单机游戏下载
        $('.MidRtxt:eq(1),.MidRimg').find('a').each(function () {
            $(this).addLinkCount(1041980);
        });
        //1041981#a链接点击统计-精彩专栏
        $('.MidRPicTxt').find('a').each(function () {
            $(this).addLinkCount(1041981);
        });

        //判断是否是攻略内容页
        if(location.href.indexOf('/handbook/')>0){
            //1041982#a链接点击统计-攻略集
            $('.gs_strategy_collect').find('a').each(function () {
                $(this).addLinkCount(1041982);
            });
            //1041983#a链接点击统计-单机游戏下载
            $('.MidRtxt:eq(0),.MidRimg:eq(0)').find('a').each(function () {
                $(this).addLinkCount(1041983);
            });
            //1041984#a链接点击统计-休闲娱乐
            $('.MidRImgTxt').find('a').each(function () {
                $(this).addLinkCount(1041984);
            });
            //1041985#a链接点击统计-热点资讯
            $('.MidRtxt:eq(1)').find('a').each(function () {
                $(this).addLinkCount(1041985);
            });
        }
    }
})(jQuery);