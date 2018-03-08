(function ($) {
    var u = navigator.userAgent,
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    function gsCountAnalysis(jcsrc) {
        var gscaDom = '';
        gscaDom = '<div style="display:none"><img src="'+jcsrc+'"></div>';
        return gscaDom;
    }
    function createTg(tgval) {
        var tgDom = '';
        tgDom = '<span style="display:block;position:absolute;right:.1rem;top:.1rem;padding:0;width:.5rem;height:.25rem;line-height:.25rem;background-color:rgba(0,0,0,.1);border:1px solid rgba(255,255,255,.2);font-size:.2rem;color:rgba(255,255,255,.2);text-align:center;">'+tgval[0]+'</span>';
        return tgDom;
    }
    function createTg2(tgval) {
        var tgDom = '';
        tgDom = '<span style="display:block;position:absolute;left:.1rem;bottom:.1rem;padding:0;width:.5rem;height:.25rem;line-height:.25rem;background-color:rgba(0,0,0,.1);border:1px solid rgba(255,255,255,.2);font-size:.2rem;color:rgba(255,255,255,.2);text-align:center">'+tgval+'</span>';
        return tgDom;
    }
    gsIncomeWap.prototype.gsCountSiteInner = function(gsid) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://click.gamersky.com/Common/GetWapHits.aspx",
            data: {
                id: gsid,
                script: "3"
            },
            success: function (data) {}
        });
    };
    function gsIncomeWap() {}
    gsIncomeWap.prototype.base=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += createTg2(options.tg);
        }
        tgDom += '<div style="position: relative;width: 100%;"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a>'+jcCodeDom+'</div>';
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.fixedBot=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += createTg(options.tg);
        }
        var sty1 = 'position: fixed;bottom: 0;left: 0;z-index: 99992;width: 100%;height: auto;box-shadow: 0 0 8px rgba(0,0,0,.5);',
            sty2 = 'position: absolute;top: 0;right: 0;width: 35px;height: 36px;background:url(http://image.gamersky.com/webimg13/wap/2016/icons-adsclose.png) 0 0 no-repeat;background-size: 35px 36px;';
        tgDom += '<div style="'+sty1+'" id="ymwAdBottom2017"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a><a style="'+sty2+'" onClick="this.parentNode.parentNode.removeChild(this.parentNode);"></a>'+jcCodeDom+'</div>';

        function sbUc() {
            var $fad = $('#ymwAdBottom2017'),fadW = $fad.width(),fadH = $fad.height(),ww = $(window).width();
            if (fadW/fadH <= 4/3) {
                $fad.hide();
            }
            if(ww>720){
                ww = 720;
            }
            $fad.css({
                'width':ww + 'px',
                'left':'50%',
                'marginLeft': - ww/2 + 'px'
            });
        }

        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            function timeoutad() {
                var t;
                t= setTimeout(sbUc, 100);
            }
            timeoutad();
            $(window).resize(sbUc).scroll(sbUc).trigger("scroll");
            $('body').append(tgDom);
        };
    };
    gsIncomeWap.prototype.fixedTop=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += createTg2(options.tg);
        }
        var sty1 = 'position: fixed;top: 0;left: 0;z-index: 99992;width: 100%;height: auto;box-shadow: 0 0 8px rgba(0,0,0,.5);',
            sty2 = 'position: absolute;top: 0;right: 0;width: 35px;height: 36px;background:url(http://image.gamersky.com/webimg13/wap/2016/icons-adsclose.png) 0 0 no-repeat;background-size: 35px 36px;';
        tgDom += '<div id="gsIncomeWapfixedTopHolder" style="width: 100%;height: auto;"><img style="display: block;width: 100%;" src="' + tgImg + '"/></div><div style="'+sty1+'" id="gsIncomeWapfixedTop"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a><a style="'+sty2+'" id="gsIncomeWapfixedTopClose"></a>'+jcCodeDom+'</div>';

        function sbUc() {
            var $fad = $('#gsIncomeWapfixedTop'),fadW = $fad.width(),fadH = $fad.height(),ww = $(window).width();
            if (fadW/fadH <= 4/3) {
                $fad.hide();
            }
            // if(ww>720){
            //     ww = 720;
            // }
            $fad.css({
                'width':ww + 'px',
                'left':'50%',
                'marginLeft': - ww/2 + 'px'
            });
        }

        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            function timeoutad() {
                var t;
                t= setTimeout(sbUc, 100);
            }
            timeoutad();
            $(window).resize(sbUc).scroll(sbUc).trigger("scroll");
            $(options.tar).html(tgDom);
            $('#gsIncomeWapfixedTopClose').on('click',function () {
                $('#gsIncomeWapfixedTopHolder').remove();
                $('#gsIncomeWapfixedTop').remove();
            });
        };
    };
    gsIncomeWap.prototype.listFour=function (options) {
        var tgDom = '',
            tgTag= options.tag,
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<li><img src="' + tgImg + '"><h5>';
        if(tgTag){
            tgDom += '<strong>'+tgTag+'</strong><span>|</span>';
        }
        tgDom += tgTit;
        tgDom += '</h5><p><span class="tg">推广</span></p><a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"></a>'+jcCodeDom+'</li>';
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.picTit1=function (options) {
        var tgDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<a class="ymwAds-tg countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>推广</span><p>' + tgTit + '</p></a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.picTit2=function (options) {
        var tgDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<a class="ymwAds-tg2 countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>推广</span><p>' + tgTit + '</p></a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.ConList=function (options) {
        var ggDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            tgTit2 = options.tit2,
            tgImg2 = options.src2,
            tgUrl2 = options.android2.url,
            tgCount2 = options.android2.countId,
            jcCodeDom = '',innerStyle='';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
            tgUrl2 = options.ios2.url;
            tgCount2 = options.ios2.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }

        if (options.gg1display === true && options.gg2display === true){
            innerStyle = 'style="margin-bottom:1px"';
        }

        if (options.gg1display === true){
            ggDom += '<a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg + '" alt="'+tgTit+'"><span>推广</span><p>' + tgTit + '</p></a>';
        }
        if(options.gg2display === true){
            ggDom += '<a href="' + tgUrl2 + '" data-itemid="' + tgCount2 + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg2 + '" alt="'+tgTit2+'"><span>推广</span><p>' + tgTit2 + '</p></a>';
        }
        ggDom += jcCodeDom;

        $(options.tar).html(ggDom);
    };
    gsIncomeWap.prototype.CommBot=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += createTg2(options.tg);
        }
        //判断是否是游戏库，添加游戏库样式
        if($('.gs_zp_wrap').length>0){
            tgDom += '<a style="position:relative;display: block;margin-bottom:0.3rem" ';
        }else{
            tgDom += '<a style="position:relative;display: block;margin: 0 12px;background-color: #fff;" ';
        }
        tgDom += 'href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '">'+tgTag+'</a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.downBtn=function (options) {
        var tgDom = '',
            tgTxt = options.txt,
            tgUrl = options.url,
            tgCount = options.countId,
            isOld = options.isOld,
            jcCodeDom = '';
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(isOld === true){
            tgDom += '<div class="Pd3"><a id="download';
        }else{
            tgDom += '<div class="yu-btn-wrap"><a id="dow';
        }
        tgDom += '" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql">'+tgTxt+'</a>'+jcCodeDom+'</div>';
        $(options.tar).html(tgDom);
    };
    window.gsTgWap = new gsIncomeWap();
})(jQuery);
//WAP首页横幅（全站通发）(V1)
(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};
    gsOption.src ='http://imgf.gamersky.com/img/wjsy_720x120_1219.jpg';
    gsOption.android.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.android.countId = '489975';
    gsOption.ios.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.ios.countId = '682838';
    gsOption.tg = '广告';
    gsOption.tar = '#gsTgWapTop';
    gsTgWap.fixedTop(gsOption);
})(jQuery);
//WAP内容页导航下方banner(V1)
(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};
    gsOption.src ='http://imgf.gamersky.com/img/dj_640x180_1229.jpg';
    gsOption.android.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.android.countId = '668069';
    gsOption.ios.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.ios.countId = '678357';
    gsOption.tg = '广告';
    gsOption.tar = '#gsTgWapNavBottom';
    gsTgWap.base(gsOption);
})(jQuery);
//wap内容页横幅推荐(V1)
(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};
    gsOption.src ='http://imgf.gamersky.com/img/dtws_640x180_1228.jpg';
    gsOption.android.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.android.countId = '520074';
    gsOption.ios.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.ios.countId = '678360';
    gsOption.tg = '广告';
    gsOption.tar = '#gsTgWapConBdshareTop';
    gsTgWap.base(gsOption);
})(jQuery);
//wap内容页图文推荐(V1)
(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};gsOption.android2 = {};gsOption.ios2 = {};
    gsOption.tit = '《坦克世界：闪击战》今天上线';//标题
    gsOption.src ='http://imgf.gamersky.com/img/tksj_220x150_1213.jpg';//素材地址
    //连接地址 安卓
    gsOption.android.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.android.countId = '684095';//统计 安卓
    //连接地址 苹果
    gsOption.ios.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.ios.countId = '684096';//统计 苹果
    gsOption.gg1display = true; //不显示：false;显示：true
    //第二条
    gsOption.tit2 = '《不朽凡人》期待你的加入';//标题
    gsOption.src2 ='http://imgf.gamersky.com/img/bxfr_220x150_1222_a.jpg';//素材地址
    //连接地址 安卓
    gsOption.android2.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.android2.countId = '871410';//统计 安卓
    //连接地址 苹果
    gsOption.ios2.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.ios2.countId = '871411';//统计 苹果
    gsOption.gg2display = true; //不显示：false;显示：true

    gsOption.tar = '#gsTgWapConArticleBot';
    gsTgWap.ConList(gsOption);
})(jQuery);
//wap内容页底部横幅(V1)
(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};
    gsOption.src ='http://imgf.gamersky.com/img/grsm_640x180_1201.jpg';
    gsOption.android.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.android.countId = '520040';
    gsOption.ios.url = 'http://m.djdsz.cy.com/download/dlmedia.shtml';
    gsOption.ios.countId = '682859';
    gsOption.tg = '广告';
    gsOption.tar = '#gsTgWapCommBot';
    gsTgWap.CommBot(gsOption);
})(jQuery);