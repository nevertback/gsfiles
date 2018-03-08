/*
 * @desc   3D幻灯gsZoom
 */
(function($){
    var gsjs = {
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
            console.log(opt.css3);
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
        }
    };
    gsjs.gsZoom('#gsZoom',{
        css3:true,
        width:'1308px',
        height:'564px',
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
            width: 708,
            height:460,
            top: 52,
            left: 0
        }, {
            width: 868,
            height:564,
            top: 0,
            left: 220
        }, {
            width: 708,
            height:460,
            top: 52,
            left: 600
        }],
        cen:{
            width: 708,
            height:460,
            top: 52,
            left: 300
        }
    });
})(jQuery);