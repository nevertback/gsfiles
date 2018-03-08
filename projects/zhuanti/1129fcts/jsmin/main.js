'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        isSbie: function isSbie() {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version),
                ieWarning = '';
            ieWarning += '<div id="gs-warning-tips" style="display: none;font-size: 14px; height: 97px; width: 100%; border-bottom: #e22200 3px solid; position: fixed; text-align: center; left: 0px; z-index: 10000000; line-height: 100px; bottom: 0px; background-color: #262626"><img style="width: auto; vertical-align: auto; position: relative; display: inline; top: 2px" src="http://image.gamersky.com/webimg13/zhuanti/common/warning.png"> <span style="font-size: 18px; color: black;color: #e5e5e5;">&nbsp;您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：&nbsp;&nbsp;</span> <a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a> </div>';
            ieWarning += '<div id="gs-warning-bg" style="height: 100%; width: 100%; position: fixed; left: 0px; filter: alpha(opacity=65); z-index: 99999; top: 0px; background-color: black; opacity: 0.65"></div>';
            ieWarning += '<div id="gs-warning-dialog" style="font-size: 14px; border-top: #e22200 3px solid; height: 190px; width: 400px; position: fixed; padding-bottom: 40px; padding-top: 40px; padding-left: 60px; left: 50%; margin: -132px 0px 0px -260px; z-index: 10000000; top: 50%; padding-right: 60px; background-color: #262626"><p style="font-size: 18px; color: black; line-height: 30px;color: #e5e5e5;">您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：</p><a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; margin-top: 20px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a>';
            ieWarning += '<p style="width: 100%; text-align: right"><img style="width: auto" alt="" src="http://image.gamersky.com/webimg15/logo/chang/160x53.png"></p><a style="font-size: 20px; text-decoration: none; height: 60px; width: 60px; right: -60px; position: absolute; font-weight: bolder; color: #fff; text-align: center; display: block; line-height: 60px; top: -3px; background-color: #e22200" onclick="document.getElementById(\'gs-warning-dialog\').style.display=\'none\';document.getElementById(\'gs-warning-bg\').style.display=\'none\';document.getElementById(\'gs-warning-tips\').style.display=\'block\'" href="javascript:void(0)">×</a></div>';
            if (sbie === true && ver < 10) {
                $('body').append(ieWarning);
            }
        },
        ztTabs: function ztTabs(tabId) {
            var $tabId = $(tabId),
                $tabNav = $tabId.find('.ztTabNav').find('li'),
                $tabCon = $tabId.find('.ztTabCon');
            $(tabId).slide({
                titCell: $tabNav,
                titOnClassName: 'cur',
                mainCell: $tabCon,
                effect: 'fade',
                delayTime: 250,
                switchLoad: 'data-src'
            });
        },
        ztSld: function ztSld(tar) {
            var $sldwrap = $(tar),
                $sldPrev = $sldwrap.find('.arrBtnL'),
                $sldNext = $sldwrap.find('.arrBtnR'),
                $sld = $sldwrap.find('.ztSld'),
                $sldCon = $sld.find('.ztSldCon');

            $sld.slide({
                mainCell: $sldCon,
                effect: 'leftLoop',
                delayTime: 250,
                prevCell: $sldPrev,
                nextCell: $sldNext,
                switchLoad: 'data-src'
            });
        },
        gszSetting: {
            css3: true,
            width: '1200px',
            height: '378px',
            speed: 200,
            mainCon: '.gszm-con',
            prev: 'gszm-prev',
            next: 'gszm-next',
            cur: 'gszm-cur',
            list: [{
                width: 425,
                height: 240,
                top: 69,
                left: 0
            }, {
                width: 670,
                height: 378,
                top: 0,
                left: 264
            }, {
                width: 425,
                height: 240,
                top: 69,
                left: 770
            }],
            cen: {
                width: 425,
                height: 240,
                top: 69,
                left: 387
            }
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
                mc: options.mainCon
            },
                $c = $w.find(opt.mc),
                liLen = $c.find('.gsZoomItem').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version);
            if (sbie === true && ver < 10) {
                opt.css3 = false;
            }
            if (opt.css3 === true) {
                $w.addClass('gszm-css3');
            }
            function commClk() {}
            var zm = {
                setBoxSize: function setBoxSize() {
                    $w.add($c).css({
                        width: opt.w,
                        height: opt.h
                    });
                },
                setCardSize: function setCardSize() {
                    $c.find('.gsZoomItem:not(.' + opt.bc + ',.' + opt.bp + ',.' + opt.bn + ')').hide().css(opt.cen);
                    $c.find('.gsZoomItem.' + opt.bc).show().stop().animate(opt.l[1], opt.s);
                    $c.find('.gsZoomItem.' + opt.bp).show().stop().animate(opt.l[0], opt.s);
                    $c.find('.gsZoomItem.' + opt.bn).show().stop().animate(opt.l[2], opt.s);
                },
                css3change: function css3change() {
                    //zm.setNav();
                },
                nextClk: function nextClk() {
                    var $this = $c.find('.gsZoomItem.' + opt.bn),
                        idx = $this.index();
                    $c.find('.gsZoomItem.' + opt.bp).removeClass(opt.bp);
                    $c.find('.gsZoomItem.' + opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if (idx === liLen - 1) {
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('.gsZoomItem').eq(0).addClass(opt.bn);
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
                    var $this = $c.find('.gsZoomItem.' + opt.bp),
                        idx = $this.index();
                    $c.find('.gsZoomItem.' + opt.bn).removeClass(opt.bn);
                    $c.find('.gsZoomItem.' + opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if (idx === 0) {
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('.gsZoomItem').eq(-1).addClass(opt.bp);
                    } else {
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if (opt.css3 === true) {
                        zm.css3change();
                    } else {
                        zm.setCardSize();
                    }
                },
                initCardSize: function initCardSize() {
                    if (opt.css3 !== true) {
                        $c.find('.gsZoomItem.' + opt.bp).css(opt.l[0]);
                        $c.find('.gsZoomItem.' + opt.bc).css(opt.l[1]);
                        $c.find('.gsZoomItem.' + opt.bn).css(opt.l[2]);
                    }
                },
                initClass: function initClass() {
                    $c.find('.gsZoomItem').eq(0).addClass(opt.bp);
                    $c.find('.gsZoomItem').eq(1).addClass(opt.bc);
                    $c.find('.gsZoomItem').eq(2).addClass(opt.bn);
                    if (opt.css3 !== true) {
                        $c.find('.gsZoomItem:gt(2)').hide().css(opt.l[0]);
                    }
                },
                clkFunc: function clkFunc() {
                    $c.on('click', '.gsZoomItem.gszm-next', function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click', '.gsZoomItem.gszm-prev', function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                init: function init() {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.clkFunc();
                }
            };
            zm.init();
        },
        swp: function swp() {
            var page = new Swiper("#Jpagination .swiper-container", {
                direction: "horizontal",
                slidesPerView: "auto",
                centeredSlides: !0,
                slideToClickedSlide: !0,
                grabCursor: !0,
                speed: 500,
                nextButton: ".art-page-next",
                prevButton: ".art-page-prev",
                onTransitionStart: function onTransitionStart() {
                    $("#role-box").find(".zhezhao").removeClass("on");
                },
                onTransitionEnd: function onTransitionEnd() {
                    $("#role-box").find(".zhezhao").addClass("on");
                },
                onSlideChangeStart: function onSlideChangeStart(e) {
                    rbSwp && rbSwp.slideTo(e.activeIndex);
                }
            });
            var rbSwp = new Swiper("#role-box", {
                nextButton: ".role-right",
                prevButton: ".role-left",
                spaceBetween: 30,
                effect: "fade",
                preloadImages: !1,
                lazyLoading: !0,
                fade: {
                    crossFade: !0
                },
                onTransitionStart: function onTransitionStart() {
                    $("#role-box").find(".zhezhao").removeClass("on");
                },
                onTransitionEnd: function onTransitionEnd() {
                    $("#role-box").find(".zhezhao").addClass("on");
                },
                onSlideChangeStart: function onSlideChangeStart(e) {
                    page && page.slideTo(e.activeIndex);
                }
            });
        },
        //右侧导航按钮
        fnavA: function fnavA(tarFixnav, toTopDes, toWidth) {
            !function ($) {
                function ScrollSpy(element, options) {
                    var process = $.proxy(this.process, this),
                        $element = $(element).is('body') ? $(window) : $(element),
                        href;
                    this.options = $.extend({}, $.fn.scrollspy.defaults, options);
                    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process);
                    this.selector = (this.options.target || (href = $(element).attr('data-to')) && href.replace(/.*(?=#[^\s]+$)/, '') || '') + ' li>a';
                    this.$body = $('body');
                    this.refresh();
                    this.process();
                }
                ScrollSpy.prototype = {
                    constructor: ScrollSpy,
                    refresh: function refresh() {
                        var self = this,
                            $targets;
                        this.offsets = $([]);
                        this.targets = $([]);
                        $targets = this.$body.find(this.selector).map(function () {
                            var $el = $(this),
                                href = $el.data('to'),
                                $href = /^#\w/.test(href) && $(href);
                            return $href && $href.length && [[$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]] || null;
                        }).sort(function (a, b) {
                            return a[0] - b[0];
                        }).each(function () {
                            self.offsets.push(this[0]);
                            self.targets.push(this[1]);
                        });
                    },
                    process: function process() {
                        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                            scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                            maxScroll = scrollHeight - this.$scrollElement.height(),
                            offsets = this.offsets,
                            targets = this.targets,
                            activeTarget = this.activeTarget,
                            i,
                            ww = $(window).width();
                        if (scrollTop >= maxScroll) {
                            return activeTarget !== (i = targets.last()[0]) && this.activate(i);
                        }
                        for (i = offsets.length; i--;) {
                            activeTarget !== targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
                        }
                        if (scrollTop >= toTopDes && ww > toWidth) {
                            $(tarFixnav).addClass('cur');
                        } else {
                            $(tarFixnav).removeClass('cur');
                        }
                    },
                    activate: function activate(target) {
                        var active, selector;
                        this.activeTarget = target;
                        $(this.selector).removeClass('cur');
                        selector = this.selector + target + ',' + this.selector + '[data-to="' + target + '"]';
                        active = $(selector).addClass('cur');
                        active.trigger('activate');
                    }
                };
                var old = $.fn.scrollspy;
                $.fn.scrollspy = function (option) {
                    return this.each(function () {
                        var $this = $(this),
                            data = $this.data('scrollspy'),
                            options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option;
                        if (!data) $this.data('scrollspy', data = new ScrollSpy(this, options));
                        if (typeof option === 'string') data[option]();
                    });
                };
                $.fn.scrollspy.Constructor = ScrollSpy;
                $.fn.scrollspy.defaults = {
                    offset: 36
                };
                $.fn.scrollspy.noConflict = function () {
                    $.fn.scrollspy = old;
                    return this;
                };
                $(window).on('load', function () {
                    $('body').each(function () {
                        var $spy = $(this);
                        $spy.scrollspy({
                            target: tarFixnav
                        });
                    });
                });
            }(window.jQuery);
            $(tarFixnav).find('a').on('click', function (e) {
                if (e && e.preventDefault) {
                    //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                } else {
                    //IE中阻止函数器默认动作的方式
                    window.event.returnValue = false;
                    return false;
                }
                var todiv = $(this).data('to'),
                    off = $(this).data('off') || 0;
                $('html,body').animate({ scrollTop: $(todiv).offset().top - off }, 400);
            });
            function fixedDisplay() {
                var ww = $(window).width();
                if (ww > toWidth) {
                    if ($('body').scrollTop() > toTopDes) {
                        $(tarFixnav).addClass('cur');
                    }
                } else {
                    $(tarFixnav).removeClass('cur');
                }
            }
            $(window).resize(fixedDisplay);
        }
    };
    $('.ztTab').each(function () {
        ymjsModel.ztTabs('#' + $(this).attr('id'));
    });
    ymjsModel.isSbie();
    ymjsModel.ztSld('#ztSld8');
    ymjsModel.fnavA('#fixednav', 500, 1560);
    ymjsModel.gsZoom('#gsZoom1', ymjsModel.gszSetting);
    ymjsModel.gsZoom('#gsZoom2', ymjsModel.gszSetting);
    ymjsModel.gsZoom('#gsZoom3', ymjsModel.gszSetting);
    ymjsModel.swp();
})(jQuery);