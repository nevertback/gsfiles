var $gsdMenu = $('#gsDgyMenu'),gsDgyMenu,gsDgyMenuBgTimer;
gsDgyMenu = {
    addBackground:function(){
        var vDom = '';
        vDom += '<div class="gsd-menu-video gsdMenuVideo">';
        vDom += '</div>';
        return vDom;
    },
    addMain:function(){
        var vDom = '';
        vDom += '<div class="gsd-menu-main gsdMenuMain cur">';
        vDom += '</div>';
        return vDom;
    },
    changeBgVideo:function(src){
        var vDom = '',$vd = $gsdMenu.find('.gsdMenuVideo');
        clearTimeout(gsDgyMenuBgTimer);
        vDom += '<video src="'+src+'" autoplay loop muted></video>';
        $vd.removeClass('cur');
        gsDgyMenuBgTimer = setTimeout(function () {
            $vd.html(vDom).addClass('cur');
        },250);
    },
    changeTab:function(dt,sel){
        var _this = this,tabFnc;
        function createInnerTab(innerTabDt) {
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-innertab gsMenuTabInner">';
            $.each(innerTabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                vDomNav += '<a class="gsd-menu-innertab-nav'+i+isCur+'" data-idx="'+i+'">';
                vDomNav += '<img class="holder" src="'+item.nav.hld+'" alt="innerNav">';
                vDomNav += '<img class="light" src="'+item.nav.lgt+'" alt="innerNav">';
                vDomNav += '</a>';
                vDomList += '<div class="gsd-menu-innertab-box-item gsMenuTabInnerBoxItem'+isCur+'">';
                vDomList += '<img class="box-pic gsdMenuLazy" src="//image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.box.pic+'" alt="innerBox">';
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-innertab-box gsMenuTabInnerBox">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-innertab-nav gsMenuTabInnerNav">';
            vDom += vDomNav;
            vDom += '</div>';

            vDom += '</div>';
            return vDom;
        }
        function createTab(tabDt){
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-tab gsMenuTab">';
            $.each(tabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                vDomNav += '<a class="'+isCur+'" data-bg="'+item.bgVideo+'">';
                vDomNav += '<img src="'+item.navPic+'" alt="'+item.nav+'">';
                vDomNav += '</a>';
                vDomList += '<div class="gsd-menu-tab-list-item gsMenuTabListItem'+isCur+'">';
                vDomList += createInnerTab(item.list);
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-tab-list gsMenuTabList">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-tab-nav gsMenuTabNav">';
            vDom += vDomNav;
            vDom += '</div>';

            vDom += '</div>';
            return vDom;
        }
        function createInnerTab2(innerTabDt,tit) {
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-innertab gsMenuTabInner">';
            $.each(innerTabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                if(typeof item.nav.group !== "undefined"){
                    vDomNav += '<div class="gsd-menu-innertab-nav-group">'+item.nav.group+'</div>';
                }
                vDomNav += '<a class="gsd-menu-innertab-nav'+i+isCur+'" data-idx="'+i+'">';
                vDomNav += '<span>'+item.nav.txt+'</span>';
                vDomNav += '</a>';
                vDomList += '<div class="gsd-menu-innertab-box-item gsMenuTabInnerBoxItem'+isCur+'">';
                vDomList += '<img class="box-pic gsdMenuLazy" src="//image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.box.pic+'" alt="innerBox">';
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-innertab-box gsMenuTabInnerBox">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-innertab-nav gsMenuTabInnerNav">';
            vDom += '<div class="gsd-menu-innertab-nav-scl">';
            vDom += vDomNav;
            vDom += '</div></div>';
            vDom += '<div class="gsd-menu-innertab-title">'+tit+'</div>';

            vDom += '</div>';
            return vDom;
        }
        function createTab2(tabDt){
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-tab gsMenuTab">';
            $.each(tabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                vDomNav += '<a class="'+isCur+'">';
                vDomNav += '<img src="'+item.navPic+'" alt="'+item.nav+'">';
                vDomNav += '</a>';
                vDomList += '<div class="gsd-menu-tab-list-item gsMenuTabListItem'+isCur+'">';
                if(item.list.length>0){
                    vDomList += createInnerTab2(item.list,item.nav);
                }else{
                    vDomList += '<div class="gsd-menu-innertab"><div class="gsd-menu-innertab-nav"><div class="gsd-menu-innertab-nav-scl">';
                    vDomList += '<div class="gsd-menu-innertab-nav-null">'+item.nullCon+'</div>';
                    vDomList += '</div></div>';
                    vDomList += '<div class="gsd-menu-innertab-title">'+item.nav+'</div></div>';
                }
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-tab-list gsMenuTabList">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-tab-nav gsMenuTabNav">';
            vDom += vDomNav;
            vDom += '</div>';

            vDom += '</div>';
            return vDom;
        }
        function createInnerTabSkill(innerTabDt,num) {
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-innertab gsd-menu-innertab'+num+' gsMenuTabInner">';
            $.each(innerTabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                vDomNav += '<a class="gsd-menu-skill-nav'+i+isCur+'" data-idx="'+i+'"></a>';
                vDomList += '<div class="gsd-menu-innertab-box-item gsMenuTabInnerBoxItem'+isCur+'">';
                vDomList += '<div class="gsd-menu-skill-infos">';
                vDomList += '<div class="title">'+item.tit+'</div>';
                vDomList += '<div class="pic"><img class="gsdMenuLazy" src="//image.gamersky.com/webimg13/zhuanti/common/blank.png" data-src="'+item.pic+'" alt="innerBox"></div>';
                vDomList += '<div class="des"><p>'+item.des+'</p></div>';
                vDomList += '<div class="state">'+item.state+'</div>';
                vDomList += '<div class="plus">';
                vDomList += '<div class="plus-title">额外加成</div>';
                vDomList += '<div class="plus-info"><p>'+item.plus.info+'</p></div>';
                if(typeof item.plus.need !== "undefined"){
                    vDomList += '<div class="plus-need">需要<span>'+item.plus.need+'</span><i><b>'+item.plus.num+'</b>/'+item.plus.numTotal+'</i></div>';
                }
                vDomList += '</div>';
                vDomList += '</div>';
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-innertab-box gsMenuTabInnerBox">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-innertab-nav gsMenuTabInnerNav">';
            vDom += vDomNav;
            vDom += '</div>';

            vDom += '</div>';
            return vDom;
        }
        function createTabSkill(tabDt){
            var vDom = '',vDomNav = '',vDomList = '';
            vDom += '<div class="gsd-menu-tab gsMenuTab">';
            $.each(tabDt,function (i,item) {
                var isCur = '';
                isCur = i===0?' cur':'';
                vDomNav += '<a class="'+isCur+'">';
                vDomNav += '<img src="'+item.navPic+'" alt="'+item.nav+'">';
                vDomNav += '</a>';
                vDomList += '<div class="gsd-menu-tab-list-item gsMenuTabListItem'+isCur+'">';
                vDomList += '<img class="gsd-menu-tab-list-item-bg" src="'+item.navBg+'" alt="bg">';
                vDomList += createInnerTabSkill(item.list,i);
                vDomList += '</div>';
            });
            vDom += '<div class="gsd-menu-tab-list gsMenuTabList">';
            vDom += vDomList;
            vDom += '</div>';
            vDom += '<div class="gsd-menu-tab-nav gsMenuTabNav">';
            vDom += vDomNav;
            vDom += '</div>';

            vDom += '</div>';
            return vDom;
        }
        function loadLazyImg(loadArea) {
            loadArea.find('.gsdMenuLazy').each(function () {
                var $t = $(this),tmpSrc = $t.data('src'),isLoad = $t.attr('data-loaded');
                if(isLoad !== 'ok'){
                    $t.attr({
                        src:tmpSrc,
                        'data-loaded':'ok'
                    });
                }
            });
        }
        function changeTabInner($dad){
            var $tab = $dad.find('.gsMenuTabInner'),
                $nav = $tab.find('.gsMenuTabInnerNav'),
                $list = $dad.find('.gsMenuTabInnerBox'),
                tabInnerTimer;
            $nav.find('a').on({
                mouseover:function () {
                    var $ts = $(this),idx = $ts.data('idx');
                    tabInnerTimer = setTimeout(function () {
                        $nav.find('a').removeClass('cur').eq(idx).addClass('cur');
                        $list.find('.gsMenuTabInnerBoxItem').removeClass('cur').eq(idx).addClass('cur');
                        loadLazyImg($list.find('.gsMenuTabInnerBoxItem').eq(idx));
                    },120);
                },
                mouseout:function () {
                    clearTimeout(tabInnerTimer);
                }
            })
        }
        function changeTab($dad){
            var $tab = $dad.find('.gsMenuTab'),
                $nav = $tab.find('.gsMenuTabNav'),
                $list = $dad.find('.gsMenuTabList'),
                tabTimer;
            $nav.find('a').on({
                mouseover:function () {
                    var $ts = $(this),idx = $ts.index(),bgVd = $ts.data('bg');
                    if($ts.hasClass('cur') === false){
                        tabTimer = setTimeout(function () {
                            $nav.find('a').removeClass('cur').eq(idx).addClass('cur');
                            $list.find('.gsMenuTabListItem').removeClass('cur').eq(idx).addClass('cur');
                            if(typeof bgVd === 'string'){
                                _this.changeBgVideo(bgVd);
                            }
                            loadLazyImg($dad.find('.gsMenuTabListItem').eq(idx).find('.gsMenuTabInnerBoxItem').eq(0));
                        },120);
                    }

                },
                mouseout:function () {
                    clearTimeout(tabTimer);
                }
            });
            $dad.find('.gsMenuTabListItem').each(function () {
                changeTabInner($(this));
            });

            loadLazyImg($dad.find('.gsMenuTabListItem').eq(0).find('.gsMenuTabInnerBoxItem').eq(0));
        }
        tabFnc = {
            weapon:function(){
                var selDt = dt.items[sel];
                _this.changeBgVideo(selDt.bgVideo);
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-context-sty1 gsd-menu-weapon gsdMenuWeapon">';
                vDom += createTab(selDt.tabs);
                vDom += '<div class="gsd-menu-title">'+selDt.title+'</div>';
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuWeapon'));
            },
            suit:function(){
                var selDt = dt.items[sel];
                _this.changeBgVideo(selDt.bgVideo);
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-context-sty1 gsd-menu-suit gsdMenuSuit">';
                vDom += createTab(selDt.tabs);
                vDom += '<div class="gsd-menu-title">'+selDt.title+'</div>';
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuSuit'));
            },
            skill:function(){
                var selDt = dt.items[sel];
                _this.changeBgVideo(selDt.bgVideo);
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-skill gsdMenuSkill">';
                vDom += createTabSkill(selDt.tabs);
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuSkill'));
            },
            map:function(){
                var selDt = dt.items[sel];
                _this.changeBgVideo(selDt.bgVideo);
                $gsdMenu.find('.gsdMenuMain').html('');
            },
            aim:function(){
                var selDt = dt.items[sel];
                $gsdMenu.find('.gsdMenuVideo').html('');
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-context-sty3 gsd-menu-aim gsdMenuAim">';
                vDom += '<img class="gsd-menu-bg" src="'+selDt.bgPic+'" alt="bg">';
                vDom += createTab2(selDt.tabs);
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuAim'));
            },
            law:function(){
                var selDt = dt.items[sel];
                $gsdMenu.find('.gsdMenuVideo').html('');
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-context-sty3 gsd-menu-law gsdMenuLow">';
                vDom += '<img class="gsd-menu-bg" src="'+selDt.bgPic+'" alt="bg">';
                vDom += createTab2(selDt.tabs);
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuLow'));
            },
            resource:function(){
                var selDt = dt.items[sel];
                _this.changeBgVideo(selDt.bgVideo);
                var vDom = '';
                vDom += '<div class="gsd-menu-context gsd-menu-context-sty3 gsd-menu-resource gsdMenuResource">';
                vDom += createTab2(selDt.tabs);
                vDom += '</div>';
                $gsdMenu.find('.gsdMenuMain').html(vDom);
                changeTab($gsdMenu.find('.gsdMenuResource'));
            }
        };
        tabFnc[sel]();
    },
    addHead:function(dt){
        var vDom = '';
        vDom += '<div class="gsd-menu-head">';
        vDom += '<div class="clearfix gsd-menu-head-buttons">';
        $.each(dt.items,function (i,item) {
            var sty = '';
            if(i === gsDgyConfig.menu.select){
                sty = ' cur';
            }else{
                sty = '';
            }
            vDom += '<a class="gsd-menu-btn gsdMenuBtn'+sty+'" data-tab="'+i+'">'+item.title+'</a>';
        });
        vDom += '</div>';
        vDom += '<a class="gsd-menu-foot-back gsdMenuBack"></a>';
        vDom += '</div>';
        return vDom;
    },
    addFoot:function(){
        var vDom = '';
        vDom += '<div class="gsd-menu-foot">';
        vDom += '</div>';
        return vDom;
    },
    bindButton:function(dt){
        var _this = this,menuTimer,menuAnimTimer,$menuMain = $gsdMenu.find('.gsdMenuMain');
        $gsdMenu.on('click','.gsdMenuBack',function () {
            gsDgyMenu.close();
        });
        $gsdMenu.find('.gsdMenuBtn').on({
            click:function () {
                var $ts = $(this),tab = $ts.data('tab');
                if($ts.hasClass('cur') === false){
                    $menuMain.removeClass('cur');
                    $gsdMenu.find('.gsdMenuBtn').removeClass('cur');
                    $ts.addClass('cur');
                    clearTimeout(menuAnimTimer);
                    menuAnimTimer = setTimeout(function () {
                        _this.changeTab(dt,tab);
                        $menuMain.addClass('cur');
                    },250);
                }
            }
        });
        /*
        $gsdMenu.find('.gsdMenuBtn').on({
            mouseover:function () {
                var $ts = $(this),tab = $ts.data('tab');
                if($ts.hasClass('cur') === false){
                    menuTimer = setTimeout(function () {
                        $menuMain.removeClass('cur');
                        $gsdMenu.find('.gsdMenuBtn').removeClass('cur');
                        $ts.addClass('cur');
                        clearTimeout(menuAnimTimer);
                        menuAnimTimer = setTimeout(function () {
                            _this.changeTab(dt,tab);
                            $menuMain.addClass('cur');
                        },250);
                    },120);
                }
            },
            mouseout:function () {
                clearTimeout(menuTimer);
            }
        });
        */
    },
    close:function(){
        $gsdMenu.html('').removeClass('cur');
        $gsdMenu.removeClass('cur');
        gsDgyMethods.flowPoClose();
    },
    open:function(tar){
        var _this = this,selected = gsDgyConfig.menu.select;
        $.getScript(gsDgyConfig.menu.data,function () {
            var vDom = '',dt = gsDgyMenuData;
            if(typeof tar !== 'undefined'){
                gsDgyConfig.menu.select = tar;
            }
            selected = gsDgyConfig.menu.select;
            vDom += '<div class="gsd-menu">';
            vDom += _this.addBackground();
            vDom += _this.addMain();
            vDom += _this.addHead(dt);
            vDom += _this.addFoot();
            vDom += '</div>';
            $gsdMenu.html(vDom).addClass('cur');
            _this.bindButton(dt,selected);
            _this.changeTab(dt,selected);
            gsDgyMethods.flowPopOpen();
        });
    },
    init:function () {
        this.open();
    }
};