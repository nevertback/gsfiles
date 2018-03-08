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
                case 'video_yk':
                    sourceDom = '<embed height="100%" flashvars="isAutoPlay=true" allowscriptaccess="sameDomain" width="100%" align="middle" quality="high" invokeurls="false" src="http://player.youku.com/player.php/sid/'+sid+'/v.swf" type="application/x-shockwave-flash" wmode="transparent">';
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
            popupDom += addSource(opts.sid,opts.sty);
            popupDom += '</div><a  class="gsPopupClose" id="gsPopupClose"></a></div>';
            $('body').append(popupDom);
            inTimer = setTimeout(function () {
                $('#gsPopupMask').addClass('cur');
                $('#gsPopup').addClass('cur');
            },10);
        }
        function removePopup() {
        	clearTimeout(inTimer);
            $('#gsPopupMask').removeClass('cur');
            $('#gsPopup').removeClass('cur');
            outTimer = setTimeout(function () {
                $('#gsPopupMask').remove();
                $('#gsPopup').remove();
            },150);
        }
        function closePopup() {
            $('#gsPopupClose').on('click',removePopup);
            $('#gsPopupMask').on('click',removePopup);
        }
        btn.on('click',function () {
            clearTimeout(outTimer);
            var $this = $(this),dw = $this.data('w'),dh = $this.data('h'),
                wh = $(window).height(),gerCss,
                popupOptions = {
                    pos:'fixed',
                    width:dw,
                    height:dh,
                    sid:$this.data('sid'),
                    sty:$this.data('sty')
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
	var ymjsModel = {
		createRwlist:function () {
			var rwList = '',rwDt = fzData.rwData,skillDt = fzData.skill;
			function createRw(dt) {
				var rwDom = '';
                rwDom += '<li>';
                rwDom += '<img src="http://image.gamersky.com/webimg13/zhuanti/fzts/rw-pic-'+dt.id+'.png" alt="'+dt.name+'" class="rw-bg">';
                rwDom += '<div class="part1"><div class="clearfix name"><span class="name-'+dt.id+'"></span>';
                for (var snum = 0;snum<dt.stars;snum++){
                    rwDom += '<i></i>';
				}
                rwDom += '</div><p class="des">'+dt.des+'</p></div>';
                rwDom += '<div class="part2"><div class="pty"><div class="tit">属性</div><div class="pty-list">';
                $.each(dt.pty,function (i,item) {
                    rwDom += '<span>'+item[1]+'<br>'+item[0]+'</span>';
                });
                rwDom += '</div></div></div>';
                rwDom += '<div class="part3"><div class="tit">带兵</div><span class="txt txt1">弓箭手 </span><span class="txt txt2">刀盾兵</span><span class="txt txt3">长枪兵</span><span class="txt txt4">轻骑兵</span><span class="txt txt5">重骑兵</span></div>';
                rwDom += '<div class="part4"><div class="tit">技能</div><div class="skills';
                rwDom += dt.skill.length>3?' skill-mini':'';
                rwDom += '">';
                $.each(dt.skill,function (i,item) {
                    rwDom += '<a><img src="http://image.gamersky.com/webimg13/zhuanti/fzts/sk-'+item+'.png" alt="'+item+'"><span class="txt">'+skillDt[item][0]+'</span><span class="pop">'+skillDt[item][0]+'<br>'+skillDt[item][1]+'</span></a>';
                });
                rwDom += '</div></div>';
                rwDom += '<div class="part5"><div class="tit">缘分</div><div class="list">';
                $.each(dt.rela,function (i,item) {
                    rwDom += '<p>'+item[0]+'：'+item[1]+'</p>';
                });
                rwDom += '</div><a target="_blank" href="'+dt.more+'" class="more">查看更多英雄资料</a>';
                rwDom += '</div>';
                rwDom += '</li>';
                return rwDom;
            }
            $.each(rwDt,function (i,item) {
                rwList += createRw(item);
            });
			$('#rwList').html(rwList);
        },
        ztTabs:function(tabId){
            var $tabId = $(tabId),
                $tabNav = $tabId.find('.ztTabNav').find('li'),
                $tabCon = $tabId.find('.ztTabCon');
            $(tabId).slide({
                titCell:$tabNav,
                titOnClassName:'cur',
                mainCell:$tabCon,
                effect:'fade',
                delayTime:250,
                switchLoad:'data-src'
            });
        },
        gsZoom:function (tar,options) {
            var $w = $(tar),
                opt = {
                    css3:options.css3,
                    s:options.speed,
                    w:options.width,
                    h:options.height,
                    bp:options.prev,
                    bn:options.next,
                    bc:options.cur,
                    l:options.list,
                    cen:options.cen,
                    btnp:options.btnPrev,
                    btnn:options.btnNext,
                    mc:options.mainCon,
                    mn:options.nav,
                    autoPlay:options.autoPlay,
                    playSpeed:options.playSpeed,
                    navClk:options.navClk
                },
                $c = $w.find(opt.mc),
                $n = $w.find(opt.mn),
                liLen = $c.find('li').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version),playTimer,playState = false;
            if(opt.autoPlay === true){
                playState = true;
            }
            if(sbie === true && ver < 10){
                opt.css3 = false;
            }
            if(opt.css3 === true){
                $w.addClass('gszm-css3');
            }
            function commClk() {
                if(opt.autoPlay === true){
                    clearInterval(playTimer);
                    playState = false;
                }
            }
            var zm = {
                setBoxSize:function () {
                    $w.add($c).css({
                        width:opt.w,
                        height:opt.h
                    })
                },
                setCardSize:function () {
                    $c.find('li:not(.'+opt.bc+',.'+opt.bp+',.'+opt.bn+')').hide().css(opt.cen);
                    $c.find('li.'+opt.bc).show().stop().animate(opt.l[1],opt.s);
                    $c.find('li.'+opt.bp).show().stop().animate(opt.l[0],opt.s);
                    $c.find('li.'+opt.bn).show().stop().animate(opt.l[2],opt.s);
                    zm.setNav();
                },
                css3change:function () {
                    // $c.find('li.'+opt.bc).css(opt.l[1]);
                    // $c.find('li.'+opt.bp).css(opt.l[0]);
                    // $c.find('li.'+opt.bn).css(opt.l[2]);
                    zm.setNav();
                },
                nextClk:function () {
                    var $this = $('li.'+opt.bn),idx = $this.index();
                    $c.find('li.'+opt.bp).removeClass(opt.bp);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if(idx === liLen-1){
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('li').eq(0).addClass(opt.bn);
                    }else{
                        $this.removeClass(opt.bn).addClass(opt.bc).next().addClass(opt.bn);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                prevClk:function () {
                    var $this = $('li.'+opt.bp),idx = $this.index();
                    $c.find('li.'+opt.bn).removeClass(opt.bn);
                    $c.find('li.'+opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if(idx === 0){
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('li').eq(-1).addClass(opt.bp);
                    }else{
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if(opt.css3 === true){
                        zm.css3change()
                    }else{
                        zm.setCardSize();
                    }
                },
                setNav:function () {
                    var idx = $c.find('.'+opt.bc).index();
                    $n.find('li').removeClass('cur').eq(idx).addClass('cur');
                    if(opt.autoPlay === true && playState === false){
                        playState = true;
                        this.autoPlayFunc();
                    }
                },
                initNav:function () {
                    var nl = '';
                    for(var i = 0;i<liLen;i++){
                        nl += '<li></li>'
                    }
                    $n.html(nl);
                },
                initCardSize:function () {
                    if(opt.css3 !== true) {
                        $c.find('li.' + opt.bp).css(opt.l[0]);
                        $c.find('li.' + opt.bc).css(opt.l[1]);
                        $c.find('li.' + opt.bn).css(opt.l[2]);
                    }
                },
                initClass:function () {
                    $c.find('li').eq(0).addClass(opt.bp);
                    $c.find('li').eq(1).addClass(opt.bc);
                    $c.find('li').eq(2).addClass(opt.bn);
                    if(opt.css3 !== true){
                        $c.find('li:gt(2)').hide().css(opt.l[0]);
                    }
                },
                navClk:function () {
                    var navTimer;
                    function moveFunc(tar) {
                        var $this = tar,idx = $this.index();
                        commClk();
                        $c.find('li').removeClass();
                        if(idx === 0){
                            $c.find('li').eq(liLen-1).addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }else if(idx === liLen-1){
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(0).addClass(opt.bn);
                        }else{
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }
                        $c.find('li').eq(idx).addClass(opt.bc);
                        if(opt.css3 === true){
                            zm.css3change()
                        }else{
                            zm.setCardSize();
                        }
                    }
                    if(opt.navClk === false){
                        $n.find('li').on({
                            'mouseover':function () {
                                var tar = $(this);
                                navTimer =setTimeout(function () {
                                    moveFunc(tar);
                                },120);
                            },
                            'mouseout':function () {
                                clearTimeout(navTimer)
                            }
                        });
                    }else{
                        $n.find('li').on('click',function () {
                            moveFunc($(this));
                        });
                    }
                },
                clkFunc:function () {
                    $c.on('click','li.gszm-next',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click','li.gszm-prev',function () {
                        commClk();
                        zm.prevClk();
                    });
                    $w.find(opt.btnn).on('click',function () {
                        commClk();
                        zm.nextClk();
                    });
                    $w.find(opt.btnp).on('click',function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                autoPlayFunc:function () {
                    playTimer = setInterval(function () {
                        zm.nextClk();
                    },opt.playSpeed);
                },
                init:function () {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.initNav();
                    this.setNav();
                    this.clkFunc();
                    this.navClk();
                    if(opt.autoPlay === true){
                        this.autoPlayFunc();
                    }
                }
            };
            zm.init();
        },
		//右侧导航按钮
		fnavA: function(tarFixnav,toTopDes,toWidth) {
			!function($) {
				function ScrollSpy(element, options) {
					var process = $.proxy(this.process, this),
						$element = $(element).is('body') ? $(window) : $(element),
						href;
					this.options = $.extend({}, $.fn.scrollspy.defaults, options);
					this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process);
					this.selector = (this.options.target || ((href = $(element).attr('data-to')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' li>a';
					this.$body = $('body');
					this.refresh();
					this.process()
				}
				ScrollSpy.prototype = {
					constructor: ScrollSpy,
					refresh: function() {
						var self = this,
							$targets;
						this.offsets = $([]);
						this.targets = $([]);
						$targets = this.$body
							.find(this.selector)
							.map(function() {
								var $el = $(this),
									href = $el.data('to'),
									$href = /^#\w/.test(href) && $(href);
								return ($href && $href.length && [
									[$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
								]) || null
							})
							.sort(function(a, b) {
								return a[0] - b[0]
							})
							.each(function() {
								self.offsets.push(this[0]);
								self.targets.push(this[1])
							})
					},
					process: function() {
						var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
							scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
							maxScroll = scrollHeight - this.$scrollElement.height(),
							offsets = this.offsets,
							targets = this.targets,
							activeTarget = this.activeTarget,
							i,ww = $(window).width();
						if (scrollTop >= maxScroll) {
							return activeTarget !== (i = targets.last()[0]) && this.activate(i)
						}
						for (i = offsets.length; i--;) {
							activeTarget !== targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
						}
                        if (scrollTop >= toTopDes && ww > toWidth) {
                            $(tarFixnav).addClass('cur');
                        }else{
                            $(tarFixnav).removeClass('cur');
                        }
					},
					activate: function(target) {
						var active, selector;
						this.activeTarget = target;
						$(this.selector).removeClass('cur');
						selector = this.selector + target + ',' + this.selector + '[data-to="' + target + '"]';
						active = $(selector).addClass('cur');
						active.trigger('activate')
					}
				};
				var old = $.fn.scrollspy;
				$.fn.scrollspy = function(option) {
					return this.each(function() {
						var $this = $(this),
							data = $this.data('scrollspy'),
							options = typeof option === 'object' && option;
						if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)));
						if (typeof option === 'string') data[option]()
					})
				};
				$.fn.scrollspy.Constructor = ScrollSpy;
				$.fn.scrollspy.defaults = {
					offset: 36
				};
				$.fn.scrollspy.noConflict = function() {
					$.fn.scrollspy = old;
					return this
				};
				$(window).on('load', function() {
					$('body').each(function() {
						var $spy = $(this);
						$spy.scrollspy({
							target:tarFixnav
						})
					})
				})
			}(window.jQuery);
			$(tarFixnav).find('a').on('click', function(e) {
				if (e && e.preventDefault) {
					//阻止默认浏览器动作(W3C)
					e.preventDefault();
				} else {
					//IE中阻止函数器默认动作的方式
					window.event.returnValue = false;
					return false;
				}
				var todiv = $(this).data('to'),off = $(this).data('off') || 0;
				$('html,body').animate({scrollTop: $(todiv).offset().top - off}, 400);
			});
            function fixedDisplay() {
                var ww = $(window).width();
                if(ww>toWidth){
                    if($('body').scrollTop()>toTopDes){
                        $(tarFixnav).addClass('cur');
                    }
                }else{
                    $(tarFixnav).removeClass('cur');
                }
            }
            $(window).resize(fixedDisplay);
		}
	};
	$.getScript('http://j.gamersky.com/zhuanti/fzts/rwData.js',function () {
        ymjsModel.createRwlist();
        ymjsModel.ztTabs('#tab3');
    });
    ymjsModel.ztTabs('#tab4');
    ymjsModel.ztTabs('#tab6');
    ymjsModel.ztTabs('#tab7');
    ymjsModel.gsZoom('#gsZoom',{
        css3:true,
        width:'1308px',
        height:'564px',
        speed:200,
        mainCon:'.gszm-con',
        prev:'gszm-prev',
        next:'gszm-next',
        cur:'gszm-cur',
        btnPrev:'.gszm-btn-prev',
        btnNext:'.gszm-btn-next',
        nav:'.gszm-nav',
        navClk:false,
        autoPlay:false,
        playSpeed:3000,
        list:[{
            width: 708,
            height:460,
            top: 52,
            left: 0
        }, {
            width: 868,
            height:564,
            top: 0,
            left: 220
        }, {
            width: 708,
            height:460,
            top: 52,
            left: 600
        }],
        cen:{
            width: 708,
            height:460,
            top: 52,
            left: 300
        }
    });
	ymjsModel.fnavA('#fixednav',800,1468);
})(jQuery);