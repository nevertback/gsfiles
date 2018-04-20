var gsDgyPages = {
    gsdLoad:function(loadState,callback){
        var ld = '',$body = $('body'),thisPage = this,loadData = gsDgySource.page.gsdLoad;
        ld += '<div id="gsDgyLoadingMask" class="gs-dgy-loading-mask"></div><div id="loadingAnim" class="gs-dgy-loading"><img src="'+loadData.logo1+'" alt="" class="loadingAnim-img-g"><div class="loadingAnim-img"><img src="'+loadData.logo2+'"></div><div class="loadingtxt"></div></div>';

        ld += '<div id="gsDgyLoadingTips" class="gs-dgy-loading-tips">';

        ld += '<div class="txt">';
        ld += '<p>为了不破坏《战神》的游玩体验，大观园将仅提供很小一部分的内容作浏览。</p><p>此次的内容全部为游戏开场<b>50分钟</b>演示，请欣赏。</p><p>全屏体验更加，你可以按<i>F11</i><b>退出全屏</b>，也可以随时按<i>F11</i><b>恢复全屏</b></p>';
        ld += '<p><span>为了更好的观看体验，请使用<i>IE11及以上</i>或其他浏览器浏览专题。</span></p>';
        ld += '</div>';

        ld += '<div class="clearfix btngroup"><a class="gsDgyLoadingTipsBtn">继续</a></div>';
        ld += '</div>';
        if(loadState===true){
            $body.append(ld);
            $body.jpreLoader({
                splashVPos: "0",
                splashID: "#loadingAnim",
                showSplash: true,
                loaderVPos: '0%',
                autoClose: true
            }, function() {
                $('#gsDgyLoadingTips').show();
            });
            $('#gsDgyLoadingTips').find('.gsDgyLoadingTipsBtn').on('click',function(){
                gsDgyMethods.fullScreen();
                $('#gsDgyLoadingMask').fadeOut(300);
                $('#gsDgyLoadingTips').fadeOut(300);
                gsDgyConfig.bgm.mute = false;
                gsDgyMethods.bgmSet(gsDgySource.bgm.start);
                thisPage.gsdStart();
            });
        }else{
            if(typeof callback === "function"){
                callback();
            }
        }
    },
    basePage:function(vKey,vDom,callback) {
        var tmpDom = '',vSce = gsDgySource.page[vKey];
        tmpDom += '<div class="gsd-page vPage '+vKey+'" data-vkey="'+vKey+'">';
        tmpDom += '<img class="gsd-page-bg" src="'+vSce.bg+'" alt="'+vKey+'">';
        tmpDom += '<div class="gsd-page-main vPageMain">';
        tmpDom += vDom;
        tmpDom += '</div></div>';
        function beginPageFnc(mA){
            var $pg = mA.find('.vPage');
            callback($pg);
        }
        gsDgyMethods.changePage(tmpDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    },
    gsdStart:function () {
        var vDom = '',vKey = 'gsdStart',vSce = gsDgySource.page[vKey];
        vDom += '<video class="gsd-page-bg" src="'+vSce.vd+'" autoplay loop></video>';
        vDom += '<img class="slogan" src="'+gsDgySource.page.gsdCommon.slogan+'" alt="slogan">';
        vDom += '<a class="btn btn1 btnNext cur"><i></i></a>';
        vDom += '<a class="btn btn2 gsDgyMenu"><i></i></a>';

        gsDgyPages.basePage(vKey,vDom,function ($tar) {
            $tar.find('.btn').on('mouseover',function () {
                $tar.find('.btn').removeClass('cur');
                $(this).addClass('cur');
            });
            $tar.find('.btnNext').on('click',function () {
                gsDgyFlows.gsdFlow01();
            });
            gsDgyMethods.addStaticCells($tar,{
                zan:true,
                comm:true,
                buy:true
            });
        });
    },
    gsdBuy:function (back) {
        var vDom = '',vKey = 'gsdBuy',vSce = gsDgySource.page[vKey],backStr = $('#gsDgyPage').find('.vPage').data('vkey');
        vDom += '<video class="gsd-page-bg" src="'+vSce.vd+'" autoplay loop></video>';
        vDom += '<div class="ver">';
        vDom += '<img class="logo" src="'+vSce.logo+'" alt="logo">';
        vDom += '<div class="tit"><i></i><span></span></div>';

        vDom += '<div class="sld swiper-container"><div class="swiper-wrapper">';
        vDom += '</div>';
        vDom += '<a class="sld-arr sld-arr-prev sldArrPrev"></a>';
        vDom += '<a class="sld-arr sld-arr-next sldArrNext"></a>';
        vDom += '</div>';

        vDom += '</div>';
        vDom += '<img class="gsd-page-bg role role-s gsdBuyRoleSmall" src="'+vSce.role.s+'">';
        vDom += '<img class="gsd-page-bg role role-b gsdBuyRoleBig" src="'+vSce.role.b+'">';
        if(back !== true){
            vDom += '<a class="btn btn-back btnBack"><i></i></a>';
        }else{
            vDom += '<a class="btn btn-next btnNext"><i></i></a>';
        }
        vDom += '<div class="gsd-buy-pop-mask gsdBuyPop gsdBuyPopClose"></div>';
        vDom += '<div class="gsd-buy-pop gsdBuyPop">';
        vDom += '<div class="gsd-buy-pop-main gsdBuyPopMain"></div>';
        vDom += '<a class="gsd-buy-pop-close gsdBuyPopClose"></a>';
        vDom += '</div>';

        gsDgyPages.basePage(vKey,vDom,function ($tar) {
            var $sld = $tar.find('.sld');
            $tar.find('.btnBack').on('click',function () {
                gsDgyPages[backStr]();
            });
            $tar.find('.btnNext').on('click',function () {
                gsDgyPages.gsdEnd();
            });
            var mySwiper = new Swiper($sld, {
                mousewheel: true,
                navigation: {
                    nextEl: $sld.find('.sldArrNext'),
                    prevEl: $sld.find('.sldArrPrev'),
                    disabledClass: 'sld-arr-disable'
                },
                virtual: {
                    slides: vSce.sld,
                    renderSlide:function(slide, index){
                        var tmpDom = '';
                        tmpDom += '<div class="swiper-slide">';
                        tmpDom += '<h5>'+slide.tit+'</h5>';
                        tmpDom += '<div class="pic"><a class="gsdBuyPopBtn" data-num="'+index+'"><img src="'+slide.pic+'" alt="'+slide.tit+'"></a></div>';
                        tmpDom += '<a class="btn-sty1 btn" target="_blank" href="'+slide.url+'"><i></i><span>购买</span></a>';
                        tmpDom += '</div>';
                        return tmpDom;
                    }
                }
            });
            var $pop = $tar.find('.gsdBuyPop'),$popClose = $tar.find('.gsdBuyPopClose');
            $sld.on('click','.gsdBuyPopBtn',function () {
                var $ts = $(this),idx = $ts.data('num');
                $pop.addClass('cur');
                $pop.find('.gsdBuyPopMain').html('<img src="'+vSce.sld[idx].big+'" alt="'+vSce.sld[idx].tit+'">');
            });
            $popClose.on('click',function () {
                $pop.removeClass('cur');
            });
            //提升
            var allTimer,isNowPage,moveDist = {x:0,y:0},
                $roleBig = $tar.find('.gsdBuyRoleBig'),
                $roleSmall = $tar.find('.gsdBuyRoleSmall');
            var $vmain = $tar.find('.vPageMain');
            $vmain.on('mousemove',function (ev) {
                moveDist.x = ev.clientX - $(window).width()/2;
            });
            function moveRole() {
                var distBig={x:0,y:0},distSmall={x:0,y:0};
                distBig.x = -moveDist.x/100;
                distSmall.x = -moveDist.x/50;
                $roleBig.css({
                    transform:'translate3d('+distBig.x+'px,0,0)'
                });
                $roleSmall.css({
                    transform:'translate3d('+distSmall.x+'px,0,0)'

                });
            }
            function render() {
                isNowPage = $('.'+vKey).length;
                moveRole();
                allTimer = requestAnimationFrame(render);
                if(isNowPage < 1){
                    cancelAnimationFrame(allTimer);
                }
            }
            render();
        });
    },
    gsdEnd:function () {
        var vDom = '',vKey = 'gsdEnd',vSce = gsDgySource.page[vKey];
        vDom += '<video class="gsd-page-bg" src="'+vSce.vd+'" autoplay loop></video>';
        vDom += '<img class="slogan" src="'+gsDgySource.page.gsdCommon.slogan+'" alt="slogan">';
        vDom += '<div class="maker">';
        vDom += '<div class="tit"><i></i><span></span></div>';
        vDom += '<div class="con">'+vSce.maker.con+'</div>';
        vDom += '</div>';

        gsDgyPages.basePage(vKey,vDom,function ($tar) {
            $tar.find('.btnNext').on('click',function () {
                gsDgyPages.gsdStart();
            });
            gsDgyMethods.addStaticCells($tar,{
                zan:true,
                comm:true,
                back:true,
                baidu:true
            });
        });
    },
    gsdStory:function () {
        var vDom = '',vKey = 'gsdStory',vSce = gsDgySource.page[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<div class="gsd-page-bg" id="youkuplayer"></div>';
        vDom += '<a class="btn-sty1 btn-skip btnSkip"><i></i><span>跳过</span></a>';
        vDom += '</div>';
        function beginPageFnc(mA){
            var $pg = mA.find('.vPage');
            function onYkPlayEnd() {
                gsDgyMethods.bgmAfterVideo();
                gsDgyPages.gsdBuy(true);
            }
            $pg.find('.btnSkip').on('click',function () {
                onYkPlayEnd();
            });
            function ykCtrl() {
                var player = new YKU.Player('youkuplayer',{
                    styleid: '0',
                    client_id: '6bfe5b183f11e7d9',
                    vid: vSce.vd,
                    newPlayer: true,
                    show_related: false,
                    autoplay: true
                });
                window.addEventListener('message', function(e) {
                    var data = e.data;
                    switch (data.msg) {
                        case "onPlayEnd":
                        {
                            onYkPlayEnd();
                            break;
                        }
                    }
                }, false);
            }
            ykCtrl();
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    },
    gsdBaseDemo:function () {
        var vDom = '',vKey = 'gsdBaseDemo',vSce = gsDgySource.page[vKey];
        vDom += '<a class="btnNext"></a>';

        gsDgyPages.basePage(vKey,vDom,function ($tar) {
            $tar.find('.btnNext').on('click',function () {
                gsDgyPages.gsdStart();
            });
            gsDgyMethods.addStaticCells($tar);
        });
    },
    gsdDiyDemo:function () {
        var vDom = '',vKey = 'gsdDiyDemo',vSce = gsDgySource.page[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<img src="'+vSce.bg+'" alt="'+vKey+'">';
        vDom += '<a class="btnNext"></a>';
        vDom += '</div>';
        function beginPageFnc(mA){
            var $pg = mA.find('.vPage');
            $pg.find('.btnNext').on('click',function () {
                gsDgyPages.start();
            })
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    }
};