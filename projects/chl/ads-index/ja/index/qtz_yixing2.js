(function ($) {
    var aCfg={
        link:'http://www.gamersky.com/',
        countId:383830,
        source:{
            //默认素材
            mini:'http://image.gamersky.com/webimg13/zhuanti/test/yixing204.swf',
            //展开素材
            open:'http://image.gamersky.com/webimg13/zhuanti/test/yixing206.swf',
            //浮动图
            fix:'http://image.gamersky.com/webimg13/zhuanti/test/yx03.swf'
        },
        timer:{
            then:10, //自动关闭时间 秒
            delay:1,//按钮延迟出现时间 秒
            tar:'gsincomeYixingQtzTime'
        },
        size:{
            mini:[480,380],
            open:[890,380],
            fix:[410,380]
        },
        //按钮样式
        fixClose:{
            src:'http://image.gamersky.com/webimg15/tg/closetg.png',
            size:[66,18]
        },
        btnSty:{
            replay:{
                css:'cursor: pointer;display: none;width:39px;height:24px;position:absolute;left:0;top:0;background: url(http://image.gamersky.com/webimg15/tg/replay.png) 0 0 no-repeat;',
                txt:''
            },
            close:{
                css:'cursor: pointer;display: none;position: absolute;left: 0;top: 0;width: 20px;height: 20px;line-height: 20px;background: url(http://image.gamersky.com/webimg15/mk1.png) 0 0 repeat;font-size: 12px;color:#fff;text-align: center;',
                txt:'×'
            },
            tags:{
                css:'width:24px;height:13px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);',
                txt:''
            },
            time:{
                css:'display: none;position: absolute;left: 22px;top: 0;width: 50px;height: 20px;line-height: 20px;font-size: 12px;color:#fff;background: url(http://image.gamersky.com/webimg15/mk1.png) 0 0 repeat;text-align: center;'
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
    var startAuto = false,startDelay = true,closeTimerTips;
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
            tmDom += '<div id="'+tm+'" style="'+aCfg.btnSty.time.css+'"><span>-</span>秒</div>';
            return tmDom;
        },
        createSwf:function (src,w,h) {
            var swfDom = '';
            swfDom = '<embed src="'+src+'" width="'+w+'" height="'+h+'" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"></embed>';
            return swfDom;
        },
        createTags:function () {
            var tags = '<div style="'+aCfg.btnSty.tags.css+'">'+aCfg.btnSty.tags.txt+'</div>';
            return tags;
        },
        createReply:function () {
            var tags = '<a id="gsincomeYixingQtzReply" style="'+aCfg.btnSty.replay.css+'">'+aCfg.btnSty.replay.txt+'</a>';
            return tags;
        },
        createLink:function () {
            var aDom = '';
            aDom += '<a id="gsincomeYixingQtzLink" class="countHit countHitSql" data-itemid="'+aCfg.countId+'" target="_blank" href="'+aCfg.link+'" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: url(http://image.gamersky.com/webimg13/zhuanti/common/blank.png) 0 0 repeat;"></a>';
            return aDom;
        },
        createClose:function () {
            var aDom = '';
            aDom += '<a id="gsincomeYixingQtzClose" style="'+aCfg.btnSty.close.css+'">'+aCfg.btnSty.close.txt+'</a>';
            return aDom;
        },
        createAdsArea:function () {
            var adsDom = '',adsFixDom = '';
            adsDom += '<div id="gsincomeYixingQtz">';
            adsDom += '<div id="gsincomeYixingQtzEmbed">';
            adsDom += gsMethods.createSwf(aCfg.source.mini,aCfg.size.mini[0],aCfg.size.mini[1]);
            adsDom += '</div>';
            adsDom += '<div id="gsincomeYixingQtzEmbedOpen">';
            adsDom += '</div>';
            adsDom += gsMethods.createLink()+gsMethods.createClose()+gsMethods.createReply()+gsMethods.timerEnd(aCfg.timer.tar)+gsMethods.createTags()+'</div>';

            adsFixDom += '<div id="gsincomeYixingQtzFix">';
            adsFixDom += gsMethods.createSwf(aCfg.source.fix,aCfg.size.fix[0],aCfg.size.fix[1]);
            adsFixDom += '<a style="position: absolute;left: 0;top: '+aCfg.fixClose.size[1]+'px;display: block;width: 100%;height: 100%;background: url(http://image.gamersky.com/webimg13/zhuanti/common/blank.png) 0 0 repeat;" target="_blank" class="countHit countHitSql" data-itemid="'+aCfg.countId+'" href="'+aCfg.link+'"></a>';
            adsFixDom += '<div id="gsincomeYixingQtzFixClose" style="width:'+aCfg.fixClose.size[0]+'px;height:'+aCfg.fixClose.size[1]+'px;cursor:pointer;position:absolute;left:0;top:0;z-index:2;background:url('+aCfg.fixClose.src+') 0 0 no-repeat;"></div></div>';
            $(gsMethods.pageInfos.tar).append(adsDom);
            $('body').append(adsFixDom);
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
                    margin:'-'+(aCfg.size.fix[1]/2 - aCfg.fixClose.size[1])+'px 0 0 550px',
                    padding:aCfg.fixClose.size[1]+'px 0 0',
                    width: aCfg.size.fix[0]+'px',
                    height: aCfg.size.fix[1]+'px',
                    'z-index': 10,
                    transition:'all 0.25s ease'
                }
            };
            $('#gsincomeYixingQtz').css(qtzCss.mini);
            $('#gsincomeYixingQtzFix').css(qtzCss.fix);
        },
        act:function () {
            var ctrlCss = {
                close:{
                    width: aCfg.size.mini[0]+'px',
                    height: aCfg.size.mini[1]+'px'
                },
                open:{
                    width: aCfg.size.open[0] +'px',
                    height: aCfg.size.open[1]+'px'
                },
                embed:{
                    position:'absolute',
                    right:0,
                    top:0,
                    width: aCfg.size.mini[0]+'px',
                    height: aCfg.size.mini[1]+'px'
                },
                embedOpen:{
                    display:'none',
                    position:'absolute',
                    left:0,
                    top:0,
                    width: aCfg.size.open[0]+'px',
                    height: aCfg.size.open[1]+'px'
                }
            };
            var $embedOpen = $('#gsincomeYixingQtzEmbedOpen');
            $('#gsincomeYixingQtz').css(ctrlCss.close);
            $('#gsincomeYixingQtzEmbed').css(ctrlCss.embed);
            $embedOpen.css(ctrlCss.embedOpen);

            window.yixingShowBig = function () {
                $('#gsincomeYixingQtzReply').hide();
                $('#gsincomeYixingQtz').css(ctrlCss.open);
                $embedOpen.css('display','block').html(gsMethods.createSwf(aCfg.source.open,aCfg.size.open[0],aCfg.size.open[1]));
                function timeEnd(tar,time) {
                    clearInterval(closeTimerTips);
                    var timeCount = time;
                    $(tar).find('span').html(timeCount+1);
                    closeTimerTips = setInterval(function () {
                        var inNum;
                        timeCount--;
                        if(timeCount < 0){
                            yixingClose();
                        }
                        inNum = timeCount + 1;
                        if(inNum<time && inNum > 0){
                            inNum = '0' + inNum;
                        }
                        $(tar).find('span').html(inNum);
                    },1000);
                }
                setTimeout(function () {
                    timeEnd('#'+aCfg.timer.tar,aCfg.timer.then-1);
                    $('#gsincomeYixingQtzClose').show();
                    $('#'+aCfg.timer.tar).css('display','block');
                },aCfg.timer.delay*1000);
            };
            window.yixingClose = function () {
                $('#gsincomeYixingQtzReply').show();
                $('#gsincomeYixingQtzClose').hide();
                $('#gsincomeYixingQtz').css(ctrlCss.close);
                $embedOpen.css('display','none');
                clearInterval(closeTimerTips);
                $('#'+aCfg.timer.tar).css('display','none').find('span').html('');
            };
            $('#gsincomeYixingQtzReply').on('click',function () {
                yixingShowBig();
            });
            $('#gsincomeYixingQtzClose').on('click',function () {
                yixingClose();
            });
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
            }
            if(startAuto === false && startDelay === false){
                var autoTop = $('.Mid1').offset().top + aCfg.size.mini[1] - $(window).height();
                if($(window).scrollTop() > autoTop && autoTop>0 && $(window).scrollTop() < $('.Mid1').offset().top + aCfg.size.mini[1]){
                    startAuto = true;
                    yixingShowBig();
                }else{
                    //yixingClose();
                }
            }
            if($(window).scrollTop()>$('#gsincomeYixingQtz').offset().top + aCfg.size.mini[1]){
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
            setTimeout(function () {
                startDelay = false;
            },1000);
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