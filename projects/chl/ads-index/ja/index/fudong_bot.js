(function ($) {
    var aCfg={
        source:{
            //小图
            mini:'http://image.gamersky.com/webimg13/zhuanti/test/yixing_x.swf?444',
            //展开图
            big:'http://imgf.gamersky.com/img/mh_400x350_1214.swf'
        },
        //间隔（分钟）
        interval:20,
        //广告显示次数
        time:5,
        size:{
            mini:[110,110]
        }
    };

    function createSwf(src,w,h) {
        var swfDom = '';
        swfDom = '<embed src="'+src+'" width="'+w+'" height="'+h+'" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"></embed>';
        return swfDom;
    }

    var adsDom = '';
    adsDom += '<div class="gsincomeFdBot" style="position: fixed;bottom: 0;right: 50%;margin-right: 550px;width: '+aCfg.size.mini[0]+'px;height: '+aCfg.size.mini[1]+'px;">';
    adsDom += createSwf(aCfg.source.mini,aCfg.size.mini[0],aCfg.size.mini[1]);
    adsDom += '</div>';

    //$('body').append(adsDom);

    // var flashShowTimer;
    // window.yixingShowBig = function () {
    //     clearTimeout(flashShowTimer);
    //     flashShowTimer = setTimeout(function () {
    //         console.log('11');
    //     },120);
    // }

    /*
    var topMinute=20;   //间隔分钟
    var topNumber=5;    //广告显示次数

    var TopAdFlash1="<embed src='"+TopAdSwf1+"' width='120' height='110' allowScriptAccess='always' wmode='transparent' type='application/x-shockwave-flash'></embed>";
    var TopAdFlash2="<embed src='"+TopAdSwf2+"' width='400' height='350' allowScriptAccess='always' wmode='transparent' type='application/x-shockwave-flash'></embed>";

    function TopAdTimes(){$("#Flash2").hide().html("");$('#TopAd').find('.close').css('top','110px');}
    function TopAdFlash(){$("#Flash2").show().html(TopAdFlash2);$('#TopAd').find('.close').css('top','350px');}

    (function(){
        var divHtml="<div id='TopAd' style='display:none;overflow:visible;position:fixed;right:0;top:0;z-index:999999;'></div>";
        var TopAdHtml="<div style='width:120px;height:110px;position:absolute;top:0;right:0;'>"+TopAdFlash1+"</div>";
        TopAdHtml+="<div id='Flash2' style='width:400px;height:350px;position:absolute;top:0;right:0;'>"+TopAdFlash2+"</div>";
        TopAdHtml+="<div class='close' style='position:absolute;top:350px;right:0;width:66px;height:18px;background:url(http://image.gamersky.com/webimg15/tg/closetg.png) no-repeat;'></div>";

        var CookieName="Siye";  //Cookie名称
        var topDate=new Date(),NewTimeStamp=topDate.getTime();
        topDate.setTime(topMinute*60*1000+NewTimeStamp);
        var cookietime=topDate.getTime();

        var topCookie=cookie(CookieName);
        if(topCookie!=null){
            var topCkie=decodeURI(topCookie),N=topCkie.split("|"),num=Number(N[0]),RawTimeStamp=Number(N[1]);
            if(num<topNumber){
                $('body').append(divHtml);
                cookie(CookieName,encodeURI((num+1)+"|"+RawTimeStamp),{path:'/',expires:topDate});
            }
            if(RawTimeStamp-NewTimeStamp<0){cookie(CookieName,null,{path:'/',expires:topDate});}
        }else{
            $('body').append(divHtml);
            cookie(CookieName,encodeURI("1|"+cookietime),{path:'/',expires:topDate});
        }
        $("#TopAd").on("click",".close",function(){$("#TopAd").remove();});
        var setTimer=setInterval(function(){
            if($("#ad_banner1").length>0){return}
            if($("#FuGai").length>0){return}
            $("#TopAd").html(TopAdHtml).show();
            clearInterval(setTimer);
        },1000);
        function gsCountSiteInner(gsid) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: gsid,
                    script: "3"
                },
                success: function(data) {}
            });
        }
        //有效展示量
        //gsCountSiteInner(991037);
    })();
    */
})(jQuery);