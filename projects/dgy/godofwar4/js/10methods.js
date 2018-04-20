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
            s.src = 'http://j.gamersky.com/web2015/comment/js/commentconfig.js';
            h.insertBefore(s, h.firstChild);
            window.SCS_NO_IFRAME = true;
        }
        function createComm(){
            var cDom = '';
            cDom += '';
            cDom += '<div class="gsd-comment hei">';
            //cDom += '<img src="'+dataOrigin.bg+'" alt="replace" class="comm_bg">';
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