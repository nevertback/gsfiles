(function ($) {
    var u = navigator.userAgent,
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
        tgDom += '</h5><p><span class="tg">广告</span></p><a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"></a>'+jcCodeDom+'</li>';
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
        tgDom += '<a class="ymwAds-tg countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>广告</span><p>' + tgTit + '</p></a>'+jcCodeDom;
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
        tgDom += '<a class="ymwAds-tg2 countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>广告</span><p>' + tgTit + '</p></a>'+jcCodeDom;
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
            ggDom += '<a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg + '" alt="'+tgTit+'"><span>广告</span><p>' + tgTit + '</p></a>';
        }
        if(options.gg2display === true){
            ggDom += '<a href="' + tgUrl2 + '" data-itemid="' + tgCount2 + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg2 + '" alt="'+tgTit2+'"><span>广告</span><p>' + tgTit2 + '</p></a>';
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
    gsIncomeWap.prototype.lk=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '',tgStyle;
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += '<div class="gsTgWapLkInnerTg">'+options.tg+'</div>';
        }
        tgStyle = '<style>.gsTgWapLkInner{}</style>';
        tgDom += tgStyle;
        tgDom += '<div id="gsTgWapLkInner"><div id="gsTgWapLkInnerMain" class="gsTgWapLkInnerMain"><img class="gsTgWapLkInnerImg" src="'+tgImg+'"><a target="_blank" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="gsTgWapLkInnerLink gsTgWapLkInnerClose countHit countHitSql">'+'</a></div><a class="gsTgWapLkInnerClose gsTgWapLkInnerCloseBtn"></a>'+tgTag+jcCodeDom+'</div>';

        var canScroll = true,clkBind = false,clkSt = 0,tmpSty = 'translate3d(0, 0, 0)',
            animTimeIn,animTimeOut,clkVal = true;
        function setInnerSize(imginfo,isScling) {
            var $wWith = $(window).width(),$wHeight = $(window).height(),
                tarWidth,tarHeight,showHeight,tarRate = 1;
            if($wWith > 720){
                $wWith = 720;
            }
            tarWidth = $wWith;
            tarHeight = tarWidth/16*9;
            showHeight = $wWith/imginfo.width*imginfo.height;
            var $tar = $('#gsTgWapLkInner'),
                $tarImg = $('#gsTgWapLkInnerMain'),
                $tarClose = $tar.find('.gsTgWapLkInnerClose'),
                imgTop = 0,
                ttp = $tar.offset().top;
            $tar.css({
                'height':tarHeight + 'px'
            });
            function sclFun() {
                tarRate = (showHeight - tarHeight)/($wHeight - tarHeight);
                var tarTop = $tar.offset().top,
                    sclTop = $('body').scrollTop();
                if(sclTop === 0){
                    sclTop = $('html').scrollTop();
                }
                var sumTop = sclTop+$wHeight-tarHeight;
                if(sumTop > tarTop){
                    imgTop = tarTop - sumTop;
                }
                imgTop = imgTop*tarRate;
                if(tarHeight - imgTop > showHeight){
                    imgTop = tarHeight-showHeight;
                }
                //tarHeight-imgTop-showHeight - 反向 || imgTop - 正向;
                $tarImg.css({
                    'transform':'translate3d(0,'+(tarHeight-imgTop-showHeight)+'px,0)'
                });
            }
            if(isScling === true){
                sclFun();
            }
            function clkEvents() {
                clearTimeout(animTimeIn,animTimeOut);
                function clkCommon() {
                    $wHeight = $(window).height();
                }
                function clkOpen() {
                    canScroll = false;
                    clkSt = $('body').scrollTop();
                    tmpSty = $tarImg[0].style.transform;
                    ttp = $tar.offset().top;
                    if(clkSt === 0){
                        clkSt = $('html').scrollTop();
                    }
                    $tar.animate({
                        'height':$wHeight+'px'
                    },250);
                    $('html,body').animate({
                        'scrollTop':ttp
                    },250);
                    $tarImg.css({
                        'transform':'translate3d(0,0,0)',
                        'transition':'transform 0.25s ease'
                    });
                    animTimeIn = setTimeout(function () {
                        $('html').addClass('hideScroll');
                        $tar.addClass('cur');
                        clkVal = true;
                    },300);
                }
                function clkClose() {
                    $tar.removeClass('cur');
                    $('html').removeClass('hideScroll');
                    $tarImg.css({
                        'transform':tmpSty
                    });

                    $('html,body').animate({
                        'scrollTop':clkSt
                    },250);
                    $tar.animate({
                        'height':tarHeight+'px'
                    },250).scrollTop(0);
                    animTimeOut = setTimeout(function () {
                        canScroll = true;
                        $tarImg.css({
                            'transition':''
                        });
                        clkVal = true;
                    },350);
                }
                $tarImg.find('.gsTgWapLkInnerImg').on('click',function () {
                    if(clkVal === true){
                        clkVal = false;
                        clkCommon();
                        clkOpen();
                    }
                });
                $tarClose.on('click',function () {
                    if(clkVal === true){
                        clkVal = false;
                        clkCommon();
                        clkClose();
                    }
                });
                clkBind = true;
            }
            if(clkBind === false){
                clkEvents()
            }

        }
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
            function doAnim() {
                setInnerSize(ldImage);
                $(window).resize(function () {
                    if(canScroll===true){
                        setInnerSize(ldImage);
                    }
                }).scroll(function () {
                    if(canScroll===true){
                        setInnerSize(ldImage,true);
                    }
                });
            }
            doAnim();
        };
    };
    gsIncomeWap.prototype.lkV2=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '',tgStyle;
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += '<div class="gsTgWapLkInnerTg">'+options.tg+'</div>';
        }
        tgStyle = '<style></style>';
        tgDom += tgStyle;
        tgDom += '<div id="gsTgWapLkInnerV2">';
        tgDom += '<div class="gsTgWapLkInnerMain"><canvas id="gsTgWapLkInnerCanvas"></canvas><img src="'+tgImg+'" class="gsTgWapLkInnerFakeImg"><a class="gsTgWapLkInnerOpenBtn gsTgWapLkInnerOpen"></a>';
        tgDom += '<a target="_blank" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="gsTgWapLkInnerLink gsTgWapLkInnerClose countHit countHitSql">'+'</a></div><a class="gsTgWapLkInnerClose gsTgWapLkInnerCloseBtn"></a>'+tgTag+jcCodeDom+'</div>';

        function setInnerSize(imginfo) {
            var $wWith = $(window).width(),$wHeight = $(window).height(),
                tarWidth,tarHeight,showHeight,tarRate = 1;
            if($wWith > 720){
                $wWith = 720;
            }
            tarWidth = $wWith;
            tarHeight = tarWidth/options.ratio;
            showHeight = $wWith/imginfo.width*imginfo.height;
            var $tar = $('#gsTgWapLkInnerV2'),
                imgTop = 0;
            $tar.css({
                'width':tarWidth + 'px',
                'height':tarHeight + 'px'
            });
            function animShow() {
                var htmlSclTmp = 0,timerOpen,timerClose,timerCloseScroll;
                var drawJS = {
                    tarStage:document.getElementById('gsTgWapLkInnerCanvas'),
                    config:{
                        openSpeed:250,
                        closeSpeed:250,
                        backTopSpeed:100
                    },
                    draw:function () {
                        ctx.drawImage(ctxImg,0, tarHeight - showHeight,tarWidth,showHeight);
                    },
                    fakeImgShow:function () {
                        $tar.find('.gsTgWapLkInnerLink').css({
                            height:showHeight+'px'
                        });
                        $tar.find('.gsTgWapLkInnerFakeImg').css({
                            height:showHeight+'px',
                            top:$tar.attr('data-tmpscl')+'px',
                            visibility:'visible'
                        });
                    },
                    fakeImgHide:function () {
                        $tar.find('.gsTgWapLkInnerFakeImg').css({
                            visibility:'hidden'
                        });
                    },
                    updateDraw:function () {
                        var sclTop = this.tarStage.getBoundingClientRect().top,
                            fullSH = $wHeight - tarHeight,
                            fullCH = showHeight - tarHeight;
                        imgTop = 0;
                        tarRate = fullCH/fullSH;
                        if(sclTop < fullSH){
                            imgTop = fullSH - sclTop;
                        }
                        imgTop = imgTop*tarRate;
                        var showY = imgTop - fullCH;
                        if(sclTop < 0){
                            showY = 0;
                        }
                        //离屏绘制
                        cfctx.clearRect(0,0,tarWidth,tarHeight);
                        cfctx.drawImage(ctxImg,0, showY,tarWidth,showHeight);
                        //画入画布
                        ctx.clearRect(0,0,tarWidth,tarHeight);
                        ctx.drawImage(canvasOffscreen,0, 0,tarWidth,tarHeight);
                        $tar.attr('data-tmpscl',showY);
                    },
                    closeEvent:function () {
                        clearTimeout(timerClose);
                        clearTimeout(timerCloseScroll);
                        var thObj = this;
                        function closeAfterScl() {
                            $tar.removeClass('cur');
                            $('html').removeClass('hideScroll');
                            $('html,body').animate({
                                scrollTop:htmlSclTmp
                            },thObj.config.closeSpeed);
                            $tar.animate({
                                width:tarWidth+'px',
                                height:tarHeight + 'px'
                            },thObj.config.closeSpeed);
                            $tar.find('.gsTgWapLkInnerFakeImg').animate({
                                top:$tar.attr('data-tmpscl')+'px'
                            },thObj.config.closeSpeed);
                            timerClose = setTimeout(function () {
                                thObj.fakeImgHide();
                                canAf = true;
                            },thObj.config.closeSpeed);
                        }
                        if($tar.scrollTop() !== 0){
                            $tar.animate({
                                scrollTop:0
                            },thObj.config.backTopSpeed);
                            timerCloseScroll = setTimeout(function () {
                                closeAfterScl();
                            },thObj.config.backTopSpeed);
                        }else{
                            closeAfterScl();
                        }
                    },
                    openEvent:function () {
                        clearTimeout(timerOpen);
                        canAf = false;
                        var tarSt = $tar.offset().top,thObj = this;
                        $wWith = $(window).width();
                        if($wWith > 720){
                            $wWith = 720;
                        }
                        $wHeight = $(window).height();
                        htmlSclTmp = $('html').scrollTop();
                        if(htmlSclTmp === 0){
                            htmlSclTmp = $('body').scrollTop();
                        }
                        this.fakeImgShow();
                        $('html,body').animate({
                            scrollTop:tarSt
                        },thObj.config.openSpeed);
                        $tar.animate({
                            width:$wWith+'px',
                            height:$wHeight + 'px'
                        },thObj.config.openSpeed);
                        $tar.find('.gsTgWapLkInnerFakeImg').animate({
                            top:0
                        },thObj.config.openSpeed);
                        timerOpen = setTimeout(function () {
                            $('html').addClass('hideScroll');
                            $tar.addClass('cur');
                        },thObj.config.openSpeed);
                    },
                    clickFunc:function () {
                        var thisObj = this,
                            openBtn = $tar.find('.gsTgWapLkInnerOpen'),
                            closeBtn = $tar.find('.gsTgWapLkInnerClose');
                        openBtn.on('click',function () {
                            thisObj.openEvent();
                        });
                        closeBtn.on('click',function () {
                            thisObj.closeEvent();
                        });
                    },
                    init:function () {
                        var func = this;
                        this.draw();
                        function render() {
                            if(canAf === true){
                                func.updateDraw();
                            }
                            window.requestAnimationFrame(render);
                        }
                        render();
                        this.clickFunc();
                    }
                };
                var canAf = true,
                    stage = drawJS.tarStage,
                    ctx = stage.getContext('2d'),
                    ctxImg = new Image();
                ctxImg.src = tgImg;
                stage.width = tarWidth;
                stage.height = tarHeight;
                var canvasOffscreen = document.createElement('canvas');
                canvasOffscreen.width = tarWidth;
                canvasOffscreen.height = tarHeight;
                var cfctx = canvasOffscreen.getContext('2d');
                drawJS.init(ctx);
            }
            animShow();
        }
        var ldImage = new Image(),reloadFunc;
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
            function doAnim() {
                setInnerSize(ldImage);
            }
            doAnim();
            function hengshuping(){
                clearTimeout(reloadFunc);
                $(options.tar).html(tgDom);
                $('html').removeClass('hideScroll');
                reloadFunc = setTimeout(function () {
                    setInnerSize(ldImage);
                },200);
                //window.location.reload();
            }
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
        };
    };
    window.gsTgWap = new gsIncomeWap();
})(jQuery);