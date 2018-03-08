(function ($) {
    var aCfg={
        source:{
            //默认素材
            mini:'http://image.gamersky.com/webimg13/zhuanti/test/yixing102.swf',
            //首次加载素材
            auto:'http://image.gamersky.com/webimg13/zhuanti/test/yixing101.swf',
            //浮动图
            fix:'http://image.gamersky.com/webimg13/zhuanti/test/yx03.swf'
        },
        timer:{
            first:10,//首次时间
            then:10 //其他时间
        },
        size:{
            mini:[480,380],
            orig:[890,380],
            fix:[410,380]
        },
        tars:{
            timer:{
                first:'gsincomeYixingQtzAutoTm',
                then:'gsincomeYixingQtzTm'
            }
        }
    };
    function isAFsup() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }
    isAFsup();
    function getMidTop() {
        return $('.Mid1').offset().top - $('.Mid').offset().top;
    }
    var startAuto = false,closeTimerFirst,closeTimerThen;
    var gsMethods = {
        getTop:function () {
            return getMidTop();
        },
        pageInfos:{
            tar:'.Mid',
            swfTop:getMidTop()
        },
        timerEnd:function (tm) {
            var tmDom = '';
            tmDom += '<div id="'+tm+'" style="display: none;position: absolute;left: 0;top: 0;width: 100px;height: 20px;line-height: 20px;font-size: 12px;color:#fff;background-color:#000;text-align: center;">还有<span></span>秒关闭</div>';
            return tmDom;
        },
        timerEndAct:function (tar,time,siv) {
            clearInterval(siv);
            var timeCount = time;
            siv = setInterval(function () {
                var inNum;
                if(timeCount <= 0){
                    $(tar).css('display','none');
                    clearInterval(siv);
                }
                inNum = timeCount;
                if(inNum<time && inNum > 0){
                    inNum = '0' + inNum;
                }
                $(tar).css('display','block').find('span').html(inNum);
                timeCount--;
            },1000);
        },
        createSwf:function (src,w,h) {
            var swfDom = '';
            swfDom = '<embed src="'+src+'" width="'+w+'" height="'+h+'" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"></embed>';
            return swfDom;
        },
        createAdsArea:function () {
            var adsDom = '',adsFixDom = '';
            adsDom += '<div id="gsincomeYixingQtz">';
            adsDom += '<div id="gsincomeYixingQtzEmbed">';
            adsDom += gsMethods.createSwf(aCfg.source.mini,aCfg.size.orig[0],aCfg.size.orig[1]);
            adsDom += '</div>'+gsMethods.timerEnd(aCfg.tars.timer.then)+gsMethods.createTags()+'</div>';

            adsFixDom += '<div id="gsincomeYixingQtzFix">';
            adsFixDom += gsMethods.createSwf(aCfg.source.fix,aCfg.size.fix[0],aCfg.size.fix[1]);
            adsFixDom += '<div id="gsincomeYixingQtzFixClose" style="width:70px;height:28px;cursor:pointer;position:absolute;left:0;top:0;z-index:2;background:url(http://image.gamersky.com/webimg15/tg/closetg.png) no-repeat;"></div></div>';
            $(gsMethods.pageInfos.tar).append(adsDom);
            $('body').append(adsFixDom);
        },
        createTags:function () {
            var tags = '<div style="width:24px;height:13px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);"></div>';
            return tags;
        },
        setCss:function () {
            var qtzCss = {
                mini:{
                    position: 'absolute',
                    top: gsMethods.pageInfos.swfTop+'px',
                    right:'-216px',
                    overflow:'hidden'
                },
                fix:{
                    visibility: 'hidden',
                    opacity:0,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    margin:'-'+(aCfg.size.fix[1]/2 - 28)+'px 0 0 550px',
                    padding:'28px 0 0',
                    width: aCfg.size.fix[0]+'px',
                    height: aCfg.size.fix[1]+'px',
                    'z-index': 10,
                    transition:'all 0.25s ease'
                }
            };
            $('#gsincomeYixingQtz').css(qtzCss.mini);
            $('#gsincomeYixingQtzFix').css(qtzCss.fix);
        },
        auto:function () {
            var adsDom = '';
            adsDom += '<div id="gsincomeYixingQtzAuto">';
            adsDom += '<div id="gsincomeYixingQtzAutoEmbed">';
            adsDom += gsMethods.createSwf(aCfg.source.auto,aCfg.size.orig[0],aCfg.size.orig[1]);
            adsDom += '</div>'+gsMethods.timerEnd(aCfg.tars.timer.first)+gsMethods.createTags()+'</div>';
            $(gsMethods.pageInfos.tar).append(adsDom);
        },
        autoCss:function () {
            var qtzCss = {
                auto: {
                    position: 'absolute',
                    top: gsMethods.getTop() + 'px',
                    right: '-216px',
                    overflow: 'hidden'
                }
            };
            var $autoDiv = $('#gsincomeYixingQtzAuto');
            $autoDiv.css(qtzCss.auto);
            function showAuto() {
                var autoTop = $('.Mid1').offset().top + 380 - $(window).height();
                if($(window).scrollTop() > autoTop && autoTop>0){
                    $('#gsincomeYixingQtzAuto').css('display','block');
                    startAuto = true;

                    function timeEnd(tar,time) {
                        clearInterval(closeTimerFirst);
                        var timeCount = time;
                        closeTimerFirst = setInterval(function () {
                            var inNum;
                            timeCount--;
                            console.log(aCfg.timer.then,timeCount);
                            if(timeCount <= 0){
                                $(tar).css('display','none');
                                clearInterval(closeTimerFirst);
                            }
                            inNum = timeCount + 1;
                            if(inNum<time && inNum > 0){
                                inNum = '0' + inNum;
                            }
                            $(tar).css('display','block').find('span').html(inNum);
                        },1000);
                    }
                    timeEnd('#'+aCfg.tars.timer.first,aCfg.timer.first);
                }else{
                    $('#gsincomeYixingQtzAuto').css('display','none');
                }
            }
            showAuto();
        },
        act:function () {
            var ctrlCss = {
                close:{
                    width: aCfg.size.mini[0]+'px',
                    height: aCfg.size.mini[1]+'px'
                },
                open:{
                    width: aCfg.size.orig[0]+'px',
                    height: aCfg.size.orig[1]+'px'
                },
                embed:{
                    position:'absolute',
                    right:0,
                    top:0,
                    width: aCfg.size.orig[0]+'px',
                    height: aCfg.size.orig[1]+'px'
                }
            };
            $('#gsincomeYixingQtz').css(ctrlCss.close);
            $('#gsincomeYixingQtzEmbed').css(ctrlCss.embed);
            window.yixingShowBig = function () {
                $('#gsincomeYixingQtz').css(ctrlCss.open);
                function timeEnd(tar,time) {
                    clearInterval(closeTimerThen);
                    var timeCount = time;
                    closeTimerThen = setInterval(function () {
                        var inNum;
                        timeCount--;
                        console.log(aCfg.timer.then,timeCount);
                        if(timeCount <= 0){
                            $(tar).css('display','none');
                            clearInterval(closeTimerThen);
                        }
                        inNum = timeCount + 1;
                        if(inNum<time && inNum > 0){
                            inNum = '0' + inNum;
                        }
                        $(tar).css('display','block').find('span').html(inNum);
                    },1000);
                }
                timeEnd('#'+aCfg.tars.timer.then,aCfg.timer.then);
            };
            window.yixingClose = function () {
                $('#gsincomeYixingQtz').css(ctrlCss.close);
                $('#'+aCfg.tars.timer.then).css('display','none');
                clearInterval(closeTimerThen);
            };
            window.yixingRemove = function () {
                $('#gsincomeYixingQtzAuto').remove();
                clearInterval(closeTimerFirst);
            };
        },
        ctrlPage:function () {
            $('#adscontainer_conmmon_qtz').css({height:400+'px',visibility: 'hidden'});
            $('#adscontainer_www_index_feturegame').hide();
        },
        update:function () {
            var mTop = gsMethods.getTop();
            if($('#ADback').length>0){
                $('#ADback').find('.Close').trigger('click');
            }
            if(mTop !== gsMethods.pageInfos.swfTop){
                gsMethods.pageInfos.swfTop = mTop;
                gsMethods.setCss();
                $('#gsincomeYixingQtzAuto').css({top: mTop + 'px'});
            }
            if(startAuto === false){
                gsMethods.autoCss();
            }
            if($(window).scrollTop()>$('#gsincomeYixingQtz').offset().top + 380){
                $('#gsincomeYixingQtzFix').css({
                    visibility: 'visible',
                    opacity:1
                });
            }else{
                $('#gsincomeYixingQtzFix').css({
                    visibility: 'hidden',
                    opacity:0
                });
            }
        },
        bodyScl:function () {
            function setBody() {
                var $ww = $(window).width();
                if($ww > 1100){
                    $('body').css({
                        'overflow-x':'hidden',
                        'width':''
                    });
                }else{
                    $('body').css({
                        'overflow-x':'hidden',
                        'width':'1100px'
                    });
                }
            }
            setBody();
            $(window).resize(function () {
                setBody();
            });
        },
        render:function () {
            gsMethods.ctrlPage();
            gsMethods.createAdsArea();
            gsMethods.setCss();
            gsMethods.act();
            gsMethods.auto();
            gsMethods.autoCss();
            var allTimer;
            function kf() {
                gsMethods.update();
                allTimer = requestAnimationFrame(kf);
            }
            kf();
            $('#gsincomeYixingQtzFixClose').on('click',function () {
                $('#gsincomeYixingQtzFix').remove();
                cancelAnimationFrame(allTimer)
            });
            gsMethods.bodyScl();
        },
        init:function () {
            gsMethods.render();
        }
    };
    gsMethods.init();
})(jQuery);