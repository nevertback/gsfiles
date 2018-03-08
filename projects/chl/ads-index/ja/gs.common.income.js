(function ($) {
    //获取图片或htm后缀名
    function backExt(tar) {
        var backVal = '';
        backVal = tar.replace(/(.+)[\\/]/, "").split(".")[1];
        if(backVal){
            backVal = backVal.indexOf("?") !== -1 ? backVal.split("?")[0] : backVal;
        }
        return backVal;
    }
    //判断IE6
    function isIE6() {
        return !!window.ActiveXObject&&!window.XMLHttpRequest;
    }
    //站外监测
    function gsCountAnalysis(jcsrc) {
        var gscaDom = '';
        gscaDom = '<div style="display:none"><img src="'+jcsrc+'"></div>';
        return gscaDom;
    }
    function gsIncome() {}
    //基础广告 支持输出图或者swf
    gsIncome.prototype.base = function (options) {
        var defaultOptions = {
                tar:options.tar,
                width:options.width,
                height:options.height,
                material:options.material,
                url:options.url || '',
                countId:options.countId,
                isChange:options.isChange,
                infos:options.infos,
                vWidth:options.vWidth || 1500,
                vHeight:options.vHeight || 1500,
                margin:options.margin || '0 auto',
                diyStart:options.diyStart || '',
                diyEnd:options.diyEnd || ''
            },
            gsmExtension,gsm = '',gsu,gsTips = '',gsDom = '',gsId,
            tmpUrl,tmpMal,tmpId,
            bnmin,bnmax,bnCookie,bnCkie,bnnum,jcCode='';
        if(options.jcCode){
            jcCode = gsCountAnalysis(options.jcCode);
        }
        if(defaultOptions.isChange){
            bnmin=1;
            bnmax=2;  //1~2之间的循环
            bnCookie=defaultOptions.tar.replace('#','');  /*Cookie名称*/
            bnCkie=cookie(bnCookie);
            bnnum=bnCkie!==null? Number(bnCkie)===bnmax?bnmin:(Number(bnCkie)+1) : bnmin;
            cookie(bnCookie,bnnum,{path:"/",expires:1});
            switch(bnnum){
                case 1 :
                    tmpMal = defaultOptions.infos[0][0];
                    tmpUrl = defaultOptions.infos[0][1] || '';
                    tmpId = defaultOptions.infos[0][2];
                    break;
                case 2 :
                    tmpMal = defaultOptions.infos[1][0];
                    tmpUrl = defaultOptions.infos[1][1] || '';
                    tmpId = defaultOptions.infos[1][2];
                    break;
            }
        }else{
            tmpMal = defaultOptions.infos[0][0];
            tmpUrl = defaultOptions.infos[0][1] || '';
            tmpId = defaultOptions.infos[0][2];
        }

        if (tmpUrl === '' || tmpUrl === undefined || tmpUrl === null) {
            gsu="";
        }else{
            gsu="<a style='display:block;width:100%;height:100%;background: url(http://image.gamersky.com/webimg13/zhuanti/common/blank.png) 0 0 repeat;position:absolute;left:0;top:0;' href='"+tmpUrl+"' target='_blank' data-itemid='"+tmpId+"' class='countHit countHitSql'></a>";
        }
        gsTips = '<div style="width:24px;height:13px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);"></div>';
        //获取图片或flash后缀名
        gsmExtension = backExt(tmpMal);

        if(gsmExtension==="jpg" || gsmExtension==="gif" || gsmExtension==="png"){
            gsm += '<div style="position: relative;width:'+defaultOptions.width+'px;height:'+defaultOptions.height+'px;">';
            gsm +="<img src='"+tmpMal+"' width='"+defaultOptions.width+"' height='"+defaultOptions.height+"' border='0' />";
            gsm += gsTips + gsu;
            gsm += '</div>';
        }else if(gsmExtension==="swf"){
            gsId = 'gsMaterialFlashId'+tmpId+~(-new Date() / 36e5);
            gsm += '<div id="'+gsId+'" style="opacity: 0;position: fixed;width: '+defaultOptions.vWidth+';height: '+defaultOptions.vHeight+';">';
            gsm +="<embed src='"+tmpMal+"' width='"+defaultOptions.vWidth+"' height='"+defaultOptions.vHeight+"' wmode='transparent' quality='high' type='application/x-shockwave-flash'></embed>";
            gsm += gsTips + gsu;
            gsm += '</div>';
        }else if(gsmExtension==="htm"){
            gsm += '<iframe width="'+defaultOptions.width+'" height="'+defaultOptions.height+'" src="'+tmpMal+'" frameborder="0" scrolling="no"></iframe>';
        }
        gsDom += defaultOptions.diyStart;
        gsDom += '<div style="margin:'+defaultOptions.margin+';width:'+defaultOptions.width+'px;height:'+defaultOptions.height+'px;">';
        gsDom += gsm;
        gsDom += '</div>';
        gsDom += defaultOptions.diyEnd + jcCode;
        $(defaultOptions.tar).html(gsDom);
        if(gsmExtension==="swf"){
            setTimeout(function(){$("#"+gsId).css({"width":defaultOptions.width,"height":defaultOptions.height,"position":"relative","opacity":1}).find("embed").attr("height",defaultOptions.height).attr("width",defaultOptions.width);},800);
        }
    };
    //两侧背景广告
    gsIncome.prototype.background = function (options){
        var defaultOptions = {
            width:options.width,
            imgLeft:options.imgLeft,
            imgRight:options.imgRight,
            imgMiddle:options.imgMiddle,
            url:options.url,
            countId:options.countId,
            shadowLeft:options.shadowLeft,
            shadowRight:options.shadowRight,
            repeatY:options.repeatY,
            shadowSpec:options.shadowSpec,
            shadowMid:options.shadowMid,
            closeBtn:options.closeBtn,
            tarHeight:options.tarHeight
        },admid,adClose,adShadowSpec,addh,adwh,addw,adlr,wt,th,tp,pt,bgimg_m,bgimg_l,bgimg_r,htm,gsId,tmpId,repeatL,repeatR,jcCode='',
          gsmExtensionL='',gsmExtensionR='',gsmExtensionM='';

        if(options.jcCode){
            jcCode = gsCountAnalysis(options.jcCode);
        }
        
        //获取图片或htm后缀名
        gsmExtensionL = backExt(defaultOptions.imgLeft);
        gsmExtensionR = backExt(defaultOptions.imgRight);
        gsmExtensionM = backExt(defaultOptions.imgMiddle);
        
        admid=defaultOptions.width;
        adClose=defaultOptions.closeBtn;
        adShadowSpec = defaultOptions.shadowSpec;

        addh=$(document).height();
        adwh=$(window).height();
        addw=$(window).width();
        adlr=(addw-admid)/2;
        th = defaultOptions.tarHeight || 0;
        tp = addh-adwh;
        pt=isIE6()?"absolute":"fixed";
        bgimg_m=defaultOptions.imgMiddle===""?"":"background:url("+defaultOptions.imgMiddle+") center 0 no-repeat;";
        bgimg_l=defaultOptions.imgLeft===""?"":"background:url("+defaultOptions.imgLeft+") right 0 no-repeat;";
        bgimg_r=defaultOptions.imgRight===""?"":"background:url("+defaultOptions.imgRight+") left 0 no-repeat;";
        
        if(gsmExtensionL === "htm"){bgimg_l='';}
        if(gsmExtensionR === "htm"){bgimg_r='';}
        if(gsmExtensionM === "htm"){bgimg_m='';}

        tmpId = defaultOptions.countId;
        gsId = 'gsBackgroundId'+tmpId+~(-new Date() / 36e5);
        
        repeatL = defaultOptions.repeatY?'right 0 repeat-y':adShadowSpec?'right 0 no-repeat':'repeat-x';
        repeatR = defaultOptions.repeatY?'left 0 repeat-y':adShadowSpec?'left 0 no-repeat':'repeat-x';
        
        htm='<div id="'+gsId+'" style="width:'+addw+'px;height:'+adwh+'px;position:'+pt+';left:0;top:'+th+'px;'+bgimg_m+'" class="onlyOneBgtgs">';
        if(gsmExtensionM === "htm"){
          htm+='<iframe width="100%" height="100%" src="'+defaultOptions.imgMiddle+'" frameborder="0" scrolling="no"></iframe>';
          htm+='<div style="width:100%;height:41px;position:absolute;left:0;top:0;background:url(http://image.gamersky.com/webimg15/adtop.png) repeat-x;"></div>';
          htm+='<div class="gsBackgroundClose" style="width:70px;height:28px;cursor:pointer;position:absolute;right:0;top:0;z-index:2;background:url('+adClose+') right top no-repeat;"></div>';
        }else{
          htm+='<div class="gsBackgroundLeft" style="float:left;width:'+adlr+'px;height:100%;position:relative;'+bgimg_l+'">';
          if(gsmExtensionL === "htm"){
            htm+='<iframe width="100%" height="100%" src="'+defaultOptions.imgLeft+'" frameborder="0" scrolling="no"></iframe>';
            htm+='<div style="width:100%;height:112px;background:url(http://image.gamersky.com/webimg15/yyl-n.png) right 0 no-repeat;position:absolute;right:0;top:0;"></div>';
          }else{
            htm+='<a style="display:block;width:100%;height:100%;background:url('+defaultOptions.shadowLeft+') '+repeatL+'" target="_blank" href="'+defaultOptions.url+'" data-itemid="'+defaultOptions.countId+'" class="countHit countHitSql"></a>';
          }
          htm+='</div>';
          htm+='<div style="float:left;width:'+admid+'px;height:100%;'+defaultOptions.shadowMid+'"></div>'
          htm+='<div class="gsBackgroundRight" style="float:left;width:'+adlr+'px;height:100%;position:relative;'+bgimg_r+'">';
          if(gsmExtensionR === "htm"){
            htm+='<iframe width="100%" height="100%" src="'+defaultOptions.imgRight+'" frameborder="0" scrolling="no"></iframe>';
            htm+='<div style="width:100%;height:112px;background:url(http://image.gamersky.com/webimg15/yyr-n.png) left 0 no-repeat;position:absolute;left:0;top:0;"></div>';
          }else{
            htm+='<a style="display:block;width:100%;height:100%;background:url('+defaultOptions.shadowRight+') '+repeatR+'" target="_blank" href="'+defaultOptions.url+'" data-itemid="'+defaultOptions.countId+'" class="countHit countHitSql"></a>';
          }
          htm+='<div class="gsBackgroundClose" style="width:70px;height:28px;cursor:pointer;position:absolute;right:0;top:0;z-index:2;background:url('+adClose+') right top no-repeat;"></div>';
          htm+='</div>';
        }
        htm+='</div>' + jcCode;
        if($('.onlyOneBgtgs').length<=0){
            $("body").prepend(htm);
        }
        var $ads = $('#'+gsId);

        $ads.find('.gsBackgroundClose').on('click',function(){
            $ads.remove();
            $(".bgAdWrap").css("background","");
        });
        function scrollEvent(){
            var ttp;
            if($ads){
                wt=$(window).scrollTop();
                if(isIE6()===true){
                    var wtt=wt<=tp?wt>th?wt:th:tp;
                    $ads.css({"position":"absolute","top":wtt});
                }else if($.browser.msie){
                    var ps=wt>=th?"fixed":"absolute";
                    ttp=wt>=th?0:th;
                    $ads.css({"position":ps,"top":ttp});
                }else{
                    ttp=wt>=th?0:th-wt;
                    $ads.css({"position":"fixed","top":ttp});
                }
            }
        }

        $(window).resize(function(){
            var scww = $(window).width(),scwh = $(window).height(),scsw = (scww-admid)/2;
            tp=addh-scwh;
            $ads.css({"width":scww+'px',"height":scwh+'px'});
            $ads.find('.gsBackgroundLeft').css({"width":scsw+'px'});
            $ads.find('.gsBackgroundRight').css({"width":scsw+'px'});
        }).scroll(scrollEvent).trigger("scroll");
    };
    window.gsTg = new gsIncome();
})(jQuery);