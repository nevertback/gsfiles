/*
global $,jQuery,screenfull,pageConfig,tvp,preLoadPicsLists,Swiper;
 */
(function($){
    $.fn.autoScale = function(options){

        var defaults = {
            baseWidth:1920,
            baseHeight:1080,
            offsetT:0,//上偏移
            offsetL:0,//左偏移
            positionMethod:''
        };

        var opts = $.extend(defaults,options);

        this.each(function(){

            var thisCon = $(this),
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                scalePercentW = winWidth/opts.baseWidth - opts.offsetL,
                scalePercentH = winHeight/opts.baseHeight - opts.offsetT;

            function setPosFun(){
                var acWH=scalePercentH;
                if(winHeight>(winWidth/16*9)){
                    acWH = scalePercentW;
                    thisCon.css({
                        'top':'50%',
                        'left':'0',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(0,-50%)'
                    });
                }else{
                    acWH = scalePercentH;
                    thisCon.css({
                        'top':'0',
                        'left':'50%',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(-50%,0)'
                    });
                }

                $(window).resize(function(){
                    winWidth = $(window).width();scalePercentW = winWidth/opts.baseWidth - opts.offsetL;
                    winHeight = $(window).height();scalePercentH = winHeight/opts.baseHeight - opts.offsetT;
                    acWH=scalePercentH;
                    if(winHeight>(winWidth/16*9)){
                        acWH = scalePercentW;
                        thisCon.css({
                            'top':'50%',
                            'left':'0',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(0,-50%)'
                        });
                    }else{
                        acWH = scalePercentH;
                        thisCon.css({
                            'top':'0',
                            'left':'50%',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(-50%,0)'
                        });
                    }
                });
            }
            setPosFun();
        });
    };
})(jQuery);
var animEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',pageTimer;
$.fn.extend({
    animateCss: function (animationName,callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(callback){
                callback();
            }
        });
    }
});
function fullScreen() {
    if (screenfull.enabled) {
        screenfull.request();
    }
}
var ymjsModel={
    pageinit:function(){
        var pageWrap = $('#pageswrap'),
            htmlW = $(window).width(),htmlH = $(window).height();
        pageWrap.css({'width':htmlW + 'px','height':htmlH + 'px'});
    },
    autoPos:function(){
        $('.autoMH').each(function(){
            $(this).autoScale();
        });
    },
    bgmSet:function(bgmsrc){
        $('#bgm').attr('src',bgmsrc);
        if(pageConfig.userMute !== true){
            ymjsModel.bgmPlay();
        }
    },
    bgmBtn:function(tar){
        var thObj = this;
        tar.on('click',function(){
            if(pageConfig.volClk){
                pageConfig.userMute = true;
                thObj.bgmPause();
            }else{
                pageConfig.userMute = false;
                thObj.bgmPlay();
            }
        });
    },
    bgmPlay:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.play();
        pageConfig.volClk = true;
        $bgmVol.removeClass('pause').find('span').text(pageConfig.bgm.txt[1]);
        bgmId.volume = 1;

    },
    bgmPause:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.pause();
        pageConfig.volClk = false;
        $bgmVol.addClass('pause').find('span').text(pageConfig.bgm.txt[0]);
    },
    //失去焦点
    htFun:function(){
        var thObj = this;
        $(window).on({
            'blur':function(){
                thObj.bgmPause();
            },
            'focus':function(){
                if(pageConfig.userMute !== true && pageConfig.isVideoPlaying !==true){
                    thObj.bgmPlay();
                }
            }
        });
    },
    createBaiduShare:function(addClass){
        var bdshare = '';
        bdshare += '<div class="bdsharewrap bdstyle-c '+addClass+'"><div class="bdsharebuttonbox bdshare-button-style0-16" data-tag="share_1" data-bd-bind="1446461622481"><a target="_self" class="bdicons bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bdicons bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bdicons bds_sqq" data-cmd="sqq" title="分享到QQ"></a><a class="bdicons bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bdicons bds_tieba" data-cmd="tieba" title="分享到贴吧"></a><a class="bdicons bds_renren" data-cmd="renren" title="分享到人人"></a><a class="bdicons bds_douban" data-cmd="douban" title="分享到豆瓣"></a><a class="bdicons bds_more" data-cmd="more"></a><a class="bds_count" data-cmd="count" title=""></a></div></div>';
        return bdshare;
    },
    chagePage:function(callback){
        clearTimeout(pageTimer);
        $('#fixNav').removeClass('cur');
        $('#dgyMain').removeClass('cur');
        pageTimer = setTimeout(function(){
            callback();
        },400);
    },
    preLoadImg:function (urls) {
        for (var i = 0; i < urls.length; i++) {
            var obj = new Image();
            obj.src = urls[i];
        }
    },
    dgyRender:function(){
        var dgyObj = this;
        dgyObj.htFun();
        dgyObj.autoPos();
    }
};
ymjsModel.dgyRender();
ymjsModel.bgmBtn($('.volbtn'));
