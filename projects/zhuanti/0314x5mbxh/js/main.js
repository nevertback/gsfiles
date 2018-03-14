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
        function addPopup(opts,specCls) {
            var popupDom = '';
            popupDom += '<div id="gsPopupMask" class="gsPopupMask"></div>';
            popupDom += '<div id="gsPopup" class="gsPopup '+specCls+'" style="';
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
                },specCls = $this.data('spec') || '';
            gerCss = 'width:'+popupOptions.width+'px;height:'+popupOptions.height+'px;';
            popupOptions.style = 'position:'+popupOptions.pos+';top:50%;left:50%;margin-left:-'+popupOptions.width/2+'px;margin-top:-'+popupOptions.height/2+'px;'+gerCss;
            if(dh>wh){
                popupOptions.pos = 'absolute';
                popupOptions.style = 'position:'+popupOptions.pos+';top:'+$this.offset().top+'px;left:50%;margin-left:-'+popupOptions.width/2+'px;'+gerCss;
            }
            addPopup(popupOptions,specCls);
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
        ztSld:function(tar){
            var $sldwrap = $(tar),
                $sldPrev = $sldwrap.find('.arrBtnL'),
                $sldNext = $sldwrap.find('.arrBtnR'),
                $sld = $sldwrap.find('.ztSld'),
                $sldCon = $sld.find('.ztSldCon'),
                $sldNav = $sld.find('.ztSldNav');

            $sld.slide({
                mainCell:$sldCon,
                effect:'leftLoop',
                delayTime:250,
                prevCell:$sldPrev,
                nextCell:$sldNext,
                switchLoad:'data-src',
                titCell:$sldNav,
                autoPage:'<li></li>',
                titOnClassName:'cur'
            });
        },
        //二维码
        fixCode: function() {
            var fxCode = $('.fx-code'),ft = fxCode.offset().top;
            function scrollFunc() {
                var $win = $(window),st = $win.scrollTop();
                if($win.width() < 1260){
                    fxCode.hide();
                }else{
                    fxCode.show();
                }
                if(st >= (ft-($win.height()/2 - 205))){
                    fxCode.addClass('cur');
                }else{
                    fxCode.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        },
        box:function () {
            function fromQQ() {
                function initCostDom(data, id) {
                    var tabHtml = "";
                    var contHtml = "";
                    var totalHtml = "";
                    var styleHtml = "<style>";
                    for (var i = 0; i < data.length; i++) {
                        styleHtml += '#' + id + ' .n' + (i + 1) + ' span{background:url(http:' + data[i].xtpc_a3 + ') no-repeat;}';
                        styleHtml += '#' + id + ' .n' + (i + 1) + '.on span{background:url(http:' + data[i].xtm_7f + ') no-repeat;}';
                        tabHtml += '<li class="n' + (i + 1) + '" himg="" img="" title="' + data[i].fsmc_e0 + '"><span></span></li>';
                        contHtml += '<div class="human"><img class="line" src="ztimages/l' + (i + 1) + '.png?20180313"><img class="pic" src="http:' + data[i].dt_c8 + '" alt="' + data[i].fsmc_e0 + '"><img class="gif" src="http:' + data[i].gifpc_92 + '"></div>';
                    }

                    styleHtml += "</style>";
                    totalHtml = '<ul class="humans">' + tabHtml + '</ul><div class="human-list">' + contHtml + '</div>';

                    totalHtml = totalHtml + styleHtml;
                    $("#" + id).html(totalHtml);
                }
                function zlkcallback(data) {
                    var tempData = data.fsjh_28;
                    var costData1 = [];
                    var costData2 = [];
                    var costData3 = [];
                    var costData4 = [];
                    var costData5 = [];
                    var costData6 = [];

                    for (var i = 0; i < tempData.length; i++) {
                        var name = tempData[i].fsmc_e0;
                        var id = tempData[i].fsid_06;
                        var cid = tempData[i].fsfl_3e;
                        var bpic = tempData[i].dt_c8;
                        var gif = tempData[i].gifpc_92;
                        var sex = tempData[i].xb_a6;
                        var mpic = tempData[i].xtpc_a3;
                        var mhpic = tempData[i].xtm_7f;
                        if (cid == 1) {
                            costData1.push(tempData[i]);
                        } else if (cid == 2) {
                            costData2.push(tempData[i]);
                        } else if (cid == 3) {
                            costData3.push(tempData[i]);
                        } else if (cid == 4) {
                            costData4.push(tempData[i]);
                        } else if (cid == 5) {
                            costData5.push(tempData[i]);
                        } else if (cid == 6) {
                            costData6.push(tempData[i]);
                        }
                    }
                    initCostDom(costData1, "appar0");
                    initCostDom(costData2, "appar1");
                    initCostDom(costData3, "appar2");
                    initCostDom(costData4, "appar3");
                    initCostDom(costData5, "appar4");
                    initCostDom(costData6, "appar5");

                    var tabs09 = [];

                    var tabs08 = new tabs("costs","tab-con",{
                        timeout: 80,
                        //延迟切换时间。默认参数为60;
                        currCls: "on",
                        //设置当前标签（li）class 名。默认参数为"on";
                        disCls: "dis",
                        //控制显示class名。默认参数为"dis";
                        event: "mouseover",
                        //事件类型。默认为"mouseover";
                        onFinish: function() {
                            setTimeout(function() {
                                var index = tabs08.index;
                                if (!tabs09[index]) {
                                    tabs09[index] = new tabs("appar" + index,"human",{
                                        timeout: 80,
                                        //延迟切换时间。默认参数为60;
                                        currCls: "on",
                                        //设置当前标签（li）class 名。默认参数为"on";
                                        disCls: "dis",
                                        //控制显示class名。默认参数为"dis";
                                        event: "mouseover"//事件类型。默认为"mouseover";
                                    });
                                }
                            }, 80);
                        }//回调函数。需要定义callback函数;
                    });

                    tabs09[0] = new tabs("appar" + 0,"human",{
                        timeout: 80,
                        //延迟切换时间。默认参数为60;
                        currCls: "on",
                        //设置当前标签（li）class 名。默认参数为"on";
                        disCls: "dis",
                        //控制显示class名。默认参数为"dis";
                        event: "mouseover"//事件类型。默认为"mouseover";
                    });
                }

                $.ajax({
                    url: "http://j.gamersky.com/zhuanti/x5mbxh/fsxx.js",
                    type: "GET",
                    dataType: "Script",
                    //指定服务器返回的数据类型
                    success: function(data) {
                        var bData = fsxxData;
                        zlkcallback(bData);
                    }
                });
            }
            fromQQ();

        },
        lt:function () {
            var $ltBtn = $('.ltAnimBtn');
            $ltBtn.on('click',function () {
                var $this = $(this);
                $this.addClass('cur');
                setTimeout(function () {
                    $this.removeClass('cur');
                    $('#ltTrueBtn').trigger('click');
                },250);
            })
        }
	};
    $('.ztTab').each(function(){
        ymjsModel.ztTabs('#'+$(this).attr('id'));
    });
    $('.ztSldWrap').each(function(){
        ymjsModel.ztSld('#'+$(this).attr('id'));
    });
    ymjsModel.fixCode();
	ymjsModel.box();
    ymjsModel.lt();
})(jQuery);