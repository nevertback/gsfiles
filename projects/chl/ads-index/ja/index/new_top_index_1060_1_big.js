(function ($) {
    var aCfg = {
        source:'http://image.gamersky.com/webimg13/zhuanti/test/ldtl03.swf',
        size:[1060,407,60],
        tar:'#adscontainer_banner_new_top_index_1060_1',
        son:'gsincomeIndexTopBanner1Big'
    };
    var gsMethods = {
        createSwf:function (src,w,h) {
            var swfDom = '';
            swfDom = '<embed src="'+src+'" width="'+w+'" height="'+h+'" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"></embed>';
            return swfDom;
        },
        createTags:function () {
            var tags = '<div style="width:24px;height:13px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);"></div>';
            return tags;
        },
        createBanner:function () {
            var vDom = '',styDom;
            styDom += '<style>';
            styDom += '.hei #'+aCfg.son+'{background-image: url(http://image.gamersky.com/webimg15/tg/gitb3bg-hei.png);}';
            styDom += '#'+aCfg.son+'{background: url(http://image.gamersky.com/webimg15/tg/gitb3bg-bai.png) 0 46px repeat-x;}';
            styDom += '</style>';
            vDom += '<div id="'+aCfg.son+'">';
            vDom += this.createSwf(aCfg.source,aCfg.size[0],aCfg.size[1]);
            vDom += '</div>';
            vDom += '</div>'+gsMethods.createTags()+'</div>';
            $('head').append(styDom);
            $(aCfg.tar).html(vDom);
        },
        setCss:function () {
            var bCss = {
                bp:{
                    position:'relative',
                    overflow:'visible',
                    width:aCfg.size[0]+'px',
                    height:aCfg.size[2]+'px',
                    'z-index':10
                },
                b:{
                    position:'absolute',
                    left:0,
                    top:0,
                    width:aCfg.size[0]+'px',
                    height:aCfg.size[1]+'px'
                },
                close:{
                    overflow:'hidden'
                },
                replay:{
                    overflow:'visible'
                }
            };
            $(aCfg.tar).css(bCss.bp);
            $('#'+aCfg.son).css(bCss.b);
            $('.Mid_top').css('overflow','visible');
            window.LiandongShow1 = function () {
                $(aCfg.tar).css(bCss.replay);
                $('.Mid_top').css('overflow','visible');
            };
            window.LiandongHidden1 = function () {
                $(aCfg.tar).css(bCss.close);
                $('.Mid_top').css('overflow','hidden');
            };
            window.LdClose1 = function () {
                $(aCfg.tar).css(bCss.close);
                $('.Mid_top').css('overflow','hidden');
            }
        },
        render:function () {
            this.createBanner();
            this.setCss();
        },
        init:function () {
            this.render();
        }
    };
    gsMethods.init();
})(jQuery);