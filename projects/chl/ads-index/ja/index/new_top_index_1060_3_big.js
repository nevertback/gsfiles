(function ($) {
    var aCfg = {
        cookieSet:{
            //间隔（分钟）
            interval:30,
            //显示次数
            times:4
        },
        //素材地址
        source:'http://image.gamersky.com/webimg13/zhuanti/test/liandong102.swf',
        size:[1060,430,90],
        tar:'#adscontainer_banner_new_top_index_1060_2',
        son:'gsincomeIndexTopBanner2Big'
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
            var vDom = '',styDom = '';
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
                    'z-index':10,
                    margin:'0 auto 10px'
                },
                b:{
                    position:'absolute',
                    left:0,
                    bottom:0,
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
            window.LiandongShow = function () {
                $(aCfg.tar).css(bCss.replay);
                window.gstgFugaiHide = true;
            };
            window.LiandongHidden = function () {
                $(aCfg.tar).css(bCss.close);
                window.gstgFugaiHide = false;
            };
            window.LdClose = function () {
                $(aCfg.tar).css(bCss.close);
                window.gstgFugaiHide = false;
            }
        },
        render:function () {
            this.createBanner();
            this.setCss();
            window.gstgFugaiHide = true;
        },
        cookieFnc:function(callback){
            var ckiNameStr = aCfg.son,
                ckiName = $.cookie(ckiNameStr);
            var cktime = new Date(),NewTimeStamp = cktime.getTime();
            if(typeof ckiName === "undefined"){
                if(typeof callback === "function"){
                    callback();
                }
                var calcTime;
                calcTime = aCfg.cookieSet.interval*60*1000+NewTimeStamp;
                cktime.setTime(calcTime);
                $.cookie(ckiNameStr,encodeURI(aCfg.cookieSet.times+'|'+calcTime),{path:"/",expires:cktime});
            }else{
                var ckiNum = decodeURI(ckiName),
                    ckiVal = ckiNum.split("|"),
                    ckiValNum = ckiVal[0],
                    ckiValTime = ckiVal[1];
                cktime.setTime(ckiValTime);
                if(ckiValNum > 1){
                    $.cookie(ckiNameStr,encodeURI(ckiValNum-1+'|'+ckiValTime),{path:"/",expires:cktime});
                    if(typeof callback === "function"){
                        callback();
                    }
                }
                if(ckiValTime - NewTimeStamp < 0){
                    $.cookie(ckiNameStr,null,{path:"/",expires:cktime});
                }
            }
        },
        init:function () {
            var _this = this;
            _this.cookieFnc(function () {
                _this.render();
            });
        }
    };
    gsMethods.init();
})(jQuery);