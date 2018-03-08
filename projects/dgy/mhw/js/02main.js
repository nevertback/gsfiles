/*
global $,jQuery,screenfull,pageConfig,tvp,preLoadPicsLists,Swiper;
 */
(function($){
    $.fn.gsPopup = function(options){
        var defaults = {
            //弹出后回调函数
            afterOpen:'',
            afterClose:''
        };
        var optionsEd = $.extend(defaults,options);
        var btn = $(this),outTimer,inTimer;
        function addSource(sid,sty) {
            var sourceDom;
            switch (sty) {
                case 'video_tgs':
                    sourceDom = '<embed wmode="direct" flashvars="vid=' + sid + '&amp;tpid=0&amp;showend=1&amp;showcfg=1&amp;searchbar=1&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;shownext=1&amp;list=2&amp;autoplay=1" src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&amp;v=20140714" quality="high" name="tenvideo_flash_player_1492679771297" id="tenvideo_flash_player_1492679771297" bgcolor="#000000" width="100%" height="100%" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">';
                    return sourceDom;
                    break;
                case 'video_tgs2':
                    sourceDom = '<div id="tgsVideo"></div>';
                    return sourceDom;
                    break;
                case 'video_yk':
                    sourceDom = '<embed height="100%" flashvars="isAutoPlay=true" allowscriptaccess="sameDomain" width="100%" align="middle" quality="high" invokeurls="false" src="http://player.youku.com/player.php/sid/'+sid+'/v.swf" type="application/x-shockwave-flash" wmode="transparent">';
                    return sourceDom;
                    break;
                case 'video_bl':
                    sourceDom = '<iframe height="100%" width="100%" id="vedioSrc" frameborder="0" allowfullscreen src="'+sid+'"></iframe>';
                    return sourceDom;
                    break;
                case 'video_other':
                    sourceDom = sid;
                    return sourceDom;
                    break;
                case 'pics':
                    sourceDom = '<img src="'+sid+'" alt="popimgs" width="100%" height="100%">';
                    return sourceDom;
                    break;
                case 'custom':
                    sourceDom = $(sid).html();
                    return sourceDom;
                    break;
            }
        }
        function addPopup(opts) {
            var popupDom = '';
            popupDom += '<div id="gsPopupMask" class="gsPopupMask"></div>';
            popupDom += '<div id="gsPopup" class="gsPopup" style="';
            popupDom += opts.style;
            popupDom += '"><div class="gsPopupCon">';
            popupDom += addSource(opts.sid,opts.sty);
            popupDom += '</div><a  class="gsPopupClose" id="gsPopupClose"></a></div>';
            $('body').append(popupDom);
            inTimer = setTimeout(function () {
                $('#gsPopupMask').addClass('cur');
                $('#gsPopup').addClass('cur');
            },10);
            if(opts.sty === 'video_tgs2'){
                $.getScript("http://vm.gtimg.cn/tencentvideo/txp/js/txplayer.js",function(){
                    var player = new Txplayer({
                        containerId: 'tgsVideo',
                        vid: opts.sid,
                        width: '100%',
                        height: opts.height+35,
                        autoplay:true,
                        showBullet:false,
                        showLogo: false,
                        showRecommendOnEnd:false
                    });
                    $('#tgsVideo').closest('.gsPopupCon').css('overflow','hidden');
                });
            }
        }
        function removePopup() {
            clearTimeout(inTimer);
            $('#gsPopupMask').removeClass('cur');
            $('#gsPopup').removeClass('cur');
            outTimer = setTimeout(function () {
                $('#gsPopupMask').remove();
                $('#gsPopup').hide().remove();
                if(typeof optionsEd.afterClose === 'function'){
                    optionsEd.afterClose();
                }
            },150);
        }
        function closePopup() {
            $('#gsPopupClose').on('click',removePopup);
            $('#gsPopupMask').on('click',removePopup);
        }
        btn.on('click',function () {
            clearTimeout(outTimer);
            var $this = $(this),dw = $this.data('w'),dh = $this.data('h'),
                wh = $(window).height(),gerCss,
                popupOptions = {
                    pos:'fixed',
                    width:dw,
                    height:dh,
                    sid:$this.data('sid'),
                    sty:$this.data('sty')
                };
            gerCss = 'width:'+popupOptions.width+'px;height:'+popupOptions.height+'px;';
            popupOptions.style = 'position:'+popupOptions.pos+';top:50%;left:50%;margin-left:-'+popupOptions.width/2+'px;margin-top:-'+popupOptions.height/2+'px;'+gerCss;
            if(dh>wh){
                popupOptions.pos = 'absolute';
                popupOptions.style = 'position:'+popupOptions.pos+';top:'+$this.offset().top+'px;left:50%;margin-left:-'+popupOptions.width/2+'px;'+gerCss;
            }
            addPopup(popupOptions);
            closePopup();
            if(typeof optionsEd.afterOpen === 'function'){
                optionsEd.afterOpen();
            }
        });
    }
})(jQuery);
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
        bdshare += '<div class="bdsharewrap bdstyle-c '+addClass+'"><div class="bdsharebuttonbox bdshare-button-style0-16" data-tag="share_1" data-bd-bind="1446461622481"><a target="_self" class="bdicons bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bdicons bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bdicons bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bdicons bds_sqq" data-cmd="sqq" title="分享到QQ"></a><a class="bdicons bds_tieba" data-cmd="tieba" title="分享到贴吧"></a><a class="bdicons bds_renren" data-cmd="renren" title="分享到人人"></a><a class="bdicons bds_douban" data-cmd="douban" title="分享到豆瓣"></a><a class="bdicons bds_more" data-cmd="more"></a><a class="bds_count" data-cmd="count" title=""></a></div></div>';
        return bdshare;
    },
    chagePage:function(callback){
        clearTimeout(pageTimer);
        //$('#fixNav').removeClass('cur');
        $('#dgyMain').removeClass('cur');
        pageTimer = setTimeout(function(){
            callback();
            if(pageConfig.isHb === true){
                $('#handBookBtn').addClass('cur');
            }
            if(pageConfig.isFixedNav === true){
                pageFunc.fixedNavFunc();
            }
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
