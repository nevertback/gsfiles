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
	var ymjsModel = {
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
        vote:function () {
            var $list = $('.voteList'),voteId = $list.data('voteid');
            function getVoteData() {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db2.gamersky.com/Vote/ShowVote.aspx",
                    data: {
                        json: "1",
                        id: voteId
                    },
                    success: function(responseJson) {
                        switch (responseJson.status) {
                            case "ok":
                                $.each(responseJson.items,function (i,item) {
                                    var vsid = item.Id,vsnum = item.TotalNumber,
                                        itTar = $('.voteItem[data-vid='+vsid+']');
                                    itTar.find('.nums').html(vsnum);
                                });
                                break;
                            case "err":
                                alert(responseJson.message);
                                break;
                        }
                    }
                });
            }
            function smtVote(vid,tar,num) {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db5.gamersky.com/Vote/ShowVote.aspx",
                    data: {
                        json: "2",
                        id: voteId,
                        vote: vid
                    },
                    success: function(responseJson) {
                        switch (responseJson.status) {
                            case "ok":
                                tar.closest('.voteItem').find('.nums').html(num);
                                break;
                            case "err":
                                alert(responseJson.message);
                                break;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("投票已经关闭！");
                    }
                });
            }
            getVoteData();
            $('.voteBtn').on('click',function () {
                var $this = $(this),vid = $this.closest('.voteItem').data('vid'),num = $this.closest('.voteItem').find('.nums').html(),isClk = $this.attr('data-clk');
                if(isClk !== 'clked'){
                    $this.attr('data-clk','clked').addClass('clked');
                    num++;
                    smtVote(vid,$this,num);
                }
            })
        },
        //二维码
        fixCode: function() {
            var fxCode = $('.fx-code'),ft = fxCode.offset().top;
            function scrollFunc() {
                var $win = $(window),st = $win.scrollTop();
                if($win.width() < 1306){
                    fxCode.hide();
                }else{
                    fxCode.show();
                }
                if(st >= (ft-($win.height()/2 - 120))){
                    fxCode.addClass('cur');
                }else{
                    fxCode.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        }
	};
    $('.ztSldWrap').each(function(){
        ymjsModel.ztSld('#'+$(this).attr('id'));
    });
    ymjsModel.vote();
    ymjsModel.fixCode();
})(jQuery);