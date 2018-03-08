'use strict';

(function ($) {
    $.fn.gsPopup = function (options) {
        var defaults = {
            //弹出后回调函数
            afterOpen: ''
        };
        var optionsEd = $.extend(defaults, options);
        var btn = $(this),
            outTimer,
            inTimer;
        function addSource(sid, sty) {
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
                    sourceDom = '<embed height="100%" flashvars="isAutoPlay=true" allowscriptaccess="sameDomain" width="100%" align="middle" quality="high" invokeurls="false" src="http://player.youku.com/player.php/sid/' + sid + '/v.swf" type="application/x-shockwave-flash" wmode="transparent">';
                    return sourceDom;
                    break;
                case 'video_other':
                    sourceDom = sid;
                    return sourceDom;
                    break;
                case 'pics':
                    sourceDom = '<img src="' + sid + '" alt="popimgs" width="100%" height="100%">';
                    return sourceDom;
                    break;
                case 'custom':
                    sourceDom = $(sid)[0].outerHTML;
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
            popupDom += addSource(opts.sid, opts.sty);
            popupDom += '</div><a  class="gsPopupClose" id="gsPopupClose"></a></div>';
            $('body').append(popupDom);
            inTimer = setTimeout(function () {
                $('#gsPopupMask').addClass('cur');
                $('#gsPopup').addClass('cur');
            }, 10);
            if (opts.sty === 'video_tgs2') {
                $.getScript("http://vm.gtimg.cn/tencentvideo/txp/js/txplayer.js", function () {
                    var player = new Txplayer({
                        containerId: 'tgsVideo',
                        vid: opts.sid,
                        width: '100%',
                        height: opts.height + 35,
                        autoplay: true,
                        showBullet: false,
                        showLogo: false,
                        showRecommendOnEnd: false
                    });
                });
            }
        }
        function removePopup() {
            clearTimeout(inTimer);
            $('#gsPopupMask').removeClass('cur');
            $('#gsPopup').removeClass('cur');
            outTimer = setTimeout(function () {
                $('#gsPopupMask').remove();
                $('#gsPopup').remove();
            }, 150);
        }
        function closePopup() {
            $('#gsPopupClose').on('click', removePopup);
            $('#gsPopupMask').on('click', removePopup);
        }
        btn.on('click', function () {
            clearTimeout(outTimer);
            var $this = $(this),
                dw = $this.data('w'),
                dh = $this.data('h'),
                wh = $(window).height(),
                gerCss,
                popupOptions = {
                pos: 'fixed',
                width: dw,
                height: dh,
                sid: $this.data('sid'),
                sty: $this.data('sty')
            };
            gerCss = 'width:' + popupOptions.width + 'px;height:' + popupOptions.height + 'px;';
            popupOptions.style = 'position:' + popupOptions.pos + ';top:50%;left:50%;margin-left:-' + popupOptions.width / 2 + 'px;margin-top:-' + popupOptions.height / 2 + 'px;' + gerCss;
            if (dh > wh) {
                popupOptions.pos = 'absolute';
                popupOptions.style = 'position:' + popupOptions.pos + ';top:' + $this.offset().top + 'px;left:50%;margin-left:-' + popupOptions.width / 2 + 'px;' + gerCss;
            }
            addPopup(popupOptions);
            closePopup();
            if (typeof optionsEd.afterOpen === 'function') {
                optionsEd.afterOpen();
            }
        });
    };
})(jQuery);
$('.popupBtn').gsPopup();
(function ($) {
    var ymjsModel = {
        verifIpt: function verifIpt(iptcon, cate) {
            var bValidate;
            if (cate === 'qq') {
                bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
            } else if (cate === 'telephone') {
                bValidate = RegExp(/^1\d{10}$/).test(iptcon);
            } else if (cate === 'email') {
                bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
            }
            return bValidate;
        },
        lyFunc: function lyFunc() {
            var conId = $('#ztTxt'),
                iptId = $('#ztQQ'),
                conPl = conId.data('placeholder'),
                colorTxt = '#f2dfe1',
                colorTxtF = '#ffecee';
            conId.val(conPl).css('color', colorTxt);
            conId.on({
                'focus': function focus() {
                    if (conId.val() === conPl) {
                        conId.removeClass('errorClass');
                        conId.val('').css('color', colorTxtF);
                    }
                },
                'blur': function blur() {
                    if (conId.val() === '' || $.trim(conId.val()) === '' || conId.val() === conPl) {
                        conId.addClass('errorClass');
                        conId.val(conPl).css('color', colorTxt);
                    }
                }
            });
            $('#ztSmt').on('click', function () {
                var Ml = 'speedmgs',
                    Folder = 'zhuanti/' + Ml + '/',
                    fname = 'infos',
                    cookiefname = cookie(Ml),
                    userCon = conId.val(),
                    userNum = iptId.val(),
                    isuser = false;
                if (cookiefname !== null && cookiefname === userNum) {
                    alert("您已经提交过了！");
                    return;
                }
                $('.insertIpt').each(function () {
                    var $this = $(this),
                        pla = $this.data('placeholder');
                    if ($this.val() === pla) {
                        $this.addClass('errorClass');
                        isuser = true;
                    }
                });
                if (isuser === true) {
                    alert("说点什么吧!");
                    return;
                }
                if (ymjsModel.verifIpt(userNum, 'qq') === false) {
                    alert("请输入有效的qq！");
                    return;
                }
                var content = "---qq：" + userNum + "---愿望：" + userCon + "---";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://www3.gamersky.com:81/cfile.asp",
                    data: {
                        Submit: "Submit",
                        Folder: Folder,
                        Fname: fname,
                        Content: content
                    },
                    success: function success(Jsons) {}
                });
                cookie(Ml, userNum, {
                    path: '/'
                });
                alert("提交完成！");
                conId.val(conId.data('placeholder')).css('color', colorTxt);
                iptId.val('');
            });
        },
        //二维码
        fixCode: function fixCode() {
            var fxCode = $('.fx-code'),
                ft = fxCode.offset().top;
            function scrollFunc() {
                var $win = $(window),
                    st = $win.scrollTop();
                if ($win.width() < 1520) {
                    fxCode.hide();
                } else {
                    fxCode.show();
                }
                if (st >= ft - ($win.height() / 2 - 92.5)) {
                    fxCode.addClass('cur');
                } else {
                    fxCode.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        },
        gsZoom: function gsZoom(tar, options) {
            var $w = $(tar),
                opt = {
                css3: options.css3,
                s: options.speed,
                w: options.width,
                h: options.height,
                bp: options.prev,
                bn: options.next,
                bc: options.cur,
                l: options.list,
                cen: options.cen,
                btnp: options.btnPrev,
                btnn: options.btnNext,
                mc: options.mainCon,
                mn: options.nav,
                autoPlay: options.autoPlay,
                playSpeed: options.playSpeed,
                navClk: options.navClk
            },
                $c = $w.find(opt.mc),
                $n = $w.find(opt.mn),
                liLen = $c.find('li').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version),
                playTimer,
                playState = false;
            if (opt.autoPlay === true) {
                playState = true;
            }
            if (sbie === true && ver < 10) {
                opt.css3 = false;
            }
            if (opt.css3 === true) {
                $w.addClass('gszm-css3');
            }
            function commClk() {
                if (opt.autoPlay === true) {
                    clearInterval(playTimer);
                    playState = false;
                }
            }
            var zm = {
                setBoxSize: function setBoxSize() {
                    $w.add($c).css({
                        width: opt.w,
                        height: opt.h
                    });
                },
                setCardSize: function setCardSize() {
                    $c.find('li:not(.' + opt.bc + ',.' + opt.bp + ',.' + opt.bn + ')').hide().css(opt.cen);
                    $c.find('li.' + opt.bc).show().stop().animate(opt.l[1], opt.s);
                    $c.find('li.' + opt.bp).show().stop().animate(opt.l[0], opt.s);
                    $c.find('li.' + opt.bn).show().stop().animate(opt.l[2], opt.s);
                    zm.setNav();
                },
                css3change: function css3change() {
                    $c.find('li.' + opt.bc).css(opt.l[1]);
                    $c.find('li.' + opt.bp).css(opt.l[0]);
                    $c.find('li.' + opt.bn).css(opt.l[2]);
                    zm.setNav();
                },
                nextClk: function nextClk() {
                    var $this = $('li.' + opt.bn),
                        idx = $this.index();
                    $c.find('li.' + opt.bp).removeClass(opt.bp);
                    $c.find('li.' + opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if (idx === liLen - 1) {
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('li').eq(0).addClass(opt.bn);
                    } else {
                        $this.removeClass(opt.bn).addClass(opt.bc).next().addClass(opt.bn);
                    }
                    if (opt.css3 === true) {
                        zm.css3change();
                    } else {
                        zm.setCardSize();
                    }
                },
                prevClk: function prevClk() {
                    var $this = $('li.' + opt.bp),
                        idx = $this.index();
                    $c.find('li.' + opt.bn).removeClass(opt.bn);
                    $c.find('li.' + opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if (idx === 0) {
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('li').eq(-1).addClass(opt.bp);
                    } else {
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if (opt.css3 === true) {
                        zm.css3change();
                    } else {
                        zm.setCardSize();
                    }
                },
                setNav: function setNav() {
                    var idx = $c.find('.' + opt.bc).index();
                    $n.find('li').removeClass('cur').eq(idx).addClass('cur');
                    if (opt.autoPlay === true && playState === false) {
                        playState = true;
                        this.autoPlayFunc();
                    }
                },
                initNav: function initNav() {
                    var nl = '';
                    for (var i = 0; i < liLen; i++) {
                        nl += '<li></li>';
                    }
                    $n.html(nl);
                },
                initCardSize: function initCardSize() {
                    $c.find('li.' + opt.bp).css(opt.l[0]);
                    $c.find('li.' + opt.bc).css(opt.l[1]);
                    $c.find('li.' + opt.bn).css(opt.l[2]);
                },
                initClass: function initClass() {
                    $c.find('li').eq(0).addClass(opt.bp);
                    $c.find('li').eq(1).addClass(opt.bc);
                    $c.find('li').eq(2).addClass(opt.bn);
                    if (opt.css3 !== true) {
                        $c.find('li:gt(2)').hide().css(opt.l[0]);
                    }
                },
                navClk: function navClk() {
                    var navTimer;
                    function moveFunc(tar) {
                        var $this = tar,
                            idx = $this.index();
                        commClk();
                        $c.find('li').removeClass();
                        if (idx === 0) {
                            $c.find('li').eq(liLen - 1).addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        } else if (idx === liLen - 1) {
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(0).addClass(opt.bn);
                        } else {
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }
                        $c.find('li').eq(idx).addClass(opt.bc);
                        if (opt.css3 === true) {
                            zm.css3change();
                        } else {
                            zm.setCardSize();
                        }
                    }
                    if (opt.navClk === false) {
                        $n.find('li').on({
                            'mouseover': function mouseover() {
                                var tar = $(this);
                                navTimer = setTimeout(function () {
                                    moveFunc(tar);
                                }, 120);
                            },
                            'mouseout': function mouseout() {
                                clearTimeout(navTimer);
                            }
                        });
                    } else {
                        $n.find('li').on('click', function () {
                            moveFunc($(this));
                        });
                    }
                },
                clkFunc: function clkFunc() {
                    $c.on('click', 'li.gszm-next', function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click', 'li.gszm-prev', function () {
                        commClk();
                        zm.prevClk();
                    });
                    $w.find(opt.btnn).on('click', function () {
                        commClk();
                        zm.nextClk();
                    });
                    $w.find(opt.btnp).on('click', function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                autoPlayFunc: function autoPlayFunc() {
                    playTimer = setInterval(function () {
                        zm.nextClk();
                    }, opt.playSpeed);
                },
                init: function init() {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.initNav();
                    this.setNav();
                    this.clkFunc();
                    this.navClk();
                    if (opt.autoPlay === true) {
                        this.autoPlayFunc();
                    }
                }
            };
            zm.init();
        }
    };
    ymjsModel.lyFunc();
    ymjsModel.fixCode();
    ymjsModel.gsZoom('#gsZoom', {
        css3: false,
        width: '1040px',
        height: '760px',
        speed: 500,
        mainCon: '.gszm-con',
        prev: 'gszm-prev',
        next: 'gszm-next',
        cur: 'gszm-cur',
        btnPrev: '.gszm-btn-prev',
        btnNext: '.gszm-btn-next',
        nav: '.gszm-nav',
        navClk: false,
        autoPlay: false,
        playSpeed: 2000,
        list: [{
            width: 360,
            height: 595,
            top: 94,
            left: 0
        }, {
            width: 460,
            height: 760,
            top: 0,
            left: 290
        }, {
            width: 360,
            height: 595,
            top: 94,
            left: 680
        }],
        cen: {
            width: 360,
            height: 595,
            top: 94,
            left: 340
        }
    });
})(jQuery);