(function ($) {
    var dtOrigin,$wrap = $('#wrap');
    var gs = {
        tab:function (tab,tabNav,tabCon) {
            tab.find(tabNav).find('a').on('tap',function () {
                var $this = $(this),idx = $this.index();
                tab.find(tabNav).find('a').removeClass('cur').eq(idx).addClass('cur');
                tab.find(tabCon).removeClass('cur').eq(idx).addClass('cur');
            });
            tab.find(tabNav).find('a').eq(0).addClass('cur');
            tab.find(tabCon).eq(0).addClass('cur');
        },
        pgHero:function () {
            var pgDom = '',
                dt = dtOrigin.heros,
                $hero = $('#heroIntro'),vtlDom = [];
            pgDom += '<div class="hero-nav">';
            $.each(dt,function (n,navs) {
                pgDom += '<a class="heroNav'+n+'" data-sel="'+n+'">'+navs.nav+'</a>';
            });
            pgDom += '</div>';
            pgDom += '<div class="hero-main" id="heroMain"></div>';
            $hero.html(pgDom);
            var $hm = $('#heroMain');
            function openHeroList(sel) {
                var hlDom = '',listDt = dt[sel].list,vtlDom = [];
                $hero.find('.hero-nav').find('a').removeClass('cur');
                $hero.find('.hero-nav').find('.heroNav'+sel).addClass('cur');
                hlDom += '<div class="swiper-container heroSwp"><div class="swiper-wrapper">';
                hlDom += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                $hm.html(hlDom);
                $.each(listDt,function (i,item) {
                    var vdom = '';
                    vdom += '<div class="hero-top">';
                    vdom += '<div class="ht-name">'+item.name.f+'</div><div class="ht-line"></div>';
                    vdom += '<div class="ht-others"><h4>'+item.name.s+'</h4><h5>cv：'+item.cv+'</h5></div>';
                    vdom += '</div>';
                    vdom += '<div class="hero-pic">';
                    vdom += '<div class="hp-pic"><img src="'+item.pic.w+'" alt="'+item.name.f+'"><p>武将服</p></div>';
                    vdom += '<div class="hp-pic"><img src="'+item.pic.c+'" alt="'+item.name.f+'"><p>常服</p></div>';
                    vdom += '</div>';
                    vdom += '<div class="hero-des">';
                    vdom += item.des;
                    vdom += '</div>';
                    vtlDom.push(vdom);
                });
                var $swp = $hm.find('.heroSwp');
                var swp = new Swiper($swp,{
                    navigation: {
                        nextEl: $swp.find('.arr-btn-r'),
                        prevEl: $swp.find('.arr-btn-l')
                    },
                    virtual:{
                        slides:vtlDom
                    }
                });
            }
            $hero.find('.hero-nav').find('a').on('tap',function () {
                var $this = $(this),sel = $this.data('sel');
                openHeroList(sel);
            });
            openHeroList('wei');
        },
        pgKfsj:function () {
            var pgDom = '',dt = dtOrigin.kfsj,$nav = $('#locNavs');
            $.each(dt,function (i,item) {
                pgDom += '<a class="locBtn location-btn location-btn'+item.kid+'" data-pop="'+i+'"><i></i><span>'+item.name+'</span></a>';
            });
            $nav.html(pgDom);

            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $wrap.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $wrap.find('.pgPop');
                $wrap.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                })
            }
            $nav.find('.locBtn').on('tap',function () {
                var $this = $(this),popid = $this.data('pop'),
                    pDom = '',pgdt = dt[popid],vtlDom = [];
                if(pgdt.list.length > 1){
                    pDom += '<div class="pop-world pop-world-mut">';
                    pDom += '<div class="pw-tit">'+pgdt.name+'</div>';
                    pDom += '<div class="swiper-container pwSwp"><div class="swiper-wrapper">';
                    $.each(pgdt.list,function (i,item) {
                        var vdom = '';
                        vdom += '<div class="swiper-slide">';
                        vdom += '<div class="pw-pic"><img src="'+item.pic+'" alt="'+item.name+'"></div>';
                        vdom += '<div class="pw-txt"><p>'+item.txt+'</p></div>';
                        vdom += '</div>';
                        vtlDom.push(vdom);
                    });
                    pDom += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                    pDom += '</div>';
                }else if(pgdt.list.length === 1){
                    pDom += '<div class="pop-world pop-world-single">';
                    pDom += '<div class="pw-tit">'+pgdt.name+'</div>';
                    pDom += '<div class="pw-pic"><img src="'+pgdt.list[0].pic+'" alt="'+pgdt.list[0].name+'"></div>';
                    pDom += '<div class="pw-txt"><p>'+pgdt.list[0].txt+'</p></div>';
                    pDom += '</div>';
                }
                showPop('',pDom,function () {
                    if(pgdt.list.length > 1){
                        var $swp = $wrap.find('.pwSwp');
                        var swp = new Swiper($swp,{
                            navigation: {
                                nextEl: $swp.find('.arr-btn-r'),
                                prevEl: $swp.find('.arr-btn-l')
                            },
                            virtual:{
                                slides:vtlDom
                            }
                        });
                    }
                });
            });
        },
        pgWqxt:function () {
            var pgDom = '', tabNav = '',tabCon = '',
                dt = dtOrigin.wqxt,
                $wq = $('#wqIntro');
            $.each(dt,function (j,wq) {
                tabNav += '<a data-sel="'+j+'">'+wq.name+'</a>';
                tabCon += '<div class="wq-tab-con-item wqTabConItem">';
                tabCon += '<div class="swiper-container wqSwp"><div class="swiper-wrapper">';
                $.each(wq.list,function (i,item) {
                    tabCon += '<div class="swiper-slide"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div><div class="wq-pic"><img class="swiper-lazy" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.pic+'" alt="'+wq.name+'"></div><div class="wq-txt">'+item.txt+'</div></div>';
                });
                tabCon += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                tabCon += '<div class="wq-des">'+wq.des+'</div></div>';
            });
            pgDom += '<div class="wq-tab wqTab">';
            pgDom += '<div class="wq-tab-nav wqTabNav">'+tabNav+'</div>';
            pgDom += '<div class="wq-tab-con wqTabCon">'+tabCon+'</div>';
            pgDom += '</div>';
            $wq.html(pgDom);
            this.tab($wq.find('.wqTab'),'.wqTabNav','.wqTabConItem');
            $wq.find('.wqSwp').each(function () {
                var $this = $(this);
                var swp = new Swiper($this,{
                    lazy: {
                        loadPrevNext: true
                    },
                    navigation: {
                        nextEl: $this.find('.arr-btn-r'),
                        prevEl: $this.find('.arr-btn-l')
                    }
                });
            })
        },
        pgDzxt:function () {
            var pgDom = '', tabNav = '',tabCon = '',
                dt = dtOrigin.dzxt,
                $dz = $('#dzIntro');

            $.each(dt,function (j,jdt) {
                var tabInnerNav = '',tabInnerCon = '';
                $.each(jdt.inner,function (k,kdt) {
                    tabInnerNav += '<a>'+kdt.name+'</a>';
                    tabInnerCon += '<div class="dz-tab-inner-con-item dzTabInnerConItem"><div class="dz-des">'+kdt.des+'</div>';
                    if(kdt.list.length===1){
                        tabInnerCon += '<div class="dz-pic"><img src="'+kdt.list[0].pic+'" alt="'+kdt.list[0].txt+'"></div>';
                        if($.trim(kdt.list[0].txt) !== ''){
                            tabInnerCon += '<div class="dz-txt">'+kdt.list[0].txt+'</div>';
                        }
                    }else{
                        if(kdt.list.length > 1){
                            tabInnerCon += '<div class="swiper-container dzSwp"><div class="swiper-wrapper">';
                            $.each(kdt.list,function (i,item) {
                                tabInnerCon += '<div class="swiper-slide"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
                                tabInnerCon += '<div class="dz-pic"><img class="swiper-lazy" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.pic+'" alt="'+item.txt+'"></div>';
                                tabInnerCon += '<div class="dz-txt"><p>'+item.txt+'</p></div>';
                                tabInnerCon += '</div>';
                            });
                            tabInnerCon += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                        }
                    }
                    tabInnerCon += '</div>';
                });
                tabNav += '<a>'+jdt.name+'</a>';
                tabCon += '<div class="dz-tab-con-item dzTabConItem">';
                tabCon += '<div class="dz-tab-inner dzTabInner">';
                tabCon += '<div class="dz-tab-inner-nav dzTabInnerNav">'+tabInnerNav+'</div>';
                tabCon += '<div class="dz-tab-inner-con dzTabInnerCon">'+tabInnerCon+'</div>';
                tabCon += '</div>';
                tabCon += '</div>';
            });
            pgDom += '<div class="dz-tab dzTab">';
            pgDom += '<div class="dz-tab-nav dzTabNav">'+tabNav+'</div>';
            pgDom += '<div class="dz-tab-con dzTabCon">'+tabCon+'</div>';
            pgDom += '</div>';
            $dz.html(pgDom);
            this.tab($dz.find('.dzTab'),'.dzTabNav','.dzTabConItem');
            $dz.find('.dzTabInner').each(function () {
                gs.tab($(this),'.dzTabInnerNav','.dzTabInnerConItem');
            });
            $dz.find('.dzSwp').each(function () {
                var $this = $(this);
                var swp = new Swiper($this,{
                    lazy: {
                    },
                    navigation: {
                        nextEl: $this.find('.arr-btn-r'),
                        prevEl: $this.find('.arr-btn-l')
                    }
                });
            });
        },
        pgJb:function () {
            var pgDom = '',
                dt = dtOrigin.jb,
                $jb = $('#jbIntro'),vtlDom = [];
            pgDom += '<div class="swiper-container jbSwp"><div class="swiper-wrapper">';
            $.each(dt,function (i,item) {
                var vdm = '';
                vdm += '<div class="jb-pic"><img src="'+item.pic+'" alt="'+item.cpt+'"></div>';
                vdm += '<div class="jb-cpt"><span>'+item.cpt+'</span></div>';
                vdm += '<div class="jb-top">';
                vdm += '<h4>'+item.tit+'</h4>';
                vdm += '<div class="jb-time">'+item.time+'</div>';
                vdm += '</div>';
                vdm += '<div class="jb-con"><p>'+item.con+'</p></div>';
                vtlDom.push(vdm);
            });
            pgDom += '</div><a class="jb-arr jb-arr-prev"></a><a class="jb-arr jb-arr-next"></a></div>';
            $jb.html(pgDom);
            var $jbSwp = $jb.find('.jbSwp');
            var swp = new Swiper($jbSwp,{
                navigation: {
                    nextEl: $jbSwp.find('.jb-arr-next'),
                    prevEl: $jbSwp.find('.jb-arr-prev')
                },
                virtual:{
                    slides:vtlDom
                },
                on:{
                    init:function () {
                        var nextTxt = $jbSwp.find('.swiper-slide-next').find('.jb-cpt').html();
                        $jbSwp.find('.jb-arr-next').html(nextTxt);
                    },
                    slideChangeTransitionEnd:function () {
                        var prevTxt = $jbSwp.find('.swiper-slide-prev').find('.jb-cpt').html(),
                            nextTxt = $jbSwp.find('.swiper-slide-next').find('.jb-cpt').html();
                        $jbSwp.find('.jb-arr-prev').html(prevTxt);
                        $jbSwp.find('.jb-arr-next').html(nextTxt);
                    }
                }
            });
        },
        pgBb:function () {
            var pgDom = '',
                dt = dtOrigin.bb,
                $bb = $('#bbIntro'),vtlDom = [];
            pgDom += '<div class="swiper-container bbSwp"><div class="swiper-wrapper">';
            $.each(dt,function (i,item) {
                var vdm = '';
                vdm += '<div class="bb-tit"><span>'+item.name+'</span></div>';
                vdm += '<div class="bb-pic"><img src="'+item.wappic+'" alt="'+item.name+'"></div>';
                vdm += '<a target="_blank" href="'+item.url+'" class="bb-buy"></a>';
                vtlDom.push(vdm);
            });
            pgDom += '</div><a class="bb-arr bb-arr-prev"></a><a class="bb-arr bb-arr-next"></a></div>';
            $bb.html(pgDom);
            var $bbSwp = $bb.find('.bbSwp');
            var swp = new Swiper($bbSwp,{
                navigation: {
                    nextEl: $bbSwp.find('.bb-arr-next'),
                    prevEl: $bbSwp.find('.bb-arr-prev')
                },
                virtual:{
                    slides:vtlDom
                }
            });
        },
        pgTask:function () {
            var $play = $wrap.find('.taskPlay'),vu = $play.data('vu');
            var pgbgm = document.getElementById('bgm');
            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $wrap.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $wrap.find('.pgPop');
                $wrap.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                    if(pgConfig.userMute === false){
                        pgbgm.play();
                    }
                })
            }
            $play.on('tap',function () {
                var pgDom = '',$ww = $(window).width(),ifmHeight;
                if($ww>720){
                    $ww = 720;
                }
                ifmHeight = $ww/16*9;
                pgDom += '<iframe height="'+ifmHeight+'" width="'+$ww+'" src="http://player.youku.com/embed/'+vu+'==" frameborder=0 allowfullscreen></iframe>';
                showPop('pg-pop-vd',pgDom,function () {
                    pgbgm.pause();
                });
            });
        },
        insertDom:function () {
            this.pgHero();
            this.pgKfsj();
            this.pgWqxt();
            this.pgDzxt();
            this.pgJb();
            this.pgBb();
            this.pgTask();
        },
        pageAnim:function () {
            function remCalc(num) {
                var $ww = $(window).width(),renum;
                if($ww>720){
                    $ww = 720;
                }
                renum = num/7.2*$ww;
                return renum;
            }
            // init controller
            var controller = new ScrollMagic.Controller();
            new ScrollMagic.Scene({
                offset:remCalc(5.08),
                triggerElement: '#startSmAnim'
            })
                .setClassToggle('.pageStart','cur')
                .addTo(controller);
            function addPageSmAnim(sel) {
                var pageSmAnim = new ScrollMagic.Scene({
                    duration:remCalc(9.2),
                    offset:0,
                    triggerElement: sel
                })
                    .addTo(controller)
                    .on("progress", function (e) {
                        var pec = e.progress.toFixed(5),
                            $area = $(sel).find('.safeArea'),
                            calcIn = 0.2,calcOut = 0.2;
                        if(pec <= calcIn){
                            $area.css({
                                transform:'translate3d('+(1-pec/calcIn)*100+'%,0,0)',
                                opacity:pec/calcIn
                            })
                        }else if(pec >= (1-calcOut) && pec <= 1){
                            $area.css({
                                transform:'translate3d('+(pec-1+calcOut)*100/calcOut+'%,0,0)',
                                opacity:(1-pec)/calcOut
                            })
                        }else if(pec < (1-calcOut) && pec > calcIn){
                            $area.css({
                                transform:'translate3d(0,0,0)',
                                opacity:1
                            })
                        }
                    });
            }
            function addPageSmAnimEnd(sel) {
                var pageSmAnim = new ScrollMagic.Scene({
                    duration:remCalc(12.8),
                    offset:-remCalc(0.56),
                    triggerElement: sel
                })
                    .addTo(controller)
                    .on("progress", function (e) {
                        var pec = e.progress.toFixed(5),
                            $area = $(sel).find('.safeArea'),
                            calcIn = 0.2;
                        if(pec <= calcIn){
                            $area.css({
                                transform:'translate3d('+(1-pec/calcIn)*100+'%,0,0)',
                                opacity:pec/calcIn
                            })
                        }else if(pec > calcIn && pec <= 1){
                            $area.css({
                                transform:'translate3d(0,0,0)',
                                opacity:1
                            })
                        }
                    });
            }
            addPageSmAnim('.page2');
            addPageSmAnim('.page3');
            addPageSmAnim('.page4');
            addPageSmAnim('.page5');
            addPageSmAnim('.page6');
            addPageSmAnim('.page7');
            addPageSmAnim('.page8');
            addPageSmAnimEnd('.page9');

        },
        render:function (isDev) {
            if(isDev === true){
                $('#loading,#loadingAnim').hide();
            }else{
                $('body').loading(function () {
                    $('.volBtn').pageBgm('bgm','volPause');
                    $('.page1').addClass('cur');
                    $.ajax({
                        dataType:'Script',
                        url:'http://j.gamersky.com/zq/z358/z358.config.js',
                        cache:true,
                        success:function () {
                            dtOrigin = z358Data.dto;
                            gs.insertDom();
                            gs.pageAnim();
                            $(".supportMe").supportMe();
                        }
                    });
                });
            }
        },
        resizeRender:function () {
            $('html').setRem(720);
            $(window).resize(function () {
                $('html').setRem(720);
            });
        },
        init:function(){
            this.resizeRender();
            this.render(false);
        }
    };
    gs.init();
})(jQuery);