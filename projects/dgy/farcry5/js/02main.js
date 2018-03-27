/*
global $,jQuery,screenfull,pageConfig,tvp,preLoadPicsLists,Swiper;
 */
(function($){
    $.fn.autoScale = function(options){

        var defaults = {
            baseWidth:1920,
            baseHeight:1080,
            offsetT:0,//上偏移
            offsetL:0,//左偏移
            positionMethod:''
        };

        var opts = $.extend(defaults,options);

        this.each(function(){

            var thisCon = $(this),
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                scalePercentW = winWidth/opts.baseWidth - opts.offsetL,
                scalePercentH = winHeight/opts.baseHeight - opts.offsetT;

            function setPosFun(){
                var acWH=scalePercentH;
                if(winHeight>(winWidth/16*9)){
                    acWH = scalePercentW;
                    thisCon.css({
                        'top':'50%',
                        'left':'0',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(0,-50%)'
                    });
                }else{
                    acWH = scalePercentH;
                    thisCon.css({
                        'top':'0',
                        'left':'50%',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(-50%,0)'
                    });
                }
                gloCfg.page.zoom = acWH;

                $(window).resize(function(){
                    winWidth = $(window).width();scalePercentW = winWidth/opts.baseWidth - opts.offsetL;
                    winHeight = $(window).height();scalePercentH = winHeight/opts.baseHeight - opts.offsetT;
                    acWH=scalePercentH;
                    if(winHeight>(winWidth/16*9)){
                        acWH = scalePercentW;
                        thisCon.css({
                            'top':'50%',
                            'left':'0',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(0,-50%)'
                        });
                    }else{
                        acWH = scalePercentH;
                        thisCon.css({
                            'top':'0',
                            'left':'50%',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(-50%,0)'
                        });
                    }
                    gloCfg.page.zoom = acWH;
                });
            }
            setPosFun();
        });
    };
})(jQuery);
var animEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',pageTimer;
$.fn.extend({
    animateCss: function (animationName,callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(callback){
                callback();
            }
        });
    }
});
function fullScreen() {
    if (screenfull.enabled) {
        screenfull.request();
    }
}
var commonComponents = {
    othersArea:function (tar,cfg) {
        var tmpDom='';
        tmpDom += '<div class="others-area">';
        tmpDom += '<a class="zanbtn supportMe" data-itemid="'+gloCfg.countid+'" data-field="digg" data-table="PE_U_Article"><i class="ico_zan"></i><span><i class="zanNum">0</i>人赞过</span></a>';
        tmpDom += '<div class="clearfix btn-group">';
        tmpDom += '<a class="btn-buy OthersBtnBuy"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.club+'" class="btn-club"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.ku+'" class="btn-ku"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.pc+'" class="btn-pc"></a>';
        tmpDom += '<a class="btn-comm OthersBtnComm"></a>';
        tmpDom += '</div>';
        tmpDom += '</div>';
        tar.append(tmpDom);
        $(".supportMe").supportMe();
        tar.find('.OthersBtnBuy').on('click',function(){
            pageFunc.pgVersion(true);
        });
        tar.find('.OthersBtnComm').on('click',function(){
            pageFunc.commPage();
        });
        if(typeof cfg === 'object'){
            if(cfg.comm === false){
                tar.find('.OthersBtnComm').remove();
            }
        }
    },
    baiduShare:function (tar,addClass) {
        var tmpDom='';
        if(typeof addClass === 'undefined'){
            addClass = '';
        }
        tmpDom += '<div class="baidushare-area">';
        tmpDom += '<div class="bdsharewrap bdstyle-c '+addClass+'"><div class="bdsharebuttonbox bdshare-button-style0-16" data-tag="share_1" data-bd-bind="1446461622481"><a target="_self" class="bdicons bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bdicons bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bdicons bds_sqq" data-cmd="sqq" title="分享到QQ"></a><a class="bdicons bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bdicons bds_tieba" data-cmd="tieba" title="分享到贴吧"></a><a class="bdicons bds_renren" data-cmd="renren" title="分享到人人"></a><a class="bdicons bds_douban" data-cmd="douban" title="分享到豆瓣"></a><a class="bdicons bds_more" data-cmd="more"></a><a class="bds_count" data-cmd="count" title=""></a></div></div>';
        tmpDom += '</div>';
        tar.append(tmpDom);
        window._bd_share_main.init();
    },
    player:function (tar,vdcfg,callback) {
        /*
         *
         * video:{
         * player:'se',
         * vid:'xrgnc',
         * bkvid:'XMzQ4OTI1MTgxNg',
         * controls:false,
         * bgmmuted:false
         * }
         * bgmmuted:false 背景不静音
         * controls:false 不显示控制条
         * bkvid:''       备用视频地址
         */
        var $tar = $('#'+tar);
        $tar.html('');
        function addYk(vid) {
            var player = new YKU.Player(tar,{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: vid,
                newPlayer: true,
                autoplay: true
            });
        }
        function videoEnd() {
            callback();
            if(vdcfg.bgmmuted !== false){
                yms.bgmAfterVideo();
            }
        }
        function backupPlayer() {
            $tar.html('');
            addYk(vdcfg.bkvid);
        }
        function addStreamable(vid) {
            function playVd(url) {
                var videoArea = document.getElementById(tar),
                    videoPlayer = document.createElement('video'),pendingTimer;
                videoPlayer.src = url;
                videoPlayer.setAttribute('class','video-steamable');
                if(vdcfg.controls !== false){
                    videoPlayer.setAttribute('controls',true);
                }
                videoArea.appendChild(videoPlayer);
                videoPlayer.play();
                videoPlayer.onerror = function() {
                    backupPlayer();
                };
                pendingTimer = setTimeout(function () {
                    backupPlayer();
                },5000);
                videoPlayer.onplaying = function () {
                    clearTimeout(pendingTimer);
                };
                if(typeof callback === 'function'){
                    videoPlayer.onended = function () {
                        videoEnd();
                    }
                }
            }
            $.ajax({
                dataType:'json',
                url:'https://api.streamable.com/videos/'+vid,
                success:function (data) {
                    playVd(data.files.mp4.url);
                },
                error:function (err) {
                    backupPlayer();
                }
            })
        }
        if(vdcfg.bgmmuted !== false){
            yms.bgmBeforeVideo();
        }
        if(typeof callback === 'function'){
            $('<a class="yk-btn-next ykBtnNext">跳过</a>').insertAfter($tar);
            $('.ykBtnNext').on('click',function () {
                videoEnd();
            });
        }
        if(vdcfg.player === 'se'){
            addStreamable(vdcfg.vid);
        }else{
            addYk(vdcfg.vid);
        }

    },
    horWheel:function (wrap,rio) {
        wrap.on('mousewheel',function (ev) {
            rio = rio|40;
            wrap[0].scrollLeft += -ev.deltaY*rio;
        })
    },
    tabs:function (nav,con) {
        var tabTimer;
        nav.on({
            mouseover:function () {
                var $ts = $(this),idx = $ts.index();
                tabTimer = setTimeout(function () {
                    nav.removeClass('cur').eq(idx).addClass('cur');
                    con.removeClass('cur').eq(idx).addClass('cur');
                },120);
            },
            mouseout:function () {
                clearTimeout(tabTimer);
            }
        })
    },
    bindKey:function (key,callback) {
        var keyCodeNum={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,space:32,tab:9,shift:16,k1:49,k2:50,k3:51,k4:52,k5:53,k6:54};
        $(document).on({
            'keydown':function (event) {
                if(pageConfig.isCommOpen === false){
                    //event.preventDefault();
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
    keyBdButton:function (key,tar,callback) {
        function buttonEvent() {
            if(typeof callback === 'function'){
                callback();
            }
        }
        commonComponents.bindKey(key,function () {
            buttonEvent();
        });
        tar.on('click',function(){
            buttonEvent();
        });
    },
    playAudio:function (aid,zmCfg) {
        var zmDom = '',
            $dad = $('#pageswrap'),
            auo = document.getElementById(aid),zmTimerQue = [];
        yms.bgmBeforeVideo();
        auo.currentTime = 0;
        auo.play();
        function addZm() {
            function showZm(idx) {
                $dad.find('.audioZmTxt').removeClass('cur');
                $dad.find('.audioZmTxt'+idx).addClass('cur');
            }
            function closeZm() {
                $dad.find('.audioZmTxt').removeClass('cur');
            }
            zmDom += '<div class="audio-zm audioZm">';
            $.each(zmCfg.kf,function (i,item) {
                zmDom += '<div class="audio-zm-txt audioZmTxt audioZmTxt'+i+'">'+item.txt+'</div>';
            });
            zmDom += '<a class="audio-zm-skip audioZmSkip">关闭</a>';
            zmDom += '</div>';
            $dad.append(zmDom);
            function clearZm() {
                for (var tm = 0;tm<zmTimerQue.length;tm++){
                    clearTimeout(zmTimerQue[tm]);
                }
                $dad.find('.audioZm').remove();
                auo.pause();
                yms.bgmAfterVideo();
            }
            $.each(zmCfg.kf,function (i,item) {
                zmTimerQue[i] = setTimeout(function () {
                    showZm(i);
                    zmTimerQue[i] = setTimeout(function () {
                        closeZm()
                    },(item.timeEnd - item.timeStart)*1000);
                },item.timeStart*1000);
            });
            $dad.find('.audioZmSkip').on('click',function () {
                clearZm();
            });
            auo.onended = function () {
                clearZm();
            }
        }
        if(typeof zmCfg !== 'undefined'){
            addZm();
        }
    },
    mouseScrollTips:function (tar) {
        var msDom = '';
        msDom += '<div class="mouse-scroll-tips mouseScrollTips"></div>';
        tar.append(msDom);
        var isScrolled = false,scHideTimer;
        $('#pageswrap').on('mousewheel',function () {
            if(isScrolled === false){
                $('#pageswrap').off('mousewheel');
                scHideTimer = setTimeout(function () {
                    $('.mouseScrollTips').remove();
                },500)
            }
        });
    },
    changeMenuState:function(idx){
        if(idx > stateStore.taskProgress){
            stateStore.taskProgress = idx;
        }
        pageConfig.pages.pgMenu.nav[(idx-1)].open = true;
    },
    toast:function (tar,txt) {
        var toDom = '';
        toDom += '<div class="toast cur">'+txt+'</div>';
        tar.find('.toast').remove();
        tar.append(toDom);
    }
};
var yms={
    browSet:function () {
        var bdr = $.browser,$html = $('html');
        if(bdr.msie===true || parseInt(bdr.version)===11){
            $html.addClass('ie');
        }
        if(bdr.msie===true && parseInt(bdr.version)===10){
            $html.addClass('ie10');
        }

    },
    autoPos:function(){
        $('.autoMH').each(function(){
            $(this).autoScale();
        });
    },
    bgmSet:function(bgmsrc){
        if(pageConfig.nowplay !== bgmsrc){
            pageConfig.nowplay = bgmsrc;
            $('#bgm').attr('src',bgmsrc);
            if(pageConfig.userMute !== true){
                yms.bgmPlay();
            }
        }
    },
    bgmBtn:function(tar){
        var thObj = this;
        tar.on('click',function(){
            if(pageConfig.volClk){
                pageConfig.userMute = true;
                thObj.bgmPause();
            }else{
                pageConfig.userMute = false;
                thObj.bgmPlay();
            }
        });
    },
    bgmPlay:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.play();
        pageConfig.volClk = true;
        $bgmVol.removeClass('pause').find('span').text(pageConfig.bgm.txt[1]);
        bgmId.volume = 1;

    },
    bgmPause:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.pause();
        pageConfig.volClk = false;
        $bgmVol.addClass('pause').find('span').text(pageConfig.bgm.txt[0]);
    },
    bgmBeforeVideo:function () {
        pageConfig.isVideoPlaying = true;
        yms.bgmPause();
    },
    bgmAfterVideo:function () {
        pageConfig.isVideoPlaying = false;
        if(pageConfig.userMute !== true){
            yms.bgmPlay();
        }
    },
    //失去焦点
    htFun:function(){
        var thObj = this;
        $(window).on({
            'blur':function(){
                thObj.bgmPause();
            },
            'focus':function(){
                if(pageConfig.userMute !== true && pageConfig.isVideoPlaying !==true){
                    thObj.bgmPlay();
                }
            }
        });
    },
    fixedNav:function(){
        var fixNavDom = '';
        fixNavDom += '<div class="fx_list">';
        fixNavDom += '<a class="fixBtn" data-page="pgMenu"><span>任务</span><i class="icon-task"></i></a>';
        fixNavDom += '<a class="btnInfo"><span>资料</span><i class="icon-infos"></i></a>';
        fixNavDom += '<a class="fixBtnComm"></i><span>评论</span><i class="icon-comm"></a>';
        fixNavDom += '</div>';

        var fixNav = $('#fixNav');
        fixNav.html(fixNavDom);
        fixNav.on('click','.enClk',function () {
            var sel = $(this).data('page');
            pageFunc[sel]();
        });
        fixNav.find('.fixBtnComm').on('click',function () {
            pageFunc.commPage();
        });
    },
    fixedNavFunc:function () {
        var fixNav = $('#fixNav'),dm = $('#dgyMain');
        if(stateStore.fixedNavShow === true){
            fixNav.addClass('cur');
        }else{
            fixNav.removeClass('cur');
        }
        fixNav.find('.fixBtn').each(function () {
            var $this = $(this),num = $this.data('page');
            if(dm.find('.'+num).length>0){
                fixNav.find('.fixBtn').removeClass('cur').addClass('enClk');
                $this.removeClass('enClk').addClass('cur');
            }else{
                $this.addClass('enClk').removeClass('cur');
            }
        });
    },
    beforeChangePage:function () {
        clearTimeout(pageAutoTimer);
    },
    chagePage:function(callback){
        var _this = this;
        _this.beforeChangePage();
        clearTimeout(pageTimer);
        $('#fixNav').removeClass('cur');
        $('#dgyMain').removeClass('cur');
        stateStore.fixedNavShow = false;
        pageTimer = setTimeout(function(){
            callback();
            _this.fixedNavFunc();
        },400);
    },
    preLoadImg:function (urls) {
        for (var i = 0; i < urls.length; i++) {
            var obj = new Image();
            obj.src = urls[i];
        }
    },
    dgyRender:function(){
        var dgyObj = this;
        dgyObj.browSet();
        dgyObj.htFun();
        dgyObj.autoPos();
    }
};
yms.dgyRender();
yms.bgmBtn($('.volbtn'));
