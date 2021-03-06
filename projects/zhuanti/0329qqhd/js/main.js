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
            popupDom += '<div id="gsPopup" class="gsPopup '+opts.diy+'" style="';
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
        ztSld:function(sldId){
            var $sldId = $(sldId),
                $sldParent = $sldId.closest('.ztSldWrap'),
                $sldCon = $sldId.find('.ztSldCon'),
                $prev = $sldParent.find('.sldArrPrev'),
                $next = $sldParent.find('.sldArrNext'),eft = $sldId.data('effect');
            $(sldId).slide({
                mainCell:$sldCon,
                effect:eft||'leftLoop',
                delayTime:250,
                switchLoad:'data-src',
                prevCell:$prev,
                nextCell:$next
            });
        },
        popForm:function () {
            function verifIpt(iptcon,cate) {
                var bValidate;
                if(cate === 'qq'){
                    bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
                }else if(cate === 'telephone'){
                    bValidate = RegExp(/^1\d{10}$/).test(iptcon);
                }else if(cate === 'email'){
                    bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
                }
                return bValidate;
            }
            function selFnc() {
                $(document).on('click','.popSel',function () {
                    var $ts = $(this),$dad = $ts.closest('.popQuesBox'),isCur = $ts.attr('data-cur');
                    if($dad.hasClass('popQuesBoxMutl') !== true){
                        $dad.find('.popSel').removeClass('cur').attr('data-cur','no');
                    }
                    if(isCur === 'yes'){
                        $ts.removeClass('cur');
                        $ts.attr('data-cur','no');
                    }else{
                        $ts.addClass('cur');
                        $ts.attr('data-cur','yes');
                    }
                })
            }
            function smtData(tar){
                var $ipt = tar.find('.popEmail'),ztDir = 'qqhd';
                var Folder = 'zhuanti/'+ztDir+'/',fname = 'infos',
                    cookiefname = cookie(ztDir),
                    userNum = $ipt.val(),ques = [],smtCon,eachSel = true;
                if(typeof userNum === 'undefined'){
                    alert("请选择您的邮箱地址！");
                    return;
                }
                if (cookiefname !== null && cookiefname === userNum) {
                    alert("您已经提交过了！");
                    return;
                }
                if (verifIpt(userNum,'email') === false) {
                    alert("请输入有效的邮箱地址！");
                    return;
                }
                tar.find('.popQuesBox').each(function () {
                    var $ts=$(this),ans = {},tit;
                    tit = $ts.find('.popSelTit').text().substr(0,1);
                    ans.tit = tit;
                    ans.ans = [];
                    $ts.find('.cur').each(function () {
                        ans.ans.push(parseInt($(this).find('.popSelTxt').text().substr(0,2)));
                    });
                    ques.push(ans);
                });
                $.each(ques,function (i,item) {
                   if(item.ans.length<1){
                       eachSel = false;
                   }
                });
                if(eachSel === false){
                    alert('每题至少选一项');
                    return;
                }
                smtCon = JSON.stringify(ques);
                var content = "---邮箱：" + userNum + "---问卷：" + smtCon + "---";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://www3.gamersky.com:81/cfile.asp",
                    data: {
                        Submit: "Submit",
                        Folder:Folder,
                        Fname: fname,
                        Content: content
                    },
                    success: function(Jsons) {}
                });
                cookie(ztDir, userNum, {
                    path: '/'
                });
                alert("提交完成！");
                $ipt.val('');
                $('#gsPopupClose').trigger('click');
            }
            selFnc();
            $(document).on('click','.popSmt',function () {
                var $ts = $(this),$dad = $ts.closest('.popForm');
                smtData($dad)
            });
        }
	};
    $('.ztTab').each(function(){
        ymjsModel.ztTabs('#'+$(this).attr('id'));
    });
    $('.ztSld').each(function(){
        ymjsModel.ztSld('#'+$(this).attr('id'));
    });
    ymjsModel.popForm();
})(jQuery);