var gsDgyConfig = {
    env:'dev',
    ieForbiddenVer:11,
    baseSize:{
        w:1920,
        h:1080
    },
    commentOpen:true,
    countid:1038357,
    bgm:{
        txt:['打开声音','关闭声音'],
        nowplay:'',
        mute:true,
        volClk:false,
        isVideoPlaying:false
    },
    staticUrl:{
        channel:'//www.gamersky.com/zl/preview/',
        club:'//i.gamersky.com/club/2',
        ku:'',
        pc:''
    },
    menu:{
        data:'//j.gamersky.com/zq/godofwar4/menu.data.js',
        select:'weapon'
    },
    isCommOpen:false
};
var gsdsPath1 = '//img7.gamersky.com/zqimg/dgy/godofwar4/',gsdsPath2 = '//img7.gamersky.com/zqimg/dgy/godofwar4/',gsDgySource;
gsDgySource = {
    bgm:{
        start:gsdsPath1+'ztmedia/bgm.mp3'
    },
    page:{
        gsdCommon:{
            slogan:gsdsPath1+'ztimages/slogan.png'
        },
        gsdLoad:{
            logo1:gsdsPath1+'ztimages/ld-logo.png',
            logo2:gsdsPath1+'ztimages/ld-logo-g.png'
        },
        gsdStart:{
            bg:gsdsPath1+'ztimages/gsdStart.jpg',
            vd:gsdsPath1+'ztmedia/bg-start.mp4'
        },
        gsdEnd:{
            bg:gsdsPath1+'ztimages/gsdEnd.jpg',
            vd:gsdsPath1+'ztmedia/bg-end.mp4',
            maker:{
                con:'<h5>内容策划</h5><p>FoxJR、短笛酱</p><h5>视觉设计</h5><p>Drakedooog、MrrrTian</p>'
            }
        },
        gsdBuy:{
            bg:gsdsPath1+'ztimages/gsdEnd.jpg',
            vd:gsdsPath2+'ztmedia/bg-buy.mp4',
            logo:gsdsPath1+'ztimages/buy-logo.png',
            role:{
                b:gsdsPath1+'ztimages/buy-role-b.png',
                s:gsdsPath1+'ztimages/buy-role-s.png'
            },
            sld:[
                {
                    tit:'数字标准版',
                    pic:gsdsPath1+'ztimages/ver0.png',
                    big:gsdsPath1+'ztimages/ver0b.png',
                    url:'https://store.playstation.com/zh-hant-hk/product/HP9000-CUSA07413_00-00000000GODOFWAR'
                },
                {
                    tit:'收藏版',
                    pic:gsdsPath1+'ztimages/ver1.png',
                    big:gsdsPath1+'ztimages/ver1b.png',
                    url:'https://www.amazon.com/God-War-Collectors-PlayStation-4/dp/B0797CKXC4/ref=sr_1_3?s=videogames&ie=UTF8&qid=1524130739&sr=1-3&keywords=god+of+war'
                },
                {
                    tit:'石匠限定版',
                    pic:gsdsPath1+'ztimages/ver2.png',
                    big:gsdsPath1+'ztimages/ver2b.png',
                    url:'https://www.amazon.com/God-War-Stone-Masons-PlayStation-4/dp/B0792SPV9J/ref=sr_1_2?s=videogames&ie=UTF8&qid=1524126534&sr=1-2&keywords=god+of+war'
                },
                {
                    tit:'数字豪华版',
                    pic:gsdsPath1+'ztimages/ver3.png',
                    big:gsdsPath1+'ztimages/ver3b.png',
                    url:'https://store.playstation.com/zh-hant-hk/product/HP9000-CUSA07413_00-GODOFWARDDE00000'
                }
            ]
        },
        gsdStory:{
            vd:'XMzU1MDA1NTA3Mg'
        }
    },
    flow:{
        gsdFlow01:{
            vd:gsdsPath1+'ztmedia/flow/flow01.mp4'
        },
        gsdFlow02:{
            vd1:gsdsPath2+'ztmedia/flow/flow02.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow02loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'r',
                    showTime:35.2,
                    txt:'按<span>R</span>键砍树'
                }
            ]
        },
        gsdFlow03:{
            vd1:gsdsPath2+'ztmedia/flow/flow03.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow03loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'r',
                    showTime:4,
                    txt:'按<span>R</span>键砍树'
                }
            ]
        },
        gsdFlow04:{
            vd1:gsdsPath1+'ztmedia/flow/flow041.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow042loop.mp4',
            vd3:gsdsPath2+'ztmedia/flow/flow043.mp4',
            vd4:gsdsPath2+'ztmedia/flow/flow044loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'w',
                    showTime:85,
                    txt:'按住<span>W</span>前进'
                },
                {
                    tid:1,
                    downKey:'r',
                    showTime:10,
                    txt:'按<span>R</span>上船'
                }
            ]
        },
        gsdFlow05:{
            vd1:gsdsPath1+'ztmedia/flow/flow051.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow052loop.mp4',
            vd3:gsdsPath2+'ztmedia/flow/flow053.mp4',
            vd4:gsdsPath2+'ztmedia/flow/flow054loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'w',
                    showTime:37,
                    txt:'按住<span>W</span>前进'
                },
                {
                    tid:1,
                    downKey:'r',
                    showTime:27,
                    txt:'按<span>R</span>下船'
                }
            ]
        },
        gsdFlow06:{
            vd1:gsdsPath1+'ztmedia/flow/flow061.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow062loop.mp4',
            vd3:gsdsPath2+'ztmedia/flow/flow063.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'w',
                    showTime:34,
                    txt:'按住<span>W</span>前进'
                }
            ]
        },
        gsdFlow07:{
            vd1:gsdsPath1+'ztmedia/flow/flow071.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow072loop.mp4',
            vd3:gsdsPath2+'ztmedia/flow/flow073.mp4',
            vd4:gsdsPath2+'ztmedia/flow/flow074loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'w',
                    showTime:281.8,
                    txt:'按住<span>W</span>前进'
                },
                {
                    tid:1,
                    downKey:'r',
                    showTime:37.3,
                    txt:'按下<span>R</span>跳过裂隙'
                }
            ]
        },
        gsdFlow08:{
            vd1:gsdsPath1+'ztmedia/flow/flow08.mp4',
            vd2:gsdsPath2+'ztmedia/flow/flow08loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'r',
                    showTime:14.1,
                    txt:'按<span>R</span>跳跃物体'
                }
            ]
        },
        gsdFlow09:{
            vd1:gsdsPath2+'ztmedia/flow/flow09.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow09loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'e',
                    showTime:28,
                    txt:'按下<span>E</span>装备利维坦之斧子'
                }
            ]
        },
        gsdFlow10:{
            vd1:gsdsPath1+'ztmedia/flow/flow10.mp4',
            vd2:gsdsPath2+'ztmedia/flow/flow10loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'q',
                    showTime:0.3,
                    txt:'按<span>Q</span>以瞄准'
                }
            ]
        },
        gsdFlow11:{
            vd1:gsdsPath2+'ztmedia/flow/flow11.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow11loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'t',
                    showTime:0.2,
                    txt:'按下<span>T</span>抛出斧头'
                }
            ]
        },
        gsdFlow12:{
            vd1:gsdsPath1+'ztmedia/flow/flow12.mp4',
            vd2:gsdsPath2+'ztmedia/flow/flow12loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'b',
                    showTime:5.3,
                    txt:'按下<span>B</span>召回斧头'
                }
            ]
        },
        gsdFlow13:{
            vd1:gsdsPath2+'ztmedia/flow/flow13.mp4',
            vd2:gsdsPath1+'ztmedia/flow/flow13loop.mp4',
            tips:[
                {
                    tid:0,
                    downKey:'r',
                    showTime:10,
                    txt:'按下<span>R</span>跳过裂隙'
                }
            ]
        },
        gsdFlow14:{
            vd:gsdsPath1+'ztmedia/flow/flow14.mp4'
        }
    }
};
var changePageTimer,gsDgyMethods;
gsDgyMethods = {
    ieForbidden:function (ieVer) {
        var sbie = $.browser.msie,
            ver = parseInt($.browser.version);
        if(sbie === true && ver < ieVer){
            $('html').addClass('ie-forbidden');
        }
    },
    setMainSize:function(){
        var $w = $(window),$main = $('#gsDgyMain'),
            bw = gsDgyConfig.baseSize.w,bh = gsDgyConfig.baseSize.h,
            ww = $w.width(),wh = $w.height(),scaleRio;
        if(ww > wh/bh*bw){
            scaleRio = wh/bh;
            $main.css({
                'transform-origin':'50% 0',
                'left':'50%',
                'top':'0',
                'margin-left':'-'+bw/2+'px',
                'margin-top':'0'
            });
        }else{
            scaleRio = ww/bw;
            $main.css({
                'transform-origin':'0 50%',
                'top':'50%',
                'left':'0',
                'margin-left':'0',
                'margin-top':'-'+bh/2+'px'
            });
        }
        $main.css({
            'width':bw+'px',
            'height':bh+'px',
            'transform':'scale('+scaleRio+')'
        });
    },
    fullScreen:function(){
        if (screenfull.enabled) {
            screenfull.request();
        }
    },
    bindKey:function (key,callback) {
        var keyCodeNum={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,space:32,tab:9,shift:16,k1:49,k2:50,k3:51,k4:52,k5:53,k6:54};
        $(document).on({
            'keydown':function (event) {
                if(gsDgyConfig.isCommOpen === false){
                    var e = event ? event : window.event;
                    var ekc = e.keyCode;
                    if(ekc === 97){
                        ekc = 49;
                    }else if(ekc === 98){
                        ekc = 50;
                    }else if(ekc === 99){
                        ekc = 51;
                    }else if(ekc === 100){
                        ekc = 52;
                    }else if(ekc === 101){
                        ekc = 53;
                    }else if(ekc === 102){
                        ekc = 54;
                    }
                    if(ekc === keyCodeNum[key]){
                        $(document).off();
                        if(typeof callback === 'function'){
                            callback();
                        }
                    }
                }
            }
        });
    },
    bindKeyHold:function (key,callback1,callback2) {
        var keyCodeNum={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,space:32,tab:9,shift:16,k1:49,k2:50,k3:51,k4:52,k5:53,k6:54};
        $(document).on({
            keydown:function (event) {
                if(gsDgyConfig.isCommOpen === false){
                    var e = event ? event : window.event;
                    var ekc = e.keyCode;
                    if(ekc === 97){
                        ekc = 49;
                    }else if(ekc === 98){
                        ekc = 50;
                    }else if(ekc === 99){
                        ekc = 51;
                    }else if(ekc === 100){
                        ekc = 52;
                    }else if(ekc === 101){
                        ekc = 53;
                    }else if(ekc === 102){
                        ekc = 54;
                    }
                    if(ekc === keyCodeNum[key]){
                        if(typeof callback1 === 'function'){
                            callback1();
                        }
                    }
                }
            },
            keyup:function () {
                if(typeof callback2 === 'function'){
                    callback2();
                }
            }
        });
        $(window).on({
            blur:function(){
                if(typeof callback2 === 'function'){
                    callback2();
                }
            }
        })

    },
    keyBdButton:function (key,tar,callback) {
        function buttonEvent() {
            if(typeof callback === 'function'){
                callback();
            }
        }
        gsDgyMethods.bindKey(key,function () {
            buttonEvent();
        });
        tar.on('click',function(){
            buttonEvent();
        });
    },
    bgmSet:function(bgmsrc){
        if(gsDgyConfig.bgm.nowplay !== bgmsrc){
            gsDgyConfig.bgm.nowplay = bgmsrc;
            $('#bgm').attr('src',bgmsrc);
            if(gsDgyConfig.bgm.userMute !== true){
                this.bgmPlay();
            }
        }
    },
    bgmBtn:function(tar){
        var thObj = this;
        $('#gsDgyMain').on('click',tar,function(){
            if(gsDgyConfig.bgm.volClk){
                gsDgyConfig.bgm.userMute = true;
                thObj.bgmPause();
            }else{
                gsDgyConfig.bgm.userMute = false;
                thObj.bgmPlay();
            }
        });
    },
    bgmPlay:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.gsDgyMusic');
        bgmId.play();
        gsDgyConfig.bgm.volClk = true;
        $bgmVol.removeClass('pause').addClass('cur').find('span').text(gsDgyConfig.bgm.txt[1]);
        bgmId.volume = 1;
    },
    bgmPause:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.gsDgyMusic');
        bgmId.pause();
        gsDgyConfig.bgm.volClk = false;
        $bgmVol.addClass('pause').find('span').text(gsDgyConfig.bgm.txt[0]);
    },
    bgmBeforeVideo:function () {
        gsDgyConfig.bgm.isVideoPlaying = true;
        this.bgmPause();
    },
    bgmAfterVideo:function () {
        gsDgyConfig.bgm.isVideoPlaying = false;
        if(gsDgyConfig.bgm.userMute !== true){
            this.bgmPlay();
        }
    },
    htFun:function(){
        var thObj = this;
        $(window).on({
            'blur':function(){
                thObj.bgmPause();
            },
            'focus':function(){
                if(gsDgyConfig.bgm.mute !== true && gsDgyConfig.bgm.isVideoPlaying !==true){
                    thObj.bgmPlay();
                }
            }
        });
    },
    baiduShare:function(addClass){
        var vDom = '';
        vDom += '<div class="bdsharewrap bdstyle-c '+addClass+'"><div class="bdsharebuttonbox bdshare-button-style0-16" data-tag="share_1" data-bd-bind="1446461622481"><a target="_self" class="bdicons bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bdicons bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bdicons bds_sqq" data-cmd="sqq" title="分享到QQ"></a><a class="bdicons bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bdicons bds_tieba" data-cmd="tieba" title="分享到贴吧"></a><a class="bdicons bds_renren" data-cmd="renren" title="分享到人人"></a><a class="bdicons bds_douban" data-cmd="douban" title="分享到豆瓣"></a><a class="bdicons bds_more" data-cmd="more"></a><a class="bds_count" data-cmd="count" title=""></a></div></div>';
        return vDom;
    },
    changePage:function(vDom,callback){
        var _this = this,$pa = $('#gsDgyPage');
        function beforeChage(){
            $pa.removeClass('cur');
        }
        function afterChange(){
            //todo 翻页后事件
        }
        clearTimeout(changePageTimer);
        beforeChage();
        changePageTimer = setTimeout(function(){
            $pa.html(vDom).addClass('cur');
            callback($pa);
            afterChange();
        },400);
    },
    flowPopOpen:function(){
        if(gsDgyConfig.bgm.userMute !== true){
            gsDgyMethods.bgmPlay();
        }
        $('#gsDgyMain').find('video').attr('mute',true);
    },
    flowPoClose:function(){
        if(gsDgyConfig.bgm.isVideoPlaying === true){
            gsDgyMethods.bgmPause();
        }
        $('#gsDgyMain').find('video').attr('mute',false);
    },
    commInit:function(){
        var $commArea = $('#gsDgyComment'),vDom = '';
        function commentAdd(){
            var doc = document,
                s = doc.createElement('script'),
                h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
            s.type = 'text/javascript';
            s.charset = 'utf-8';
            s.src = '//j.gamersky.com/web2015/comment/js/commentconfig.js';
            h.insertBefore(s, h.firstChild);
            window.SCS_NO_IFRAME = true;
        }
        function createComm(){
            var cDom = '';
            cDom += '';
            cDom += '<div class="gsd-comment hei">';
            cDom += '<div class="gsd-comment-scl gsdCommentScl"><div class="gsd-comment-context">';
            cDom += '<div class="gsd-comment-context-area" id="SOHUCS" sid="'+gsDgyConfig.countid+'"></div>';
            cDom += '</div></div>';
            cDom += '<a class="gsd-comment-close gsdCommentClose"></a>';
            cDom += '</div>';
            return cDom;
        }
        vDom += createComm();
        $commArea.html(vDom);
        if(gsDgyConfig.commentOpen === true){
            commentAdd();
        }
        function commentShow(){
            gsDgyConfig.isCommOpen = true;
            $("#SOHUCS").GetComment();
            $commArea.addClass('cur');
            gsDgyMethods.flowPopOpen();
        }
        function commentHide(){
            gsDgyConfig.isCommOpen = false;
            $commArea.removeClass('cur');
            gsDgyMethods.flowPoClose();
        }
        var $gm = $('#gsDgyMain');
        $gm.on('click','.gsdBtnComm',function () {
            commentShow();
        });
        $commArea.on('click','.gsdCommentClose',function () {
            commentHide();
        });
        $commArea.on('click','.cmt-commentbtn',function () {
            $commArea.find('.gsdCommentScl').animate({scrollTop:0},200);
        });
    },
    addStaticCells:function (tar,cfg) {
        var tmpDom='',defaultCfg;
        defaultCfg = {
            baidu:false,
            zan:false,
            buy:false,
            club:false,
            ku:false,
            pc:false,
            back:false,
            comm:false
        };
        if(typeof cfg === 'object'){
            $.extend(defaultCfg,cfg);
        }
        if(defaultCfg.baidu){
            tmpDom += gsDgyMethods.baiduShare();
        }
        tmpDom += '<div class="gs-dgy-static-cells">';
        if(defaultCfg.zan){
            tmpDom += '<a class="cells-zan supportMe" data-itemid="'+gsDgyConfig.countid+'" data-field="digg" data-table="PE_U_Article"><i class="cells-zan-icon"></i><span><i class="zanNum">0</i>人赞过</span></a>';
        }
        if(defaultCfg.buy){
            tmpDom += '<a class="btn-sty1 cells-buy gsDgyStaticCellsBuy"><i></i><span>购买游戏</span></a>';
        }
        if(defaultCfg.club){
            tmpDom += '<a target="_blank" href="'+gsDgyConfig.staticUrl.club+'" class="cells-club"></a>';
        }
        if(defaultCfg.ku){
            tmpDom += '<a target="_blank" href="'+gsDgyConfig.staticUrl.ku+'" class="cells-ku"></a>';
        }
        if(defaultCfg.pc){
            tmpDom += '<a target="_blank" href="'+gsDgyConfig.staticUrl.pc+'" class="cells-pc"></a>';
        }
        if(defaultCfg.back){
            tmpDom += '<a target="_blank" href="'+gsDgyConfig.staticUrl.channel+'" class="btn-sty1 cells-back"><i></i><span>往期回顾</span></a>';
        }
        if(defaultCfg.comm){
            tmpDom += '<a class="btn-sty1 cells-comment gsdBtnComm"><i></i><span>玩家评论</span></a>';
        }
        tmpDom += '</div>';
        tar.append(tmpDom);
        if(defaultCfg.zan){
            $(".supportMe").supportMe();
        }
        if(defaultCfg.buy){
            tar.find('.gsDgyStaticCellsBuy').on('click',function(){
                gsDgyPages.gsdBuy();
            });
        }
        if(defaultCfg.baidu){
            window._bd_share_main.init();
        }
    },
    bindGlogalEvent:function(){
        $('#gsDgyMain').on('click','.gsDgyMenu',function () {
            gsDgyMenu.init();
        });
    },
    init:function () {
        var _this = this;
        _this.ieForbidden(gsDgyConfig.ieForbiddenVer);
        _this.setMainSize();
        $(window).resize(function () {
            _this.setMainSize();
        });
        _this.commInit();
        _this.bgmBtn('.gsDgyMusic');
        _this.htFun();
        _this.bindGlogalEvent();
    }
};
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
var gsDgyFlows;
gsDgyFlows = {
    addflowTips:function(fid,txt){
        var vDom = '';
        vDom += '<div class="flow-tips '+fid+'">';
        vDom += '<div class="flow-tips-context"><a class="flow-tips-btn">';
        vDom += txt;
        vDom += '</a></div></div>';
        return vDom;
    },
    addflowTipsTop:function(fid,txt){
        var vDom = '';
        vDom += '<div class="flow-tips-top '+fid+'">';
        vDom += '<div class="flow-tips-context"><a class="flow-tips-btn">';
        vDom += txt;
        vDom += '</a></div></div>';
        return vDom;
    },
    flowMost:function (vKey,callback) {
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var vdCtrl = document.getElementById(vKey+'video');
        vdCtrl.onended = function (ev) {
            if (typeof callback === "function"){
                callback();
            }
        }
    },
    flowMostKey:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTips('flowTips',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2');

        var $flowTips = $pa.find('.flowTips'),isWatching = false;
        function gotoNext(){
            vdCtrl2.pause();
            $vdCtrl2.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.keyBdButton(vSce.tips[0].downKey,$flowTips.find('a'),function () {
                gotoNext();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyTop:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTipsTop('flowTips',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2');

        var $flowTips = $pa.find('.flowTips'),isWatching = false;
        function gotoNext(){
            vdCtrl2.pause();
            $vdCtrl2.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.keyBdButton(vSce.tips[0].downKey,$flowTips.find('a'),function () {
                gotoNext();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyHold:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video3" src="'+vSce.vd3+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video4" src="'+vSce.vd4+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTips('flowTips0',vSce.tips[0].txt);
        vDom += _this.addflowTips('flowTips1',vSce.tips[1].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            $vdCtrl3 = $('#'+vKey+'video3'),
            $vdCtrl4 = $('#'+vKey+'video4'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2'),
            vdCtrl3 = document.getElementById(vKey+'video3'),
            vdCtrl4 = document.getElementById(vKey+'video4');

        var $flowTips0 = $pa.find('.flowTips0'),$flowTips1 = $pa.find('.flowTips1'),isWatching = false,removeVd2 = false;
        function gotoNext(){
            vdCtrl4.pause();
            $vdCtrl4.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.bindKeyHold(vSce.tips[0].downKey,function () {
                if(removeVd2 === false){
                    $vdCtrl2.attr({'loop':false,'mute':true});
                    vdCtrl2.currentTime = 0;
                    vdCtrl2.play();
                    vdCtrl2.pause();
                    $vdCtrl2.hide();
                    $vdCtrl2.remove();
                    removeVd2 = true;
                }
                $flowTips0.removeClass('cur');
                $vdCtrl3.removeClass('flow-vd-hide');
                vdCtrl3.play();
                if(vdCtrl3.currentTime >= vSce.tips[1].showTime){
                    $(document).off();
                    $flowTips0.remove();
                    $flowTips1.addClass('cur');
                    gsDgyMethods.keyBdButton(vSce.tips[1].downKey,$flowTips1.find('a'),function () {
                        gotoNext();
                    });
                }
            },function () {
                vdCtrl2.pause();
                $flowTips0.addClass('cur');
                vdCtrl3.pause();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips0.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        vdCtrl3.onended = function (ev) {
            vdCtrl3.pause();
            $vdCtrl3.hide();
            $vdCtrl3.remove();
            $vdCtrl4.removeClass('flow-vd-hide');
            vdCtrl4.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyHold2:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video3" src="'+vSce.vd3+'" alt="'+vKey+'"></video>';
        vDom += _this.addflowTips('flowTips0',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            $vdCtrl3 = $('#'+vKey+'video3'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2'),
            vdCtrl3 = document.getElementById(vKey+'video3');

        var $flowTips0 = $pa.find('.flowTips0'),isWatching = false;
        function gotoNext(){
            $vdCtrl3.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.bindKeyHold(vSce.tips[0].downKey,function () {
                $flowTips0.removeClass('cur');
                vdCtrl2.pause();
                $vdCtrl2.hide();
                $vdCtrl2.remove();
                $vdCtrl3.removeClass('flow-vd-hide');
                vdCtrl3.play();
            },function () {
                $flowTips0.addClass('cur');
                vdCtrl3.pause();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips0.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        vdCtrl3.onended = function (ev) {
            $(document).off();
            gotoNext();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    gsdFlow01:function () {
        var vDom = '',vKey = 'gsdFlow01',vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        function beginPageFnc(mA){
            gsDgyMethods.bgmBeforeVideo();
            var vdCtrl = document.getElementById(vKey+'video');
            vdCtrl.onended = function (ev) {
                gsDgyFlows.gsdFlow02();
            }
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    },
    gsdFlow02:function () {
        var vKey = 'gsdFlow02',
            _this = this;
        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow03();
        });
    },
    gsdFlow03:function () {
        var vKey = 'gsdFlow03',
            _this = this;

        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow04();
        });
    },
    gsdFlow04:function () {
        var vKey = 'gsdFlow04',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow05();
        });
    },
    gsdFlow05:function () {
        var vKey = 'gsdFlow05',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow06();
        });
    },
    gsdFlow06:function () {
        var vKey = 'gsdFlow06',
            _this = this;
        _this.flowMostKeyHold2(vKey,function () {
            gsDgyFlows.gsdFlow07();
        });
    },
    gsdFlow07:function () {
        var vKey = 'gsdFlow07',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow08();
        });
    },
    gsdFlow08:function () {
        var vKey = 'gsdFlow08',
            _this = this;
        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow09();
        });
    },
    gsdFlow09:function () {
        var vKey = 'gsdFlow09',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow10();
        });
    },
    gsdFlow10:function () {
        var vKey = 'gsdFlow10',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow11();
        });
    },
    gsdFlow11:function () {
        var vKey = 'gsdFlow11',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow12();
        });
    },
    gsdFlow12:function () {
        var vKey = 'gsdFlow12',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow13();
        });
    },
    gsdFlow13:function () {
        var vKey = 'gsdFlow13',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow14();
        });
    },
    gsdFlow14:function () {
        var vDom = '',vKey = 'gsdFlow14',vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        function beginPageFnc(mA){
            var vdCtrl = document.getElementById(vKey+'video');
            vdCtrl.onended = function (ev) {
                gsDgyPages.gsdStory();
            }
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    }
};
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
(function ($) {
    gsDgyMethods.init();
    gsDgyPages.gsdLoad(true,function () {
        console.log('gs');
    });
})(jQuery);