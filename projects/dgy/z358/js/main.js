(function ($) {
    var pgConfig = {
        userMute:false
    };
    var ztPeLoadList = [
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/zt-bg1.jpg',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/zt-bg2.jpg',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/zt-bg3.jpg',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/zt-bg4.jpg',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/zt-bg5.jpg',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/gray-bg.png',
        'http://img7.gamersky.com/zqimg/dgy/z358/pc/csprite.png'
    ];
    $.fn.extend({
        loading:function (callback) {
            var $this = this,$ld = $('#loading'),$lda = $('#loadingAnim');
            function loaded() {
                $ld.fadeOut(300);
                $lda.fadeOut(300);
                $('html').removeClass('lockScroll');
                if(typeof callback === 'function'){
                    callback&&callback();
                }
            }
            var imglist = ztPeLoadList;
            $this.jpreLoader({
                splashVPos: "0",
                splashID: "#loadingAnim",
                showSplash: true,
                loaderVPos: '0%',
                autoClose: true,
                ldlist:imglist
            }, function() {
                loaded();
            });
        },
        pageBgm:function (bgmid,pausecls) {
            var bgm = document.getElementById(bgmid),$this = this;
            if(pgConfig.userMute === false){
                $this.removeClass(pausecls);
                bgm.play();
            }else{
                $this.addClass(pausecls);
                bgm.pause();
            }
            $this.on('click',function () {
                pgConfig.userMute === true?pgConfig.userMute = false:pgConfig.userMute = true;
                if(pgConfig.userMute === false){
                    $this.removeClass(pausecls);
                    bgm.play();
                }else{
                    $this.addClass(pausecls);
                    bgm.pause();
                }
            });
            $(window).on({
                'blur':function(){
                    $this.addClass(pausecls);
                    bgm.pause();
                },
                'focus':function(){
                    if(pgConfig.userMute === false){
                        $this.removeClass(pausecls);
                        bgm.play();
                    }
                }
            });
        }
    });
    var dtOrigin,$wrap = $('body');
	var gs = {
        isSbie:function () {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version),ieWarning = '';
            ieWarning += '<div id="gs-warning-tips" style="display: none;font-size: 14px; height: 97px; width: 100%; border-bottom: #e22200 3px solid; position: fixed; text-align: center; left: 0px; z-index: 10000000; line-height: 100px; bottom: 0px; background-color: #262626"><img style="width: auto; vertical-align: auto; position: relative; display: inline; top: 2px" src="http://image.gamersky.com/webimg13/zhuanti/common/warning.png"> <span style="font-size: 18px; color: black;color: #e5e5e5;">&nbsp;您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：&nbsp;&nbsp;</span> <a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a> </div>';
            ieWarning += '<div id="gs-warning-bg" style="height: 100%; width: 100%; position: fixed; left: 0px; filter: alpha(opacity=65); z-index: 99999; top: 0px; background-color: black; opacity: 0.65"></div>';
            ieWarning += '<div id="gs-warning-dialog" style="font-size: 14px; border-top: #e22200 3px solid; height: 190px; width: 400px; position: fixed; padding-bottom: 40px; padding-top: 40px; padding-left: 60px; left: 50%; margin: -132px 0px 0px -260px; z-index: 10000000; top: 50%; padding-right: 60px; background-color: #262626"><p style="font-size: 18px; color: black; line-height: 30px;color: #e5e5e5;">您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：</p><a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; margin-top: 20px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a>';
            ieWarning += '<p style="width: 100%; text-align: right"><img style="width: auto" alt="" src="http://image.gamersky.com/webimg15/logo/chang/160x53.png"></p><a style="font-size: 20px; text-decoration: none; height: 60px; width: 60px; right: -60px; position: absolute; font-weight: bolder; color: #fff; text-align: center; display: block; line-height: 60px; top: -3px; background-color: #e22200" onclick="document.getElementById(\'gs-warning-dialog\').style.display=\'none\';document.getElementById(\'gs-warning-bg\').style.display=\'none\';document.getElementById(\'gs-warning-tips\').style.display=\'block\'" href="javascript:void(0)">×</a></div>';
            if(sbie === true && ver < 11){
                $('body').append(ieWarning);
            }
        },
        showPop:function (opts,sty,outer,callback) {
            var popDom = '',inTimer,outTimer,inlineSty = '',
                pw = opts.w,ph = opts.h,$wh = $(window).height(),st = $(window).scrollTop();
            inlineSty += 'style="';
            inlineSty += 'width:'+pw+'px;height:'+ph+'px;';
            if(ph > $wh){
                inlineSty += 'position:absolute;top:'+st+'px;';
                inlineSty += 'margin:0 0 0 -'+pw/2+'px;"';
            }else{
                inlineSty += 'position:fixed;top: 50%;margin:-'+ph/2+'px 0 0 -'+pw/2+'px;"';
            }
            popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
            popDom += '<div class="pg-pop-main pgPop '+sty+'" '+inlineSty+'">';
            popDom += outer;
            popDom += '<a class="pg-pop-close pgPopClose"></a>';
            popDom += '</div>';
            $wrap.append(popDom);
            inTimer = setTimeout(function () {
                $('.pgPop').addClass('cur');
            },10);
            if(typeof callback === 'function'){
                callback&&callback();
            }
            var $pop = $wrap.find('.pgPop');
            $wrap.find('.pgPopClose').on('click',function () {
                clearTimeout(inTimer);
                $pop.removeClass('cur');
                outTimer = setTimeout(function () {
                    $pop.remove();
                },250);
            });
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
            function addHeroList(sel) {
                var hlDom = '',listDt = dt[sel].list,vtlDom = [],vtlDomTmp = [];
                $hero.find('.hero-nav').find('a').removeClass('cur');
                $hero.find('.hero-nav').find('.heroNav'+sel).addClass('cur');
                hlDom += '<div class="swiper-container heroSwp"><div class="swiper-wrapper">';
                hlDom += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                $hm.html(hlDom);
                $.each(listDt,function (i,item) {
                    var vdom = '';
                    vdom += '<a class="hero-btn" data-sel='+sel+' data-idx='+i+'><img src="'+item.pic.f+'" alt="'+item.name.f+'"><i></i><span>'+item.name.f+'</span></a>';
                    vtlDomTmp.push(vdom);
                });
                for(var i=0,len=vtlDomTmp.length;i<len;i+=10){
                    vtlDom.push(vtlDomTmp.slice(i,i+10).join(''));
                }
                var $swp = $hm.find('.heroSwp');
                var swp = new Swiper($swp,{
                    grabCursor : true,
                    threshold : 100,
                    touchEventsTarget:'swiper-slide',
                    navigation: {
                        nextEl: $swp.find('.arr-btn-r'),
                        prevEl: $swp.find('.arr-btn-l')
                    },
                    virtual:{
                        slides:vtlDom,
                        renderSlide:function(slide, index){
                            return '<div class="swiper-slide"><div class="hero-btn-wrap hero-btn-wrap-'+sel+'">'+slide+'</div></div>';
                        }
                    }
                });

            }
            function openHeroPop(sel,idx) {
                var hdt = dt[sel].list[idx],pDom='';
                pDom += '<div class="pop-hero-main phm">';

                pDom += '<div class="phm-infos">';
                pDom += '<div class="phm-infos-top">';
                pDom += '<div class="phm-name">'+hdt.name.f+'</div><div class="phm-line"></div>';
                pDom += '<div class="phm-others"><h4>'+hdt.name.s+'</h4><h5>cv：'+hdt.cv+'</h5></div></div>';
                pDom += '<div class="phm-infos-bot">'+hdt.des+'</div>';
                pDom += '</div>';

                if($.trim(hdt.vu) !== ''){
                    pDom += '<div class="phm-vd">';
                    pDom += '<div class="phm-vd-tit">武将演示视频</div>';
                    pDom += '<div class="phm-vd-con-wrap"><div class="phm-vd-con" id="phmVd"><a class="phm-vd-btn" id="phmVdBtn"><img class="phmVdPic" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" alt="vd"><i class="arr"></i></a></div></div>';
                    pDom += '</div>';
                }

                pDom += '<div class="phm-tab gs-tab phmTab">';
                pDom += '<div class="phm-tab-nav gs-tab-nav clearfix phmTabNav"><a>武将服</a><a>常服</a></div>';
                pDom += '<div class="phm-tab-con gs-tab-box phmTabCon"><div class="gs-tab-item"><div class="phm-pic-wrap"><img src="'+hdt.pic.w+'" alt="'+hdt.name.f+'"></div></div><div  class="gs-tab-item"><div class="phm-pic-wrap"><img src="'+hdt.pic.c+'" alt="'+hdt.name.f+'"></div></div></div>';
                pDom += '</div>';

                pDom += '</div>';
                var opts = {
                    w:1000,
                    h:680
                };
                gs.showPop(opts,'pop-hero',pDom,function () {
                    gs.tab($('.phmTab'));
                    var $vd = $('#phmVd');
                    $.ajax({
                        dataType:'json',
                        url:'https://api.youku.com/videos/show.json',
                        data:{client_id:'6bfe5b183f11e7d9',video_id:hdt.vu},
                        success:function (data) {
                            var vdImg = data.bigThumbnail;
                            $vd.find('.phmVdPic').attr('src',vdImg);
                        }
                    });
                    $('#phmVdBtn').on('click',function () {
                        $vd.html('');
                        var player = new YKU.Player('phmVd',{
                            styleid: '0',
                            client_id: '6bfe5b183f11e7d9',
                            vid: hdt.vu,
                            newPlayer: true,
                            autoplay: true
                        });
                    });
                });
            }
            function openHeroList() {
                $hm.on('click','.hero-btn',function () {
                    var $this = $(this),sel = $this.data('sel'),idx = $this.data('idx');
                    openHeroPop(sel,idx);
                })
            }
            $hero.find('.hero-nav').find('a').on('click',function () {
                var $this = $(this),sel = $this.data('sel');
                addHeroList(sel);
            });
            addHeroList('wei');
            openHeroList();
        },
        pgKfsj:function () {
            var pgDom = '',dt = dtOrigin.kfsj,$nav = $('#locNavs');
            $.each(dt,function (i,item) {
                pgDom += '<a class="locBtn location-btn location-btn'+item.kid+'" data-pop="'+i+'"><i></i><span>'+item.name+'</span></a>';
            });
            $nav.html(pgDom);
            $nav.find('.locBtn').on('click',function () {
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
                var opts = {
                    w:1000,
                    h:680
                };
                gs.showPop(opts,'',pDom,function () {
                    if(pgdt.list.length > 1){
                        var $swp = $wrap.find('.pwSwp');
                        var swp = new Swiper($swp,{
                            grabCursor : true,
                            touchEventsTarget:'swiper-slide',
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
                tabNav += '<a data-sel="'+j+'"><span>'+wq.name+'</span></a>';
                tabCon += '<div class="gs-tab-item"><div class="wq-tab-con-item">';
                tabCon += '<div class="swiper-container wqSwp"><div class="swiper-wrapper">';
                $.each(wq.list,function (i,item) {
                    tabCon += '<div class="swiper-slide"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div><div class="big-pic"><img class="swiper-lazy" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.pic+'" alt="'+wq.name+'"></div><div class="wq-txt"><i></i>'+item.txt+'</div></div>';
                });
                tabCon += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                tabCon += '<div class="wq-des">'+wq.des+'</div></div></div>';
            });
            pgDom += '<div class="gs-tab">';
            pgDom += '<div class="gs-tab-nav">'+tabNav+'</div>';
            pgDom += '<div class="gs-tab-box">'+tabCon+'</div>';
            pgDom += '</div>';
            $wq.html(pgDom);
            gs.tab($wq.find('.gs-tab'));
            $wq.find('.wqSwp').each(function () {
                var $this = $(this);
                var swp = new Swiper($this,{
                    grabCursor : true,
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
        pgTask:function () {
          var $btn = $('#p5VdBtn'),vu = $btn.data('vu'),$vd = $('#p5VdCon');
            $.ajax({
                dataType:'json',
                url:'https://api.youku.com/videos/show.json',
                data:{client_id:'6bfe5b183f11e7d9',video_id:vu},
                success:function (data) {
                    var vdImg = data.bigThumbnail;
                    $vd.html('<img class="p5img" src="'+vdImg+'" alt="'+data.title+'">');
                }
            });
            $btn.on('click',function () {
                $btn.remove();
                $vd.html('');
                var player = new YKU.Player('p5VdCon',{
                    styleid: '0',
                    client_id: '6bfe5b183f11e7d9',
                    vid: vu,
                    newPlayer: true,
                    autoplay: true
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
                    if(k === 0){
                        tabInnerNav += '<a><i class="light"></i>'+kdt.name+'</a>';
                    }else{
                        tabInnerNav += '<a><i class="line"></i><i class="light"></i>'+kdt.name+'</a>';
                    }
                    tabInnerCon += '<div class="gs-tabinner-item"><div class="dz-des">'+kdt.des+'</div>';
                    if(kdt.list.length===1){
                        tabInnerCon += '<div class="big-pic"><img src="'+kdt.list[0].pic+'" alt="'+kdt.list[0].txt+'"></div>';
                        if($.trim(kdt.list[0].txt) !== ''){
                            tabInnerCon += '<div class="dz-txt"><i></i>'+kdt.list[0].txt+'</div>';
                        }
                    }else{
                        if(kdt.list.length > 1){
                            tabInnerCon += '<div class="swiper-container dzSwp"><div class="swiper-wrapper">';
                            $.each(kdt.list,function (i,item) {
                                tabInnerCon += '<div class="swiper-slide"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
                                tabInnerCon += '<div class="big-pic"><img class="swiper-lazy" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.pic+'" alt="'+item.txt+'"></div>';
                                tabInnerCon += '<div class="dz-txt"><i></i>'+item.txt+'</div>';
                                tabInnerCon += '</div>';
                            });
                            tabInnerCon += '</div><a class="arr-btn arr-btn-l"></a><a class="arr-btn arr-btn-r"></a></div>';
                        }
                    }
                    tabInnerCon += '</div>';
                });
                tabNav += '<a><span>'+jdt.name+'</span></a>';
                tabCon += '<div class="gs-tab-item">';
                tabCon += '<div class="gs-tabinner">';
                tabCon += '<div class="gs-tabinner-nav">'+tabInnerNav+'</div>';
                tabCon += '<div class="gs-tabinner-box">'+tabInnerCon+'</div>';
                tabCon += '</div>';
                tabCon += '</div>';
            });
            pgDom += '<div class="gs-tab">';
            pgDom += '<div class="gs-tab-nav">'+tabNav+'</div>';
            pgDom += '<div class="gs-tab-box">'+tabCon+'</div>';
            pgDom += '</div>';
            $dz.html(pgDom);
            gs.tab($dz.find('.gs-tab'));
            $dz.find('.gs-tabinner').each(function () {
                gs.innerTab($(this));
            });
            $dz.find('.dzSwp').each(function () {
                var $this = $(this);
                var swp = new Swiper($this,{
                    grabCursor : true,
                    lazy: {
                        loadPrevNext: true
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
                $jb = $('#jbIntro'),vtlDom = [],pageNav = [];
            pgDom += '<div class="swiper-container jbSwp"><div class="swiper-wrapper">';
            $.each(dt,function (i,item) {
                var vdm = '';
                vdm += '<div class="jb-pic"><img src="'+item.pic+'" alt="'+item.cpt+'"></div>';
                vdm += '<div class="jb-cpt"><span>'+item.cpt+'</span></div>';
                vdm += '<div class="jb-top">';
                vdm += '<div class="jb-time">'+item.time+'</div>';
                vdm += '<h4>'+item.tit+'</h4>';
                vdm += '</div>';
                vdm += '<div class="jb-con"><p>'+item.con+'</p></div>';
                vtlDom.push(vdm);
                pageNav.push(item.cpt);
            });
            pgDom += '</div></div><div class="jb-pagination"></div><a class="jb-arr jb-arr-prev"></a><a class="jb-arr jb-arr-next"></a>';
            $jb.html(pgDom);
            var $jbSwp = $jb.find('.jbSwp');
            var swp = new Swiper($jbSwp,{
                pagination: {
                    el: $jb.find('.jb-pagination'),
                    clickable: true,
                    bulletClass:'jb-bullet',
                    bulletActiveClass: 'jb-bullet-cur',
                    renderBullet: function (index, className) {
                        return '<a class="' + className + '">' + pageNav[index] + '</a>';
                    }
                },
                grabCursor : true,
                touchEventsTarget:'swiper-slide',
                virtual:{
                    slides:vtlDom
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
                vdm += '<div class="bb-main"><div class="bb-tit"><span>'+item.name+'</span></div>';
                vdm += '<div class="bb-pic"><img src="'+item.pic+'" alt="'+item.name+'"></div>';
                vdm += '<a target="_blank" href="'+item.url+'" class="bb-buy"></a></div>';
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
                grabCursor : true,
                effect : 'coverflow',
                initialSlide :1,
                slidesPerView: 3,
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 40,
                    stretch: 50,
                    depth: 400,
                    modifier: 2,
                    slideShadows : false
                },
                virtual:{
                    slides:vtlDom
                }
            });
        },
        tab:function (tab) {
            var $tab = tab,
                $nav =  $tab.find('.gs-tab-nav'),
                $con = $tab.find('.gs-tab-box'),
                tabInTimer;
            $nav.find('a').on({
                mouseover:function () {
                    var $this = $(this),idx = $this.index();
                    tabInTimer = setTimeout(function () {
                        $nav.find('a').removeClass('cur').eq(idx).addClass('cur');
                        $con.find('.gs-tab-item').removeClass('cur').eq(idx).addClass('cur');
                    },120);
                },
                mouseout:function () {
                    clearTimeout(tabInTimer);
                }
            });
            $nav.find('a').eq(0).addClass('cur');
            $con.find('.gs-tab-item').eq(0).addClass('cur');
        },
        innerTab:function (tab) {
            var $tab = tab,
                $nav =  $tab.find('.gs-tabinner-nav'),
                $con = $tab.find('.gs-tabinner-box'),
                tabInTimer;
            $nav.find('a').on({
                mouseover:function () {
                    var $this = $(this),idx = $this.index();
                    tabInTimer = setTimeout(function () {
                        $nav.find('a').removeClass('cur').eq(idx).addClass('cur');
                        $con.find('.gs-tabinner-item').removeClass('cur').eq(idx).addClass('cur');
                    },120);
                },
                mouseout:function () {
                    clearTimeout(tabInTimer);
                }
            });
            $nav.find('a').eq(0).addClass('cur');
            $con.find('.gs-tabinner-item').eq(0).addClass('cur');
        },
		//右侧导航按钮
		fnavA: function(tarFixnav,toTopDes,toWidth) {
			!function($) {
				function ScrollSpy(element, options) {
					var process = $.proxy(this.process, this),
						$element = $(element).is('body') ? $(window) : $(element),
						href;
					this.options = $.extend({}, $.fn.scrollspy.defaults, options);
					this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process);
					this.selector = (this.options.target || ((href = $(element).attr('data-to')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' li>a';
					this.$body = $('body');
					this.refresh();
					this.process()
				}
				ScrollSpy.prototype = {
					constructor: ScrollSpy,
					refresh: function() {
						var self = this,
							$targets;
						this.offsets = $([]);
						this.targets = $([]);
						$targets = this.$body
							.find(this.selector)
							.map(function() {
								var $el = $(this),
									href = $el.data('to'),
									$href = /^#\w/.test(href) && $(href);
								return ($href && $href.length && [
									[$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
								]) || null
							})
							.sort(function(a, b) {
								return a[0] - b[0]
							})
							.each(function() {
								self.offsets.push(this[0]);
								self.targets.push(this[1])
							})
					},
					process: function() {
						var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
							scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
							maxScroll = scrollHeight - this.$scrollElement.height(),
							offsets = this.offsets,
							targets = this.targets,
							activeTarget = this.activeTarget,
							i,ww = $(window).width();
						if (scrollTop >= maxScroll) {
							return activeTarget !== (i = targets.last()[0]) && this.activate(i)
						}
						for (i = offsets.length; i--;) {
							activeTarget !== targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
						}
                        if (scrollTop >= toTopDes && ww > toWidth) {
                            $(tarFixnav).addClass('cur');
                        }else{
                            $(tarFixnav).removeClass('cur');
                        }
					},
					activate: function(target) {
						var active, selector;
						this.activeTarget = target;
						$(this.selector).removeClass('cur');
						selector = this.selector + target + ',' + this.selector + '[data-to="' + target + '"]';
						active = $(selector).addClass('cur');
						active.trigger('activate')
					}
				};
				var old = $.fn.scrollspy;
				$.fn.scrollspy = function(option) {
					return this.each(function() {
						var $this = $(this),
							data = $this.data('scrollspy'),
							options = typeof option === 'object' && option;
						if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)));
						if (typeof option === 'string') data[option]()
					})
				};
				$.fn.scrollspy.Constructor = ScrollSpy;
				$.fn.scrollspy.defaults = {
					offset: 36
				};
				$.fn.scrollspy.noConflict = function() {
					$.fn.scrollspy = old;
					return this
				};
				$(window).on('load', function() {
					$('body').each(function() {
						var $spy = $(this);
						$spy.scrollspy({
							target:tarFixnav
						})
					})
				})
			}(window.jQuery);
			$(tarFixnav).find('a').on('click', function(e) {
				if (e && e.preventDefault) {
					//阻止默认浏览器动作(W3C)
					e.preventDefault();
				} else {
					//IE中阻止函数器默认动作的方式
					window.event.returnValue = false;
					return false;
				}
				var todiv = $(this).data('to'),off = $(this).data('off') || 0;
				$('html,body').animate({scrollTop: $(todiv).offset().top - off}, 400);
			});
            function fixedDisplay() {
                var ww = $(window).width();
                if(ww>toWidth){
                    if($('body').scrollTop()>toTopDes){
                        $(tarFixnav).addClass('cur');
                    }
                }else{
                    $(tarFixnav).removeClass('cur');
                }
            }
            $(window).resize(fixedDisplay);
		},
        render:function () {
            gs.isSbie();
            gs.pgKfsj();
            gs.pgHero();
            gs.pgWqxt();
            gs.pgTask();
            gs.pgDzxt();
            gs.pgJb();
            gs.pgBb();
            $(".supportMe").supportMe();
        },
        init:function () {
            $('body').loading(function () {
                $('#section1').addClass('cur');
                $.ajax({
                    dataType:'Script',
                    url:'http://j.gamersky.com/zq/z358/z358.config.js',
                    success:function () {
                        dtOrigin = z358Data.dto;
                        gs.render();
                        $('.volBtn').pageBgm('bgm','volPause');
                    }
                });
            });
            gs.fnavA('#fixednav',100,1320);
        }
	};
    gs.init();

})(jQuery);