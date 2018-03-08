(function($){
    $.fn.gsPopup = function(options){
        var defaults = {
            //弹出后回调函数
            afterOpen:''
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
            var popupDom = '',mycls = '';
            if(typeof opts.diy !== 'undefined'){
                mycls = ' '+opts.diy
            }
            popupDom += '<div id="gsPopupMask" class="gsPopupMask"></div>';
            popupDom += '<div id="gsPopup" class="gsPopup'+mycls+'" style="';
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
            },150);
        }
        function closePopup() {
            $('#gsPopupClose').on('click',removePopup);
            $('#gsPopupMask').on('click',removePopup);
        }
        btn.on('click',function () {
            clearTimeout(outTimer);
            var $this = $(this),dw = $this.data('w'),dh = $this.data('h'),diysty=$this.data('diy'),
                wh = $(window).height(),gerCss,
                popupOptions = {
                    pos:'fixed',
                    width:dw,
                    height:dh,
                    sid:$this.data('sid'),
                    sty:$this.data('sty'),
                    diy:diysty
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
$('.popupBtn').gsPopup();
(function ($) {
	var ymjsModel = {
        ztTabs:function(tabId){
            var $tabId = $(tabId),
                $tabNav = $tabId.find('.ztTabNav').find('li'),
                $tabCon = $tabId.find('.ztTabCon');
            $(tabId).slide({
                titCell:$tabNav,
                titOnClassName:'cur',
                mainCell:$tabCon,
                effect:'fade',
                delayTime:250,
                switchLoad:'data-src'
            });
        },
        /*
        gsZoom:function (tar,options) {
            var $w = $(tar),
                opt = {
                    css3:options.css3,
                    s:options.speed,
                    w:options.width,
                    h:options.height,
                    bp:options.prev,
                    bn:options.next,
                    bc:options.cur,
                    l:options.list,
                    cen:options.cen,
                    btnp:options.btnPrev,
                    btnn:options.btnNext,
                    mc:options.mainCon,
                    mn:options.nav,
                    autoPlay:options.autoPlay,
                    playSpeed:options.playSpeed,
                    navClk:options.navClk
                },
                $c = $w.find(opt.mc),
                $n = $w.find(opt.mn),
                liLen = $c.find('li').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version),playTimer,playState = false;
            if(opt.autoPlay === true){
                playState = true;
            }
            if(sbie === true && ver < 10){
                opt.css3 = false;
            }
            if(opt.css3 === true){
                $w.addClass('gszm-css3');
            }
            function commClk() {
                if(opt.autoPlay === true){
                    clearInterval(playTimer);
                    playState = false;
                }
            }
            var zm = {
                setBoxSize:function () {
                    $w.add($c).css({
                        width:opt.w,
                        height:opt.h
                    })
                },
                setCardSize:function () {
                    $c.find('li:not(.'+opt.bc+',.'+opt.bp+',.'+opt.bn+')').hide().css(opt.cen);
                    $c.find('li.'+opt.bc).show().stop().animate(opt.l[1],opt.s);
                    $c.find('li.'+opt.bp).show().stop().animate(opt.l[0],opt.s);
                    $c.find('li.'+opt.bn).show().stop().animate(opt.l[2],opt.s);
                    zm.setNav();
                },
                css3change:function () {
                    $c.find('li.'+opt.bc).css(opt.l[1]);
                    $c.find('li.'+opt.bp).css(opt.l[0]);
                    $c.find('li.'+opt.bn).css(opt.l[2]);
                    zm.setNav();
                },
                nextClk:function () {
                    var $this = $('li.'+opt.bn),idx = $this.index();
                    $c.find('li.'+opt.bp).removeClass(opt.bp);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if(idx === liLen-1){
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('li').eq(0).addClass(opt.bn);
                    }else{
                        $this.removeClass(opt.bn).addClass(opt.bc).next().addClass(opt.bn);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                prevClk:function () {
                    var $this = $('li.'+opt.bp),idx = $this.index();
                    $c.find('li.'+opt.bn).removeClass(opt.bn);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if(idx === 0){
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('li').eq(-1).addClass(opt.bp);
                    }else{
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                setNav:function () {
                    var idx = $c.find('.'+opt.bc).index();
                    $n.find('li').removeClass('cur').eq(idx).addClass('cur');
                    if(opt.autoPlay === true && playState === false){
                        playState = true;
                        this.autoPlayFunc();
                    }
                },
                initNav:function () {
                    var nl = '';
                    for(var i = 0;i<liLen;i++){
                        nl += '<li></li>'
                    }
                    $n.html(nl);
                },
                initCardSize:function () {
                    $c.find('li.'+opt.bp).css(opt.l[0]);
                    $c.find('li.'+opt.bc).css(opt.l[1]);
                    $c.find('li.'+opt.bn).css(opt.l[2]);
                },
                initClass:function () {
                    $c.find('li').eq(0).addClass(opt.bp);
                    $c.find('li').eq(1).addClass(opt.bc);
                    $c.find('li').eq(2).addClass(opt.bn);
                    if(opt.css3 !== true){
                        $c.find('li:gt(2)').hide().css(opt.l[0]);
                    }
                },
                navClk:function () {
                    var navTimer;
                    function moveFunc(tar) {
                        var $this = tar,idx = $this.index();
                        commClk();
                        $c.find('li').removeClass();
                        if(idx === 0){
                            $c.find('li').eq(liLen-1).addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }else if(idx === liLen-1){
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(0).addClass(opt.bn);
                        }else{
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }
                        $c.find('li').eq(idx).addClass(opt.bc);
                        if(opt.css3 === true){
                            zm.css3change()
                        }else{
                            zm.setCardSize();
                        }
                    }
                    if(opt.navClk === false){
                        $n.find('li').on({
                            'mouseover':function () {
                                var tar = $(this);
                                navTimer =setTimeout(function () {
                                    moveFunc(tar);
                                },120);
                            },
                            'mouseout':function () {
                                clearTimeout(navTimer)
                            }
                        });
                    }else{
                        $n.find('li').on('click',function () {
                            moveFunc($(this));
                        });
                    }
                },
                clkFunc:function () {
                    $c.on('click','li.gszm-next',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click','li.gszm-prev',function () {
                        commClk();
                        zm.prevClk();
                    });
                    $w.find(opt.btnn).on('click',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $w.find(opt.btnp).on('click',function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                autoPlayFunc:function () {
                    playTimer = setInterval(function () {
                        zm.nextClk();
                    },opt.playSpeed);
                },
                init:function () {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.initNav();
                    this.setNav();
                    this.clkFunc();
                    this.navClk();
                    if(opt.autoPlay === true){
                        this.autoPlayFunc();
                    }
                }
            };
            zm.init();
        },
        */
        gsZoom:function (tar,options) {
            var $w = $(tar),
                opt = {
                    css3:options.css3,
                    s:options.speed,
                    w:options.width,
                    h:options.height,
                    bp:options.prev,
                    bn:options.next,
                    bc:options.cur,
                    l:options.list,
                    cen:options.cen,
                    btnp:options.btnPrev,
                    btnn:options.btnNext,
                    mc:options.mainCon,
                    mn:options.nav,
                    autoPlay:options.autoPlay,
                    playSpeed:options.playSpeed,
                    navClk:options.navClk
                },
                $c = $w.find(opt.mc),
                $n = $w.find(opt.mn),
                liLen = $c.find('li').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version),playTimer,playState = false;
            if(opt.autoPlay === true){
                playState = true;
            }
            if(sbie === true && ver < 10){
                opt.css3 = false;
            }
            if(opt.css3 === true){
                $w.addClass('gszm-css3');
            }
            function commClk() {
                if(opt.autoPlay === true){
                    clearInterval(playTimer);
                    playState = false;
                }
            }
            var zm = {
                setBoxSize:function () {
                    $w.add($c).css({
                        width:opt.w,
                        height:opt.h
                    })
                },
                setCardSize:function () {
                    $c.find('li:not(.'+opt.bc+',.'+opt.bp+',.'+opt.bn+')').hide().css(opt.cen);
                    $c.find('li.'+opt.bc).show().stop().animate(opt.l[1],opt.s);
                    $c.find('li.'+opt.bp).show().stop().animate(opt.l[0],opt.s);
                    $c.find('li.'+opt.bn).show().stop().animate(opt.l[2],opt.s);
                    zm.setNav();
                },
                css3change:function () {
                    // $c.find('li.'+opt.bc).css(opt.l[1]);
                    // $c.find('li.'+opt.bp).css(opt.l[0]);
                    // $c.find('li.'+opt.bn).css(opt.l[2]);
                    zm.setNav();
                },
                nextClk:function () {
                    var $this = $('li.'+opt.bn),idx = $this.index();
                    $c.find('li.'+opt.bp).removeClass(opt.bp);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if(idx === liLen-1){
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('li').eq(0).addClass(opt.bn);
                    }else{
                        $this.removeClass(opt.bn).addClass(opt.bc).next().addClass(opt.bn);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                prevClk:function () {
                    var $this = $('li.'+opt.bp),idx = $this.index();
                    $c.find('li.'+opt.bn).removeClass(opt.bn);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if(idx === 0){
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('li').eq(-1).addClass(opt.bp);
                    }else{
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                setNav:function () {
                    var idx = $c.find('.'+opt.bc).index();
                    $n.find('li').removeClass('cur').eq(idx).addClass('cur');
                    if(opt.autoPlay === true && playState === false){
                        playState = true;
                        this.autoPlayFunc();
                    }
                },
                initNav:function () {
                    var nl = '';
                    for(var i = 0;i<liLen;i++){
                        nl += '<li></li>'
                    }
                    $n.html(nl);
                },
                initCardSize:function () {
                    if(opt.css3 !== true) {
                        $c.find('li.' + opt.bp).css(opt.l[0]);
                        $c.find('li.' + opt.bc).css(opt.l[1]);
                        $c.find('li.' + opt.bn).css(opt.l[2]);
                    }
                },
                initClass:function () {
                    $c.find('li').eq(0).addClass(opt.bp);
                    $c.find('li').eq(1).addClass(opt.bc);
                    $c.find('li').eq(2).addClass(opt.bn);
                    if(opt.css3 !== true){
                        $c.find('li:gt(2)').hide().css(opt.l[0]);
                    }
                },
                navClk:function () {
                    var navTimer;
                    function moveFunc(tar) {
                        var $this = tar,idx = $this.index();
                        commClk();
                        $c.find('li').removeClass();
                        if(idx === 0){
                            $c.find('li').eq(liLen-1).addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }else if(idx === liLen-1){
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(0).addClass(opt.bn);
                        }else{
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }
                        $c.find('li').eq(idx).addClass(opt.bc);
                        if(opt.css3 === true){
                            zm.css3change()
                        }else{
                            zm.setCardSize();
                        }
                    }
                    if(opt.navClk === false){
                        $n.find('li').on({
                            'mouseover':function () {
                                var tar = $(this);
                                navTimer =setTimeout(function () {
                                    moveFunc(tar);
                                },120);
                            },
                            'mouseout':function () {
                                clearTimeout(navTimer)
                            }
                        });
                    }else{
                        $n.find('li').on('click',function () {
                            moveFunc($(this));
                        });
                    }
                },
                clkFunc:function () {
                    $c.on('click','li.gszm-next',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click','li.gszm-prev',function () {
                        commClk();
                        zm.prevClk();
                    });
                    $w.find(opt.btnn).on('click',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $w.find(opt.btnp).on('click',function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                autoPlayFunc:function () {
                    playTimer = setInterval(function () {
                        zm.nextClk();
                    },opt.playSpeed);
                },
                init:function () {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.initNav();
                    this.setNav();
                    this.clkFunc();
                    this.navClk();
                    if(opt.autoPlay === true){
                        this.autoPlayFunc();
                    }
                }
            };
            zm.init();
        },
        //二维码
        fixCode: function() {
            var fxCode = $('.fx-code'),ft = fxCode.offset().top;
            function scrollFunc() {
                var $win = $(window),st = $win.scrollTop();
                if($win.width() < 1520){
                    fxCode.hide();
                }else{
                    fxCode.show();
                }
                if(st >= (ft-($win.height()/2 - 128))){
                    fxCode.addClass('cur');
                }else{
                    fxCode.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        }
	};
    $('.ztTab').each(function(){
        ymjsModel.ztTabs('#'+$(this).attr('id'));
    });
    ymjsModel.gsZoom('#gsZoom',{
        css3:true,
        width:'1040px',
        height:'760px',
        speed:200,
        mainCon:'.gszm-con',
        prev:'gszm-prev',
        next:'gszm-next',
        cur:'gszm-cur',
        btnPrev:'.gszm-btn-prev',
        btnNext:'.gszm-btn-next',
        nav:'.gszm-nav',
        navClk:false,
        autoPlay:false,
        playSpeed:3000,
        list:[{
            width: 360,
            height:595,
            top: 94,
            left: 0
        }, {
            width: 460,
            height:760,
            top: 0,
            left: 290
        }, {
            width: 360,
            height:595,
            top: 94,
            left: 680
        }],
        cen:{
            width: 360,
            height:595,
            top: 94,
            left: 340
        }
    });
    /*
    ymjsModel.gsZoom('#gsZoom',{
        css3:true,
        width:'1040px',
        height:'760px',
        speed:500,
        mainCon:'.gszm-con',
        prev:'gszm-prev',
        next:'gszm-next',
        cur:'gszm-cur',
        btnPrev:'.gszm-btn-prev',
        btnNext:'.gszm-btn-next',
        nav:'.gszm-nav',
        navClk:false,
        autoPlay:false,
        playSpeed:2000,
        list:[{
            width: 360,
            height:595,
            top: 94,
            left: 0
        }, {
            width: 460,
            height:760,
            top: 0,
            left: 290
        }, {
            width: 360,
            height:595,
            top: 94,
            left: 680
        }],
        cen:{
            width: 360,
            height:595,
            top: 94,
            left: 340
        }
    });
    */
    ymjsModel.fixCode();
})(jQuery);