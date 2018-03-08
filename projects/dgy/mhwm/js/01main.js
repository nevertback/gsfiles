(function ($) {
    var pageTimer,canChangePage = true;
	var gs = {
	    setSize:function(){
	        var ww = $(window).width(),
                wh = $(window).height(),
                remBase,
                $main = $('#main'),$comment = $('#pageComment');
	        if(ww>wh){
                remBase = wh;
                $main.css({
                    width:ww+'px',
                    height:wh+'px',
                    transform:''
                });
                $comment.css({
                    width:wh+'px',
                    height:ww+'px',
                    transform:'rotate(-90deg) translate(-100%,0)'
                });
            }else{
                remBase = ww;
                $main.css({
                    width:wh+'px',
                    height:ww+'px',
                    transform:'rotate(90deg) translate(0,-100%)'
                });
                $comment.css({
                    width:ww+'px',
                    height:wh+'px',
                    transform:'rotate(-90deg) translate(-100%,0)'
                });
            }
            $('html').css('font-size',remBase/7.2+'px');
        },
        bgm:function () {
	        var bgm = document.getElementById('bgm');
	        if(pgConfig.userMute === false){
                $('.volBtn').removeClass('volPause');
                bgm.play();
            }else{
                $('.volBtn').addClass('volPause');
                bgm.pause();
            }
            $(window).on({
                'blur':function(){
                    bgm.pause();
                },
                'focus':function(){
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
            document.addEventListener('visibilitychange', function() {
                var isHidden = document.hidden;
                if (isHidden) {
                    bgm.pause();
                } else {
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
        },
        bgmClk:function () {
	        $('.volBtn').on('tap',function () {
	            pgConfig.userMute === true?pgConfig.userMute = false:pgConfig.userMute = true;
                var bgm = document.getElementById('bgm');
                if(pgConfig.userMute === false){
                    $('.volBtn').removeClass('volPause');
                    bgm.play();
                }else{
                    $('.volBtn').addClass('volPause');
                    bgm.pause();
                }
            });
        },
        pgChange:function (callback) {
	        if(canChangePage === true){
                canChangePage = false;
                clearTimeout(pageTimer);
                $('#pages').removeClass('cur');
                function pageAfter() {
                    canChangePage = true;
                    if(typeof callback === 'function'){
                        $('#pages').addClass('cur');
                        callback&&callback();
                        gs.navEvent();
                    }
                }
                pageTimer = setTimeout(function () {
                    pageAfter()
                },500);
            }

        },
        nav:function () {
	        var $nav = $('#navBtn'),navClked = false;
            var navPop = '';
            navPop += '<div class="nav-pop navPop" id="navPop"><img class="nav-bg" src="http://image.gamersky.com/zqimg/mhw/wap/nav-bg.jpg" alt="bg"><div class="fma-box">';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgBegin">首页</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgStarBase">星辰基地</a></div>';
            navPop += '<div class="fma-lev2">';
            navPop += '<a class="fixBtn" data-pg="pgMeeting">集会区域</a><span>/</span>';
            navPop += '<a class="fixBtn" data-pg="pgWorking">加工屋</a><span>/</span>';
            navPop += '<a class="fixBtn" data-pg="pgMyself">自己的房间</a>';
            navPop += '</div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgMap">世界地图</a></div>';
            navPop += '<div class="fma-lev2">';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp1" data-mp="0">古树森林</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp3" data-mp="2">陆珊瑚台地</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp4" data-mp="3">瘴气之谷</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp2" data-mp="1">大蚁塚荒地</a>';
            navPop += '</div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgGamerVer">游戏版本</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgEnd">制作人员</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<div class="fma-lev1"><a class="fixBtn-comm">评论</a></div>';
            navPop += '</div>';
            
            navPop += '</div></div>';
            $('#main').append(navPop);
            var $navPop = $('#navPop');
            $nav.on('tap',function () {
                if(navClked === false){
                    navClked = true;
                    $nav.addClass('cur');
                    $navPop.addClass('cur');
                }else{
                    navClked = false;
                    $nav.removeClass('cur');
                    $navPop.removeClass('cur');
                }
            });
            $navPop.find('.fixBtn-comm').on('tap',function () {
                gs.openComment();
            });
            var clkOver = true;
            $('.fixBtn').on('tap',function () {
                var $this = $(this),pg = $this.data('pg');
                if($this.hasClass('cur') === false && clkOver === true){
                    clkOver = false;
                    navClked = false;
                    $nav.removeClass('cur');
                    $navPop.removeClass('cur');
                    setTimeout(function () {
                        clkOver = true;
                        gs[pg]();
                    },250);
                }
            })
        },
        navEvent:function(){
	        $('.fixBtn').removeClass('cur').each(function () {
                var $this = $(this),pg = $this.data('pg');
                if($('.page-cells').hasClass(pg) === true){
                    $this.addClass('cur')
                }
            })
        },
        delayLoad:function () {
            var gsfun = this;
            gsfun.bgm();
            gsfun.bgmClk();
            gsfun.nav();
            gsfun.hdbBtn();
        },
        hdbBtn:function () {
	        var $hdb = $('#handBookBtn'),
                $page = $('#pages');
            $hdb.addClass('cur').on('tap',function () {
                $hdb.removeClass('cur');
                gs.showHDbook($page);
            });
        },
        showHDbook:function (tar,def,navclk) {
            var hdDom = '',hdData = pgConfig.pages.hd,pickSty = '';
            hdDom += '<div class="hdb-bg hdbMain"><div class="hdb-area">';
            hdDom += '<div class="hdb-con">';
            if(navclk === false){
                pickSty = ' pick-open';
            }
            hdDom += '</div>';
            hdDom += '<div class="hdbNav">';
            hdDom += '<a class="hdbClose">关闭</a>';
            hdDom += '<div class="hdbNavBtns">';
            hdDom += '<a class="hdbNavBtn" data-sel="map">地图</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="weapon">武器</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="monster">魔物</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="other">基地</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="npc">NPC</a>';
            hdDom += '</div></div>';
            hdDom += '</div></div>';
            tar.append(hdDom);
            $('#handBookBtn').removeClass('cur');
            setTimeout(function () {
                tar.find('.hdbMain').addClass('cur');
            },50);
            tar.on('tap','.hdbClose',function () {
                $('#handBookBtn').addClass('cur');
                if($(this).hasClass('btnPick')){
                    pgConfig.isPick = true;
                    $('.btn-pick').addClass('cur');
                }
                tar.find('.hdbMain').removeClass('cur');
                setTimeout(function () {
                    tar.find('.hdbMain').remove();
                },250);
            });
            function insterMost(con,sel,sty) {
                var inDom = '',popsty = '';
                if(sty){
                    popsty = sty;
                }
                inDom += '<div class="swiper-container hd-swp hdSwp"><div class="swiper-wrapper">';
                $.each(hdData[sel].con,function (i,item) {
                    var picsrc = item.pic;
                    if(typeof picsrc === 'undefined'){
                        picsrc = item.bigpic;
                    }
                    inDom += '<div class="swiper-slide">';
                    inDom += '<div class="pic-wrap"><img src="'+picsrc+'" alt="'+item.tit+'"></div>';
                    inDom += '<div class="tit">'+item.tit+'</div>';
                    inDom += '<div class="des">'+item.des+'</div>';
                    inDom += '</div>';
                });
                inDom += '</div></div>';
                inDom += '<a class="hd-arr hd-arr-l"></a>';
                inDom += '<a class="hd-arr hd-arr-r"></a>';
                con.html(inDom).removeClass().addClass('hdb-con hdb-most '+popsty);
                var hdSwp = new Swiper(con.find('.hdSwp'),{
                    effect : 'flip',
                    onlyExternal:true,
                    nextButton: con.find('.hd-arr-r'),
                    prevButton: con.find('.hd-arr-l')
                });
            }
            function insterWeapon(con,sel,sty) {
                var inDom = '',popsty = '';
                if(sty){
                    popsty = sty;
                }
                inDom += '<div class="swiper-container hd-swp hdSwp"><div class="swiper-wrapper">';
                $.each(hdData[sel].con,function (i,item) {
                    var picsrc = item.pic;
                    if(typeof picsrc === 'undefined'){
                        picsrc = item.bigpic;
                    }
                    inDom += '<div class="swiper-slide">';
                    inDom += '<div class="tit">'+item.tit+'</div>';
                    inDom += '<div class="des">'+item.des+'</div>';
                    inDom += '<div class="pic-wrap"><img src="'+picsrc+'" alt="'+item.tit+'"></div>';
                    inDom += '</div>';
                });
                inDom += '</div></div>';
                inDom += '<a class="hd-arr hd-arr-l"></a>';
                inDom += '<a class="hd-arr hd-arr-r"></a>';
                if(navclk === false){
                    inDom += '<a class="hd-pick-btn btnPick hdbClose"></a>';
                }
                con.html(inDom).removeClass().addClass('hdb-con hdb-most '+popsty+pickSty);
                var hdSwp = new Swiper(con.find('.hdSwp'),{
                    onlyExternal:true,
                    nextButton: con.find('.hd-arr-r'),
                    prevButton: con.find('.hd-arr-l')
                });
            }

            var navBtn = tar.find('.hdbNavBtns').find('.hdbNavBtn');
            if(navclk === false){
                navBtn.addClass('dis');
            }
            function selectTar(idx) {
                var $btn = navBtn.eq(idx),
                    sel = $btn.data('sel'),
                    $insertTar = tar.find('.hdb-con');
                navBtn.removeClass('cur').eq(idx).addClass('cur');
                switch (sel){
                    case 'monster':
                        insterMost($insertTar,sel,'hdb-monster');
                        break;
                    case 'map':
                        insterMost($insertTar,sel);
                        break;
                    case 'other':
                        insterMost($insertTar,sel);
                        break;
                    case 'weapon':
                        insterWeapon($insertTar,sel,'hdb-weapon');
                        break;
                    case 'npc':
                        insterMost($insertTar,sel);
                        break;
                    default:
                        console.log('default');
                }
            }
            navBtn.on('tap',function () {
                var idx = $(this).index();
                if($(this).hasClass('dis') === false){
                    selectTar(idx);
                }
            });
            if(typeof def !== 'undefined'){
                selectTar(def);
            }else{
                selectTar(0);
            }
        },
        pgBegin:function () {
	        var dt = pgConfig.pages.pgBegin,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgBegin">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<a class="logo-gf"></a>';
            pgDom += '<a class="logo-dgy"></a>';
            pgDom += '<a class="btn-start"></a>';
            pgDom += '<a class="btn-handbook"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                gs.delayLoad();
                $page.html(pgDom);
                $page.find('.btn-start').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btn-handbook').on('tap',function () {
                    gs.showHDbook($page);
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgEnd:function () {
            var dt = pgConfig.pages.pgEnd,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgEnd">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg"><div class="icon-share"></div>';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit9"></i></div>';
            pgDom += '<div class="infos">';
            pgDom += dt.para;
            pgDom += '</div>';
            pgDom += '<a class="btn-comment btnComment"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnComment').on('tap',function () {
                    gs.openComment();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgStarBase:function () {
            var dt = pgConfig.pages.pgStarBase,
                $page = $('#pages'),
                pgDom = '',txt = '';
            if(pgConfig.isPick === false){
                txt = '狩猎前，请前往【加工屋】选择武器';
            }else{
                txt = '战斗准备已完成，点击按钮开始狩猎';
            }
            pgDom += '<div class="page-cells pgStarBase">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit1"></i></div>';
            pgDom += '<a class="btn-pic btn-pic1 btnGo1"><span>集会区域</span><i class="icons"></i></a>';
            pgDom += '<a class="btn-pic btn-pic2 btnGo2"><span>加工屋</span><i class="icons"></i></a>';
            pgDom += '<a class="btn-pic btn-pic3 btnGo3"><span>自己的房间</span><i class="icons"></i></a>';
            pgDom += '<div class="tips">'+txt+'</div>';
            pgDom += '<a class="btn-next btnNext"></a>';
            pgDom += '</div></div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnGo1').on('tap',function () {
                    gs.pgMeeting();
                });
                $page.find('.btnGo2').on('tap',function () {
                    gs.pgWorking();
                });
                $page.find('.btnGo3').on('tap',function () {
                    gs.pgMyself();
                });
                var btnTimer;
                $page.find('.btnNext').on('tap',function () {
                    clearTimeout(btnTimer);
                    if(pgConfig.isPick === true){
                        gs.pgMap();
                    }else{
                        $page.find('.tips').addClass('lightflash');
                        btnTimer = setTimeout(function () {
                            $page.find('.tips').removeClass('lightflash');
                        },250);
                    }
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMeeting:function () {
            var dt = pgConfig.pages.pgMeeting,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgMeeting">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit2"></i></div>';
            pgDom += '<a class="btn-pic btn-pic4 btnGo1"><span>柜台</span><i class="icons"></i></a>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnGo1').on('tap',function () {
                    gs.pgBar();
                });
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgBar:function () {
            var dt = pgConfig.pages.pgBar,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgBar">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit3"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgMeeting();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMyself:function () {
            var dt = pgConfig.pages.pgMyself,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgMyself">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit4"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '<a class="btn-pop btn-pop1 btnPop1"></a>';
            pgDom += '<a class="btn-pop btn-pop2 btnPop2"></a>';
            pgDom += '<a class="btn-pop btn-pop3 btnPop3"></a>';
            pgDom += '</div></div>';
            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $page.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $page.find('.pgPop');
                $page.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                })
            }
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnPop1').on('tap',function () {
                    var pDom = '';
                    showPop('pop-ms pop-ms1',pDom);
                });
                $page.find('.btnPop2').on('tap',function () {
                    var pDom = '';
                    showPop('pop-ms pop-ms2',pDom);
                });
                $page.find('.btnPop3').on('tap',function () {
                    var pDom = '';
                    pDom += '<div class="swiper-container pop-ms3-swp popMs3Swp">';
                    pDom += '<div class="swiper-wrapper">';
                    $.each(dt.pop3,function (i,item) {
                        pDom += '<div class="swiper-slide"><img src="'+item+'" alt="pic"></div>';
                    });
                    pDom += '</div></div><a class="swp-arr swp-arr-l"></a><a class="swp-arr swp-arr-r"></a>';
                    showPop('pop-ms pop-ms3',pDom,function () {
                        var swp = new Swiper($page.find('.popMs3Swp'),{
                            onlyExternal:true,
                            nextButton: $page.find('.swp-arr-r'),
                            prevButton: $page.find('.swp-arr-l')
                        });
                    });
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgWorking:function () {
            var dt = pgConfig.pages.pgWorking,
                $page = $('#pages'),
                pgDom = '',pickSty = '';
            if(pgConfig.isPick === false){
                pickSty = '';
            }else{
                pickSty = ' cur';
            }
            pgDom += '<div class="page-cells pgWorking">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit5"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '<a class="btn-pick btnPick'+pickSty+'"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnPick').on('tap',function () {
                    gs.showHDbook($page,1,false);
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMap:function () {
            var dt = pgConfig.pages.pgMap,
                $page = $('#pages'),
                pgDom = '',
                monsterDt = pgConfig.pages.hd.monster.con,btnSty = '';
            pgDom += '<div class="page-cells pgMap">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit7"></i></div>';
            pgDom += '<img class="map-pic" src="'+dt.bgp+'" alt="bg"><i class="map-pos"></i>';
            pgDom += '<a class="map-btn map-btn0 mapBtnBack"></a>';
            pgDom += '<a class="map-btn map-btn1 mapBtn" data-tar="mp1"></a>';
            pgDom += '<a class="map-btn map-btn2 mapBtn" data-tar="mp2"></a>';
            pgDom += '<a class="map-btn map-btn3 mapBtn" data-tar="mp3"></a>';
            pgDom += '<a class="map-btn map-btn4 mapBtn" data-tar="mp4"></a>';
            if(pgConfig.isHunted === true){
                btnSty = ' cur';
            }
            pgDom += '<a class="btn-next btnNext'+btnSty+'"></a>';
            pgDom += '</div></div>';
            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $page.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $page.find('.pgPop');
                $page.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                })
            }
            function pageInit() {
                $page.html(pgDom);
                $page.find('.mapBtnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnNext').on('tap',function () {
                    gs.pgGamerVer();
                });
                $page.find('.mapBtn').on('tap',function () {
                    var $this = $(this),tar = $this.data('tar');
                    var mapDom = '',huntDom = '';
                    mapDom += '<div class="map-pop-area mapPopArea"><div class="map-infos"><a class="btn-hunt-begin btnHunt"></a></div></div>';
                    huntDom += '<div class="swiper-container pop-map-swp popMapSwp"><div class="swiper-wrapper">';
                    $.each(monsterDt,function (i,item) {
                        if(item.group === tar){
                            huntDom += '<div class="swiper-slide">';
                            huntDom += '<img class="mapGif" src="'+item.bigpic+'" alt="'+item.tit+'">';
                            huntDom += '<div class="tit">'+item.tit+'</div>';
                            huntDom += '<div class="des">'+item.des+'</div>';
                            if(item.hunted === true){
                                huntDom += '<div class="map-pop-acts cur"><a class="btn-act btrnAct" data-mtr="'+i+'" data-gif="'+item.gifpic+'"></a></div>';
                            }else{
                                huntDom += '<div class="map-pop-acts"><a class="btn-act btrnAct" data-mtr="'+i+'" data-gif="'+item.gifpic+'"></a></div>';
                            }
                            huntDom += '</div>';
                        }
                    });
                    huntDom += '</div><a class="swp-arr swp-arr-l"></a><a class="swp-arr swp-arr-r"></div>';
                    showPop('pop-map '+tar,mapDom,function () {
                        $page.find('.btnHunt').on('tap',function () {
                            $page.find('.mapPopArea').html(huntDom);
                            var swp = new Swiper($page.find('.popMapSwp'),{
                                onlyExternal:true,
                                nextButton: $page.find('.swp-arr-r'),
                                prevButton: $page.find('.swp-arr-l')
                            });
                        });
                        $page.find('.mapPopArea').on('tap','.btrnAct',function () {
                            var $this = $(this),mtr = $this.data('mtr'),gifsrc = $this.data('gif'),gifDom = '';
                            monsterDt[mtr].hunted = true;
                            if(pgConfig.isHunted === false){
                                $page.find('.btnNext').addClass('cur');
                                pgConfig.isHunted = true;
                            }
                            $this.closest('.map-pop-acts').addClass('cur');
                            gifDom = '<div class="gifArea"><img src="'+gifsrc+'" alt="gif"><a class="gifAreaClose"></a></div>';
                            $page.append(gifDom);
                            $page.find('.gifAreaClose').on('tap',function () {
                                $page.find('.gifArea').remove();
                            });
                        });
                    })
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgGamerVer:function () {
            var dt = pgConfig.pages.pgGamerVer,
                $page = $('#pages'),
                pgDom = '',boxNavDom = '';
            pgDom += '<div class="page-cells pgGamerVer">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit8"></i><span>'+dt.des+'</span></div>';
            pgDom += '<div class="box">';
            boxNavDom += '<div class="box-nav">';
            $.each(dt.list,function (i,item) {
                pgDom += '<div class="item">';
                boxNavDom += '<a>'+item.tit+'</a>';
                pgDom += '<img src="'+item.pic+'" alt="'+item.tit+'">';
                pgDom += '<a class="buy" target="_blank" href="'+item.buy+'"></a>';
                pgDom += '<div class="para">';
                $.each(item.lis,function (j,pars) {
                    pgDom += '<div class="para-eh"><i>0'+(j+1)+'</i>'+pars+'</div>';
                });
                pgDom += '</div>';
                pgDom += '</div>';
            });
            boxNavDom += '</div>';
            pgDom += '</div>';
            pgDom += boxNavDom;
            pgDom += '<a class="btn-next btnNext"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnNext').on('tap',function () {
                    gs.pgEnd();
                });
                var $tabNav = $page.find('.box-nav'),$tabCon = $page.find('.box');
                $tabNav.find('a').eq(2).addClass('cur');
                $tabCon.find('.item').eq(2).addClass('cur');
                $tabNav.find('a').on('tap',function () {
                    var $this = $(this),idx = $this.index();
                    $tabNav.find('a').removeClass('cur');
                    $this.addClass('cur');
                    $tabCon.find('.item').removeClass('cur').eq(idx).addClass('cur');

                })
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        openComment:function () {
            $('#pageComment').addClass('cur');
            $("#SOHUCS").html('');
            $("#SOHUCS").GetWapComment();
        },
        closeComment:function () {
	        $('#commentClose').on('tap',function () {
                $('#pageComment').removeClass('cur');
            });
        },
        demo:function () {
            var dt = pgConfig.pages.demo,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells demo">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnNext').on('tap',function () {
                    gs.pgStarBase();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        init:function(){
	        var gsfun = this;
            gsfun.setSize();
            $(window).resize(function () {
                gsfun.setSize();
            });
            gsfun.closeComment();

            gsfun.pgBegin();
        }
	};
    gs.init();
})(jQuery);