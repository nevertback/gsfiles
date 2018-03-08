(function ($) {
    var $m = $('#main');
    var ydt;
    var verData = {
        v1:{
            name:'1.0时代',
            time:'2003年——2005年',
            pic:'http://img7.gamersky.com/zqimg/zhuanti/15years/wap/ver1.png'
        },
        v2:{
            name:'2.0时代',
            time:'2005年-2008年',
            pic:'http://img7.gamersky.com/zqimg/zhuanti/15years/wap/ver2.png'
        },
        v3:{
            name:'3.0时代',
            time:'2008年-2015年',
            pic:'http://img7.gamersky.com/zqimg/zhuanti/15years/wap/ver3.png'
        },
        v4:{
            name:'4.0时代',
            time:'2015年-至今',
            pic:'http://img7.gamersky.com/zqimg/zhuanti/15years/wap/ver4.png'
        }
    };
    var cfg = {
        history:1,
        showState:1
    };
    var endPageTimer;
    var zmBgm = document.getElementById('zmBgm'),bgmGoing = false;
    zmBgm.volume=0.2;
    $(window).on({
        'blur':function(){
            zmBgm.pause();
        },
        'focus':function(){
            if(bgmGoing === true){
                zmBgm.play();
            }
        }
    });
    document.addEventListener('visibilitychange', function() {
        var isHidden = document.hidden;
        if (isHidden) {
            zmBgm.pause();
        } else {
            if(bgmGoing === true){
                zmBgm.play();
            }
        }
    });
	var gs = {
	    isIe:function () {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version);
            if(sbie === true && ver < 10){
                return true
            }
        },
        showPg:function(num){
            var $box = $('#box'),$tar = $box.find('.item'+num);
            $box.find('.item').removeClass('cur');
            setTimeout(function () {
                $box.find('.item').hide();
                $tar.show();
                setTimeout(function () {
                    $tar.addClass('cur');
                    $m.animate({scrollTop:0},200);
                },50);
            },250);
        },
        addVer:function (dt) {
            var verDom = '',vdt = verData[dt],$vc = $('#verCon');
            verDom += '<div class="infos"><div class="tits"><div class="tit-lev1">'+vdt.name+'</div><div class="tit-lev2">'+vdt.time+'</div></div><div class="btn-groups"><a class="btn btn1">没错  是我的第一次</a><a class="btn btn2 closeVer">emm 不是这个年份</a><a class="btn btn3">我还有话对你说</a></div><a class="close-btn closeVer"><i></i></a></div><img class="ver-pic" src="'+vdt.pic+'" alt="ver"><div class="btn-groups"><a class="btn btn1">没错  是我的第一次</a><a class="btn btn2 closeVer">emm 不是这个年份</a><a class="btn btn3">我还有话对你说</a></div><a class="close-btn closeVer"><i></i></a></div>';
            verDom += '';
            verDom += '';
            $vc.html(verDom);
            cfg.history = 2;
            $vc.find('.closeVer').on('click',function () {
                cfg.history = 1;
                cfg.showState = 1;
                gs.updatePageState();
            });
            $vc.find('.btn3').on('click',function () {
                gs.lastPage();
            });
            $vc.find('.btn1').on('click',function () {
                gs.openBdPop();
                var bdTit = '我第一次上游民是在'+vdt.time+'，这是当初游民的样子';
                gs.bdShare(bdTit);
            });
        },
        openBdPop:function () {
	        var $pop = $('.bdPop');
            $pop.addClass('cur');
        },
        closeBdPop:function () {
            var $pop = $('.bdPop'),$close = $('.bdPopClose');
            $close.on('click',function () {
                $pop.removeClass('cur');
                //gs.lastPage();
            })
        },
        bdShare:function (tit) {
	        var textTit = '这是一个暴露年龄的网站';
	        if(tit){
                textTit = tit;
            }
            window._bd_share_config = {
                common: {
                    bdText: textTit,
                    bdDesc: '游民星空15周年纪念专题，感谢一路有你，未来一起前行。',
                    bdPic: 'http://img7.gamersky.com/zqimg/zhuanti/15years/350.jpg'
                },
                share: [{
                    "bdSize": 16
                }]
            };
            with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
            if(typeof window._bd_share_main !== 'undefined'){
                window._bd_share_main.init();
            }
        },
        lastPage:function () {
            cfg.history = 3;
            cfg.showState = 3;
            gs.updatePageState();
            $('#paraAnim').addClass('cur');
            bgmGoing = true;
            zmBgm.play();
        },
        endPage:function () {
            var $txt = $('#paraAnim');
            $('#paraNext').on('click',function () {
                $txt.removeClass('cur');
                cfg.history = 1;
                gs.openComment('rebo');
                bgmGoing = false;
                zmBgm.currentTime = 0;
                zmBgm.pause();
            });
        },
        openComment:function (isNew) {
            $('#paraAnim').removeClass('cur');
            clearTimeout(endPageTimer);
            var $closeComment = $('#closeComment');
            if(isNew === true){
                $closeComment.attr('data-back',cfg.history);
            }else if(isNew === 'rebo'){
                $('#closeCommentRe').addClass('cur');
                $closeComment.attr('data-back',cfg.history);
            }
            cfg.showState = 4;
            gs.updatePageState();
        },
        closeComment:function () {
            var $closeComment = $('#closeComment'),$reBtn = $('#closeCommentRe');
            $('.openComment').on('click',function () {
                gs.openComment(true);
            });
            $closeComment.on('click',function () {
                var $this = $(this),bkd = $this.attr('data-back');
                if(bkd === '3' || bkd === 3){
                    gs.lastPage();
                }else{
                    cfg.showState = bkd;
                    gs.updatePageState();
                }
                $reBtn.removeClass('cur');
            });
            $reBtn.on('click',function () {
                var $this = $(this),
                    bkd = $this.attr('data-back');
                cfg.showState = bkd;
                gs.updatePageState();
                $reBtn.removeClass('cur');
            });
        },
        look:function () {
            var $lookBtn = $m.find('.look-btn');
            $lookBtn.on('click',function () {
                var $this = $(this),ver = $this.data('ver');
                gs.addVer(ver);
                cfg.showState = 2;
                gs.updatePageState();
            });
        },
        updatePageState:function () {
            gs.showPg(cfg.showState);
        },
        render:function () {
	        gs.endPage();
            gs.look();
            gs.updatePageState();
            gs.closeComment();
            gs.closeBdPop();
            gs.bdShare();
        },
        loading:function () {
            var animSpeed = 5000,txtList = ydt.ldTxt,txtListRev = txtList.reverse(),$ld = $('#loading'),len = txtListRev.length,$txt = $ld.find('.lp-txt'),$bar = $ld.find('.lp-bar i'),count = 0;
            var timerUpd;
            function startShow() {
                clearInterval(timerUpd);
                $ld.fadeOut(500);
                $('html').removeClass('hideScroll');
                gs.render();
            }
            function loaded() {
                var gsVd = document.getElementById('ldVideo');
                $ld.find('.loading-con').append('<a id="playVideo" class="playVideo"></a>');
                $('#playVideo').on('click',function () {
                    $ld.find('.loading-con').removeClass('cur');
                    $ld.find('.loading-video').addClass('cur');
                    gsVd.play();
                    gsVd.onended=function () {
                        startShow();
                    };
                    $('#skipVd').on('click',function () {
                        startShow();
                        gsVd.pause();
                    });
                });
            }
            function updateProgress() {
                var txt = txtListRev[count];
                $txt.html(txt);
                count++;
            }
            $bar.animate({'width':'100%'},animSpeed);
            timerUpd = setInterval(function () {
                updateProgress();
            },animSpeed/len);
            setTimeout(function () {
                loaded();
            },animSpeed);
        },
        init:function (dev) {
            if(dev === true){
                $('#loading').fadeOut();
                $('html').removeClass('hideScroll');
                gs.render();
            }else{
                gs.loading();
            }
        }
	};
    $.ajax({
        dataType:'Script',
        url:'http://j.gamersky.com/zhuanti/15years/yearsData.js',
        success:function () {
            ydt = yearData;
            gs.init(false);
        }
    });
})(jQuery);