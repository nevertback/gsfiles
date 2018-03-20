(function($){
    $.fn.gsPopup = function(options){
        var defaults = {
        	//弹出后回调函数
        	afterOpen:''
		};
        var optionsEd = $.extend(defaults,options);
        var btn = $(this),outTimer,inTimer;
        function addSource(sid,sty) {
            var sourceDom;
            switch (sty) {
                case 'video_tgs':
                    sourceDom = '<embed wmode="direct" flashvars="vid=' + sid + '&amp;tpid=0&amp;showend=1&amp;showcfg=1&amp;searchbar=1&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;shownext=1&amp;list=2&amp;autoplay=1" src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&amp;v=20140714" quality="high" name="tenvideo_flash_player_1492679771297" id="tenvideo_flash_player_1492679771297" bgcolor="#000000" width="100%" height="100%" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">';
                    return sourceDom;
                    break;
                case 'video_tgs2':
                    sourceDom = '<div id="tgsVideo"></div>';
                    return sourceDom;
                    break;
                case 'video_yk':
                    sourceDom = '<embed height="100%" flashvars="isAutoPlay=true" allowscriptaccess="sameDomain" width="100%" align="middle" quality="high" invokeurls="false" src="http://player.youku.com/player.php/sid/'+sid+'/v.swf" type="application/x-shockwave-flash" wmode="transparent">';
                    return sourceDom;
                    break;
                case 'video_bl':
                    sourceDom = '<iframe height="100%" width="100%" id="vedioSrc" frameborder="0" allowfullscreen src="'+sid+'"></iframe>';
                    return sourceDom;
                    break;
                case 'video_other':
                    sourceDom = sid;
                    return sourceDom;
                    break;
                case 'pics':
                    sourceDom = '<img src="'+sid+'" alt="popimgs" width="100%" height="100%">';
                    return sourceDom;
                    break;
                case 'custom':
                    sourceDom = $(sid).html();
                    return sourceDom;
                    break;
            }
        }
        function addPopup(opts) {
            var popupDom = '';
            popupDom += '<div id="gsPopupMask" class="gsPopupMask"></div>';
            popupDom += '<div id="gsPopup" class="gsPopup" style="';
            popupDom += opts.style;
            popupDom += '"><div class="gsPopupCon">';
            popupDom += addSource(opts.sid,opts.sty);
            popupDom += '</div><a  class="gsPopupClose" id="gsPopupClose"></a></div>';
            $('body').append(popupDom);
            inTimer = setTimeout(function () {
                $('#gsPopupMask').addClass('cur');
                $('#gsPopup').addClass('cur');
            },10);
            if(opts.sty === 'video_tgs2'){
                $.getScript("http://vm.gtimg.cn/tencentvideo/txp/js/txplayer.js",function(){
                    var player = new Txplayer({
                        containerId: 'tgsVideo',
                        vid: opts.sid,
                        width: '100%',
                        height: opts.height,
                        autoplay:true,
                        showBullet:false,
                        showLogo: false,
                        showRecommendOnEnd:false
                    });
                    $('#tgsVideo').closest('.gsPopupCon').css('overflow','hidden');
                });
            }
        }
        function removePopup() {
        	clearTimeout(inTimer);
            $('#gsPopupMask').removeClass('cur');
            $('#gsPopup').removeClass('cur');
            outTimer = setTimeout(function () {
                $('#gsPopupMask').remove();
                $('#gsPopup').hide().remove();
            },150);
        }
        function closePopup() {
            $('#gsPopupClose').on('click',removePopup);
            $('#gsPopupMask').on('click',removePopup);
        }
        btn.on('click',function () {
            clearTimeout(outTimer);
            var $this = $(this),dw = $this.data('w'),dh = $this.data('h'),diysty=$this.data('diy'),
                wh = $(window).height(),gerCss,
                popupOptions = {
                    pos:'fixed',
                    width:dw,
                    height:dh,
                    sid:$this.data('sid'),
                    sty:$this.data('sty'),
                    diy:diysty
                };
            gerCss = 'width:'+popupOptions.width+'px;height:'+popupOptions.height+'px;';
            popupOptions.style = 'position:'+popupOptions.pos+';top:50%;left:50%;margin-left:-'+popupOptions.width/2+'px;margin-top:-'+popupOptions.height/2+'px;'+gerCss;
            if(dh>wh){
                popupOptions.pos = 'absolute';
                popupOptions.style = 'position:'+popupOptions.pos+';top:'+$this.offset().top+'px;left:50%;margin-left:-'+popupOptions.width/2+'px;'+gerCss;
            }
            addPopup(popupOptions);
            closePopup();
            if(typeof optionsEd.afterOpen === 'function'){
                optionsEd.afterOpen();
			}
        });
    }
})(jQuery);
$('.popupBtn').gsPopup();
(function ($) {
    var isDrawed = false,isLogin = false,
        lid = 27, //28
        prizeCfg=[
            {
                pid:301,
                pnm:'雷蛇萨诺键盘'
            },
            {
                pid:540, //544
                pnm:'守望手机壳'
            },
            {
                pid:0,
                pnm:'谢谢参与'
            },
            {
                pid:302,
                pnm:'太攀皇蛇钻石星辰版游戏鼠标'
            },
            {
                pid:0,
                pnm:'谢谢参与'
            },
            {
                pid:542, //545
                pnm:'温斯顿小手办'
            },
            {
                pid:543, //546
                pnm:'战网点1000点'
            },
            {
                pid:0,
                pnm:'谢谢参与'
            }
        ],
        prizeAlert = false,
        notice = {
        repeat:'同一用户有1次抽奖机会哟~'
    };
	var gs = {
        draw:function () {
            var $sel = $('#drawSel'),
                $start = $('#drawBegin'),
                defaultStyle = 'draw-select',
                selCount = 0,
                cirTimer,fnTimer,spd = 500,slowRio = 3,animLoop = 3;
            var drawFnc = {
                buildAlert:function (prizename) {
                    return '恭喜您获得'+prizename+'请关注站内通知';
                },
                alertRepeat:function () {
                    alert(notice.repeat);
                },
                setSelBox:function (num) {
                    $sel.removeClass().addClass(defaultStyle+' '+defaultStyle+num);
                },
                endAnim:function () {
                    var that = this;
                    that.setAnim(selCount);
                    //确保最终位置
                    setTimeout(function () {
                        that.setSelBox(selCount);
                        if(prizeAlert){
                            alert(prizeAlert);
                        }
                    },spd*slowRio+1000);

                },
                cirAnim:function () {
                    var that = this,animCount = 0;
                    cirTimer = setInterval(function () {
                        animCount++;
                        if(animCount > 7){
                            animCount = 0;
                        }
                        that.setSelBox(animCount);
                    },spd/8);
                },
                setAnim:function (num) {
                    var that = this,animCount = 0;
                    fnTimer = setInterval(function () {
                        animCount++;
                        if(animCount <= num){
                            that.setSelBox(animCount);
                        }
                    },spd*slowRio/8);
                },
                anim:function () {
                    var that = this,loop = animLoop,animTimer;
                    that.cirAnim();
                    function loopAnim() {
                        loop--;
                        animTimer = setTimeout(function () {
                            if(loop >0){
                                loopAnim();
                            }else{
                                clearInterval(cirTimer);
                                clearTimeout(animTimer);
                                that.endAnim();
                            }
                        },spd);
                    }
                    loopAnim();
                },
                start:function (num) {
                    selCount = num;
                    this.anim();
                },
                isLogin:function () {
                    if(typeof $.cookie("UserCookie") === 'undefined'){
                        $('.QZshade,.QZlogin').show();
                        return false;
                    }else{
                        return true;
                    }
                },
                getOl:function (callback) {
                    var userInfo = $.parseJSON($.cookie("UserCookie")),that = this;
                    var apiCfg = {
                        url:'http://db5.gamersky.com/LotteryAjax.aspx',
                        data:{
                            jsondata:JSON2.stringify({
                                action:"sweepstakes",
                                userId:userInfo.userid,
                                lotteryId:lid
                            })
                        }
                    };
                    $.ajax({
                        type: "GET",
                        url:apiCfg.url,
                        dataType:'jsonp',
                        data:apiCfg.data,
                        success:function (data) {
                            isDrawed = true;
                            console.log(data);
                            if(data.status === 'ok'){
                                var res = data.result[0],pid = res.prizeId;
                                prizeAlert = that.buildAlert(res.prizeName);
                                $.each(prizeCfg,function (i,item) {
                                    if(item.pid === pid){
                                        callback(i);
                                    }
                                });
                            }else{
                                if(data.result.match('同一用户只能抽') !== null&&typeof data.result.match('同一用户只能抽') === 'object'){
                                    that.alertRepeat();
                                }else{
                                    var randomArr = [];
                                    $.each(prizeCfg,function (i,item) {
                                        if(item.pid === 0){
                                            randomArr.push(i)
                                        }
                                    });
                                    var rm = Math.round(Math.random()*(randomArr.length-1));
                                    callback(randomArr[rm]);
                                }
                            }
                        }
                    });
                },
                bindClick:function () {
                    var that = this;
                    $start.on('click',function () {
                        isLogin = that.isLogin();
                        if(isLogin === true){
                            if(isDrawed === false){
                                that.getOl(function (backId) {
                                    that.start(backId);
                                });
                            }else{
                                that.alertRepeat();
                            }
                        }
                    });
                },
                init:function () {
                    this.setSelBox(selCount);
                    this.bindClick();
                }
            };
            drawFnc.init();
        },
        init:function () {
            this.draw();
        }
	};
    gs.init();
})(jQuery);