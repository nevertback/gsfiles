/*
global $,yms,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */
var bindGlobal = {
    context:{
        common:function (dt,sel) {
            $('#infosTitle').html(dt.list[sel].name);
        },
        map:function (dt,tar) {
            var tmpDom = '',tmpTro = '';
            tmpDom += '<div class="infos-com infos-map" id="infosMap">';
            tmpDom += '<div id="infosMapWheel" class="wheel-img"><img src="'+dt.bg+'" alt="'+dt.name+'">';
            $.each(dt.tro,function (i,item) {
                tmpDom += '<a class="mapBtn map-btn map-btn'+item.id+'" data-tar="'+item.id+'">';
                tmpDom += '<img src="'+item.cell.lig+'" alt="'+item.name+'" class="light">';
                tmpDom += '<img src="'+item.cell.txt+'" alt="'+item.name+'" class="txt">';
                tmpTro += '<img src="'+item.cell.pop+'" alt="'+item.name+'" class="pop mapPop mapPop'+item.id+'">';
                tmpDom += '</a>';
            });
            tmpDom += '</div>';
            tmpDom += tmpTro;
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $map = $('#infosMap'),$wbg = $('#infosMapWheel'),baseCfg = {
                width:2343,
                height:2261
            };
            var count = 100,
                lv = 10;//缩放速度
            commonComponents.mouseScrollTips(tar);
            $wbg.on('mousewheel',function (ev) {
                var rio,
                    wlx = ev.pageX,
                    wly = ev.pageY,
                    $ww = $(window).width(),
                    $wh = $(window).height(),
                    mw,mh,pageScaleVal,scaleDot,trox,troy,
                    scaleLRTB={
                        l:'auto',
                        r:'auto',
                        t:'auto',
                        b:'auto'
                    };
                if($ww/$wh>16/9){
                    mw = $ww;
                    mh = mw/16*9;
                }else{
                    mh = $wh;
                    mw = mh/9*16;
                }
                if(wlx<mw/2&&wly<mh/2){
                    scaleLRTB.l = '-62px';
                    scaleLRTB.t = '-117px';
                    scaleDot = '0 0';
                }else if(wlx<mw/2&&wly>mh/2){
                    scaleLRTB.l = '-168px';
                    scaleLRTB.t = '-886px';
                    scaleDot = '0 100%';
                }else if(wlx>=mw/2){
                    scaleLRTB.l = '-658px';
                    scaleLRTB.t = '-583px';
                    scaleDot = '50% 20%';
                }
                /*
                trox = wlx/mw*100+'%';
                troy = wly/mh+'%';
                scaleLRTB.l = 0;
                scaleLRTB.t = 0;
                scaleDot = trox+' '+troy;
                */
                if(ev.deltaY<0){
                    count = count - lv;
                }else{
                    count = count + lv;
                }
                rio = count/100;
                if(rio>1){
                    rio = 1;
                    count = 100;
                }else if(rio < 1920/2343){
                    rio = 1920/2343;
                    count = 100*1920/2343;
                }
                $wbg.css({
                    left:scaleLRTB.l,
                    right:scaleLRTB.r,
                    top:scaleLRTB.t,
                    bottom:scaleLRTB.b,
                    'transform':'scale('+rio+')',
                    'transform-origin':scaleDot
                })
            });
            $map.on('click',function () {
                $map.find('.mapPop').removeClass('cur');
            });
            $map.find('.mapBtn').on('click',function (event) {
                event.stopPropagation();
                var $this = $(this),tar = $this.data('tar');
                $map.find('.mapPop').removeClass('cur');
                $map.find('.mapPop'+tar).addClass('cur');
            })
        },
        fun:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-fun" id="infosFun">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="des">'+dt.des+'</div>';
            tmpDom += '<div class="video" id="infosFunVideo"><a class="ykBtn"><img src="'+dt.video.poster+'" alt="'+dt.name+'"></a></div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosFun');
            $area.find('.ykBtn').on('click',function () {
                var tar = 'infosFunVideo',$tar = $('#'+tar);
                $tar.html('');
                commonComponents.player('infosFunVideo',dt.video);
            })
        },
        role:function (dt,tar) {
            var tmpDom = '',tmpDomNav = '',tmpDomCon = '';
            $.each(dt.tab,function (i,item) {
                tmpDomNav += '<a class="infosRoleNav" data-fnc="'+item.fnc+'"><i></i><span>'+item.name+'</span></a>';
            });
            tmpDom += '<div class="infos-com infos-role" id="infosRole">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="infos-role-con" id="infosRoleCon"></div>';
            tmpDom += '<div class="infos-role-nav">';
            tmpDom += tmpDomNav;
            tmpDom += '</div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            commonComponents.mouseScrollTips(tar);
            var $area = $('#infosRole'),$con = $('#infosRoleCon');
            function horPic(num) {
                var conDom = '',tabDt = dt.tab[num];
                conDom += '<div class="infos-role-srl">';
                conDom += '<div class="infos-role-srl-con irSrlCon">';
                conDom += '<div class="infos-role-cat infos-role-cat'+num+'" id="irc">';
                conDom += '<img class="bg-pic" src="'+tabDt.pic+'" alt="'+tabDt.name+'">';
                conDom += '<div class="infos-role-cat-pop ircPop">';
                conDom += '<div id="ircPopCon">';
                conDom += '<div id="ircPopInner"></div>';
                conDom += '<a class="infos-role-cat-pop-close ircPopClose"></a>';
                conDom += '</div></div>';
                $.each(tabDt.pps,function (i,item) {
                    conDom += '<a class="ircBtn infos-role-cat-btn infos-role-cat-btn'+i+'" data-num="'+i+'">';
                    conDom += '<img class="infos-role-cat-lig" src="'+item.lig+'" alt="'+item.name+'">';
                    conDom += '<img class="infos-role-cat-pic" src="'+item.pic+'" alt="'+item.name+'">';
                    conDom += '<div class="infos-role-cat-tit"><div class="lev2">'+item.sub+item.pos+'</div><div class="lev1">'+item.name+'</div></div>';
                    conDom += '</a>';
                });
                conDom += '</div>';
                conDom += '</div></div>';
                $con.html(conDom);
                var $cat = $('#irc'),
                    $pop = $cat.find('.ircPop'),
                    $popcon = $('#ircPopCon'),
                    $inner = $('#ircPopInner');
                $cat.find('.ircBtn').on('click',function () {
                    var $this = $(this),
                        idx = $this.data('num'),
                        popDt = tabDt.pps[idx],
                        popDom = '';
                    if($this.hasClass('cur') === true){
                        return false;
                    }

                    popDom += '<div id="ircPopVideo" class="video"><a class="ircPopVideoBtn"><img src="'+popDt.video.poster+'" alt="'+popDt.name+'"></a></div>';
                    popDom += '<div class="des">'+popDt.des+'</div>';


                    $cat.find('.ircBtn').removeClass('cur');
                    $popcon.addClass('infos-role-cat-pop-context infos-role-cat-pop-context'+idx);
                    $inner.html(popDom);
                    $pop.addClass('cur');
                    $this.addClass('cur');
                    $inner.find('.ircPopVideoBtn').on('click',function () {
                        commonComponents.player('ircPopVideo',popDt.video)
                    })

                });
                $cat.find('.ircPopClose').on('click',function () {
                    $cat.find('.ircBtn').removeClass('cur');
                    $popcon.removeClass();
                    $pop.removeClass('cur');
                    $inner.html('');
                    yms.bgmAfterVideo();
                });
            }
            var conChange = {
                ir0:function (num) {
                    var conDom = '',tabDt = dt.tab[num];
                    conDom += '<div class="infos-role-srl">';
                    conDom += '<img class="infos-role-elp-bg" src="'+tabDt.pic+'" alt="'+tabDt.name+'">';
                    conDom += '<div class="infos-role-srl-con irSrlCon">';
                    conDom += '<div id="ireList" class="clearfix infos-role-elp-list">';
                    $.each(tabDt.pps,function (i,item) {
                        conDom += '<div class="infos-role-elp-box infos-role-elp-box'+i+' ireBox'+i+'">';
                        conDom += '<div class="infos-role-elp-top">';
                        conDom += '<h5>'+item.name+'</h5>';
                        conDom += '<p>'+item.sub+item.pos+'</p>';
                        conDom += '<div class="infos-role-elp-btn ireBtn" data-num="'+i+'"><img src="'+item.pic+'" alt="'+item.name+'">';
                        conDom += '<div class="bd"></div><img src="'+item.pic+'" alt="'+item.name+'">';
                        conDom += '</div></div>';
                        conDom += '<div class="infos-role-elp-pop irePop"></div>';
                        conDom += '</div>';
                    });
                    conDom += '</div>';
                    conDom += '</div></div>';
                    $con.html(conDom);
                    var $list = $('#ireList');
                    function showPop(num) {
                        var tarBox = $list.find('.ireBox'+num),
                            popDom = '';
                        if(tabDt.pps[num].video.novd === true){
                            popDom += '<div id="irePopVideo" class="video"><img src="'+tabDt.pps[num].video.poster+'" alt="'+tabDt.pps[num].name+'"></div>';
                        }else{
                            popDom += '<div id="irePopVideo" class="video"><a class="infos-role-elp-pop-vdb irePopVideoBtn"><img src="'+tabDt.pps[num].video.poster+'" alt="'+tabDt.pps[num].name+'"></a></div>';
                        }
                        popDom += '<div class="des">'+tabDt.pps[num].des+'</div>';
                        $list.find('.irePop').removeClass('cur').html('');
                        $list.find('.ireBtn').removeClass('cur');
                        tarBox.find('.irePop').addClass('cur').html(popDom);
                        tarBox.find('.ireBtn').addClass('cur');
                        tarBox.find('.irePopVideoBtn').on('click',function () {
                            commonComponents.player('irePopVideo',tabDt.pps[num].video)
                        })
                    }
                    $list.find('.ireBtn').on('click',function () {
                        var $this = $(this),num = $this.data('num');
                        showPop(num);
                    });
                    showPop(0);
                },
                ir1:function (num) {
                    horPic(num);
                },
                ir2:function (num) {
                    horPic(num);
                }
            };
            function selectTab(idx) {
                var $nav = $area.find('.infosRoleNav'),
                    $idx = $nav.eq(idx),
                    fnc = $idx.data('fnc');
                $nav.removeClass('cur');
                $idx.addClass('cur');
                conChange[fnc](idx);
                commonComponents.horWheel($('.irSrlCon'));
            }
            $area.find('.infosRoleNav').on('click',function () {
                var $ts = $(this),idx = $ts.index();
                selectTab(idx);
                yms.bgmAfterVideo();
            });
            selectTab(1);
        },
        skill:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-skill" id="infosSkill">';
            tmpDom += '<div class="infos-skill-tab">';
            tmpDom += '<div class="infos-skill-tab-con" id="istCon"></div>';

            tmpDom += '<div class="infos-skill-tab-nav">';
            $.each(dt.sks,function (i,item) {
                tmpDom += '<div class="ist-group istGroup istGroup'+i+'">';
                tmpDom += '<img class="icons icons'+i+'" src="'+item.icon+'" alt="'+i+'">';
                tmpDom += '<ul class="clearfix">';
                for(var j = 0;j<item.num;j++){
                    tmpDom += '<li>';
                    tmpDom += '<a class="istItem istItem'+j+'" data-group="'+i+'" data-item="'+j+'"><img src="'+dt.path+'sk'+i+j+'.png" alt="'+j+'"></a>';
                    tmpDom += '</li>';
                }
                tmpDom += '</ul>';
                tmpDom += '</div>';
            });
            tmpDom += '</div>';

            tmpDom += '</div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosSkill'),$istCon = $('#istCon');
            function chooseNav(gp,eh) {
                var $group = $area.find('.istGroup'+gp);
                $area.find('.istGroup,.istItem').removeClass('cur');
                $group.addClass('cur').find('.istItem'+eh).addClass('cur');
                $istCon.html('<img src="'+dt.path+'sk'+gp+eh+'.jpg" alt="'+gp+eh+'">')
            }
            $area.find('.istItem').on('click',function () {
                var $this = $(this),gp = $this.data('group'),eh = $this.data('item');
                chooseNav(gp,eh);
            });
            chooseNav(0,0);
        },
        arms:function (dt,tar) {
            var tmpDom = '',tmpNavDom='',tmpNavLinkDom = '';
            tmpDom += '<div class="infos-com infos-arms" id="infosArms">';

            tmpDom += '<div class="infos-arms-con" id="infosArmsCon"></div>';
            tmpDom += '<div class="infos-arms-nav">';
            tmpNavLinkDom += '<div class="clearfix ian-link" id="infosArmsLinks">';
            tmpNavDom += '<div class="ian-scl ianScl">';
            $.each(dt.list,function (i,item) {
                tmpNavLinkDom += '<a class="ian-link'+item.id+'"></a>';
                tmpNavDom += '<div class="ian-group ianGroup ianGroup'+i+'">';
                tmpNavDom += '<h5>'+item.name+'</h5>';
                for (var j = 0;j<item.num;j++){
                    if(j < 10){
                        j = '0'+j;
                    }
                    j = j + '';
                    var btnKey = item.id+''+j;
                    tmpNavDom += '<a class="ianBtn ianBtn'+btnKey+'" data-iankey="'+btnKey+'"><img src="'+dt.path+'arms-g'+btnKey+'.png" alt="'+item.name+'"></a>';
                }
                tmpNavDom += '</div>';
            });
            tmpNavDom += '</div>';
            tmpNavLinkDom += '</div>';

            tmpDom += tmpNavLinkDom;
            tmpDom += tmpNavDom;
            tmpDom += '</div>';

            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosArms'),
                $link = $('#infosArmsLinks'),
                $scl = $area.find('.ianScl'),
                scTop = $scl.offset().top,
                ofTop = [],sumHeight = 0;
            $area.find('.ianGroup').each(function () {
                var $ts = $(this),
                    dtc = sumHeight;
                ofTop.push(dtc);
                sumHeight = sumHeight + $ts.height();
            });
            function isLink(sst) {
                var backVal;
                for(var gt = 0;gt<ofTop.length;gt++){
                    if(sst+200>=ofTop[gt]){
                        backVal = gt;
                    }
                }
                return backVal;
            }
            $scl.on('scroll',function () {
                $link.find('a').removeClass('cur');
                $link.find('a').eq(isLink($scl.scrollTop())).addClass('cur');
            });
            $link.find('a').on('click',function () {
                var $ts = $(this),
                    idx = $ts.index(),
                    $tarGroup = $area.find('.ianGroup'+idx);
                $link.find('a').removeClass('cur').eq(idx).addClass('cur');
                var dtc = ofTop[idx];
                $scl.animate({scrollTop:dtc},250);
            });
            $area.find('.ianBtn').on('click',function () {
                var $ts = $(this),btnkey = $ts.data('iankey');
                setCon(btnkey)
            });
            function setCon(iankey) {
                $area.find('.ianBtn').removeClass('cur');
                $area.find('.ianBtn'+iankey).addClass('cur');
                $('#infosArmsCon').html('<img src="'+dt.path+'arms-g'+iankey+'.jpg" alt="'+iankey+'">');
            }
            //default state
            setCon('000');
            $link.find('a').eq(0).addClass('cur');
        },
        tools:function (dt,tar) {
            var tmpDom = '',tmpNavDom='';
            tmpDom += '<div class="infos-com infos-tools" id="infosTools">';

            tmpDom += '<div class="infos-tools-con" id="infosToolsCon"></div>';
            tmpDom += '<div class="infos-tools-nav">';
            tmpNavDom += '<div class="itn-scl">';
            $.each(dt.list,function (i,item) {
                tmpNavDom += '<div class="itn-group itnGroup itnGroup'+item.id+'">';
                tmpNavDom += '<h5>'+item.name+'</h5><div class="clearfix">';
                for (var j = 0;j<item.num;j++){
                    if(j < 10){
                        j = '0'+j;
                    }
                    j = j + '';
                    var btnKey = item.id+''+j;
                    tmpNavDom += '<a class="itnBtn itnBtn'+btnKey+'" data-gp="'+item.id+'" data-itnkey="'+btnKey+'"><img src="'+dt.path+'tools-g'+btnKey+'.png" alt="'+item.name+'"></a>';
                }
                tmpNavDom += '</div></div>';
            });
            tmpNavDom += '</div>';

            tmpDom += tmpNavDom;
            tmpDom += '</div>';

            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosTools');
            $area.find('.itnBtn').on('click',function () {
                var $ts = $(this),btnkey = $ts.data('itnkey'),gp = $ts.data('gp');
                setCon(btnkey,gp);
            });
            function setCon(itnkey,gp) {
                $area.find('.itnBtn').removeClass('cur');
                $area.find('.itnBtn'+itnkey).addClass('cur');
                $area.find('.itnGroup').removeClass('cur');
                $area.find('.itnGroup'+gp).addClass('cur');
                $('#infosToolsCon').html('<img src="'+dt.path+'tools-g'+itnkey+'.jpg" alt="'+itnkey+'">');
            }
            //default state
            setCon('000',0);
        },
        outdoors:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-outdoors" id="infosOutdoors">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="infos-outdoors-pics">';
            $.each(dt.pics,function (i,item) {
                tmpDom += '<img src="'+item+'" alt="'+i+'">';
            });
            tmpDom += '</div></div>';
            tar.html(tmpDom);
            var $area = $('#infosOutdoors');
            setTimeout(function () {
                $area.find('.infos-outdoors-pics').addClass('cur');
            },100);
        },
        cars:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-cars" id="infosCars">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="para">'+dt.para+'</div>';
            tmpDom += '<div id="icSwp" class="swiper-container infos-cars-swp"><div class="swiper-wrapper">';
            $.each(dt.list,function (i,item) {
                tmpDom += '<div class="swiper-slide">';
                tmpDom += '<img class="pic" src="'+item.pic+'" alt="'+item.tit+'">';
                tmpDom += '<div class="insos-cars-tag"><p>'+item.tag+'</p></div>';
                tmpDom += '<div class="infos-cars-bot"><h5>'+item.tit+'</h5><div class="line"></div><div class="des">'+item.des+'</div></div>';
                tmpDom += '</div>';
            });
            tmpDom += '</div></div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            commonComponents.mouseScrollTips(tar);
            var $area = $('#infosCars');
            var mySwiper = new Swiper('#icSwp',{
                slidesPerView: 3,
                centeredSlides: true,
                mousewheel:true,
                grabCursor : true
            })
        }
    },
    infos:function (infoSource) {
        var _this=this,$infos = $('#infos'),tmpDom = '';
        function openInfo() {
            $infos.html(tmpDom);
            bindEvent();
            setTimeout(function () {
                $infos.addClass('cur')
            },50);
        }
        function closeInfo() {
            $infos.removeClass('cur');
            setTimeout(function () {
                $infos.html('');
            },300);
        }
        function showCon(tar) {
            _this.context.common(infoSource,tar);
            _this.context[tar](infoSource.list[tar],$('#infosCon'));
        }
        function createDom(mod) {
            if(typeof mod === 'undefined'){
                mod = 'map';
            }
            function buildDefault(dt,sel) {
                tmpDom = '';
                tmpDom += '<img class="bg" src="'+dt.bg+'">';
                tmpDom += '<div class="infos-main">';
                tmpDom += '<div id="infosCon" class="infos-con"></div>';
                tmpDom += '<header>';
                tmpDom += '<div class="infos-title" id="infosTitle">'+dt.list[sel].name+'</div>';
                tmpDom += '<nav>';
                $.each(dt.list,function (i,item) {
                    var activedStyle = '';
                    if(dt.list[sel].id === item.id){
                        activedStyle = 'cur ';
                    }
                    tmpDom += '<a class="'+activedStyle+'infos-nav'+item.id+' infosNav" data-tar="'+i+'"></a>';
                });
                tmpDom += '</nav>';
                tmpDom += '<a class="infos-arr infos-arr-l infosArr" data-type="prev"></a>';
                tmpDom += '<a class="infos-arr infos-arr-r infosArr" data-type="next"></a>';
                tmpDom += '</header>';
                tmpDom += '<footer><a class="i-btn-back btnInfoBack"></a></footer>';
                tmpDom += '</div>';
            }
            buildDefault(infoSource,mod);
        }
        function bindEvent() {
            var $nav = $('.infosNav');
            function setTab(idx) {
                var idxNav = $('.infosNav').eq(idx),tar = idxNav.attr('data-tar');
                $('.infosNav').removeClass('cur');
                idxNav.addClass('cur');
                showCon(tar);
            }
            function navEvent() {
                $nav.on('click',function () {
                    var $this = $(this),idx = $this.index();
                    yms.bgmAfterVideo();
                    setTab(idx);
                });
            }
            function arrEvent() {
                $('.infosArr').on('click',function () {
                    var $this = $(this),$type = $this.attr('data-type'),
                        idx = $('.infosNav.cur').index(),tarIdx;
                    if($type === 'next'){
                        tarIdx = idx+1;
                        if(tarIdx === 8){
                            tarIdx = 0;
                        }
                    }else if($type === 'prev'){
                        tarIdx = idx-1;
                        if(tarIdx < 0){
                            tarIdx = 7;
                        }
                    }
                    $infos.find('.infosNav').eq(tarIdx).trigger('click');
                });
            }
            navEvent();
            arrEvent();
        }
        $(document).on('click','.btnInfo',function () {
            var $this = $(this),btnMod = $this.attr('data-mod');
            if(typeof btnMod === 'undefined'){
                btnMod = 'map';
            }
            createDom(btnMod);
            openInfo();
            showCon(btnMod)
        });
        $(document).on('click','.btnInfoBack',function () {
            closeInfo();
            yms.bgmAfterVideo();
        });
    },
    init:function () {
        var _this = this;
        $.ajax({
            dataType:'script',
            url:'http://j.gamersky.com/zq/farcry5/infos.data.js',
            success:function () {
                var infoSource = backInfoSource;
                _this.infos(infoSource);
            }
        });
    }
};